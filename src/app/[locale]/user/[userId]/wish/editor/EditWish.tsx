'use client';

import { FC, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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
import FormContent from '@/app/[locale]/user/[userId]/wish/editor/FormContent';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
// import UiModal from '@/components/ui/modal/UiModal';

interface IProps {
    wish: IWish;
}

const EditWish: FC<IProps> = ({ wish }) => {
    const [material, setMaterial] = useState<ICreateWish['material']>(true);
    const [images, setImages] = useState<TCurrentImage[]>([]);
    const [currency, setCurrency] = useState<IWish['currency']>(ECurrency.UAH);
    const [show, setShow] = useState<ICreateWish['show'] | null>(null);
    const [showError, setShowError] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    // const [showConfirmLeave, setShowConfirmLeave] = useState<boolean>(false);
    const [showConfirmDeleteWish, setShowConfirmDeleteWish] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const route = useRouter();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const validationsT = useTranslations('validations');
    const allPagesT = useTranslations('all-pages');

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

    const onSubmit: SubmitHandler<TWishFormInputs> = async (data) => {
        const nonUniqueName = wishes.some((currentWish) => {
            let wishName = currentWish.name;
            if (
                process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET &&
                currentWish.show !== EPrivacy.ALL
            ) {
                wishName = decryptedData(
                    currentWish.name,
                    process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                );
            }
            return wishName === data.name.trim() && currentWish.id !== wish.id;
        });
        if (nonUniqueName) {
            setError(
                'name',
                {
                    type: 'unique',
                    message: validationsT('wish-name.unique'),
                },
                { shouldFocus: true }
            );
            return;
        }

        if (
            !myUser ||
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

        setIsLoading(true);
        await updateWish(
            { ...wishData, id: wish.id },
            allPagesT('wishes-api.update-wish.success'),
            allPagesT('wishes-api.update-wish.error')
        );

        route.push(`/${activeLocale}/user/${myUser.id}/wish?wishId=${wish.id}`);
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

    const handleDeleteWish = async () => {
        if (!myUser) return;

        setIsLoading(true);
        await deleteWish(
            { wishId: wish.id, userId: myUser.id },
            allPagesT('wishes-api.delete-wish.success'),
            allPagesT('wishes-api.delete-wish.error', {
                wishId: wish.id,
            })
        );

        route.push(`/${activeLocale}/main`);
    };

    useLayoutEffect(() => {
        const copiedWish = { ...wish };

        if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) return;

        setMaterial(copiedWish.material);
        setShow(copiedWish.show);

        // name
        setValue(
            'name',
            copiedWish.show === EPrivacy.ALL
                ? copiedWish.name
                : decryptedData(
                      copiedWish.name,
                      process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                  )
        );

        // price
        copiedWish.price &&
            setValue(
                'price',
                copiedWish.show === EPrivacy.ALL
                    ? copiedWish.price
                    : decryptedData(
                          copiedWish.price,
                          process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                      )
            );

        // currency
        copiedWish.currency &&
            setCurrency(
                copiedWish.show === EPrivacy.ALL
                    ? copiedWish.currency
                    : (decryptedData(
                          copiedWish.currency,
                          process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                      ) as IWish['currency'])
            );

        // addresses
        copiedWish.addresses &&
            copiedWish.addresses.length > 0 &&
            setValue(
                'addresses',
                copiedWish.show === EPrivacy.ALL
                    ? copiedWish.addresses
                    : copiedWish.addresses.map((address) =>
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
            copiedWish.show === EPrivacy.ALL
                ? copiedWish.description
                : decryptedData(
                      copiedWish.description,
                      process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
                  )
        );

        // images
        const decryptedImages = copiedWish.images.map((image) => {
            if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) return image;

            const decryptedImage = { ...image };
            decryptedImage.path = decryptedData(
                image.path,
                process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
            );
            return decryptedImage;
        });
        setImages(
            copiedWish.show === EPrivacy.ALL
                ? copiedWish.images
                : decryptedImages
        );
    }, [wish, setValue]);

    return (
        <>
            <form
                className="flex max-h-full flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormContent
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

            {/*<ConfirmModal*/}
            {/*    show={showConfirmLeave}*/}
            {/*    confirm={hideModals}*/}
            {/*    hide={() => setShowConfirmLeave(false)}*/}
            {/*    confirmModalT={mainPageT('leave_with_changes.confirm')}*/}
            {/*    closeModalT={mainPageT('leave_with_changes.close')}*/}
            {/*>*/}
            {/*    <span className="text-zinc-700 dark:text-zinc-300">*/}
            {/*        {mainPageT('leave_with_changes.text')}*/}
            {/*    </span>*/}
            {/*</ConfirmModal>*/}

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

            {isLoading && <UiLoading />}
        </>
    );
};

export default EditWish;
