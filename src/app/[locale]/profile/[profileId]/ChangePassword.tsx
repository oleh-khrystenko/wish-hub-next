import { ChangeEvent, FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '@/models/User';
import { useMyUserStore } from '@/stores/my-user';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    userId?: IUser['id'];
    cancel: () => void;
}

type Inputs = {
    oldPassword: string;
    newPassword: string;
};

const ChangePassword: FC<IProps> = ({ userId, cancel }) => {
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const myUser = useMyUserStore((state) => state.myUser);
    const changePassword = useMyUserStore((state) => state.changePassword);

    const { passwordValidation } = UseValidations();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        if (data.newPassword === repeatPassword) {
            setRepeatPasswordError('');
        } else {
            return setRepeatPasswordError(mainPageT('repeat-password-error'));
        }

        if (!userId || repeatPasswordError.length > 0) return;
        await changePassword(
            { userId, ...data },
            alertsT('my-user-api.change-password.success'),
            alertsT('my-user-api.change-password.error')
        );

        cancel();
    };

    const repeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('newPassword');
        password === value
            ? setRepeatPasswordError('')
            : setRepeatPasswordError(mainPageT('repeat-password-error'));
    };

    return (
        <form
            className="mt-6 flex flex-col gap-6 rounded-md border border-dashed border-zinc-500 px-5 pb-2 pt-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            {myUser?.hasPassword && (
                <UiInput
                    {...register('oldPassword', passwordValidation)}
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    label={mainPageT('old-password')}
                    error={errors?.oldPassword?.message}
                />
            )}
            <UiInput
                {...register('newPassword', passwordValidation)}
                id="newPassword"
                name="newPassword"
                type="password"
                label={mainPageT('new-password')}
                error={errors?.newPassword?.message}
            />
            <UiInput
                id="repeat-new-password"
                name="repeat-new-password"
                type="password"
                label={mainPageT('repeat-new-password')}
                value={repeatPassword}
                error={repeatPasswordError}
                onChange={(event) =>
                    repeatPasswordChange(event as ChangeEvent<HTMLInputElement>)
                }
            />

            <div className="-mt-2 ml-auto w-fit">
                <UiButton type="submit" variant="text-attention">
                    {mainPageT('change-password')}
                </UiButton>
            </div>
        </form>
    );
};

export default ChangePassword;
