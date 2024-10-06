import { FC, ChangeEvent, useRef, useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
    useFieldArray,
    Control,
    UseFormRegister,
    FieldErrors,
    UseFormSetValue,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { TWishFormInputs } from '@/models/Wish';
import { ICreateWish } from '@/stores/wishes/types';
import { useSettingsStore } from '@/stores/settings';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    register: UseFormRegister<TWishFormInputs>;
    control: Control<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    material: ICreateWish['material'];
    setValue: UseFormSetValue<TWishFormInputs>;
    watchingAddresses?: TWishFormInputs['addresses'];
    isEmptyAddress: boolean;
}

const Addresses: FC<IProps> = ({
    register,
    control,
    errors,
    material,
    setValue,
    watchingAddresses,
    isEmptyAddress,
}) => {
    const appended = useRef(false);

    const mainPageT = useTranslations('main-page');

    const { append, remove } = useFieldArray({
        control,
        name: 'addresses',
    });

    const setIsDirtyForm = useSettingsStore((state) => state.setIsDirtyForm);

    const { onlyWhitespaceValidation } = UseValidations();

    const handleChange = (
        idx: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(`addresses.${idx}.value`, event.target.value);
        setIsDirtyForm(true);
    };

    const handleRemove = (idx: number) => {
        remove(idx);
        setIsDirtyForm(true);
    };

    const handleAppend = () => {
        append({ id: uuidv4(), value: '' });
        setIsDirtyForm(true);
    };

    useLayoutEffect(() => {
        if (appended.current || isEmptyAddress) return;
        appended.current = true;

        append({ id: uuidv4(), value: '' });
    }, []);

    return (
        <>
            {watchingAddresses &&
                watchingAddresses.map((address, idx) => (
                    <div key={address.id}>
                        <div className="flex items-center gap-4">
                            <UiInput
                                {...(material &&
                                    register(
                                        `addresses.${idx}.value`,
                                        onlyWhitespaceValidation
                                    ))}
                                id={`address-${idx}`}
                                name={`addresses[${idx}].value`}
                                type="text"
                                label={mainPageT('where-to-buy')}
                                tooltip={mainPageT('where-to-buy-tooltip')}
                                onChange={(event) => handleChange(idx, event)}
                            />

                            {watchingAddresses.length > 1 && (
                                <button
                                    className="rounded-md bg-rose-500 p-2"
                                    type="button"
                                    onClick={() => handleRemove(idx)}
                                >
                                    <CrossIcon />
                                </button>
                            )}

                            {idx === watchingAddresses.length - 1 &&
                                !isEmptyAddress && (
                                    <button
                                        className="rounded-md bg-[#90ff27] p-2"
                                        type="button"
                                        onClick={handleAppend}
                                    >
                                        <CrossIcon classes="w-6 h-6 -rotate-45 stroke-zinc-700 dark:stroke-zinc-800" />
                                    </button>
                                )}
                        </div>

                        {errors?.addresses?.[idx]?.value && (
                            <span className="mt-1 text-xs text-red-500">
                                {errors?.addresses?.[idx]?.value?.message}
                            </span>
                        )}
                    </div>
                ))}
        </>
    );
};

export default Addresses;
