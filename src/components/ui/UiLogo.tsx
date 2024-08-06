import { FC } from 'react';
import { Manrope } from 'next/font/google';
import { useLocale } from 'next-intl';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';

const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

interface IProps {
    href?: string;
}

const UiLogo: FC<IProps> = ({ href = '' }) => {
    const activeLocale = useLocale();

    return (
        <UiButton href={`/${activeLocale}/${href}`} variant="text-btn">
            <LogoIcon />

            <span className={`${manrope.className} text-xl`}>Wish Hub</span>
        </UiButton>
    );
};

export default UiLogo;
