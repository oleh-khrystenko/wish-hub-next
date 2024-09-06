import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import WindingIcon from '@/components/icons/WindingIcon';
import CheckedIcon from '@/components/icons/CheckedIcon';

const CoverFigure: FC = () => {
    const welcomePageT = useTranslations('welcome-page');

    return (
        <div className="relative mx-auto mt-16 w-48 rounded-xl bg-zinc-400 px-2 py-3 dark:bg-zinc-900 mobile-xs:w-56 mobile-sm:w-60 mobile-md:w-[266px] tablet-md:mt-40 tablet-md:w-[438px] tablet-md:rounded-3xl tablet-md:p-4 desktop-sm:row-span-2 desktop-sm:ml-20 desktop-sm:mr-[70px] desktop-sm:mt-auto desktop-sm:translate-y-8">
            {/* emoji-1 */}
            <div className="absolute -bottom-5 left-0 h-16 w-16 -translate-x-full animate-appear-19 opacity-0 mobile-md:-bottom-6 mobile-md:left-0 mobile-md:h-[70px] mobile-md:w-[70px] tablet-md:-bottom-14 tablet-md:left-3 tablet-md:h-40 tablet-md:w-40">
                <Image
                    src="/images/star-emoji.webp"
                    alt={welcomePageT('alts.star_emoji')}
                    title={welcomePageT('alts.star_emoji')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
            {/* arrow-1 */}
            <WindingIcon classes="absolute bottom-9 left-0 h-7 w-7 -translate-x-full rotate-180 animate-appear-17 opacity-0 mobile-sm:bottom-10 mobile-sm:h-8 mobile-sm:w-8 mobile-md:h-9 mobile-md:w-9 tablet-md:-left-2 tablet-md:bottom-[90px] tablet-md:h-16 tablet-md:w-16" />
            {/* smile-1 */}
            <div className="absolute -left-6 bottom-28 h-7 w-7 -translate-x-full animate-appear-12 opacity-0 mobile-sm:bottom-32 mobile-sm:h-8 mobile-sm:w-8 tablet-md:-left-16 tablet-md:bottom-60 tablet-md:h-16 tablet-md:w-16">
                <Image
                    src="/images/love-smile.webp"
                    alt={welcomePageT('alts.love_smile')}
                    title={welcomePageT('alts.love_smile')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            {/* emoji-2 */}
            <div className="absolute -top-2.5 left-1 h-16 w-16 -translate-x-full animate-appear-4 opacity-0 mobile-md:-top-3.5 mobile-md:h-[72px] mobile-md:w-[72px] tablet-md:-top-[86px] tablet-md:left-5 tablet-md:h-[170px] tablet-md:w-[170px]">
                <Image
                    src="/images/pigtails-emoji.webp"
                    alt={welcomePageT('alts.pigtails_emoji')}
                    title={welcomePageT('alts.pigtails_emoji')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
            {/* arrow-2 */}
            <WindingIcon classes="absolute left-2 top-11 h-8 w-8 -translate-x-full -rotate-[70deg] animate-appear-2 opacity-0 mobile-md:h-9 mobile-md:w-9 tablet-md:left-2.5 tablet-md:h-16 tablet-md:w-16" />
            {/* smile-2 */}
            <div className="absolute -top-4 left-2.5 h-7 w-7 -translate-y-full animate-appear-18 opacity-0 mobile-sm:left-5 mobile-sm:h-8 mobile-sm:w-8 mobile-md:left-8 tablet-md:-top-12 tablet-md:left-11 tablet-md:h-16 tablet-md:w-16">
                <Image
                    src="/images/festive-smile.webp"
                    alt={welcomePageT('alts.festive_smile')}
                    title={welcomePageT('alts.festive_smile')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            {/* emoji-3 */}
            <div className="absolute -top-2 left-16 h-16 w-16 -translate-y-full animate-appear-13 opacity-0 mobile-xs:left-20 mobile-sm:left-[88px] mobile-sm:h-[74px] mobile-sm:w-[74px] mobile-md:-top-3 mobile-md:left-[106px] mobile-md:h-[76px] mobile-md:w-[76px] tablet-md:-top-3.5 tablet-md:left-36 tablet-md:h-[170px] tablet-md:w-[170px]">
                <Image
                    src="/images/winking-emoji.webp"
                    alt={welcomePageT('alts.winking_emoji')}
                    title={welcomePageT('alts.winking_emoji')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
            {/* arrow-3 */}
            <WindingIcon classes="absolute left-24 top-4 h-7 w-7 -translate-y-full -rotate-[70deg] animate-appear-11 opacity-0 mobile-xs:left-28 mobile-sm:left-32 mobile-sm:h-8 mobile-sm:w-8 mobile-md:left-36 mobile-md:top-3 mobile-md:h-9 mobile-md:w-9 tablet-md:left-[234px] tablet-md:top-7 tablet-md:h-16 tablet-md:w-16" />
            {/* smile-3 */}
            <div className="absolute -right-1 -top-5 h-7 w-7 -translate-y-full animate-appear-22 opacity-0 mobile-xs:right-3 mobile-sm:h-8 mobile-sm:w-8 mobile-md:right-5 tablet-md:-right-1.5 tablet-md:-top-12 tablet-md:h-16 tablet-md:w-16">
                <Image
                    src="/images/star-smile.webp"
                    alt={welcomePageT('alts.star_smile')}
                    title={welcomePageT('alts.star_smile')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            {/* emoji-4 */}
            <div className="absolute -top-3 right-0 h-16 w-16 translate-x-full animate-appear-17 opacity-0 mobile-md:-top-5 mobile-md:right-0 tablet-md:-top-16 tablet-md:h-40 tablet-md:w-40">
                <Image
                    src="/images/bearded-emoji.webp"
                    alt={welcomePageT('alts.bearded_emoji')}
                    title={welcomePageT('alts.bearded_emoji')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
            {/* arrow-4 */}
            <WindingIcon classes="absolute -right-1 top-10 h-7 w-7 translate-x-full animate-appear-15 opacity-0 mobile-sm:right-0 mobile-sm:h-8 mobile-sm:w-8 mobile-md:h-9 mobile-md:w-9 tablet-md:-right-3.5 tablet-md:top-[70px] tablet-md:h-16 tablet-md:w-16" />
            {/* smile-4 */}
            <div className="absolute -right-5 bottom-28 h-7 w-7 translate-x-full animate-appear-16 opacity-0 mobile-sm:bottom-32 mobile-sm:h-8 mobile-sm:w-8 tablet-md:-right-16 tablet-md:bottom-56 tablet-md:h-16 tablet-md:w-16">
                <Image
                    src="/images/sunglasses-smile.webp"
                    alt={welcomePageT('alts.sunglasses_smile')}
                    title={welcomePageT('alts.sunglasses_smile')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>

            {/* emoji-5 */}
            <div className="absolute -bottom-1.5 right-0 h-16 w-16 translate-x-full animate-appear-8 opacity-0 mobile-md:-bottom-3 mobile-md:right-0 mobile-md:h-16 mobile-md:w-16 tablet-md:-bottom-10 tablet-md:h-40 tablet-md:w-40">
                <Image
                    src="/images/great-emoji.webp"
                    alt={welcomePageT('alts.great_emoji')}
                    title={welcomePageT('alts.great_emoji')}
                    fill
                    sizes={'100%'}
                    className="object-contain"
                />
            </div>
            {/* arrow-5 */}
            <WindingIcon classes="absolute bottom-12 right-2 h-7 w-7 translate-x-full rotate-[110deg] animate-appear-7 opacity-0 mobile-sm:h-8 mobile-sm:w-8 mobile-md:h-9 mobile-md:w-9 tablet-md:bottom-24 tablet-md:h-16 tablet-md:w-16" />

            {/* head */}
            <div className="flex items-center justify-between gap-2">
                <p className="text-[8px] font-bold text-zinc-800 dark:text-zinc-200 mobile-xs:text-[10px] tablet-md:text-base">
                    {welcomePageT('birthday_wishlist')}

                    <span className="relative -mb-1 ml-1 inline-block h-3.5 w-3.5 tablet-md:h-6 tablet-md:w-6">
                        <Image
                            src="/images/party-popper.webp"
                            alt={welcomePageT('alts.party_popper_icon')}
                            title={welcomePageT('alts.party_popper_icon')}
                            fill
                            sizes={'100%'}
                            className="object-contain"
                        />
                    </span>
                </p>

                <span className="animate-appear-20 whitespace-nowrap text-[6px] text-zinc-600 opacity-0 dark:text-zinc-400 mobile-xs:text-[8px] tablet-md:text-xs">
                    {welcomePageT('count_wishes')}
                </span>
            </div>

            {/* list */}
            <ul className="mt-3 flex flex-col items-center gap-1 tablet-md:mt-6 tablet-md:gap-2">
                {/* Flowers */}
                <li className="h-12 w-full rounded-md border border-dashed border-zinc-500 dark:border-zinc-600 mobile-sm:h-14 tablet-md:h-24 tablet-md:rounded-xl">
                    <div className="relative flex h-full rounded-md border border-dashed border-transparent pb-2 pl-2 pr-1 pt-1.5 tablet-md:pb-5 tablet-md:pl-4 tablet-md:pr-2 tablet-md:pt-4">
                        <div className="relative h-2 w-2 min-w-2 self-center rounded-sm border border-solid border-zinc-600 dark:border-zinc-400 tablet-md:h-4 tablet-md:w-4 tablet-md:min-w-4"></div>

                        <div className="relative ml-2 h-6 w-6 min-w-6 self-end rounded border border-dashed border-zinc-400 bg-[#27272a99] dark:border-zinc-600 tablet-md:ml-4 tablet-md:h-12 tablet-md:w-12 tablet-md:min-w-12">
                            <div className="absolute bottom-0 left-1/2 h-11 w-8 -translate-x-1/2 translate-y-2 animate-appear-1 opacity-0 tablet-md:h-[90px] tablet-md:w-[70px] tablet-md:translate-y-4">
                                <Image
                                    src="/images/flowers.webp"
                                    alt={welcomePageT('bouquet_of')}
                                    title={welcomePageT('bouquet_of')}
                                    fill
                                    sizes={'100%'}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="ml-3 flex animate-appear-3 flex-col opacity-0 tablet-md:ml-5">
                            <p className="text-[7px] font-bold text-zinc-800 dark:text-zinc-200 mobile-sm:text-[8px] mobile-md:text-[9px] tablet-md:text-xs">
                                {welcomePageT('bouquet_of')}
                            </p>
                            <p className="mt-px text-[6px] text-zinc-600 dark:text-zinc-400 mobile-sm:text-[7px] mobile-md:text-[8px] tablet-md:text-xs">
                                {welcomePageT('i_love_roses')}
                            </p>
                        </div>
                    </div>
                </li>

                {/* Bear */}
                <li className="h-12 w-full rounded-md border border-dashed border-zinc-500 dark:border-zinc-600 mobile-sm:h-14 tablet-md:h-24 tablet-md:rounded-xl">
                    <div className="relative flex h-full animate-fulfilled-1 rounded-md border border-dashed border-transparent pb-2 pl-2 pr-1 pt-1.5 before:absolute before:inset-0 before:h-full before:w-full before:animate-appear-14 before:rounded-md before:bg-[url('/images/wish-bg.webp')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 tablet-md:rounded-xl tablet-md:pb-5 tablet-md:pl-4 tablet-md:pr-2 tablet-md:pt-4 tablet-md:before:rounded-xl">
                        <div className="relative h-2 w-2 min-w-2 self-center rounded-sm border border-solid border-zinc-600 dark:border-zinc-400 tablet-md:h-4 tablet-md:w-4 tablet-md:min-w-4">
                            <CheckedIcon classes="h-3 w-3 animate-appear-14 opacity-0 tablet-md:h-6 tablet-md:w-6" />
                        </div>

                        <div className="relative ml-2 h-6 w-6 min-w-6 self-end rounded border border-dashed border-zinc-400 bg-[#27272a99] dark:border-zinc-600 tablet-md:ml-4 tablet-md:h-12 tablet-md:w-12 tablet-md:min-w-12">
                            <div className="absolute bottom-0 left-1/2 h-11 w-8 -translate-x-1/2 translate-y-2 animate-appear-5 opacity-0 tablet-md:h-[90px] tablet-md:w-[70px] tablet-md:translate-y-4">
                                <Image
                                    src="/images/bear.webp"
                                    alt={welcomePageT('teddy_bear')}
                                    title={welcomePageT('teddy_bear')}
                                    fill
                                    sizes={'100%'}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="ml-3 flex animate-appear-6 flex-col opacity-0 tablet-md:ml-5">
                            <p className="text-[7px] font-bold text-zinc-800 dark:text-zinc-200 mobile-sm:text-[8px] mobile-md:text-[9px] tablet-md:text-xs">
                                {welcomePageT('teddy_bear')}
                            </p>
                            <p className="mt-px text-[6px] text-zinc-600 dark:text-zinc-400 mobile-sm:text-[7px] mobile-md:text-[8px] tablet-md:text-xs">
                                {welcomePageT('childhood_dream')}
                            </p>
                        </div>
                    </div>
                </li>

                {/* VR Headset */}
                <li className="h-12 w-full rounded-md border border-dashed border-zinc-500 dark:border-zinc-600 mobile-sm:h-14 tablet-md:h-24 tablet-md:rounded-xl">
                    <div className="relative flex h-full rounded-md border border-dashed border-transparent pb-2 pl-2 pr-1 pt-1.5 tablet-md:pb-5 tablet-md:pl-4 tablet-md:pr-2 tablet-md:pt-4">
                        <div className="relative h-2 w-2 min-w-2 self-center rounded-sm border border-solid border-zinc-600 dark:border-zinc-400 tablet-md:h-4 tablet-md:w-4 tablet-md:min-w-4"></div>

                        <div className="relative ml-2 h-6 w-6 min-w-6 self-end rounded border border-dashed border-zinc-400 bg-[#27272a99] dark:border-zinc-600 tablet-md:ml-4 tablet-md:h-12 tablet-md:w-12 tablet-md:min-w-12">
                            <div className="absolute bottom-0 left-1/2 h-11 w-8 -translate-x-1/2 translate-y-2 animate-appear-9 opacity-0 tablet-md:h-[90px] tablet-md:w-[70px] tablet-md:translate-y-4">
                                <Image
                                    src="/images/vr-headset.webp"
                                    alt={welcomePageT('vr_headset')}
                                    title={welcomePageT('vr_headset')}
                                    fill
                                    sizes={'100%'}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="ml-3 flex animate-appear-10 flex-col opacity-0 tablet-md:ml-5">
                            <p className="text-[7px] font-bold text-zinc-800 dark:text-zinc-200 mobile-sm:text-[8px] mobile-md:text-[9px] tablet-md:text-xs">
                                {welcomePageT('vr_headset')}
                            </p>
                            <p className="mt-px text-[6px] text-zinc-600 dark:text-zinc-400 mobile-sm:text-[7px] mobile-md:text-[8px] tablet-md:text-xs">
                                {welcomePageT('i_will_be')}
                            </p>
                        </div>
                    </div>
                </li>

                {/* Headphones */}
                <li className="h-12 w-full rounded-md border border-dashed border-zinc-500 dark:border-zinc-600 mobile-sm:h-14 tablet-md:h-24 tablet-md:rounded-xl">
                    <div className="relative flex h-full animate-fulfilled-2 rounded-md border border-dashed border-transparent pb-2 pl-2 pr-1 pt-1.5 before:absolute before:inset-0 before:h-full before:w-full before:animate-appear-21 before:rounded-md before:bg-[url('/images/wish-bg.webp')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 tablet-md:rounded-xl tablet-md:pb-5 tablet-md:pl-4 tablet-md:pr-2 tablet-md:pt-4 tablet-md:before:rounded-xl">
                        <div className="relative h-2 w-2 min-w-2 self-center rounded-sm border border-solid border-zinc-600 dark:border-zinc-400 tablet-md:h-4 tablet-md:w-4 tablet-md:min-w-4">
                            <CheckedIcon classes="h-3 w-3 animate-appear-21 opacity-0 tablet-md:h-6 tablet-md:w-6" />
                        </div>

                        <div className="relative ml-2 h-6 w-6 min-w-6 self-end rounded border border-dashed border-zinc-400 bg-[#27272a99] dark:border-zinc-600 tablet-md:ml-4 tablet-md:h-12 tablet-md:w-12 tablet-md:min-w-12">
                            <div className="absolute bottom-0 left-1/2 h-11 w-8 -translate-x-1/2 translate-y-2 animate-appear-14 opacity-0 tablet-md:h-[90px] tablet-md:w-[70px] tablet-md:translate-y-4">
                                <Image
                                    src="/images/headphones.webp"
                                    alt="Beats by Dre"
                                    fill
                                    sizes={'100%'}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="ml-3 flex animate-appear-14 flex-col opacity-0 tablet-md:ml-5">
                            <p className="text-[7px] font-bold text-zinc-800 dark:text-zinc-200 mobile-sm:text-[8px] mobile-md:text-[9px] tablet-md:text-xs">
                                Beats by Dre
                            </p>
                            <p className="mt-px text-[6px] text-zinc-600 dark:text-zinc-400 mobile-sm:text-[7px] mobile-md:text-[8px] tablet-md:text-xs">
                                {welcomePageT('the_best_wireless')}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CoverFigure;
