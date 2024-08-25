'use client';

import { FC, ReactNode, useState } from 'react';
import Loading from '@/components/layouts/Loading';
import OutsideClickHandler from '@/helpers/hocs/OutsideClickHandler';
import ArrowChevronIcon from '@/components/icons/ArrowChevronIcon';

export interface IOption {
    label: ReactNode;
    value: string;
}

interface IProps {
    options: IOption[];
    bg?: string;
    isPending?: boolean;
    withoutIcon?: boolean;
    value: IOption['value'];
    onChange: (value: IOption['value']) => void;
}

const UiSelect: FC<IProps> = ({
    options,
    bg = 'bg-zinc-100 dark:bg-zinc-950',
    isPending,
    withoutIcon = false,
    value,
    onChange,
}) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClick = () => {
        setShow((prevState) => !prevState);
    };

    const handleOptionChange = (value: IOption['value']) => {
        onChange(value);
        setShow(false);
    };

    return (
        <OutsideClickHandler hide={() => setShow(false)}>
            <div
                className={`${show ? 'rounded-t-md' : 'rounded-md'} ${bg} relative transition-all duration-300 ease-in-out`}
            >
                <button
                    className={`${bg} relative z-10 flex w-full items-center gap-2 rounded-md px-3 py-2.5`}
                    type="button"
                    onClick={handleClick}
                >
                    {isPending ? (
                        <Loading isLocal size="h-10 min-h-10 w-10 min-w-10" />
                    ) : (
                        <span className="flex w-full items-center justify-between">
                            {options.find((option) => option.value === value)
                                ?.label || options[0].label}

                            {!withoutIcon && (
                                <ArrowChevronIcon
                                    classes={`${show ? 'rotate-180' : ''} h-3 w-3 fill-zinc-800 dark:fill-zinc-300`}
                                />
                            )}
                        </span>
                    )}
                </button>

                <ul
                    className={`${show ? 'scale-y-100' : 'scale-y-0'} ${bg} absolute left-0 top-full z-30 w-full origin-top rounded-b-md transition-all duration-300 ease-in-out`}
                >
                    {options.map((option) => {
                        if (option.value === value) return null;

                        return (
                            <li key={option.value}>
                                <button
                                    className="relative flex w-full items-center gap-2 px-3 py-2.5"
                                    type="button"
                                    onClick={() =>
                                        handleOptionChange(option.value)
                                    }
                                >
                                    {option.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </OutsideClickHandler>
    );
};

export default UiSelect;
