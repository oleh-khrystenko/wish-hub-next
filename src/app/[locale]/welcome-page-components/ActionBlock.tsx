import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Action from '@/app/[locale]/welcome-page-components/Action';

const ActionBlock: FC = () => {
    const welcomePageT = useTranslations('welcome-page');

    return (
        <div className="relative mx-auto mt-7 rounded-3xl border border-dashed border-zinc-500 bg-[url('/images/action-bg.webp')] bg-cover bg-center bg-no-repeat p-6 mobile-xl:w-[400px] tablet-md:w-[500px] tablet-md:py-10 desktop-sm:m-0 desktop-sm:w-[462px]">
            <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-3xl">
                {welcomePageT('take_first_step')}
            </p>

            <p className="mt-2 w-4/5 text-sm text-zinc-600 dark:text-zinc-400 tablet-md:mt-6 tablet-md:text-base">
                {welcomePageT('create_wish_lists')}
            </p>

            <Action
                toMainT={welcomePageT('to-main')}
                signUpT={welcomePageT('sign-up')}
            />

            <div className="absolute -right-1.5 bottom-24 h-12 w-12 rotate-45 tablet-md:-right-3 tablet-md:bottom-36 tablet-md:h-16 tablet-md:w-16">
                <Image
                    src="/images/gift-small.webp"
                    alt={welcomePageT('alts.smaller_gift')}
                    title={welcomePageT('alts.smaller_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute bottom-3.5 right-4 h-20 w-20 -rotate-12 tablet-md:bottom-4 tablet-md:right-5 tablet-md:h-28 tablet-md:w-28">
                <Image
                    src="/images/gift-middle.webp"
                    alt={welcomePageT('alts.middle_gift')}
                    title={welcomePageT('alts.middle_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default ActionBlock;
