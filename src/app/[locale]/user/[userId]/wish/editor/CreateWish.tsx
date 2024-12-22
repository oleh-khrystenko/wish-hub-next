'use client';

import { FC, useState, useLayoutEffect, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import {
    ECurrency,
    IImage,
    IGuestWish,
    IWish,
    TCurrentImage,
    TWishFormInputs,
} from '@/models/wish';
import { EAddToCollection, ELang, EPrivacy } from '@/models/settings';
import { ICreateWish } from '@/stores/wishes/types';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import { encryptedData } from '@/helpers/utils/encryption-data';
import { removingWhiteSpaces } from '@/helpers/utils/formating-number';
import {
    COLLECTION_NAME_MAX_LENGTH,
    COLLECTION_NAME_MIN_LENGTH,
} from '@/helpers/utils/constants';
import FastWish from '@/app/[locale]/user/[userId]/wish/editor/FastWish';
import FormContent from '@/app/[locale]/user/[userId]/wish/editor/FormContent';
import QuoteMessage from '@/components/layouts/QuoteMessage';
import UiButton from '@/components/ui/UiButton';
import UiModal from '@/components/ui/modal/UiModal';
import UiLoading from '@/components/ui/UiLoading';

const CreateWish: FC = () => {
    const [isFastWish, setIsFastWish] = useState<boolean>(true);
    const [material, setMaterial] = useState<ICreateWish['material']>(true);
    const [images, setImages] = useState<TCurrentImage[]>([]);
    const [currency, setCurrency] = useState<IWish['currency']>(ECurrency.UAH);
    const [show, setShow] = useState<ICreateWish['show'] | null>(null);
    const [showError, setShowError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const route = useRouter();
    const { userId } = useParams<{ userId: string }>();

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
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = useForm<TWishFormInputs>();

    const myUser = useMyUserStore((state) => state.myUser);

    const wishCandidate = useWishesStore((state) => state.wishCandidate);
    const resetWishCandidate = useWishesStore(
        (state) => state.resetWishCandidate
    );
    const createWish = useWishesStore((state) => state.createWish);

    const collections = useCollectionsStore((state) => state.list);
    const showAddToCollection = useCollectionsStore(
        (state) => state.showAddToCollection
    );
    const setAddToCollectionError = useCollectionsStore(
        (state) => state.setAddToCollectionError
    );

    const isDirtyForm = useSettingsStore((state) => state.isDirtyForm);
    const setIsDirtyForm = useSettingsStore((state) => state.setIsDirtyForm);

    const onSubmit: SubmitHandler<TWishFormInputs> = async (data) => {
        if (myUser) {
            if (!show) {
                return setShowError(mainPageT('private-wish-error'));
            } else {
                setShowError('');
            }

            const hasSelectedCollection = collections.some(
                (collection) => collection.selected
            );
            // Collection Errors
            // create
            if (showAddToCollection === EAddToCollection.CREATE) {
                if (data.collectionName.length === 0) {
                    setError(
                        'collectionName',
                        {
                            type: 'required',
                            message: validationsT('collection-name.required'),
                        },
                        { shouldFocus: true }
                    );
                    return;
                }
                if (
                    data.collectionName.length > 0 &&
                    data.collectionName.length < COLLECTION_NAME_MIN_LENGTH
                ) {
                    setError(
                        'collectionName',
                        {
                            type: 'min',
                            message: validationsT('collection-name.min', {
                                min: COLLECTION_NAME_MIN_LENGTH,
                            }),
                        },
                        { shouldFocus: true }
                    );
                    return;
                }
                if (data.collectionName.length > COLLECTION_NAME_MAX_LENGTH) {
                    setError(
                        'collectionName',
                        {
                            type: 'max',
                            message: validationsT('collection-name.max', {
                                max: COLLECTION_NAME_MAX_LENGTH,
                            }),
                        },
                        { shouldFocus: true }
                    );
                    return;
                }
            }
            // add
            if (
                showAddToCollection === EAddToCollection.ADD &&
                !hasSelectedCollection
            ) {
                setAddToCollectionError(
                    validationsT('add-to-collection.required')
                );
                return;
            } else {
                setAddToCollectionError('');
            }

            if (!process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) return;

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
                show === EPrivacy.ALL
                    ? priceWithoutWhiteSpaces
                    : encryptedPrice;

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
            const dataDescription = data.description
                ? data.description.trim()
                : '';
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

            // Collections
            const isSendCollectionName =
                showAddToCollection === EAddToCollection.CREATE &&
                data.collectionName;
            const collectionName = isSendCollectionName
                ? data.collectionName.trim()
                : undefined;
            const isSendCollectionIdList =
                showAddToCollection === EAddToCollection.ADD &&
                hasSelectedCollection;
            const collectionIdList = isSendCollectionIdList
                ? collections
                      .filter((collection) => collection.selected)
                      .map((collection) => collection.id)
                : undefined;

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
                collectionName,
                collectionIdList,
                images: show === EPrivacy.ALL ? images : encryptedImages,
            };

            setIsLoading(true);
            const response = await createWish(
                wishData,
                allPagesT('wishes-api.create-wish.error')
            );
            if (response) {
                const quote = response.quote[activeLocale as ELang];
                toast(
                    <QuoteMessage
                        title={allPagesT('wishes-api.create-wish.success')}
                        text={quote?.text}
                        author={quote?.author}
                    />,
                    { type: 'success' }
                );

                route.push(
                    `/${activeLocale}/user/${myUser.id}/wish?wishId=${response?.wish.id}`
                );
            } else {
                setIsLoading(false);
            }
        } else {
            const guestWishes: string =
                localStorage.getItem('guestWishes') || '';

            const parsedGuestWishes: IGuestWish[] =
                guestWishes.length > 0
                    ? (JSON.parse(guestWishes) as IGuestWish[])
                    : [];

            const nonUniqueName = parsedGuestWishes.some((wish) => {
                return wish.name === data.name.trim();
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

            if (!show) {
                return setShowError(mainPageT('private-wish-error'));
            } else {
                setShowError('');
            }

            const guestWish: IGuestWish = {
                id: uuidv4(),
                userId,
                material,
                show,
                name: data.name.trim(),
                price: data.price?.trim(),
                currency,
                addresses: data.addresses,
                description: data.description.trim(),
            };

            if (!material) {
                delete guestWish.price;
            }

            setIsLoading(true);
            const updatedGuestWishes = [...parsedGuestWishes, guestWish];

            localStorage.setItem(
                'guestWishes',
                JSON.stringify(updatedGuestWishes)
            );

            route.push(
                `/${activeLocale}/user/${userId}/wish?wishId=${guestWish.id}`
            );
        }
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

    useLayoutEffect(() => {
        if (
            wishCandidate?.name ||
            (myUser && wishCandidate?.image) ||
            wishCandidate?.url ||
            wishCandidate?.description
        ) {
            wishCandidate?.name && setValue('name', wishCandidate.name);

            if (myUser && wishCandidate?.image) {
                setImages([
                    {
                        path: wishCandidate.image,
                        position: 0,
                    },
                ]);
            }

            wishCandidate?.url &&
                setValue('addresses', [
                    {
                        id: uuidv4(),
                        value: wishCandidate.url,
                    },
                ]);

            wishCandidate?.description &&
                setValue('description', wishCandidate.description);

            setIsDirtyForm(true);
        }
    }, [myUser, wishCandidate, setValue]);

    useEffect(() => {
        return () => {
            resetWishCandidate();
        };
    }, []);

    return (
        <>
            <form
                className="mt-4 flex max-h-full flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormContent
                    register={register}
                    control={control}
                    setValue={setValue}
                    watch={watch}
                    trigger={trigger}
                    errors={errors}
                    clearErrors={clearErrors}
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
                />

                {/* submit */}
                <div className="ml-auto">
                    <UiButton type="submit" disabled={!isDirtyForm}>
                        {mainPageT('create')}
                    </UiButton>
                </div>
            </form>

            {isFastWish && (
                <UiModal show={true} hide={() => setIsFastWish(false)}>
                    <FastWish hide={() => setIsFastWish(false)} />
                </UiModal>
            )}

            {isLoading && <UiLoading />}
        </>
    );
};

export default CreateWish;
