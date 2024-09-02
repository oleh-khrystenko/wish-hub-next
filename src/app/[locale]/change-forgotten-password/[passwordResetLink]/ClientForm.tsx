'use client';

import { FC, ChangeEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import myUserApi from '@/stores/my-user/api';
import useValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';

type Inputs = {
    newPassword: string;
};

const ClientForm: FC = () => {
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');

    const { passwordResetLink } = useParams<{ passwordResetLink: string }>();
    const router = useRouter();

    const activeLocale = useLocale();
    const authPageT = useTranslations('auth-page');
    const alertsT = useTranslations('alerts');

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const { passwordValidation } = useValidations();

    const repeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('newPassword');
        password === value
            ? setRepeatPasswordError('')
            : setRepeatPasswordError(authPageT('passwords_error'));
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setClickedOnSubmit(true);

        if (!passwordResetLink) return;

        if (data.newPassword === repeatPassword) {
            setRepeatPasswordError('');
        } else {
            return setRepeatPasswordError(authPageT('passwords_error'));
        }

        myUserApi
            .changeForgottenPassword({ passwordResetLink, ...data })
            .then(() => {
                sessionStorage.setItem(
                    'notification',
                    alertsT('my-user-api.change-forgotten-password.success')
                );

                router.replace(`/${activeLocale}/auth`);
            })
            .catch((error: any) => {
                toast(
                    error.response?.data?.message ||
                        alertsT('my-user-api.change-forgotten-password.error'),
                    { type: 'error' }
                );
            });
    };

    return (
        <form
            className="my-auto flex w-full max-w-lg flex-col gap-5 rounded-2xl px-0.5 tablet-md:bg-zinc-300 tablet-md:px-5 tablet-md:pb-5 tablet-md:pt-3 tablet-md:shadow-md tablet-md:dark:bg-zinc-800"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p className="flex w-full items-center justify-evenly gap-2.5 text-center text-xl font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-2xl">
                {authPageT('password_recovery')}
            </p>

            <UiInput
                {...register('newPassword', passwordValidation)}
                id="newPassword"
                name="newPassword"
                type="password"
                label={authPageT('new_password')}
                error={errors?.newPassword?.message}
            />
            <UiInput
                id="repeat-password"
                name="repeat-password"
                type="password"
                label={authPageT('repeat_new_password')}
                value={repeatPassword}
                error={repeatPasswordError}
                onChange={(event) =>
                    repeatPasswordChange(event as ChangeEvent<HTMLInputElement>)
                }
            />

            <div className="mx-auto">
                <UiButton type="submit">{authPageT('recovery')}</UiButton>
            </div>
        </form>
    );
};

export default ClientForm;
