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
            <div className="mt-8 w-full">
                <div className="relative rounded-md">
                    {type === 'multiline' ? (
                        <textarea
                            className="input transition-slow textarea-scrollbar relative z-20 min-h-20 w-full resize-y appearance-none rounded-md border-0 bg-transparent px-2.5 py-2 text-sm text-dark outline-none placeholder:text-transparent tablet-md:text-base"
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
                                'input transition-slow relative z-20 w-full appearance-none rounded-md border-0 bg-transparent px-2.5 py-2 text-sm text-dark outline-none placeholder:text-transparent tablet-md:text-base' +
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
                            className="input-icon absolute right-2.5 top-1/2 z-20 -translate-y-1/2"
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
                                    className="input-icon absolute right-2.5 top-1/2 z-20 -translate-y-1/2 rotate-45 text-3xl"
                                    type="button"
                                    onClick={clear}
                                >
                                    +
                                </button>
                            ) : (
                                <>
                                    <div className="search-icon transition-slow absolute right-2.5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center">
                                        <SearchIcon />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <label
                        className="transition-slow absolute left-0 top-0 z-10 flex cursor-text items-center justify-center gap-1 whitespace-nowrap py-1.5 pl-2.5 text-sm text-light tablet-md:text-base"
                        htmlFor={id}
                    >
                        {label}
                        {tooltip && tooltip.length > 0 && (
                            <span
                                className="tooltip transition-slow h-0 cursor-pointer overflow-hidden"
                                data-tooltip-id={id}
                                data-tooltip-content={tooltip}
                            >
                                <InfoIcon />
                            </span>
                        )}
                    </label>

                    <div className="action-background transition-slow bg-gradient pointer-events-none absolute bottom-0 left-0 z-10 h-0.5 w-full rounded-md"></div>
                </div>

                {error && <p className="error-text">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
