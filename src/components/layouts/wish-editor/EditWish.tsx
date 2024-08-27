'use client';

import { FC, useState, useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { decryptedData, encryptedData } from '@/helpers/utils/encryption-data';
import { removingWhiteSpaces } from '@/helpers/utils/formating-number';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import FormContent from '@/components/layouts/wish-editor/FormContent';
import UiButton from '@/components/ui/UiButton';
import UiModal from '@/components/ui/UiModal';

interface IProps {
    showModal: boolean;
    idOfSelectedWish: IWish['id'] | null;
    hide: () => void;
}

const EditWish: FC<IProps> = ({ showModal, idOfSelectedWish, hide }) => {
    const [material, setMaterial] = useState<ICreateWish['material']>(true);
    const [images, setImages] = useState<TCurrentImage[]>([]);
    const [currency, setCurrency] = useState<IWish['currency']>(ECurrency.UAH);
    const [show, setShow] = useState<ICreateWish['show'] | null>(null);
    const [showError, setShowError] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [showConfirmLeave, setShowConfirmLeave] = useState<boolean>(false);
    const [showConfirmDeleteWish, setShowConfirmDeleteWish] =
        useState<boolean>(false);

    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const {
        control,
        register,
        setValue,
        watch,
        trigger,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<TWishFormInputs>();

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const updateWish = useWishesStore((state) => state.updateWish);
    const deleteWish = useWishesStore((state) => state.deleteWish);

    const hideModals = () => {
        setMaterial(true);
        setImages([]);
        setCurrency(ECurrency.UAH);
        setShow(null);
        setChanged(false);
        setShowConfirmLeave(false);
        setShowConfirmDeleteWish(false);
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

        await updateWish(
            { ...wishData, id: idOfSelectedWish },
            alertsT('wishes-api.update-wish.success'),
            alertsT('wishes-api.update-wish.error')
        );

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

        setChanged(true);
    };

    const handleHideModal = () => {
        if (changed) {
            return setShowConfirmLeave(true);
        }
        hideModals();
    };

    const handleDeleteWish = async () => {
        if (!myUser || !idOfSelectedWish) return;

        await deleteWish(
            { userId: myUser.id, wishId: idOfSelectedWish },
            alertsT('wishes-api.delete-wish.success'),
            alertsT('wishes-api.delete-wish.error')
        );
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

    return (
        <>
            <UiModal show={showModal} hide={handleHideModal}>
                <form
                    className="flex max-h-full flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormContent
                        title="editing_wish"
                        register={register}
                        control={control}
                        setValue={setValue}
                        watch={watch}
                        trigger={trigger}
                        errors={errors}
                        material={material}
                        setMaterial={setMaterial}
                        images={images}
                        setImages={setImages}
                        removeAllImages={removeAllImages}
                        currency={currency}
                        setCurrency={setCurrency}
                        show={show}
                        setShow={setShow}
                        showError={showError}
                        setShowError={setShowError}
                        changed={changed}
                        setChanged={setChanged}
                    />

                    {/* actions */}
                    <div className="ml-auto flex items-center gap-4">
                        <UiButton
                            variant="text-attention"
                            onBtnClick={() => setShowConfirmDeleteWish(true)}
                        >
                            {mainPageT('delete-wish')}
                        </UiButton>

                        <UiButton type="submit" disabled={!changed}>
                            {mainPageT('update')}
                        </UiButton>
                    </div>
                </form>
            </UiModal>

            <ConfirmModal
                show={showConfirmLeave}
                confirm={hideModals}
                hide={() => setShowConfirmLeave(false)}
                confirmModalT={mainPageT('leave_with_changes.confirm')}
                closeModalT={mainPageT('leave_with_changes.close')}
            >
                <span className="text-zinc-700 dark:text-zinc-300">
                    {mainPageT('leave_with_changes.text')}
                </span>
            </ConfirmModal>

            <ConfirmModal
                show={showConfirmDeleteWish}
                confirm={handleDeleteWish}
                hide={() => setShowConfirmDeleteWish(false)}
                confirmModalT={mainPageT('delete')}
                closeModalT={mainPageT('leave_with_changes.close')}
            >
                <span className="text-zinc-700 dark:text-zinc-300">
                    {mainPageT('are-you-sure')}
                </span>
            </ConfirmModal>
        </>
    );
};

export default EditWish;
