import { FC, ChangeEvent, useRef, useLayoutEffect, useState } from 'react';
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
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiModal from '@/components/ui/modal/UiModal';
import UiButton from '@/components/ui/UiButton';
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

const MAX_ADDRESSES = 10;

const Addresses: FC<IProps> = ({
    register,
    control,
    errors,
    material,
    setValue,
    watchingAddresses,
    isEmptyAddress,
}) => {
    const [showAttention, setShowAttention] = useState<boolean>(false);

    const appended = useRef(false);

    const mainPageT = useTranslations('main-page');

    const { append, remove } = useFieldArray({
        control,
        name: 'addresses',
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const setIsDirtyForm = useSettingsStore((state) => state.setIsDirtyForm);

    const utmParams = UseUTMParams();
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
        if (myUser) {
            if (watchingAddresses && watchingAddresses.length < MAX_ADDRESSES) {
                append({ id: uuidv4(), value: '' });
                setIsDirtyForm(true);
            }
        } else {
            setShowAttention(true);
        }
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
                                !isEmptyAddress &&
                                watchingAddresses.length < MAX_ADDRESSES && (
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

            {watchingAddresses && watchingAddresses.length >= MAX_ADDRESSES && (
                <p className="-mt-6 text-sm text-red-500">
                    {mainPageT('max_address_limit', {
                        count: MAX_ADDRESSES,
                    })}
                </p>
            )}

            <UiModal show={showAttention} hide={() => setShowAttention(false)}>
                <p className="text-center text-2xl font-bold text-amber-400">
                    ⚠️ {mainPageT('only_registered_users')} ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('you_trying_address')}
                    <br />
                    <br />
                    {mainPageT('sign_up_address')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton
                        variant="outline"
                        onBtnClick={() => setShowAttention(false)}
                    >
                        {mainPageT('i_see')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>
        </>
    );
};

export default Addresses;
