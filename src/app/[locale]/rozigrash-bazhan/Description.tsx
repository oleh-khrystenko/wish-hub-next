import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { GIFT_PRICE } from '@/helpers/utils/constants';
import CheckedIcon from '@/components/icons/CheckedIcon';

const Description: FC = () => {
    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');
    const welcomePageT = useTranslations('welcome-page');

    return (
        <div className="tablet-md:before:rotate-5 relative mx-auto mt-10 flex max-w-lg flex-col gap-4 rounded-3xl bg-zinc-400 bg-[url('/images/benefits-bg.webp')] bg-cover bg-center bg-no-repeat pb-6 pl-10 pr-5 pt-5 before:absolute before:inset-0 before:rotate-3 before:rounded-3xl before:border before:border-dashed before:border-zinc-400 dark:bg-zinc-800 before:dark:border-zinc-600 tablet-md:gap-6 tablet-md:py-10 tablet-md:pl-20 tablet-md:pr-16 desktop-xs:max-w-full">
            <p className="-ml-6 mt-2 text-base text-zinc-600 dark:text-zinc-400 tablet-md:text-lg">
                {rozigrashBazhanPageT('wish_hub_gives')}
            </p>

            <div>
                <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                    {rozigrashBazhanPageT('participation_is_free')}
                    <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                </p>

                <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    {rozigrashBazhanPageT('no_hidden_costs')}
                </p>
            </div>

            <div className="w-4/5">
                <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                    {rozigrashBazhanPageT('chance_to_win', {
                        price: GIFT_PRICE,
                    })}
                    <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                </p>

                <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    {rozigrashBazhanPageT('we_will_fulfill', {
                        price: GIFT_PRICE,
                    })}
                </p>
            </div>

            <div className="w-4/5">
                <p className="relative text-base font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                    {rozigrashBazhanPageT('fair_random')}
                    <CheckedIcon classes="absolute w-5 h-5 -left-2 top-1/2 -translate-x-full -translate-y-1/2 tablet-md:-left-2.5 tablet-md:w-7 tablet-md:h-7" />
                </p>

                <p className="mt-2 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                    {rozigrashBazhanPageT('winner_is_chosen')}
                </p>
            </div>

            <div className="absolute -right-1 bottom-52 h-10 w-10 rotate-45 mobile-lg:-right-2 tablet-md:h-12 tablet-md:w-12">
                <Image
                    src="/images/gift-small.webp"
                    alt={welcomePageT('alts.smaller_gift')}
                    title={welcomePageT('alts.smaller_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute bottom-28 right-3.5 h-16 w-16 -rotate-12 tablet-md:right-6 tablet-md:h-20 tablet-md:w-20">
                <Image
                    src="/images/gift-middle.webp"
                    alt={welcomePageT('alts.middle_gift')}
                    title={welcomePageT('alts.middle_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            <div className="absolute -bottom-2 -right-1.5 h-24 w-24 rotate-12 tablet-md:-bottom-5 tablet-md:h-32 tablet-md:w-32">
                <Image
                    src="/images/gift-big.webp"
                    alt={welcomePageT('alts.bigger_gift')}
                    title={welcomePageT('alts.bigger_gift')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default Description;
