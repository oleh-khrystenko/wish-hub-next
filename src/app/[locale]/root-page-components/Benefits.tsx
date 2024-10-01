import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CheckedIcon from '@/components/icons/CheckedIcon';

const Benefits: FC = () => {
    const welcomePageT = useTranslations('welcome-page');

    return (
        <div className="tablet-md:before:rotate-5 relative flex flex-col gap-4 rounded-3xl bg-zinc-400 bg-[url('/images/benefits-bg.webp')] bg-cover bg-center bg-no-repeat pb-6 pl-10 pr-5 pt-5 before:absolute before:inset-0 before:rotate-3 before:rounded-3xl before:border before:border-dashed before:border-zinc-400 dark:bg-zinc-800 before:dark:border-zinc-600 tablet-md:gap-6 tablet-md:py-10 tablet-md:pl-20 tablet-md:pr-16">
            <div>
                <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                    {welcomePageT('making_dreams')}
                    <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                </p>

                <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    {welcomePageT('your_dreams')}
                </p>
            </div>

            <div className="w-4/5">
                <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                    {welcomePageT('time_saving')}
                    <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                </p>

                <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    {welcomePageT('forget_the_long')}
                </p>
            </div>

            <div className="w-4/5">
                <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                    {welcomePageT('easy_to_use')}
                    <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                </p>

                <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    {welcomePageT('our_intuitive')}
                </p>
            </div>

            <div className="absolute -bottom-2 -right-3.5 h-24 w-24 tablet-md:h-32 tablet-md:w-32">
                <Image
                    src="/images/gift-big.webp"
                    alt={welcomePageT('alts.bigger_gift')}
                    title={welcomePageT('alts.bigger_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute bottom-32 right-3.5 h-16 w-16 tablet-md:right-6 tablet-md:h-20 tablet-md:w-20">
                <Image
                    src="/images/gift-middle.webp"
                    alt={welcomePageT('alts.middle_gift')}
                    title={welcomePageT('alts.middle_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute bottom-52 right-0.5 h-7 w-7 mobile-lg:-right-1 tablet-md:h-8 tablet-md:w-8">
                <Image
                    src="/images/gift-small.webp"
                    alt={welcomePageT('alts.smaller_gift')}
                    title={welcomePageT('alts.smaller_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default Benefits;
