'use client';

import { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import UiSwitch from '@/components/ui/UiSwitch';
import UiInput from '@/components/ui/UiInput';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragNDrop from '@/components/layouts/drag-n-drop/DragNDrop';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import {
    ECurrency,
    IWish,
    TCurrentImage,
    TWishFormInputs,
} from '@/models/Wish';
import Addresses from '@/components/layouts/wish-editor/Addresses';
import PrivacyChoices from '@/components/layouts/wish-editor/PrivacyChoices';
import { useTranslations } from 'next-intl';
import {
    Control,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    UseFormTrigger,
} from 'react-hook-form';
import UseValidations from '@/helpers/hooks/UseValidations';
import { EPrivacy } from '@/models/Settings';
import { ICreateWish } from '@/stores/wishes/types';

interface IProps {
    title: string;
    register: UseFormRegister<TWishFormInputs>;
    control: Control<TWishFormInputs>;
    setValue: UseFormSetValue<TWishFormInputs>;
    watch: UseFormWatch<TWishFormInputs>;
    trigger: UseFormTrigger<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    material: ICreateWish['material'];
    setMaterial: (value: ICreateWish['material']) => void;
    images: TCurrentImage[];
    setImages: (value: TCurrentImage[]) => void;
    removeAllImages: () => void;
    currency: IWish['currency'];
    setCurrency: (value: IWish['currency']) => void;
    watchingAddresses?: TWishFormInputs['addresses'];
    show: ICreateWish['show'] | null;
    setShow: (value: ICreateWish['show']) => void;
    showError: string;
    setShowError: (value: string) => void;
    changed: boolean;
    setChanged: (value: boolean) => void;
}

const FormContent: FC<IProps> = ({
    title,
    register,
    control,
    setValue,
    watch,
    trigger,
    errors,
    material,
    setMaterial,
    images,
    setImages,
    removeAllImages,
    currency,
    setCurrency,
    show,
    setShow,
    showError,
    setShowError,
    changed,
    setChanged,
}) => {
    const [descriptionLength, setDescriptionLength] = useState<number>(0);
    const [shouldTriggerValidation, setShouldTriggerValidation] = useState<{
        type: keyof TWishFormInputs | null;
        value: boolean;
    }>({
        type: null,
        value: false,
    });
    const [isEmptyAddress, setIsEmptyAddress] = useState<boolean>(false);

    const formContentContainer = useRef<HTMLDivElement>(null);

    const watchingAddresses = watch('addresses');

    const mainPageT = useTranslations('main-page');

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

    const changeMaterial = (value: boolean) => {
        setMaterial(value);
        setChanged(true);
    };

    const changeImages = (value: TCurrentImage[]) => {
        setImages(value);
        setChanged(true);
    };

    const changeCurrency = (value: IWish['currency']) => {
        setCurrency(value);
        setChanged(true);
    };

    const changePrivacy = (value: EPrivacy) => {
        setShow(value);
        setShowError('');
        setChanged(true);
    };

    const handleReactHookFormInputChange = async (
        type: keyof TWishFormInputs,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        !changed && setChanged(true);

        const { value } = event.target;

        type === 'description' && setDescriptionLength(value.length);

        setValue(type, value);

        setShouldTriggerValidation({
            type,
            value: true,
        });
    };

    useEffect(() => {
        setIsEmptyAddress(
            watchingAddresses?.some((address) => address.value.length === 0) ||
                false
        );

        const subscription = watch((_, { name }) => {
            if (name?.startsWith('addresses')) {
                setIsEmptyAddress(
                    watchingAddresses?.some(
                        (address) => address.value.length === 0
                    ) || false
                );
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, watchingAddresses]);

    useEffect(() => {
        if (shouldTriggerValidation.value) {
            const triggerValidation = async () => {
                shouldTriggerValidation.type !== null &&
                    (await trigger(shouldTriggerValidation.type));
                setShouldTriggerValidation({
                    type: shouldTriggerValidation.type,
                    value: false,
                });
            };

            triggerValidation().finally();
        }
    }, [shouldTriggerValidation.value, trigger]);

    useEffect(() => {
        if (showError.length > 0 && formContentContainer.current) {
            formContentContainer.current.scrollTo({
                behavior: 'smooth',
                top: formContentContainer.current.scrollHeight,
            });
        }
    }, [showError]);

    return (
        <>
            <span className="whitespace-nowrap text-center text-lg font-bold text-zinc-700 dark:text-zinc-300">
                {mainPageT(title)}
            </span>

            <div
                className="-mr-3 flex h-auto max-h-[70svh] flex-col overflow-y-auto overflow-x-hidden pr-3"
                ref={formContentContainer}
            >
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
                        onChange={(e) => changeMaterial(e.target.checked)}
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
                        onChange={(event) =>
                            handleReactHookFormInputChange('name', event)
                        }
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
                            onChange={(event) =>
                                handleReactHookFormInputChange('price', event)
                            }
                        />

                        <UiSelect
                            options={selectOptions}
                            value={currency}
                            onChange={(value) =>
                                changeCurrency(value as IWish['currency'])
                            }
                        />
                    </div>

                    {/* addresses */}
                    <Addresses
                        control={control}
                        register={register}
                        errors={errors}
                        material={material}
                        isEmptyAddress={isEmptyAddress}
                        watchingAddresses={watchingAddresses}
                    />
                </div>

                {/* description */}
                <div className="mt-7">
                    <UiInput
                        {...register(
                            'description',
                            wishDescriptionValidation(descriptionLength)
                        )}
                        id="description"
                        name="description"
                        type="multiline"
                        label={mainPageT('wish-description')}
                        error={errors?.description?.message}
                        onChange={(event) =>
                            handleReactHookFormInputChange('description', event)
                        }
                    />
                </div>

                {/* PrivacyChoices */}
                <div className="pb-px pl-px">
                    <PrivacyChoices
                        id="wish"
                        tooltipContent={{
                            all: mainPageT('can-see.wish-all-tooltip'),
                            friends: mainPageT('can-see.wish-friends-tooltip'),
                            nobody: mainPageT('can-see.wish-nobody-tooltip'),
                        }}
                        show={show}
                        showError={showError}
                        onChange={changePrivacy}
                    />
                </div>
            </div>
        </>
    );
};

export default FormContent;
