'use client';

import { FC } from 'react';
import { Manrope } from 'next/font/google';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';

const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

interface IProps {
    href?: string;
    sizeLoading?: string;
    bgLoading?: string;
    isMainPage?: boolean;
    withLogo?: boolean;
    isBig?: boolean;
}

const UiBrand: FC<IProps> = ({
    href = 'main',
    sizeLoading = 'h-12 min-h-12 w-12 min-w-12',
    bgLoading = 'bg-zinc-200 dark:bg-zinc-900',
    isMainPage = false,
    withLogo = false,
    isBig = false,
}) => {
    const { getInitialAllWishes } = UseInitialWishes();

    const children = (
        <>
            {withLogo && (
                <LogoIcon
                    classes={`${isBig ? 'tablet-md:h-14 tablet-md:w-14' : 'tablet-md:h-10 tablet-md:w-10'} h-8 w-8`}
                />
            )}

            <span
                className={`${manrope.className} ${isBig ? 'tablet-md:text-4xl' : 'tablet-md:text-2xl'} text-xl`}
            >
                Wish Hub
            </span>
        </>
    );

    return isMainPage ? (
        <UiButton variant="text-btn" onBtnClick={() => getInitialAllWishes()}>
            {children}
        </UiButton>
    ) : (
        <UiButton
            href={href}
            variant="text-btn"
            sizeLoading={sizeLoading}
            bgLoading={bgLoading}
        >
            {children}
        </UiButton>
    );
};

export default UiBrand;
