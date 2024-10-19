import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form';
import { TWishFormInputs } from '@/models/Wish';
import { ICreateWish } from '@/stores/wishes/types';
import { useSettingsStore } from '@/stores/settings';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';

type AddressFieldKey = `addresses.${number}.value`;

interface IShouldTriggerValidation {
    type: AddressFieldKey | keyof TWishFormInputs | null;
    value: boolean;
}

interface IProps {
    register: UseFormRegister<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    setValue: UseFormSetValue<TWishFormInputs>;
    trigger: UseFormTrigger<TWishFormInputs>;
    material: ICreateWish['material'];
    idx: number;
}

const AddressInput: FC<IProps> = ({
    material,
    register,
    idx,
    errors,
    setValue,
    trigger,
}) => {
    const [addressLength, setAddressLength] = useState<number>(0);
    const [shouldTriggerValidation, setShouldTriggerValidation] =
        useState<IShouldTriggerValidation>({
            type: null,
            value: false,
        });

    const mainPageT = useTranslations('main-page');

    const setIsDirtyForm = useSettingsStore((state) => state.setIsDirtyForm);

    const { wishAddressValidation } = UseValidations();

    const handleChange = (
        idx: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        setValue(`addresses.${idx}.value`, value);
        setAddressLength(value.length);
        setIsDirtyForm(true);

        setShouldTriggerValidation({
            type: `addresses.${idx}.value`,
            value: true,
        });
    };

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

    return (
        <UiInput
            {...(material &&
                register(
                    `addresses.${idx}.value`,
                    wishAddressValidation(addressLength)
                ))}
            id={`address-${idx}`}
            name={`addresses[${idx}].value`}
            type="text"
            label={mainPageT('where-to-buy')}
            tooltip={mainPageT('where-to-buy-tooltip')}
            error={errors?.addresses?.[idx]?.value?.message}
            onChange={(event) => handleChange(idx, event)}
        />
    );
};

export default AddressInput;
