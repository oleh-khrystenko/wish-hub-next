'use client';

import { FC, ChangeEvent } from 'react';

interface IProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    label: string;
    bg?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UiRadio: FC<IProps> = ({
    id,
    name,
    value,
    checked,
    label,
    bg = 'after:bg-zinc-200 dark:after:bg-zinc-900',
    onChange,
}) => {
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={`${checked ? 'before:bg-cyan-500 after:scale-50 dark:before:bg-cyan-300' : 'after:scale-100'} ${bg} shadow-border relative h-4 w-4 cursor-pointer rounded-full before:absolute before:h-full before:w-full before:rounded-full before:transition-all before:duration-300 before:ease-in-out after:absolute after:h-full after:w-full after:rounded-full after:transition-all after:duration-300 after:ease-in-out`}
            />
            <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
        </label>
    );
};

export default UiRadio;
