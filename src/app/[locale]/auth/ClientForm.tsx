'use client';

import { FC, ChangeEvent, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    CredentialResponse,
    GoogleLogin,
    GoogleOAuthProvider,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { ELang } from '@/models/Settings';
import { IUser } from '@/models/User';
import { useMyUserStore } from '@/stores/my-user';
import myUserApi from '@/stores/my-user/api';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import UiCheckbox from '@/components/ui/UiCheckbox';

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
    signInPassword: string;
};

const ClientForm: FC = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');
    const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] =
        useState<boolean>(false);
    const [checkedPrivacyPolicyError, setCheckedPrivacyPolicyError] =
        useState<string>('');

    const isTimerExecuted = useRef(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const searchParams = useSearchParams();

    const activeLocale = useLocale();
    const authPageT = useTranslations('auth-page');
    const allPagesT = useTranslations('all-pages');

    const registration = useMyUserStore((state) => state.registration);
    const googleAuthorization = useMyUserStore(
        (state) => state.googleAuthorization
    );
    const login = useMyUserStore((state) => state.login);
    const candidate = useMyUserStore((state) => state.candidate);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<TInputs>({
        defaultValues: {
            firstName: candidate?.firstName || '',
            email: candidate?.email || '',
            password: '',
            signInPassword: '',
        },
    });

    const {
        accountFirstNameValidation,
        emailValidation,
        passwordValidation,
        signInPasswordValidation,
    } = UseValidations();

    let title = authPageT('title.sing_in');
    isSignUp && (title = authPageT('title.sing_up'));
    isForgotPassword && (title = authPageT('title.forgot_password'));

    let submit = authPageT('sign-in');
    isSignUp && (submit = authPageT('sign-up'));
    isForgotPassword && (submit = authPageT('recovery'));

    const utm_source = searchParams.get('utm_source') || undefined;
    const utm_medium = searchParams.get('utm_medium') || undefined;
    const utm_campaign = searchParams.get('utm_campaign') || undefined;
    const utm_content = searchParams.get('utm_content') || undefined;
    const utm_term = searchParams.get('utm_term') || undefined;

    const repeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('password');
        password === value
            ? setRepeatPasswordError('')
            : setRepeatPasswordError(authPageT('passwords_error'));
    };

    const handleTogglePrivacyPolicy = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setCheckedPrivacyPolicy(value);

        if (!clickedOnSubmit) return;

        value
            ? setCheckedPrivacyPolicyError('')
            : setCheckedPrivacyPolicyError(authPageT('privacy_policy_error'));
    };

    const handleGoogleCheckingPrivacyPolicy = () => {
        setClickedOnSubmit(true);

        if (!checkedPrivacyPolicy) {
            setCheckedPrivacyPolicyError(authPageT('privacy_policy_error'));
            return;
        }

        setCheckedPrivacyPolicyError('');
    };

    const handleToggleIsSignUp = () => {
        setIsSignUp((prevState) => !prevState);
        clearErrors('password');
        clearErrors('signInPassword');
        setValue('password', '');
        setValue('signInPassword', '');
    };

    const handleGoogleAuth = async (response: CredentialResponse) => {
        setClickedOnSubmit(true);

        if (checkedPrivacyPolicy) {
            setCheckedPrivacyPolicyError('');
        } else {
            return setCheckedPrivacyPolicyError(
                authPageT('privacy_policy_error')
            );
        }

        if (!response.credential || checkedPrivacyPolicyError.length > 0)
            return;

        const decodedUserData: IGoogleAuthCredentialResponse = jwtDecode(
            response.credential
        );

        await googleAuthorization(
            {
                email: decodedUserData.email,
                lang: activeLocale as ELang,
                isActivated: decodedUserData.email_verified,
                firstName: decodedUserData.given_name,
                lastName: decodedUserData.family_name,
                avatar: decodedUserData.picture,
                utm_source,
                utm_medium,
                utm_campaign,
                utm_content,
                utm_term,
            },
            allPagesT('my-user-api.google-authorization.error')
        );
    };

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        setClickedOnSubmit(true);

        if (isForgotPassword) {
            return myUserApi
                .forgotPassword({
                    email: data.email.trim(),
                    lang: activeLocale as ELang,
                })
                .then(() => {
                    setIsForgotPassword(false);

                    toast(
                        allPagesT('my-user-api.forgot-password.success', {
                            type: 'api',
                            email: data.email,
                        }),
                        { type: 'success' }
                    );
                })
                .catch((error: any) => {
                    toast(
                        error.response?.data?.message ||
                            allPagesT('my-user-api.forgot-password.error', {
                                email: data.email,
                            }),
                        { type: 'error' }
                    );
                });
        }

        if (isSignUp) {
            if (data.password === repeatPassword) {
                setRepeatPasswordError('');
            } else {
                return setRepeatPasswordError(authPageT('passwords_error'));
            }
        }

        if (checkedPrivacyPolicy) {
            setCheckedPrivacyPolicyError('');
        } else {
            return setCheckedPrivacyPolicyError(
                authPageT('privacy_policy_error')
            );
        }

        if (
            repeatPasswordError.length > 0 ||
            checkedPrivacyPolicyError.length > 0
        )
            return;

        if (isSignUp && checkedPrivacyPolicy) {
            return registration(
                {
                    firstName: data.firstName.trim(),
                    email: data.email.trim(),
                    password: data.password,
                    lang: activeLocale as ELang,
                    utm_source,
                    utm_medium,
                    utm_campaign,
                    utm_content,
                    utm_term,
                },
                allPagesT('my-user-api.registration.error')
            );
        }

        if (checkedPrivacyPolicy) {
            return login(
                {
                    email: data.email.trim(),
                    password: data.signInPassword,
                    lang: activeLocale as ELang,
                },
                allPagesT('my-user-api.login.error')
            );
        }
    };

    useEffect(() => {
        const register = searchParams.get('register');
        const agree = searchParams.get('agree');
        setIsSignUp(register !== null || agree !== null);
        setCheckedPrivacyPolicy(agree !== null);
    }, [searchParams]);

    useEffect(() => {
        const notification = sessionStorage.getItem('notification');

        if (notification) {
            toast(notification, { type: 'success' });

            timerRef.current = setTimeout(() => {
                // TS2322: Type Timeout is not assignable to type number
                isTimerExecuted.current = true;
                sessionStorage.removeItem('notification');
            }, 3000);
        }

        return () => {
            if (timerRef.current && isTimerExecuted.current) {
                clearTimeout(timerRef.current);
                sessionStorage.removeItem('notification');
            }
        };
    }, []);

    return (
        <form
            className="my-auto flex w-full max-w-lg flex-col gap-5 rounded-2xl px-0.5 tablet-md:bg-zinc-300 tablet-md:px-5 tablet-md:pb-5 tablet-md:pt-3 tablet-md:shadow-md tablet-md:dark:bg-zinc-800"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="flex w-full items-center justify-evenly gap-2.5 text-center text-xl font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-2xl">
                {title}
            </h1>

            {!isForgotPassword && (
                <>
                    <div className="relative mx-auto">
                        <button
                            className={`${checkedPrivacyPolicy ? '-z-10' : 'z-10'} absolute -inset-1`}
                            type="button"
                            onClick={handleGoogleCheckingPrivacyPolicy}
                        ></button>

                        <GoogleOAuthProvider
                            clientId={
                                process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
                                    ? process.env
                                          .NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
                                    : ''
                            }
                        >
                            <GoogleLogin
                                text={isSignUp ? 'signup_with' : 'signin_with'}
                                onSuccess={handleGoogleAuth}
                                onError={() => {
                                    console.log('Google OAuth Login Failed');
                                    toast(
                                        allPagesT(
                                            'my-user-api.google-authorization.error'
                                        ),
                                        {
                                            type: 'error',
                                        }
                                    );
                                }}
                            />
                        </GoogleOAuthProvider>
                    </div>

                    <span className="flex w-full items-center justify-center gap-2.5 text-sm text-zinc-500 before:flex-1 before:border-b before:border-solid before:border-zinc-500 after:flex-1 after:border-t after:border-solid after:border-zinc-500">
                        {authPageT('or')}
                    </span>
                </>
            )}

            {isSignUp && (
                <div className="mt-2">
                    <UiInput
                        {...register('firstName', accountFirstNameValidation)}
                        id="firstName"
                        name="firstName"
                        type="text"
                        label={authPageT('first-name')}
                        error={errors?.firstName?.message}
                    />
                </div>
            )}

            <div className="mt-2">
                <UiInput
                    {...register('email', emailValidation)}
                    id="email"
                    name="email"
                    type="text"
                    label="Email*"
                    error={errors?.email?.message}
                />
            </div>

            {!isForgotPassword && (
                <div className="mt-2">
                    {isSignUp ? (
                        <UiInput
                            {...register('password', passwordValidation)}
                            id="password"
                            name="password"
                            type="password"
                            label={authPageT('password')}
                            error={errors?.password?.message}
                        />
                    ) : (
                        <UiInput
                            {...register(
                                'signInPassword',
                                signInPasswordValidation
                            )}
                            id="signInPassword"
                            name="signInPassword"
                            type="password"
                            label={authPageT('password')}
                            error={errors?.signInPassword?.message}
                        />
                    )}
                </div>
            )}

            {isSignUp && (
                <div className="mt-2">
                    <UiInput
                        id="repeat-password"
                        name="repeat-password"
                        type="password"
                        label={authPageT('repeat_password')}
                        value={repeatPassword}
                        error={repeatPasswordError}
                        onChange={(event) =>
                            repeatPasswordChange(
                                event as ChangeEvent<HTMLInputElement>
                            )
                        }
                    />
                </div>
            )}

            <div className="-mt-2.5 flex w-full flex-col items-center justify-center gap-2.5 mobile-sm:flex-row mobile-sm:justify-between mobile-sm:gap-5">
                {!isForgotPassword && (
                    <div className="mobile-sm:-ml-4">
                        <UiButton
                            variant="text-btn"
                            onBtnClick={handleToggleIsSignUp}
                        >
                            {isSignUp
                                ? authPageT('sign-in')
                                : authPageT('sign-up')}
                        </UiButton>
                    </div>
                )}

                {!isSignUp && (
                    <div className="mobile-sm:-mr-4 mobile-sm:ml-auto">
                        <UiButton
                            variant="text-attention"
                            onBtnClick={() =>
                                setIsForgotPassword((state) => !state)
                            }
                        >
                            {isForgotPassword
                                ? authPageT('password_remembered')
                                : authPageT('forgot_password')}
                        </UiButton>
                    </div>
                )}
            </div>

            {!isForgotPassword && (
                <div>
                    <UiCheckbox
                        id="privacy-policy"
                        name="privacy-policy"
                        value="privacy-policy"
                        checked={checkedPrivacyPolicy}
                        onChange={handleTogglePrivacyPolicy}
                    >
                        {authPageT('i_agree_to')}
                        &nbsp;
                        <UiButton href="privacy-policy" variant="text">
                            {authPageT('privacy_policy')}
                        </UiButton>
                        &nbsp;
                        {authPageT('wish_hub')}
                    </UiCheckbox>

                    {checkedPrivacyPolicyError.length > 0 && (
                        <p className="mt-1 text-xs text-red-500">
                            {checkedPrivacyPolicyError}
                        </p>
                    )}
                </div>
            )}

            <div className="mx-auto">
                <UiButton type="submit">{submit}</UiButton>
            </div>
        </form>
    );
};

export default ClientForm;
