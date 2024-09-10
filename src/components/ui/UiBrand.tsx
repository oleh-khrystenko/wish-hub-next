'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import { useLocale } from 'next-intl';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UiLoading from '@/components/ui/UiLoading';
import LogoIcon from '@/components/icons/LogoIcon';

const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

interface IProps {
    href?: string;
    logoId?: string;
    sizeLoading?: string;
    bgLoading?: string;
    isMainPage?: boolean;
    withLogo?: boolean;
    isBig?: boolean;
}

const UiBrand: FC<IProps> = ({
    href = 'main',
    logoId = 'brand-logo',
    sizeLoading = 'h-12 min-h-12 w-12 min-w-12',
    bgLoading = 'bg-zinc-200 dark:bg-zinc-900',
    isMainPage = false,
    withLogo = false,
    isBig = false,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const { getInitialAllWishes } = UseInitialWishes();

    const activeLocale = useLocale();

    const handleBtnClick = async () => {
        setIsLoading(true);
        await getInitialAllWishes();
        setIsLoading(false);
    };

    const handleLinkClick = () => setIsLoading(true);

    const children = (
        <>
            {withLogo && (
                <LogoIcon
                    id={logoId}
                    classes={`${isBig ? 'tablet-md:h-14 tablet-md:w-14' : 'tablet-md:h-10 tablet-md:w-10'} h-8 w-8`}
                />
            )}

            <span
                className={`${manrope.className} ${isBig ? 'tablet-md:text-4xl' : 'tablet-md:text-2xl'} whitespace-nowrap text-xl font-bold`}
            >
                Wish Hub
            </span>

            {isLoading && (
                <UiLoading isLocal size={sizeLoading} bg={bgLoading} />
            )}
        </>
    );

    return isMainPage ? (
        <button
            className="relative flex items-center gap-2 px-4 py-2 text-cyan-400 dark:text-cyan-300"
            type="button"
            onClick={handleBtnClick}
        >
            {children}
        </button>
    ) : (
        <Link
            href={`/${activeLocale}/${href}`}
            className="relative flex items-center gap-2 px-4 py-2 text-cyan-400 dark:text-cyan-300"
            onClick={handleLinkClick}
        >
            {children}
        </Link>
    );
};

export default UiBrand;
