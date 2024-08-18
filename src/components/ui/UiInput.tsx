'use client';

import { ChangeEvent, FC, forwardRef, Ref, useState } from 'react'; // forwardRef потрібен для валідації в бібліотеці react-hook-form
import UiTooltip from '@/components/ui/UiTooltip';
import CloseEyeIcon from '@/components/icons/CloseEyeIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import InfoIcon from '@/components/icons/InfoIcon';

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

const UiInput: FC<IProps> = forwardRef<
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
            <div className="w-full">
                <div
                    className={`relative rounded-md ${type === 'multiline' && 'bg-zinc-300 pr-1 dark:bg-zinc-800'}`}
                >
                    {type === 'multiline' ? (
                        <textarea
                            className="input textarea-scrollbar relative z-20 min-h-20 w-full resize-y appearance-none rounded-md border-0 bg-transparent px-2.5 py-2 text-base text-zinc-900 outline-none transition-all duration-300 ease-in-out placeholder:text-transparent dark:text-zinc-800"
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
                                'input relative z-20 w-full appearance-none rounded-md border-0 bg-transparent px-2.5 py-2 text-base text-zinc-900 outline-none transition-all duration-300 ease-in-out placeholder:text-transparent dark:text-zinc-800' +
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
                                    <div className="search-icon absolute right-2.5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center transition-all duration-300 ease-in-out">
                                        <SearchIcon />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <label
                        className="absolute left-0 top-0 z-10 flex cursor-text items-center justify-center gap-1 whitespace-nowrap py-1.5 pl-2.5 text-sm text-zinc-700 transition-all duration-300 ease-in-out dark:text-zinc-400 tablet-md:text-base"
                        htmlFor={id}
                    >
                        {label}
                        {tooltip && tooltip.length > 0 && (
                            <>
                                <span
                                    className="tooltip h-0 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out"
                                    data-tooltip-id={id}
                                    data-tooltip-content={tooltip}
                                >
                                    <InfoIcon />
                                </span>
                                <UiTooltip id={id} />
                            </>
                        )}
                    </label>

                    <div className="input-bg pointer-events-none absolute bottom-0 left-0 z-10 h-0.5 w-full rounded-md bg-gradient-to-br from-cyan-200 via-cyan-300 to-cyan-400 transition-all duration-300 ease-in-out"></div>
                </div>

                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

UiInput.displayName = 'UiInput';

export default UiInput;
