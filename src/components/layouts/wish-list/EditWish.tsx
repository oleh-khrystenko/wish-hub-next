'use client';

import React, { FC, useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    ECurrency,
    IImage,
    IWish,
    TCurrentImage,
    TWishFormInputs,
} from '@/models/Wish';
import { EPrivacy } from '@/models/Settings';
import { ICreateWish } from '@/stores/wishes/types';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseValidations from '@/helpers/hooks/UseValidations';
import { decryptedData, encryptedData } from '@/helpers/utils/encryption-data';
import { removingWhiteSpaces } from '@/helpers/utils/formating-number';
import { WISH_DESCRIPTION_MAX_LENGTH } from '@/helpers/utils/constants';
import Addresses from '@/components/layouts/wish-list/Addresses';
import DragNDrop from '@/components/layouts/drag-n-drop/DragNDrop';
import UiSwitch from '@/components/ui/UiSwitch';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import PrivacyChoices from '@/components/layouts/wish-list/PrivacyChoices';
import UiModal from '@/components/ui/UiModal';
import ConfirmModal from '@/components/layouts/ConfirmModal';

interface IProps {
    showModal: boolean;
    idOfSelectedWish: IWish['id'] | null;
    hide: () => void;
}

const EditWish: FC<IProps> = ({ showModal, idOfSelectedWish, hide }) => {
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [show, setShow] = useState<ICreateWish['show'] | null>(null);
    const [showError, setShowError] = useState<string>('');
    const [currency, setCurrency] = useState<IWish['currency']>(ECurrency.UAH);
    const [images, setImages] = useState<TCurrentImage[]>([]);
    const [material, setMaterial] = useState<ICreateWish['material']>(true);
    const [showConfirmDeleteWish, setShowConfirmDeleteWish] =
        useState<boolean>(false);
    const [showConfirmLeave, setShowConfirmLeave] = useState<boolean>(false);

    const firstRender = useRef(false);

    const mainPageT = useTranslations('main-page');
    const validationsT = useTranslations('validations');

    const {
        control,
        register,
        setValue,
        watch,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<TWishFormInputs>();

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const updateWish = useWishesStore((state) => state.updateWish);
    const deleteWish = useWishesStore((state) => state.deleteWish);

    const {
        wishNameValidation,
        wishPriceValidation,
        wishDescriptionValidation,
    } = UseValidations();

    const selectOptions: IOption[] = [
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {ECurrency.UAH}
                </span>
            ),
            value: ECurrency.UAH,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {ECurrency.USD}
                </span>
            ),
            value: ECurrency.USD,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {ECurrency.EUR}
                </span>
            ),
            value: ECurrency.EUR,
        },
    ];

    const hideModals = () => {
        setShowConfirmDeleteWish(false);
        setShowConfirmLeave(false);
        setIsDirty(false);
        setMaterial(true);
        setImages([]);
        setCurrency(ECurrency.UAH);
        setShow(null);
        hide();
    };

    const onSubmit: SubmitHandler<TWishFormInputs> = async (data) => {
        const nonUniqueName = wishes.some((wish) => {
            let wishName = wish.name;
            if (
                process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET &&
                wish.show !== EPrivacy.ALL
            ) {
                wishName = decryptedData(
                    wish.name,
                    process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                );
            }
            return (
                wishName === data.name.trim() && wish.id !== idOfSelectedWish
            );
        });
        if (nonUniqueName) {
            setError(
                'name',
                {
                    type: 'unique',
                    message: mainPageT('non-unique-wish-name'),
                },
                { shouldFocus: true }
            );
            return;
        }

        if (
            !myUser ||
            idOfSelectedWish === null ||
            show === null ||
            !process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
        )
            return;

        // name
        const encryptedName = encryptedData(
            data.name.trim(),
            process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
        );

        // price
        const priceWithoutWhiteSpaces = data.price
            ? removingWhiteSpaces(data.price.trim())
            : '';
        const encryptedPrice = encryptedData(
            priceWithoutWhiteSpaces,
            process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
        );
        const sendingPrice =
            show === EPrivacy.ALL ? priceWithoutWhiteSpaces : encryptedPrice;

        // currency
        const encryptedCurrency = encryptedData(
            currency,
            process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
        );
        const sendingCurrency =
            show === EPrivacy.ALL ? currency : encryptedCurrency;

        // addresses
        const dataAddresses =
            data.addresses && data.addresses.length > 0
                ? data.addresses
                      .filter((address) => address.value.length > 0)
                      .map((address) => ({
                          ...address,
                          value: address.value.trim(),
                      }))
                : [];
        const encryptedAddresses =
            dataAddresses.length > 0
                ? dataAddresses.map((address) =>
                      process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                          ? {
                                ...address,
                                value: encryptedData(
                                    address.value,
                                    process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                                ),
                            }
                          : address
                  )
                : undefined;
        const sendingAddresses =
            show === EPrivacy.ALL ? dataAddresses : encryptedAddresses;

        // description
        const dataDescription = data.description ? data.description.trim() : '';
        const encryptedDescription = encryptedData(
            dataDescription,
            process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
        );
        const sendingDescription =
            show === EPrivacy.ALL ? dataDescription : encryptedDescription;

        // images
        const encryptedImages = images.map((image) => {
            if (
                image instanceof File ||
                !process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
            )
                return image;

            const encryptedImage = { ...image };
            encryptedImage.path = encryptedData(
                image.path,
                process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
            );
            return encryptedImage;
        });

        const wishData = {
            userId: myUser.id,
            material,
            show,
            name: show === EPrivacy.ALL ? data.name.trim() : encryptedName,
            price: material ? sendingPrice : undefined,
            currency: material ? sendingCurrency : undefined,
            addresses: material ? sendingAddresses : undefined,
            description:
                dataDescription.length > 0 ? sendingDescription : undefined,
            images: show === EPrivacy.ALL ? images : encryptedImages,
        };

        try {
            await updateWish({ ...wishData, id: idOfSelectedWish });
        } catch (e: any) {
            console.error(e);
        }

        hideModals();
    };

    const removeAllImages = () => {
        setImages((prevState) =>
            prevState
                .filter((image) => !(image instanceof File))
                .map((image) => {
                    const updatedImage = { ...(image as IImage) };
                    updatedImage.delete = true;
                    return updatedImage;
                })
        );
    };

    const changeMaterial = (value: boolean) => {
        setMaterial(value);
        setIsDirty(true);
    };

    const changeImages = (value: TCurrentImage[]) => {
        setImages(value);
        setIsDirty(true);
    };

    const changeCurrency = (value: IWish['currency']) => {
        setCurrency(value);
        setIsDirty(true);
    };

    const changePrivacy = (value: EPrivacy) => {
        setShow(value);
        setShowError('');
        setIsDirty(true);
    };

    const handleHideModal = () => {
        if (isDirty) {
            return setShowConfirmLeave(true);
        }
        hideModals();
    };

    const handleDeleteWish = async () => {
        if (!myUser || !idOfSelectedWish) return;

        await deleteWish({ userId: myUser.id, wishId: idOfSelectedWish });
        close();
    };

    useLayoutEffect(() => {
        if (wishes.length === 0) return;

        const selectedWish = wishes.find(
            (wish) => wish.id === idOfSelectedWish
        );

        if (!selectedWish || !process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) return;

        setMaterial(selectedWish.material);
        setShow(selectedWish.show);

        // name
        setValue(
            'name',
            selectedWish.show === EPrivacy.ALL
                ? selectedWish.name
                : decryptedData(
                      selectedWish.name,
                      process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                  )
        );

        // price
        selectedWish.price &&
            setValue(
                'price',
                selectedWish.show === EPrivacy.ALL
                    ? selectedWish.price
                    : decryptedData(
                          selectedWish.price,
                          process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                      )
            );

        // currency
        selectedWish.currency &&
            setCurrency(
                selectedWish.show === EPrivacy.ALL
                    ? selectedWish.currency
                    : (decryptedData(
                          selectedWish.currency,
                          process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                      ) as IWish['currency'])
            );

        // addresses
        selectedWish.addresses &&
            selectedWish.addresses.length > 0 &&
            setValue(
                'addresses',
                selectedWish.show === EPrivacy.ALL
                    ? selectedWish.addresses
                    : selectedWish.addresses.map((address) =>
                          process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                              ? {
                                    ...address,
                                    value: decryptedData(
                                        address.value,
                                        process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                                    ),
                                }
                              : address
                      )
            );

        // description
        setValue(
            'description',
            selectedWish.show === EPrivacy.ALL
                ? selectedWish.description
                : decryptedData(
                      selectedWish.description,
                      process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                  )
        );

        // images
        const decryptedImages = selectedWish.images.map((image) => {
            if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) return image;

            const decryptedImage = { ...image };
            decryptedImage.path = decryptedData(
                image.path,
                process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
            );
            return decryptedImage;
        });
        setImages(
            selectedWish.show === EPrivacy.ALL
                ? selectedWish.images
                : decryptedImages
        );
    }, [idOfSelectedWish, wishes, setValue]);

    useEffect(() => {
        if (firstRender.current) return;
        firstRender.current = true;

        const subscription = watch(() => setIsDirty(true));

        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <>
            <UiModal show={showModal} hide={handleHideModal}>
                <form
                    className="flex max-h-full flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <span className="whitespace-nowrap text-center text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {mainPageT('editing_wish')}
                    </span>

                    <div className="-mr-3 flex h-auto max-h-[70svh] flex-col overflow-y-auto overflow-x-hidden pr-3">
                        {/* material */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                className={`${material ? 'text-cyan-300' : 'text-zinc-700 dark:text-zinc-300'} font-bold`}
                                type="button"
                                onClick={() => changeMaterial(true)}
                            >
                                {mainPageT('material-wish')}
                            </button>
                            <UiSwitch
                                id="material"
                                name="material"
                                checked={material}
                                bg={material ? 'bg-cyan-300' : 'bg-rose-500'}
                                onChange={(e) =>
                                    changeMaterial(e.target.checked)
                                }
                            />
                            <button
                                className={`${material ? 'text-zinc-700 dark:text-zinc-300' : 'text-rose-500'} font-bold`}
                                type="button"
                                onClick={() => changeMaterial(false)}
                            >
                                {mainPageT('non-material-wish')}
                            </button>
                        </div>

                        {/* name */}
                        <div className="mt-5">
                            <UiInput
                                {...register('name', wishNameValidation)}
                                id="name"
                                name="name"
                                type="text"
                                label={mainPageT('wish-name')}
                                tooltip={mainPageT('wish-name-tooltip')}
                                error={errors?.name?.message}
                            />
                        </div>

                        {/* DragNDrop */}
                        <DndProvider backend={HTML5Backend}>
                            <DragNDrop
                                images={images}
                                setImages={changeImages}
                                removeAllImages={removeAllImages}
                            />
                        </DndProvider>

                        <div
                            className={`${material ? 'flex' : 'hidden'} mt-5 flex-col gap-4 transition-all duration-300 ease-in-out`}
                        >
                            {/* price */}
                            <div className="flex items-center gap-5">
                                <UiInput
                                    {...(material &&
                                        register('price', wishPriceValidation))}
                                    id="price"
                                    name="price"
                                    type="number"
                                    label={mainPageT('wish-price')}
                                    tooltip={mainPageT('wish-price-tooltip')}
                                    error={errors?.price?.message}
                                />

                                <UiSelect
                                    options={selectOptions}
                                    value={currency}
                                    onChange={(value) =>
                                        changeCurrency(
                                            value as IWish['currency']
                                        )
                                    }
                                />
                            </div>

                            {/* addresses */}
                            <Addresses
                                control={control}
                                watch={watch}
                                register={register}
                                errors={errors}
                                material={material}
                            />
                        </div>

                        {/* description */}
                        <div className="mt-7">
                            <UiInput
                                {...register('description', {
                                    ...wishDescriptionValidation,
                                    maxLength: {
                                        value: WISH_DESCRIPTION_MAX_LENGTH,
                                        message: validationsT(
                                            'wish-description.max',
                                            {
                                                current:
                                                    watch('description')
                                                        ?.length,
                                                max: WISH_DESCRIPTION_MAX_LENGTH,
                                            }
                                        ),
                                    },
                                })}
                                id="description"
                                name="description"
                                type="multiline"
                                label={mainPageT('wish-description')}
                                error={errors?.description?.message}
                            />
                        </div>

                        {/* PrivacyChoices */}
                        <PrivacyChoices
                            id="wish"
                            tooltipContent={{
                                all: mainPageT('can-see.wish-all-tooltip'),
                                friends: mainPageT(
                                    'can-see.wish-friends-tooltip'
                                ),
                                nobody: mainPageT(
                                    'can-see.wish-nobody-tooltip'
                                ),
                            }}
                            show={show}
                            showError={showError}
                            onChange={changePrivacy}
                        />
                    </div>

                    {/* actions */}
                    <div className="ml-auto flex items-center gap-4">
                        <UiButton
                            variant="text-attention"
                            onClick={() => setShowConfirmDeleteWish(true)}
                        >
                            {mainPageT('delete-wish')}
                        </UiButton>

                        <UiButton type="submit">{mainPageT('update')}</UiButton>
                    </div>
                </form>
            </UiModal>

            <ConfirmModal
                show={showConfirmDeleteWish}
                confirm={handleDeleteWish}
                hide={() => setShowConfirmDeleteWish(false)}
                titleModalT={mainPageT('confirm-modal.title')}
                confirmModalT={mainPageT('delete')}
                closeModalT={mainPageT('leave_with_changes.close')}
            >
                <span className="text-zinc-700 dark:text-zinc-300">
                    {mainPageT('are-you-sure')}
                </span>
            </ConfirmModal>

            <ConfirmModal
                show={showConfirmLeave}
                confirm={hideModals}
                hide={() => setShowConfirmLeave(false)}
                titleModalT={mainPageT('confirm-modal.title')}
                confirmModalT={mainPageT('leave_with_changes.confirm')}
                closeModalT={mainPageT('leave_with_changes.close')}
            >
                <span className="text-zinc-700 dark:text-zinc-300">
                    {mainPageT('leave_with_changes.text')}
                </span>
            </ConfirmModal>
        </>
    );
};

export default EditWish;
