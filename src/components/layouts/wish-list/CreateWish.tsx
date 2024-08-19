'use client';

import React, { FC, useState } from 'react';
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
import FastWish from '@/components/layouts/wish-list/FastWish';
import { useWishesStore } from '@/stores/wishes';
import { decryptedData, encryptedData } from '@/helpers/utils/encryption-data';
import { ELang, EPrivacy } from '@/models/Settings';
import { useLocale, useTranslations } from 'next-intl';
import { ICreateWish } from '@/stores/wishes/types';
import { useMyUserStore } from '@/stores/my-user';
import { removingWhiteSpaces } from '@/helpers/utils/formating-number';
import { toast } from 'react-toastify';
import UiQuoteMessage from '@/components/ui/UiQuoteMessage';
import UiSwitch from '@/components/ui/UiSwitch';
import UiInput from '@/components/ui/UiInput';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiTooltip from '@/components/ui/UiTooltip';
import { WISH_DESCRIPTION_MAX_LENGTH } from '@/helpers/utils/constants';
import UiButton from '@/components/ui/UiButton';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import Addresses from '@/components/layouts/wish-list/Addresses';
import UiPrivacyChoices from '@/components/ui/UiPrivacyChoices';
import DragNDrop from '@/components/layouts/DragNDrop';
import UiModal from '@/components/ui/UiModal';

interface IProps {
    showModal: boolean;
    hide: () => void;
}

const CreateWish: FC<IProps> = ({ showModal, hide }) => {
    const [isFastWish, setIsFastWish] = useState<boolean>(true);
    const [show, setShow] = useState<ICreateWish['show'] | null>(null);
    const [showError, setShowError] = useState<string>('');
    const [currency, setCurrency] = useState<IWish['currency']>(ECurrency.UAH);
    const [images, setImages] = useState<TCurrentImage[]>([]);
    const [material, setMaterial] = useState<ICreateWish['material']>(true);

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');
    const validationsT = useTranslations('validations');

    const {
        control,
        register,
        getValues,
        setValue,
        watch,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<TWishFormInputs>();

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const createWish = useWishesStore((state) => state.createWish);

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
            return wishName === data.name.trim();
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

        if (!show) {
            return setShowError(mainPageT('private-wish-error'));
        } else {
            setShowError('');
        }

        if (!myUser || !process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) return;

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
            const response = await createWish(wishData);
            if (!response) return;

            const quote = response[activeLocale as ELang];
            toast(
                <UiQuoteMessage
                    title={alertsT('wishes-api.create-wish.success')}
                    text={quote?.text}
                    author={quote?.author}
                />,
                { type: 'success' }
            );
        } catch (e: any) {
            console.error(e);
        }

        hide();
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

    const changeShow = (value: EPrivacy) => {
        setShow(value);
        setShowError('');
    };

    const handleHideModal = () => {
        hide();
        setIsFastWish(true);
    };

    return (
        <UiModal show={showModal} hide={handleHideModal}>
            {isFastWish ? (
                <FastWish hide={() => setIsFastWish(false)} />
            ) : (
                <form
                    className="flex max-h-full flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <span className="whitespace-nowrap text-center text-lg font-bold text-zinc-700 dark:text-zinc-300">
                        {mainPageT('create-wish')}
                    </span>

                    <div className="-mr-3 flex h-auto max-h-[70svh] flex-col overflow-y-auto overflow-x-hidden pr-3">
                        {/* material */}
                        <div className="material">
                            <button
                                className={
                                    'yes' + (material ? ' primary-color' : '')
                                }
                                type="button"
                                onClick={() => setMaterial(true)}
                            >
                                {mainPageT('material-wish')}
                            </button>
                            <UiSwitch
                                id="material"
                                name="material"
                                checked={material}
                                onChange={(e) => setMaterial(e.target.checked)}
                            />
                            <button
                                className={
                                    'no' + (material ? '' : ' action-color')
                                }
                                type="button"
                                onClick={() => setMaterial(false)}
                            >
                                {mainPageT('non-material-wish')}
                            </button>
                        </div>

                        {/* name */}
                        <UiInput
                            {...register('name', wishNameValidation)}
                            id="name"
                            name="name"
                            type="text"
                            label={mainPageT('wish-name')}
                            tooltip={mainPageT('wish-name-tooltip')}
                            error={errors?.name?.message}
                        />
                        <UiTooltip id="name" />

                        {/* DragNDrop */}
                        <DndProvider backend={HTML5Backend}>
                            <DragNDrop
                                images={images}
                                setImages={setImages}
                                removeAllImages={removeAllImages}
                            />
                        </DndProvider>

                        <div
                            className={
                                'expander' + (material ? ' rolled-up' : '')
                            }
                        >
                            {/* price */}
                            <div className="price">
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
                                <div className="custom-mui-select">
                                    <UiSelect
                                        options={selectOptions}
                                        value={currency}
                                        onChange={(value) =>
                                            setCurrency(
                                                value as IWish['currency']
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <UiTooltip id="price" />

                            {/* addresses */}
                            <Addresses
                                control={control}
                                getValues={getValues}
                                register={register}
                                errors={errors}
                                material={material}
                            />
                        </div>

                        {/* description */}
                        <UiInput
                            {...register('description', {
                                ...wishDescriptionValidation,
                                maxLength: {
                                    value: WISH_DESCRIPTION_MAX_LENGTH,
                                    message: validationsT(
                                        'wish-description.max',
                                        {
                                            current:
                                                watch('description')?.length,
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

                        {/* PrivacyChoices */}
                        <UiPrivacyChoices
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
                            onChange={changeShow}
                        />
                    </div>

                    {/* actions */}
                    <div className="ml-auto">
                        <UiButton type="submit">{mainPageT('create')}</UiButton>
                    </div>
                </form>
            )}
        </UiModal>
    );
};

export default CreateWish;
