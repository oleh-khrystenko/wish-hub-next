'use client';

import React, { FC, ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';

interface IProps {
    to?: string;
    target?: '_blank';
    tabIndex?: number;
    variant?: 'text';
    color?: 'primary-color' | 'action-color';
    fontSize?: 'small';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: any) => void;
    children: ReactNode;
}

const UiButton: FC<IProps> = ({
    to,
    target,
    tabIndex = 0,
    variant,
    color,
    fontSize,
    disabled,
    type = 'button',
    onClick,
    children,
}) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        disabled && event.preventDefault();
    };

    const tagProps: Record<string, any> = {
        className: `button${color ? ` ${color}` : ''}${variant ? ` ${variant}` : ''}${fontSize ? ` ${fontSize}` : ''}${disabled ? ' disabled' : ''}`,
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

    if (to) {
        return (
            <Link href={to} {...linkTagProps}>
                <span>{children}</span>
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} {...tagProps}>
            <span>{children}</span>
        </button>
    );
};

export default UiButton;
