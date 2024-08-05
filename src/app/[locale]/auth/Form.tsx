'use client';

import { ChangeEvent, FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocale } from 'next-intl';
import {
    CredentialResponse,
    GoogleLogin,
    GoogleOAuthProvider,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ELang } from '@/models/Settings';
import { IUser } from '@/models/User';
import { useUsersStore } from '@/stores/users';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import UiCheckbox from '@/components/ui/UiCheckbox';
import {
    accountFirstNameValidation,
    emailValidation,
    passwordValidation,
} from '@/helpers/utils/validations';

interface IProps {
    titleT: string;
    singUpTitleT: string;
    forgotPasswordTitleT: string;
    singInT: string;
    singUpT: string;
    forgotPasswordSubmitT: string;
    privacyPolicyErrorT: string;
    passwordsErrorT: string;
    orT: string;
    validationFirstNameRequiredT: string;
    validationFirstNameMinT: string;
    validationFirstNameMaxT: string;
    firstNameT: string;
    validationEmailRequiredT: string;
    validationOnlyWhitespacesT: string;
    validationEmailPatternT: string;
    validationPasswordRequiredT: string;
    validationPasswordWhitespacesT: string;
    validationPasswordMinT: string;
    validationPasswordMaxT: string;
    passwordT: string;
    repeatPasswordT: string;
    passwordRememberedT: string;
    forgotPasswordT: string;
    agreeT: string;
    privacyPolicyT: string;
    wishHubT: string;
}

interface IGoogleAuthCredentialResponse {
    email: IUser['email'];
    email_verified: IUser['isActivated'];
    given_name: IUser['firstName'];
    family_name: IUser['lastName'];
    picture: IUser['avatar'];
}

type TInputs = {
    firstName: IUser['firstName'];
    email: IUser['email'];
    password: string;
};

const Form: FC<IProps> = ({
    titleT,
    singUpTitleT,
    forgotPasswordTitleT,
    singInT,
    singUpT,
    forgotPasswordSubmitT,
    privacyPolicyErrorT,
    passwordsErrorT,
    orT,
    validationFirstNameRequiredT,
    validationFirstNameMinT,
    validationFirstNameMaxT,
    firstNameT,
    validationEmailRequiredT,
    validationOnlyWhitespacesT,
    validationEmailPatternT,
    validationPasswordRequiredT,
    validationPasswordWhitespacesT,
    validationPasswordMinT,
    validationPasswordMaxT,
    passwordT,
    repeatPasswordT,
    passwordRememberedT,
    forgotPasswordT,
    agreeT,
    privacyPolicyT,
    wishHubT,
}) => {
    const candidate = useUsersStore((state) => state.candidate);
    const login = useUsersStore((state) => state.login);

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>({
        defaultValues: {
            firstName: candidate?.firstName || '',
            email: candidate?.email || '',
            password: '',
        },
    });

    const searchParams = useSearchParams();

    const activeLocale = useLocale();

    const [isRegistration, setIsRegistration] = useState<boolean>(false);
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');
    const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] =
        useState<boolean>(false);
    const [checkedPrivacyPolicyError, setCheckedPrivacyPolicyError] =
        useState<string>('');

    let title = titleT;
    isRegistration && (title = singUpTitleT);
    isForgotPassword && (title = forgotPasswordTitleT);

    let submit = singInT;
    isRegistration && (submit = singUpT);
    isForgotPassword && (submit = forgotPasswordSubmitT);

    const handleGoogleLogin = async (response: CredentialResponse) => {
        setClickedOnSubmit(true);

        if (checkedPrivacyPolicy) {
            setCheckedPrivacyPolicyError('');
        } else {
            return setCheckedPrivacyPolicyError(privacyPolicyErrorT);
        }

        if (!response.credential || checkedPrivacyPolicyError.length > 0)
            return;

        const decodedUserData: IGoogleAuthCredentialResponse = jwtDecode(
            response.credential
        );

        // await dispatch(googleAuthorization({
        //     email: decodedUserData.email,
        //     lang: getLang(),
        //     isActivated: decodedUserData.email_verified,
        //     firstName: decodedUserData.given_name,
        //     lastName: decodedUserData.family_name,
        //     avatar: decodedUserData.picture,
        // }));
    };

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        // TODO: якщо часто натискати на відправку вилазе помилка Next.js
        console.log('onSubmit: ', data);
        setClickedOnSubmit(true);

        if (isForgotPassword) {
            // return dispatch(forgotPassword({ email: data.email.trim(), lang: getLang() }));
        }

        if (isRegistration) {
            if (data.password === repeatPassword) {
                setRepeatPasswordError('');
            } else {
                return setRepeatPasswordError(passwordsErrorT);
            }
        }

        if (checkedPrivacyPolicy) {
            setCheckedPrivacyPolicyError('');
        } else {
            return setCheckedPrivacyPolicyError(privacyPolicyErrorT);
        }

        if (
            repeatPasswordError.length > 0 ||
            checkedPrivacyPolicyError.length > 0
        )
            return;

        if (isRegistration && checkedPrivacyPolicy) {
            // return dispatch(registration({ ...data, email: data.email.trim(), lang: getLang() }));
        }

        if (checkedPrivacyPolicy) {
            return login({
                ...data,
                email: data.email.trim(),
                lang: activeLocale as ELang,
            });
        }
    };

    const repeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('password');
        password === value
            ? setRepeatPasswordError('')
            : setRepeatPasswordError(passwordsErrorT);
    };

    const handleTogglePrivacyPolicy = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setCheckedPrivacyPolicy(value);

        if (!clickedOnSubmit) return;

        value
            ? setCheckedPrivacyPolicyError('')
            : setCheckedPrivacyPolicyError(privacyPolicyErrorT);
    };

    useEffect(() => {
        const register = searchParams.get('register');
        const agree = searchParams.get('agree');
        setIsRegistration(register !== null || agree !== null);
        setCheckedPrivacyPolicy(agree !== null);
    }, [searchParams]);

    return (
        <form
            className="flex w-full flex-col gap-5 tablet-md:w-96"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="flex w-full items-center justify-evenly gap-2.5 text-center text-xl font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-2xl">
                {title}
            </h1>

            {!isForgotPassword && (
                <GoogleOAuthProvider
                    clientId={
                        process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
                            ? process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
                            : ''
                    }
                >
                    <GoogleLogin
                        text={isRegistration ? 'signup_with' : 'signin_with'}
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Google OAuth Login Failed');
                            // toast(t('alerts.auth-page.google-login.error'), { type: 'error' });
                        }}
                    />
                </GoogleOAuthProvider>
            )}

            <span className="flex w-full items-center justify-center gap-2.5 text-sm text-zinc-500 before:flex-1 before:border-b before:border-solid before:border-zinc-500 after:flex-1 after:border-t after:border-solid after:border-zinc-500">
                {orT}
            </span>

            {isRegistration && (
                <UiInput
                    {...register(
                        'firstName',
                        accountFirstNameValidation(
                            validationFirstNameRequiredT,
                            validationFirstNameMinT,
                            validationFirstNameMaxT
                        )
                    )}
                    id="firstName"
                    name="firstName"
                    type="text"
                    label={firstNameT}
                    error={errors?.firstName?.message}
                />
            )}

            <UiInput
                {...register(
                    'email',
                    emailValidation(
                        validationEmailRequiredT,
                        validationOnlyWhitespacesT,
                        validationEmailPatternT
                    )
                )}
                id="email"
                name="email"
                type="text"
                label="Email*"
                error={errors?.email?.message}
            />

            {!isForgotPassword && (
                <UiInput
                    {...register(
                        'password',
                        passwordValidation(
                            validationPasswordRequiredT,
                            validationPasswordWhitespacesT,
                            validationPasswordMinT,
                            validationPasswordMaxT
                        )
                    )}
                    id="password"
                    name="password"
                    type="password"
                    label={passwordT}
                    error={errors?.password?.message}
                />
            )}

            {isRegistration && (
                <UiInput
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    label={repeatPasswordT}
                    value={repeatPassword}
                    error={repeatPasswordError}
                    onChange={(event) =>
                        repeatPasswordChange(
                            event as ChangeEvent<HTMLInputElement>
                        )
                    }
                />
            )}

            <div className="-mt-2.5 flex w-full flex-col items-center justify-center gap-2.5 mobile-sm:flex-row mobile-sm:justify-between mobile-sm:gap-5">
                {!isForgotPassword && (
                    <div className="mobile-sm:-ml-4">
                        <UiButton
                            variant="text-btn"
                            onClick={() => setIsRegistration((state) => !state)}
                        >
                            {isRegistration ? singInT : singUpT}
                        </UiButton>
                    </div>
                )}

                {!isRegistration && (
                    <div className="mobile-sm:-mr-4 mobile-sm:ml-auto">
                        <UiButton
                            variant="text-attention"
                            onClick={() =>
                                setIsForgotPassword((state) => !state)
                            }
                        >
                            {isForgotPassword
                                ? passwordRememberedT
                                : forgotPasswordT}
                        </UiButton>
                    </div>
                )}
            </div>

            {!isForgotPassword && (
                <div className="auth-privacy-policy">
                    <UiCheckbox
                        id="privacy-policy"
                        name="privacy-policy"
                        value="privacy-policy"
                        checked={checkedPrivacyPolicy}
                        onChange={handleTogglePrivacyPolicy}
                    >
                        {agreeT}
                        <UiButton href="privacy-policy" variant="text">
                            {privacyPolicyT}
                        </UiButton>
                        {wishHubT}
                    </UiCheckbox>

                    {checkedPrivacyPolicyError.length > 0 && (
                        <p className="mt-1 text-xs text-red-500">
                            {checkedPrivacyPolicyError}
                        </p>
                    )}
                </div>
            )}

            <UiButton type="submit">{submit}</UiButton>
        </form>
    );
};

export default Form;
