'use client';

import { ChangeEvent, FC, forwardRef, Ref, useState } from 'react';
import CloseEyeIcon from '@/components/icons/CloseEyeIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import InfoIcon from '@/components/icons/InfoIcon'; // forwardRef потрібен для валідації в бібліотеці react-hook-form

interface IProps {
    id: string;
    name: string;
    type: 'text' | 'password' | 'number' | 'search' | 'multiline';
    label: string;
    tooltip?: string;
    value?: string;
    error?: string;
    clear?: () => void;
    onChange?: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const Input: FC<IProps> = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    IProps
>(
    (
        {
            id,
            name,
            type,
            label,
            tooltip,
            value,
            error,
            clear,
            onChange,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState<boolean>(false);

        const getTypes = (type: string) => {
            switch (type) {
                case 'password':
                    return showPassword ? 'text' : 'password';
                case 'number':
                    return 'text';
                default:
                    return type;
            }
        };

        return (
            <div className="mt-2 w-full">
                <div
                    className={
                        'relative rounded-lg' +
                        (type === 'multiline' ? ' bg-bg-dark' : '')
                    }
                >
                    {type === 'multiline' ? (
                        <textarea
                            className="py-1.6 bg-transparent transition-slow textarea-scrollbar relative z-10 min-h-20 w-full resize-y appearance-none rounded-lg border-0 px-2.5 text-sm text-dark outline-none tablet-md:text-base"
                            ref={ref as Ref<HTMLTextAreaElement>}
                            id={id}
                            name={name}
                            placeholder="hidden"
                            value={value}
                            onChange={onChange}
                            {...props}
                        />
                    ) : (
                        <input
                            className={
                                'py-1.6 bg-transparent transition-slow relative z-10 w-full appearance-none rounded-lg border-0 px-2.5 text-sm text-dark outline-none tablet-md:text-base' +
                                (type === 'password' ? ' pr-8' : '')
                            }
                            ref={ref as Ref<HTMLInputElement>}
                            id={id}
                            name={name}
                            type={getTypes(type)}
                            inputMode={type === 'number' ? 'numeric' : 'text'}
                            autoComplete={type}
                            placeholder="hidden"
                            value={value}
                            onChange={onChange}
                            {...props}
                        />
                    )}

                    {type === 'password' && (
                        <button
                            className="absolute right-2.5 top-1/2 z-10 -translate-y-1/2"
                            type="button"
                            onClick={() =>
                                setShowPassword((prevState) => !prevState)
                            }
                        >
                            {showPassword ? <CloseEyeIcon /> : <EyeIcon />}
                        </button>
                    )}

                    {type === 'search' && (
                        <>
                            {value && value.length > 0 ? (
                                <button
                                    className="absolute right-2.5 top-1/2 z-10 -translate-y-1/2 rotate-45 text-3xl"
                                    type="button"
                                    onClick={clear}
                                >
                                    +
                                </button>
                            ) : (
                                <>
                                    <div className="transition-slow absolute right-2.5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center">
                                        <SearchIcon />
                                    </div>

                                    {/*<div className="search-icon hovered">*/}
                                    {/*    Search*/}
                                    {/*</div>*/}
                                </>
                            )}
                        </>
                    )}

                    <label
                        className="transition-slow absolute left-0 top-0 z-10 flex cursor-text items-center justify-center gap-1 whitespace-nowrap py-1.5 pr-2.5 text-sm text-light tablet-md:text-base"
                        htmlFor={id}
                    >
                        {label}
                        {tooltip && tooltip.length > 0 && (
                            <span
                                className="transition-slow h-0 overflow-hidden"
                                data-tooltip-id={id}
                                data-tooltip-content={tooltip}
                            >
                                <InfoIcon />
                            </span>
                        )}
                    </label>

                    <div className="transition-slow pointer-events-none absolute bottom-0 left-0 z-10 h-0.5 w-full rounded-lg bg-primary"></div>
                </div>

                {error && <p className="error-text">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
