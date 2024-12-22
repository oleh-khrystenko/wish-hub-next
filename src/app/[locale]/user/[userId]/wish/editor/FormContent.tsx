'use client';

import { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
    Control,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    UseFormTrigger,
} from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';
import {
    ECurrency,
    IWish,
    TCurrentImage,
    TWishFormInputs,
} from '@/models/wish';
import { EPrivacy } from '@/models/settings';
import { ICreateWish } from '@/stores/wishes/types';
import { useSettingsStore } from '@/stores/settings';
import UseValidations from '@/helpers/hooks/UseValidations';
import DragNDrop from '@/app/[locale]/user/[userId]/wish/editor/drag-n-drop/DragNDrop';
import Addresses from '@/app/[locale]/user/[userId]/wish/editor/address/Addresses';
import AddToCollection from '@/app/[locale]/user/[userId]/wish/editor/AddToCollection';
import PrivacyChoices from '@/components/layouts/PrivacyChoices';
import UiInput from '@/components/ui/UiInput';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import UiSwitch from '@/components/ui/UiSwitch';

interface IProps {
    register: UseFormRegister<TWishFormInputs>;
    control: Control<TWishFormInputs>;
    setValue: UseFormSetValue<TWishFormInputs>;
    watch: UseFormWatch<TWishFormInputs>;
    trigger: UseFormTrigger<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    clearErrors: (
        name?: keyof TWishFormInputs | (keyof TWishFormInputs)[]
    ) => void;
    material: ICreateWish['material'];
    setMaterial: (value: ICreateWish['material']) => void;
    images: TCurrentImage[];
    setImages: (value: TCurrentImage[]) => void;
    removeAllImages: () => void;
    currency: IWish['currency'];
    setCurrency: (value: IWish['currency']) => void;
    show: ICreateWish['show'] | null;
    setShow: (value: ICreateWish['show']) => void;
    showError: string;
    setShowError: (value: string) => void;
}

interface IShouldTriggerValidation {
    type: keyof TWishFormInputs | null;
    value: boolean;
}

const FormContent: FC<IProps> = ({
    register,
    control,
    setValue,
    watch,
    trigger,
    errors,
    clearErrors,
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
}) => {
    const [isTouch, setIsTouch] = useState(false);
    const [isEmptyAddress, setIsEmptyAddress] = useState<boolean>(false);
    const [descriptionLength, setDescriptionLength] = useState<number>(0);
    const [shouldTriggerValidation, setShouldTriggerValidation] =
        useState<IShouldTriggerValidation>({
            type: null,
            value: false,
        });

    const formContentContainer = useRef<HTMLDivElement>(null);

    const watchingAddresses = watch('addresses');

    const mainPageT = useTranslations('main-page');

    const isDirtyForm = useSettingsStore((state) => state.isDirtyForm);
    const setIsDirtyForm = useSettingsStore((state) => state.setIsDirtyForm);

    const { wishNameValidation, wishPriceValidation, multilineTextValidation } =
        UseValidations();

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
        setIsDirtyForm(true);
    };

    const changeImages = (value: TCurrentImage[]) => {
        setImages(value);
        setIsDirtyForm(true);
    };

    const changeCurrency = (value: IWish['currency']) => {
        setCurrency(value);
        setIsDirtyForm(true);
    };

    const changePrivacy = (value: EPrivacy) => {
        setShow(value);
        setShowError('');
        setIsDirtyForm(true);
    };

    const handleReactHookFormInputChange = async (
        type: keyof TWishFormInputs,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;

        type === 'description' && setDescriptionLength(value.length);

        setValue(type, value);
        setIsDirtyForm(true);

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

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirtyForm) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        // Додаємо слухачі подій
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Очищаємо слухачі подій при демонтажі компонента
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirtyForm]);

    useEffect(() => {
        setIsTouch(isMobile);

        return () => {
            setIsDirtyForm(false);
        };
    }, []);

    return (
        <div
            className="-mr-3 flex h-auto flex-col pr-3"
            ref={formContentContainer}
        >
            {/* material */}
            <div className="flex items-center justify-center gap-4">
                <button
                    className={`${material ? 'text-cyan-500 dark:text-cyan-300' : 'text-zinc-700 dark:text-zinc-300'} text-sm font-bold tablet-md:text-base`}
                    type="button"
                    onClick={() => changeMaterial(true)}
                >
                    {mainPageT('material-wish')}
                </button>
                <UiSwitch
                    id="material"
                    name="material"
                    checked={material}
                    bg={
                        material
                            ? 'bg-cyan-500 dark:bg-cyan-300'
                            : 'bg-rose-500'
                    }
                    onChange={(e) => changeMaterial(e.target.checked)}
                />
                <button
                    className={`${material ? 'text-zinc-700 dark:text-zinc-300' : 'text-rose-500'} text-sm font-bold tablet-md:text-base`}
                    type="button"
                    onClick={() => changeMaterial(false)}
                >
                    {mainPageT('non-material-wish')}
                </button>
            </div>

            {/* name */}
            <div className="mt-7">
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
            <DndProvider
                backend={isTouch ? TouchBackend : HTML5Backend}
                options={{ enableMouseEvents: !isTouch }}
            >
                <DragNDrop
                    images={images}
                    setImages={changeImages}
                    removeAllImages={removeAllImages}
                />
            </DndProvider>

            <div
                className={`${material ? 'max-h-96 pt-5' : 'max-h-0 pt-0'} flex flex-col gap-8 overflow-y-auto transition-all duration-300 ease-in-out`}
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
                        onChange={async (value) =>
                            changeCurrency(value as IWish['currency'])
                        }
                    />
                </div>

                {/* addresses */}
                <div className="flex flex-col gap-7 pr-2">
                    <Addresses
                        register={register}
                        control={control}
                        errors={errors}
                        material={material}
                        setValue={setValue}
                        trigger={trigger}
                        watchingAddresses={watchingAddresses}
                        isEmptyAddress={isEmptyAddress}
                    />
                </div>
            </div>

            {/* description */}
            <div
                className={`${material ? 'mt-8' : 'mt-4'} transition-all duration-300 ease-in-out`}
            >
                <UiInput
                    {...register(
                        'description',
                        multilineTextValidation(descriptionLength)
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

            {/* Collections */}
            <AddToCollection
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                handleReactHookFormInputChange={handleReactHookFormInputChange}
            />
        </div>
    );
};

export default FormContent;
