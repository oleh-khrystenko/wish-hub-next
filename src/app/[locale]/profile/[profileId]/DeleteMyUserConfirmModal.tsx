import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import { IUser } from '@/models/User';
import { useMyUserStore } from '@/stores/my-user';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiModal from '@/components/ui/UiModal';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    show: boolean;
    hid: () => void;
}

type Inputs = {
    email: IUser['email'];
    password: string;
};

const DeleteMyUserConfirmModal: FC<IProps> = ({ show, hid }) => {
    const [confirmDeleteMyUserError, setConfirmDeleteMyUserError] =
        useState<string>('');

    const router = useRouter();

    const activeLocale = useLocale();

    const mainPageT = useTranslations('main-page');
    const profilePageT = useTranslations('profile-page');
    const alertsT = useTranslations('alerts');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const myUser = useMyUserStore((state) => state.myUser);
    const deleteMyUser = useMyUserStore((state) => state.deleteMyUser);

    const { emailValidation, passwordValidation } = UseValidations();

    const getDataFromGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            if (!myUser) return;

            const token = tokenResponse.access_token;

            const response = await fetch(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            if (myUser.email !== data.email) {
                setConfirmDeleteMyUserError(mainPageT('email-not-match'));
                return;
            }

            try {
                await deleteMyUser({
                    email: data.email,
                    password: '',
                    userId: myUser.id,
                });

                sessionStorage.setItem(
                    'notification',
                    alertsT('my-user-api.delete-my-user.success')
                );

                router.replace(`/${activeLocale}/auth`);
            } catch (error: any) {
                toast(
                    error.response?.data?.message ||
                        alertsT('my-user-api.delete-my-user.error'),
                    { type: 'error' }
                );
            }
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!myUser) return;

        if (myUser.hasPassword) {
            if (myUser.email !== data.email) {
                setConfirmDeleteMyUserError(mainPageT('email-not-match'));
                return;
            } else {
                setConfirmDeleteMyUserError('');
            }

            try {
                await deleteMyUser({ ...data, userId: myUser.id });

                sessionStorage.setItem(
                    'notification',
                    alertsT('my-user-api.delete-my-user.success')
                );

                router.replace(`/${activeLocale}/auth`);
            } catch (error: any) {
                toast(
                    error.response?.data?.message ||
                        alertsT('my-user-api.delete-my-user.error'),
                    { type: 'error' }
                );
            }
        } else {
            getDataFromGoogle();
        }
    };

    return (
        <UiModal show={show}>
            <form className="modal confirm" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="title attention">
                    {mainPageT('confirm-modal.title')}
                </h3>

                <p className="text">{mainPageT('sadness')}</p>

                {!myUser?.hasPassword &&
                    confirmDeleteMyUserError.length > 0 && (
                        <p className="error">{confirmDeleteMyUserError}</p>
                    )}

                {myUser?.hasPassword && (
                    <>
                        <div className="email-box">
                            <UiInput
                                {...register('email', emailValidation)}
                                id="email"
                                name="email"
                                type="text"
                                label="Email*"
                                error={errors?.email?.message}
                            />
                            {confirmDeleteMyUserError.length > 0 && (
                                <p className="error">
                                    {confirmDeleteMyUserError}
                                </p>
                            )}
                        </div>

                        <UiInput
                            {...register('password', passwordValidation)}
                            id="password"
                            name="password"
                            type="password"
                            label={profilePageT('password')}
                            error={errors?.password?.message}
                        />
                    </>
                )}

                <div className="modal-actions">
                    <UiButton variant="text-attention" type="submit">
                        {mainPageT('delete-my-account')}
                    </UiButton>

                    <UiButton onBtnClick={hid}>{mainPageT('stay')}</UiButton>
                </div>
            </form>
        </UiModal>
    );
};

export default DeleteMyUserConfirmModal;
