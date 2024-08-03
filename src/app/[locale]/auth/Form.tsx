'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useUsersStore } from '@/stores/users';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useRouter } from "next/router";
import { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ELang } from '@/models/Settings';
import { IUser } from '@/models/User';
import Link from 'next/link';
import CustomSelect from '@/components/ui/CustomSelect';
import Input from '@/components/ui/Input';
import Search from '@/components/ui/Search';

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

function Form() {
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

    // const router = useRouter();

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

    // let title = t('auth-page.title.sing_in');
    // isRegistration && (title = t('auth-page.title.sing_up'));
    // isForgotPassword && (title = t('auth-page.title.forgot_password'));
    //
    // let submit = t('sing-in');
    // isRegistration && (submit = t('sing-up'));
    // isForgotPassword && (submit = t('auth-page.recovery'));

    const handleGoogleLogin = async (response: CredentialResponse) => {
        setClickedOnSubmit(true);

        if (checkedPrivacyPolicy) {
            setCheckedPrivacyPolicyError('');
        } else {
            // return setCheckedPrivacyPolicyError(t('auth-page.privacy_policy_error'));
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
        return login({
            ...data,
            email: data.email.trim(),
            lang: activeLocale as ELang,
        });
        // setClickedOnSubmit(true);
        //
        // if (isForgotPassword) {
        //     // return dispatch(forgotPassword({ email: data.email.trim(), lang: getLang() }));
        // }
        //
        // if (isRegistration) {
        //     if (data.password === repeatPassword) {
        //         setRepeatPasswordError('');
        //     } else {
        //         // return setRepeatPasswordError(t('auth-page.passwords_error'));
        //     }
        // }
        //
        // if (checkedPrivacyPolicy) {
        //     setCheckedPrivacyPolicyError('');
        // } else {
        //     // return setCheckedPrivacyPolicyError(t('auth-page.privacy_policy_error'));
        // }
        //
        // if (repeatPasswordError.length > 0 || checkedPrivacyPolicyError.length > 0) return;
        //
        // if (isRegistration && checkedPrivacyPolicy) {
        //     // return dispatch(registration({ ...data, email: data.email.trim(), lang: getLang() }));
        // }
        //
        // if (checkedPrivacyPolicy) {
        //     return login({ ...data, email: data.email.trim(), lang: (activeLocale as ELang) });
        // }
    };

    const repeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (!clickedOnSubmit) return;

        const password = getValues('password');
        // password === value ? setRepeatPasswordError('') : setRepeatPasswordError(t('auth-page.passwords_error'));
    };

    const handleTogglePrivacyPolicy = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setCheckedPrivacyPolicy(value);

        if (!clickedOnSubmit) return;

        // value
        //     ? setCheckedPrivacyPolicyError('')
        //     : setCheckedPrivacyPolicyError(t('auth-page.privacy_policy_error'));
    };

    // useEffect(() => {
    //     if (router.isReady) {
    //         const { query } = router;
    //         setIsRegistration(query.register !== undefined || query.agree !== undefined);
    //         setCheckedPrivacyPolicy(query.agree !== undefined);
    //     }
    // }, [ router ]);

    const handle = (value: string) => {
        console.log(value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Link href={`/${activeLocale}/welcome`}>welcome</Link>
            <CustomSelect />
            auth page
            <br />
            <br />
            <br />
            <Input
                {...register('email')}
                id="email"
                name="email"
                type="text"
                label="Email*"
                tooltip="Email*"
                error={errors?.email?.message}
            />
            <Search id="test" label="search test" changeSearchBar={handle} />
            <Input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                label="Password*"
                // label={ t('auth-page.password') }
                error={errors?.password?.message}
            />
            <Input
                {...register('firstName')}
                id="description"
                name="description"
                type="multiline"
                label={'firstName'}
                error={errors?.firstName?.message}
            />
            <button type="submit">submit </button>
        </form>
    );
}

export default Form;
