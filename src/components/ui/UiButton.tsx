'use client';

import { FC, ReactNode, MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import UiLoading from '@/components/ui/UiLoading';

interface IProps {
    href?: string;
    target?: '_blank';
    tabIndex?: number;
    variant?:
        | 'text'
        | 'text-btn'
        | 'text-attention'
        | 'solid'
        | 'solid-gray'
        | 'outline';
    sizeLoading?: string;
    bgLoading?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onLinkClick?: () => void;
    onBtnClick?: (event: any) => void;
    children: ReactNode;
}

const UiButton: FC<IProps> = ({
    href,
    target,
    tabIndex = 0,
    variant = 'solid',
    sizeLoading = 'h-6 min-h-6 w-6 min-w-6',
    bgLoading = 'bg-zinc-300 dark:bg-zinc-800',
    disabled,
    type = 'button',
    onLinkClick,
    onBtnClick,
    children,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLinkClick = () => {
        setIsLoading(true);
        onLinkClick && onLinkClick();
    };

    const handleBtnClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        disabled && event.preventDefault();
    };

    const activeLocale = useLocale();

    let classes =
        'inline-flex text-cyan-400 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-400';

    if (variant === 'text-btn') {
        classes =
            'flex px-4 py-2 text-cyan-400 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-400';
    }

    if (variant === 'text-attention') {
        classes = 'flex text-red-500 px-4 py-2 hover:text-red-600';
    }

    if (variant === 'solid') {
        classes =
            'flex text-zinc-800 px-4 py-2 after:z-10 before:absolute after:absolute before:inset-0 after:inset-0 before:rounded-md after:rounded-md before:duration-300 after:duration-300 before:ease-in-out after:ease-in-out before:transition-all after:transition-all before:bg-gradient-to-br after:bg-gradient-to-tl before:from-cyan-200 after:from-cyan-200 before:via-cyan-300 after:via-cyan-300 before:to-cyan-400 after:to-cyan-400 after:opacity-0 hover:after:opacity-100';
    }

    if (variant === 'solid-gray') {
        classes = 'flex text-zinc-300 p-2 bg-zinc-500 rounded-xl';
    }

    if (variant === 'outline') {
        classes =
            'flex text-zinc-800 px-4 overflow-hidden py-1.5 dark:text-zinc-300 border-2 border-zinc-800 dark:border-zinc-300 rounded-md hover:text-cyan-500 dark:hover:text-cyan-300 hover:border-cyan-500 dark:hover:border-cyan-300';
    }

    const tagProps: Record<string, any> = {
        className: `${disabled ? 'opacity-50 pointer-events-none ' : ''}${classes} items-center justify-start relative w-auto transition-all duration-150 ease-in-out`,
        tabIndex,
    };

    const linkProps: Record<string, any> = {
        ...tagProps,
        onClick: onLinkClick || handleLinkClick,
    };

    const btnProps: Record<string, any> = {
        ...tagProps,
        onClick: onBtnClick || handleBtnClick,
    };

    if (target === '_blank') {
        linkProps.target = target;
        linkProps.rel = 'noopener noreferrer external nofollow';
    }

    const spanClasses =
        'flex z-20 relative items-center justify-center gap-2 whitespace-nowrap text-left text-base font-bold';

    if (href) {
        return (
            <Link href={`/${activeLocale}/${href}`} {...linkProps}>
                <span className={spanClasses}>{children}</span>

                {isLoading && (
                    <UiLoading isLocal size={sizeLoading} bg={bgLoading} />
                )}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} {...btnProps}>
            <span className={spanClasses}>{children}</span>
        </button>
    );
};

export default UiButton;
