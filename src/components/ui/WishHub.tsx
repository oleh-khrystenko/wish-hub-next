import { FC } from 'react';
import { Manrope } from 'next/font/google';
import UiButton from '@/components/ui/UiButton';
import LogoIcon from '@/components/icons/LogoIcon';

const manrope = Manrope({ subsets: ['latin'], weight: ['700'] });

interface IProps {
    href?: string;
    withLogo?: boolean;
    isBig?: boolean;
}

const WishHub: FC<IProps> = ({
    href = 'main',
    withLogo = false,
    isBig = false,
}) => {
    return (
        <UiButton href={href} variant="text-btn">
            {withLogo && <LogoIcon />}

            <span
                className={`${manrope.className} ${isBig ? 'tablet-md:text-4xl' : 'tablet-md:text-2xl'} text-xl`}
            >
                Wish Hub
            </span>
        </UiButton>
    );
};

export default WishHub;
