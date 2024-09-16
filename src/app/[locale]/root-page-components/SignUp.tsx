'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IUser } from '@/models/User';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import useValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';

type Inputs = {
    firstName: IUser['firstName'];
    email: IUser['email'];
};

const SignUp: FC = () => {
    const router = useRouter();

    const activeLocale = useLocale();
    const welcomePageT = useTranslations('welcome-page');

    const {
        register,
        getValues,
        formState: { errors },
    } = useForm<Inputs>();

    const myUser = useMyUserStore((state) => state.myUser);
    const setCandidate = useMyUserStore((state) => state.setCandidate);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const { accountFirstNameValidation, emailValidation } = useValidations();

    const handleSingUp = () => {
        setShowGlobalLoading(true);

        setCandidate({
            firstName: getValues('firstName'),
            email: getValues('email'),
        });

        router.push(`/${activeLocale}/auth?register`);
    };

    return (
        <div className="tablet-md:before:-rotate-5 relative rounded-3xl bg-zinc-400 bg-[url('/images/sing-up-bg.webp')] bg-cover bg-center bg-no-repeat p-6 before:absolute before:inset-0 before:-rotate-3 before:rounded-3xl before:border before:border-dashed before:border-zinc-400 dark:bg-zinc-800 before:dark:border-zinc-600 tablet-md:px-10 tablet-md:py-8 desktop-sm:w-4/5">
            <p className="w-4/5 text-2xl font-bold text-zinc-800 dark:text-zinc-200 tablet-md:w-3/4 tablet-md:text-3xl tablet-lg:w-3/5 tablet-xl:w-4/6 desktop-sm:w-4/5">
                {welcomePageT('join_today')}
            </p>

            <p className="mt-2 w-4/5 text-sm text-zinc-600 dark:text-zinc-400 tablet-md:mt-6 tablet-md:text-base">
                {welcomePageT('sign_up_now')}
            </p>

            {!myUser && (
                <div className="mt-4 flex flex-col gap-2 rounded-xl border border-dashed border-zinc-400 p-4 dark:border-zinc-600 tablet-lg:mt-6 tablet-lg:p-6 desktop-sm:flex-row desktop-sm:items-center desktop-sm:gap-6">
                    <UiInput
                        {...register('firstName', accountFirstNameValidation)}
                        id="firstName"
                        name="firstName"
                        type="text"
                        label={welcomePageT('first-name')}
                        error={errors?.firstName?.message}
                    />

                    <UiInput
                        {...register('email', emailValidation)}
                        id="email"
                        name="email"
                        type="text"
                        label="Email*"
                        error={errors?.email?.message}
                    />
                </div>
            )}

            <div className="mx-auto mt-4 w-fit">
                {myUser ? (
                    <UiButton href="/main">{welcomePageT('to-main')}</UiButton>
                ) : (
                    <UiButton onBtnClick={handleSingUp}>
                        {welcomePageT('sign-up')}
                    </UiButton>
                )}
            </div>

            <div className="absolute -right-3 -top-3 h-[70px] w-[70px] tablet-md:h-[90px] tablet-md:w-[90px] desktop-sm:top-2 desktop-sm:h-24 desktop-sm:w-24">
                <Image
                    src="/images/love-emoji.webp"
                    alt={welcomePageT('alts.love_emoji')}
                    title={welcomePageT('alts.love_emoji')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute -top-6 right-14 h-[70px] w-[70px] tablet-md:right-20 tablet-md:h-20 tablet-md:w-20 desktop-sm:h-[90px] desktop-sm:w-[90px]">
                <Image
                    src="/images/festive-emoji.webp"
                    alt={welcomePageT('alts.festive_emoji')}
                    title={welcomePageT('alts.festive_emoji')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute right-1 top-20 h-8 w-8 tablet-md:right-3 tablet-md:top-24 tablet-md:h-10 tablet-md:w-10 desktop-sm:top-28 desktop-sm:h-11 desktop-sm:w-11">
                <Image
                    src="/images/festive-smile.webp"
                    alt={welcomePageT('alts.festive_smile')}
                    title={welcomePageT('alts.festive_smile')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute right-16 top-12 h-8 w-8 tablet-md:right-20 tablet-md:top-16 tablet-md:h-10 tablet-md:w-10 desktop-sm:right-[88px] desktop-sm:h-11 desktop-sm:w-11">
                <Image
                    src="/images/star-smile.webp"
                    alt={welcomePageT('alts.star_smile')}
                    title={welcomePageT('alts.star_smile')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default SignUp;
