'use client';

import React, { FC, ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';

interface IProps {
    href?: string;
    target?: '_blank';
    tabIndex?: number;
    variant?: 'text' | 'text-attention' | 'solid' | 'outline';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: any) => void;
    children: ReactNode;
}

const UiButton: FC<IProps> = ({
    href,
    target,
    tabIndex = 0,
    variant = 'solid',
    disabled,
    type = 'button',
    onClick,
    children,
}) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        disabled && event.preventDefault();
    };

    const tagProps: Record<string, any> = {
        className: `w-auto transition-all duration-150 ease-in-out${disabled ? ' opacity-50 pointer-events-none' : ''}`,
        tabIndex,
        onClick: onClick || handleClick,
    };

    const linkTagProps: Record<string, any> = {
        ...tagProps,
    };

    if (target === '_blank') {
        linkTagProps.target = target;
        linkTagProps.rel = 'noopener noreferrer external nofollow';
    }

    if (href) {
        return (
            <Link href={href} {...linkTagProps}>
                <span>{children}</span>
            </Link>
        );
    }

    let spanClasses =
        'text-cyan-400 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-400';

    if (variant === 'text-attention') {
        spanClasses = 'text-red-500 hover:text-red-600';
    }

    if (variant === 'solid') {
        spanClasses =
            'text-zinc-800 before:-z-20 after:-z-10 before:absolute after:absolute before:inset-0 after:inset-0 before:rounded-md after:rounded-md before:duration-300 after:duration-300 before:ease-in-out after:ease-in-out before:transition-all after:transition-all before:bg-gradient-to-tl after:bg-gradient-to-br before:from-cyan-200 after:from-cyan-200 before:via-cyan-300 after:via-cyan-300 before:to-cyan-400 after:to-cyan-400 after:opacity-0 hover:after:opacity-100';
    }

    if (variant === 'outline') {
        spanClasses =
            'text-zinc-800 dark:text-zinc-300 border-2 border-zinc-800 dark:border-zinc-300 rounded-md hover:text-cyan-500 dark:hover:text-cyan-300 hover:border-cyan-500 dark:hover:border-cyan-300';
    }

    return (
        <button type={type} disabled={disabled} {...tagProps}>
            <span
                className={`${spanClasses} relative flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-left text-base font-bold transition-all duration-300 ease-in-out`}
            >
                {children}
            </span>
        </button>
    );
};

export default UiButton;
