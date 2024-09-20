import { ChangeEvent, FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IUser } from '@/models/User';
import { useMyUserStore } from '@/stores/my-user';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    userId?: IUser['id'];
}

type Inputs = {
    oldPassword: string;
    newPassword: string;
};

const ChangePassword: FC<IProps> = ({ userId }) => {
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [oldPasswordError, setOldPasswordError] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);

    const router = useRouter();

    const activeLocale = useLocale();

    const mainPageT = useTranslations('main-page');
    const profilePageT = useTranslations('profile-page');
    const allPagesT = useTranslations('all-pages');

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
        try {
            await changePassword({ userId, ...data });

            sessionStorage.setItem(
                'notification',
                allPagesT('my-user-api.change-password.success')
            );

            router.replace(`/${activeLocale}/auth`);
        } catch (error: any) {
            const separatedError = error.response?.data?.message.split('//');

            if (separatedError[0].split('.')[3] === 'isPassEquals') {
                setOldPasswordError(separatedError[1]);
            } else {
                setOldPasswordError('');
                toast(
                    error.response?.data?.message ||
                        allPagesT('my-user-api.change-password.error'),
                    { type: 'error' }
                );
            }
        }
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
            <p className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                {profilePageT(
                    myUser?.hasPassword
                        ? 'change-password-title'
                        : 'set_password_title'
                )}
            </p>

            {myUser?.hasPassword && (
                <UiInput
                    {...register('oldPassword', passwordValidation)}
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    label={mainPageT('old-password')}
                    error={oldPasswordError}
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
