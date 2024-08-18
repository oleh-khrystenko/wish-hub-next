import React, { FC, useLayoutEffect } from 'react';
import {
    useFieldArray,
    UseFormGetValues,
    Control,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import UiTooltip from '@/components/ui/UiTooltip';
import UiInput from '@/components/ui/UiInput';
import { ICreateWish } from '@/stores/wishes/types';
import { TWishFormInputs } from '@/models/Wish';
import CrossIcon from '@/components/icons/CrossIcon';
import { useTranslations } from 'next-intl';
import UseValidations from '@/helpers/hooks/UseValidations';

interface IProps {
    control: Control<TWishFormInputs>;
    getValues: UseFormGetValues<TWishFormInputs>;
    register: UseFormRegister<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    material: ICreateWish['material'];
}

const Addresses: FC<IProps> = ({
    control,
    getValues,
    errors,
    register,
    material,
}) => {
    const mainPageT = useTranslations('main-page');

    const { append, remove } = useFieldArray({
        control,
        name: 'addresses',
    });

    const addresses = getValues('addresses');

    const { onlyWhitespaceValidation } = UseValidations();

    useLayoutEffect(() => {
        append({ id: uuidv4(), value: '' });
    }, []);

    return (
        <div className="address">
            {addresses &&
                addresses.map((address, idx) => (
                    <div key={address.id}>
                        <div className="address-field">
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
                                    className="action-address"
                                    type="button"
                                    onClick={() => remove(idx)}
                                >
                                    <CrossIcon />
                                </button>
                            )}

                            {idx === addresses.length - 1 && (
                                <button
                                    className="action-address"
                                    type="button"
                                    onClick={() =>
                                        append({ id: uuidv4(), value: '' })
                                    }
                                >
                                    <CrossIcon />
                                </button>
                            )}
                        </div>

                        {errors?.addresses?.[idx]?.value && (
                            <span className="error">
                                {errors?.addresses?.[idx]?.value?.message}
                            </span>
                        )}

                        <UiTooltip id={`address-${idx}`} />
                    </div>
                ))}
        </div>
    );
};

export default Addresses;
