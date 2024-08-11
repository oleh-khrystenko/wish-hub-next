'use client';

import { FC, ReactNode, useState } from 'react';
import { ELang } from '@/models/Settings';
import Loading from '@/components/layouts/Loading';
import OutsideClickHandler from '@/helpers/hocs/OutsideClickHandler';

export interface IOption {
    label: ReactNode;
    value: ELang;
}

interface IProps {
    options: IOption[];
    isPending: boolean;
    value: IOption['value'];
    onChange: (value: IOption['value']) => void;
}

const UiSelect: FC<IProps> = ({ options, isPending, value, onChange }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClick = () => {
        setShow((prevState) => !prevState);
    };

    const handleOptionChange = (value: IOption['value']) => {
        onChange(value);
        setShow(false);
    };

    return (
        <OutsideClickHandler hid={() => setShow(false)}>
            <div
                className={`${show ? 'rounded-t-md' : 'rounded-md'} relative bg-zinc-300 transition-all duration-300 ease-in-out dark:bg-zinc-800`}
            >
                <button
                    className="relative z-20 flex items-center justify-center gap-2 rounded-md bg-zinc-300 px-4 py-2.5 dark:bg-zinc-800"
                    type="button"
                    onClick={handleClick}
                >
                    {isPending ? (
                        <Loading isLocal size="h-10 min-h-10 w-10 min-w-10" />
                    ) : (
                        <>
                            {options.find((option) => option.value === value)
                                ?.label || options[0].label}
                        </>
                    )}
                </button>

                <ul
                    className={`${show ? 'translate-y-0 scale-y-100' : '-translate-y-1/2 scale-y-0'} absolute left-0 top-full z-10 w-full origin-top rounded-b-md bg-zinc-300 transition-all duration-300 ease-in-out dark:bg-zinc-800`}
                >
                    {options.map((option) => {
                        if (option.value === value) return null;

                        return (
                            <li key={option.value}>
                                <button
                                    className="flex items-center justify-center gap-2 px-4 py-2.5"
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
