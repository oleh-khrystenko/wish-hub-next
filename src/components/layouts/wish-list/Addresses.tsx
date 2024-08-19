import React, { FC, useRef, useState, useLayoutEffect, useEffect } from 'react';
import {
    useFieldArray,
    Control,
    UseFormRegister,
    FieldErrors,
    UseFormWatch,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import UiInput from '@/components/ui/UiInput';
import { ICreateWish } from '@/stores/wishes/types';
import { TWishFormInputs } from '@/models/Wish';
import CrossIcon from '@/components/icons/CrossIcon';
import { useTranslations } from 'next-intl';
import UseValidations from '@/helpers/hooks/UseValidations';

interface IProps {
    control: Control<TWishFormInputs>;
    watch: UseFormWatch<TWishFormInputs>;
    register: UseFormRegister<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    material: ICreateWish['material'];
}

const Addresses: FC<IProps> = ({
    control,
    watch,
    errors,
    register,
    material,
}) => {
    const [isEmptyAddress, setIsEmptyAddress] = useState<boolean>(false);

    const appended = useRef(false);

    const mainPageT = useTranslations('main-page');

    const { append, remove } = useFieldArray({
        control,
        name: 'addresses',
    });

    const addresses = watch('addresses');

    const { onlyWhitespaceValidation } = UseValidations();

    useLayoutEffect(() => {
        if (appended.current || isEmptyAddress) return;
        appended.current = true;

        append({ id: uuidv4(), value: '' });
    }, []);

    useEffect(() => {
        setIsEmptyAddress(
            addresses?.some((address) => address.value.length === 0) || false
        );

        const subscription = watch((value, { name }) => {
            if (name?.startsWith('addresses')) {
                setIsEmptyAddress(
                    addresses?.some((address) => address.value.length === 0) ||
                        false
                );
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, addresses]);

    return (
        <div className="mt-4 flex flex-col gap-7">
            {addresses &&
                addresses.map((address, idx) => (
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
                            />

                            {addresses.length > 1 && (
                                <button
                                    className="rounded-md bg-rose-500 p-2"
                                    type="button"
                                    onClick={() => remove(idx)}
                                >
                                    <CrossIcon />
                                </button>
                            )}

                            {idx === addresses.length - 1 &&
                                !isEmptyAddress && (
                                    <button
                                        className="rounded-md bg-[#90ff27] p-2"
                                        type="button"
                                        onClick={() =>
                                            append({ id: uuidv4(), value: '' })
                                        }
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
        </div>
    );
};

export default Addresses;
