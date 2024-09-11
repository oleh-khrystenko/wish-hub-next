'use client';

import { FC, ReactNode, useRef, useState } from 'react';
import UiLoading from '@/components/ui/UiLoading';
import OutsideClickHandler from '@/helpers/hocs/OutsideClickHandler';
import ArrowChevronIcon from '@/components/icons/ArrowChevronIcon';

export interface IOption {
    label: ReactNode;
    value: string;
}

interface IProps {
    options: IOption[];
    bg?: string;
    hoverItemBg?: string;
    isPending?: boolean;
    withoutIcon?: boolean;
    expandTop?: boolean;
    value: IOption['value'];
    onChange: (value: IOption['value']) => void;
}

const UiSelect: FC<IProps> = ({
    options,
    bg = 'bg-zinc-100 dark:bg-zinc-950',
    hoverItemBg = 'hover:bg-zinc-200 hover:dark:bg-zinc-900',
    isPending,
    withoutIcon = false,
    expandTop,
    value,
    onChange,
}) => {
    const [show, setShow] = useState<boolean>(false);

    const wrapRef = useRef<HTMLDivElement>(null);

    let roundedClasses = 'rounded-md';
    if (show) {
        expandTop
            ? (roundedClasses = 'rounded-b-md')
            : (roundedClasses = 'rounded-t-md');
    }

    const handleClick = () => {
        setShow((prevState) => !prevState);
    };

    const handleOptionChange = (value: IOption['value']) => {
        onChange(value);
        setShow(false);
    };

    return (
        <div ref={wrapRef}>
            <OutsideClickHandler
                show={show}
                wrapRefCurrent={wrapRef.current}
                hide={() => setShow(false)}
            >
                <div
                    className={`${roundedClasses} ${bg} relative transition-all duration-300 ease-in-out`}
                >
                    <button
                        className={`${bg} relative z-10 flex w-full items-center gap-2 overflow-hidden rounded-md px-3 py-2.5`}
                        type="button"
                        onClick={handleClick}
                    >
                        <span className="flex w-full items-center justify-between">
                            {options.find((option) => option.value === value)
                                ?.label || options[0].label}

                            {!withoutIcon && (
                                <ArrowChevronIcon
                                    classes={`${show ? 'rotate-180' : ''} h-3 w-3 fill-zinc-800 dark:fill-zinc-300`}
                                />
                            )}
                        </span>

                        {isPending && (
                            <UiLoading
                                isLocal
                                size="h-10 min-h-10 w-10 min-w-10"
                                bg={bg}
                            />
                        )}
                    </button>

                    <ul
                        className={`${show ? 'scale-y-100' : 'scale-y-0'} ${bg} ${expandTop ? 'bottom-full origin-bottom rounded-t-md' : 'top-full origin-top rounded-b-md'} absolute left-0 z-30 w-full overflow-hidden transition-all duration-300 ease-in-out`}
                    >
                        {options.map((option) => {
                            if (option.value === value) return null;

                            return (
                                <li key={option.value}>
                                    <button
                                        className={`${hoverItemBg} relative flex w-full items-center gap-2 px-3 py-2.5 transition-all duration-300 ease-in-out`}
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
        </div>
    );
};

export default UiSelect;
