'use client';

import { FC, ReactNode, ChangeEvent, useEffect, useState } from 'react';

interface IProps {
    id: string;
    name: string;
    checked: boolean;
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode;
}

const Checkbox: FC<IProps> = ({
    id,
    name,
    checked,
    value,
    onChange,
    children,
}) => {
    const [isTransition, setIsTransition] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransition(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative">
            <div
                className={`${checked ? 'border-cyan-300 before:w-4 before:delay-100 after:h-2' : 'border-zinc-800 after:delay-100 dark:border-zinc-300'} absolute left-0 top-1 z-10 inline-block h-4 w-4 rounded-sm border-2 bg-transparent transition-all duration-300 ease-in-out before:absolute before:left-1.5 before:top-2 before:inline-block before:h-0.75 before:w-0 before:origin-top-left before:-rotate-45 before:rounded-full before:bg-cyan-300 before:shadow-checked-outline-light before:transition-all before:duration-150 before:ease-in-out after:absolute after:left-0.5 after:top-1 after:inline-block after:h-0 after:w-0.75 after:origin-top-left after:-rotate-45 after:rounded-full after:bg-cyan-300 after:transition-all after:duration-150 after:ease-in-out dark:before:shadow-checked-outline-dark tablet-md:before:shadow-checked-outline-light-tablet tablet-md:dark:before:shadow-checked-outline-dark-tablet`}
            ></div>

            <input
                className="hidden"
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                value={value}
                onChange={onChange}
            />

            <label
                className="relative z-10 cursor-pointer pl-6 text-zinc-800 dark:text-zinc-300"
                htmlFor={id}
            >
                {children}
            </label>
        </div>
    );
};

export default Checkbox;
