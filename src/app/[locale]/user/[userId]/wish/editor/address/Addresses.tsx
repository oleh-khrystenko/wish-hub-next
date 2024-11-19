import { FC, useRef, useLayoutEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    useFieldArray,
    Control,
    UseFormRegister,
    FieldErrors,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { TWishFormInputs } from '@/models/Wish';
import { ICreateWish } from '@/stores/wishes/types';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import AddressInput from '@/app/[locale]/user/[userId]/wish/editor/address/AddressInput';
import UiModal from '@/components/ui/modal/UiModal';
import UiButton from '@/components/ui/UiButton';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    register: UseFormRegister<TWishFormInputs>;
    control: Control<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    material: ICreateWish['material'];
    setValue: UseFormSetValue<TWishFormInputs>;
    trigger: UseFormTrigger<TWishFormInputs>;
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
    trigger,
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
                            <AddressInput
                                material={material}
                                register={register}
                                idx={idx}
                                errors={errors}
                                setValue={setValue}
                                trigger={trigger}
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
                    </div>
                ))}

            {watchingAddresses && watchingAddresses.length >= MAX_ADDRESSES && (
                <p className="-mt-6 text-sm text-red-500">
                    {mainPageT('max_address_limit', {
                        count: MAX_ADDRESSES,
                    })}
                </p>
            )}

            <UiModal
                rounded="rounded-2xl"
                show={showAttention}
                hide={() => setShowAttention(false)}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-amber-400">
                    ⚠️{' '}
                    <span className="text-center">
                        {mainPageT('only_registered_users')}
                    </span>{' '}
                    ⚠️
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
