'use client';

import { FC, ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSettingsStore } from '@/stores/settings';

interface IProps {
    href?: string;
    classesWrap?: string;
    target?: '_blank';
    tabIndex?: number;
    variant?:
        | 'text'
        | 'text-only'
        | 'text-btn'
        | 'text-attention'
        | 'solid'
        | 'solid-gray'
        | 'outline'
        | 'clear-styles';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onLinkClick?: () => void;
    onBtnClick?: (event: any) => void;
    children: ReactNode;
}

const UiButton: FC<IProps> = ({
    href,
    classesWrap,
    target,
    tabIndex = 0,
    variant = 'solid',
    disabled,
    type = 'button',
    onLinkClick,
    onBtnClick,
    children,
}) => {
    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const handleLinkClick = () => {
        setShowGlobalLoading(true);
        onLinkClick && onLinkClick();
    };

    const handleBtnClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        disabled && event.preventDefault();
    };

    const activeLocale = useLocale();

    let classes =
        'relative inline-flex items-center justify-start w-auto text-cyan-400 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-150 ease-in-out';

    if (variant === 'text-btn') {
        classes =
            'relative flex items-center justify-start w-auto px-4 py-2 text-cyan-400 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-150 ease-in-out';
    }

    if (variant === 'text-attention') {
        classes =
            'relative flex items-center justify-start w-auto text-red-500 px-4 py-2 hover:text-red-600 transition-all duration-150 ease-in-out';
    }

    if (variant === 'solid') {
        classes =
            'relative flex items-center justify-start w-auto text-zinc-800 mobile-xs:px-4 p-2 after:z-10 before:absolute after:absolute before:inset-0 after:inset-0 before:rounded-md after:rounded-md before:duration-300 after:duration-300 before:ease-in-out after:ease-in-out before:transition-all after:transition-all before:bg-gradient-to-br after:bg-gradient-to-tl before:from-cyan-200 after:from-cyan-200 before:via-cyan-300 after:via-cyan-300 before:to-cyan-400 after:to-cyan-400 after:opacity-0 hover:after:opacity-100 transition-all duration-150 ease-in-out';
    }

    if (variant === 'solid-gray') {
        classes =
            'relative flex items-center justify-start w-auto text-zinc-300 p-2 bg-zinc-500 rounded-xl transition-all duration-150 ease-in-out';
    }

    if (variant === 'outline') {
        classes =
            'relative flex items-center justify-start w-auto text-zinc-800 px-2 mobile-xs:px-4 overflow-hidden py-1.5 dark:text-zinc-300 border-2 border-zinc-800 dark:border-zinc-300 rounded-md hover:text-cyan-500 dark:hover:text-cyan-300 hover:border-cyan-500 dark:hover:border-cyan-300 transition-all duration-150 ease-in-out';
    }

    if (variant === 'clear-styles') {
        classes = '';
    }

    const tagProps: Record<string, any> = {
        className: `${disabled ? 'opacity-50 pointer-events-none ' : ''}${classes} ${classesWrap}`,
        tabIndex,
    };

    const linkProps: Record<string, any> = {
        ...tagProps,
        onClick: handleLinkClick,
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

    if (href !== undefined) {
        return (
            <Link href={`/${activeLocale}/${href}`} {...linkProps}>
                {variant === 'text-only' || variant === 'clear-styles' ? (
                    <>{children}</>
                ) : (
                    <span className={spanClasses}>{children}</span>
                )}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} {...btnProps}>
            {variant === 'text-only' || variant === 'clear-styles' ? (
                <>{children}</>
            ) : (
                <span className={spanClasses}>{children}</span>
            )}
        </button>
    );
};

export default UiButton;
