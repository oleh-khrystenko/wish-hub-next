'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import { useLocale } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import LogoIcon from '@/components/icons/LogoIcon';
import { useSettingsStore } from '@/stores/settings';

const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

interface IProps {
    logoId?: string;
    disabled?: boolean;
    withLogo?: boolean;
    isBig?: boolean;
}

const UiBrand: FC<IProps> = ({
    logoId = 'brand-logo',
    disabled,
    withLogo,
    isBig,
}) => {
    const activeLocale = useLocale();

    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

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
        </>
    );

    if (disabled) {
        return (
            <div className="relative flex items-center gap-2 px-4 py-2 text-cyan-400 dark:text-cyan-300">
                {children}
            </div>
        );
    }

    return (
        <Link
            href={`/${activeLocale}/${myUser ? 'main' : ''}`}
            className="relative flex items-center gap-2 px-4 py-2 text-cyan-400 dark:text-cyan-300"
            onClick={() => setShowGlobalLoading(true)}
        >
            {children}
        </Link>
    );
};

export default UiBrand;
