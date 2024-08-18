'use client';

import { FC } from 'react';
import { Manrope } from 'next/font/google';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';

const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

interface IProps {
    href?: string;
    isMainPage?: boolean;
    withLogo?: boolean;
    isBig?: boolean;
}

const UiBrand: FC<IProps> = ({
    href = 'main',
    isMainPage = false,
    withLogo = false,
    isBig = false,
}) => {
    const { getInitialAllWishes } = UseInitialWishes();

    const children = (
        <>
            {withLogo && <LogoIcon />}

            <span
                className={`${manrope.className} ${isBig ? 'tablet-md:text-4xl' : 'tablet-md:text-2xl'} text-xl`}
            >
                Wish Hub
            </span>
        </>
    );

    return isMainPage ? (
        <UiButton variant="text-btn" onClick={() => getInitialAllWishes()}>
            {children}
        </UiButton>
    ) : (
        <UiButton href={href} variant="text-btn">
            {children}
        </UiButton>
    );
};

export default UiBrand;
