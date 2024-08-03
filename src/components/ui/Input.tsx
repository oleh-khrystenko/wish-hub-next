'use client';

import { FC, ChangeEvent, Ref, forwardRef, useState } from 'react';
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
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement | HTMLTextAreaElement, IProps>(({
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
                                                                                      }, ref) => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);

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
            <div className={ 'relative rounded-lg' + (type === 'multiline' ? ' bg-bg-dark' : '') }>
                {
                    type === 'multiline'
                        ? <textarea
                            className="relative z-10 py-1.6 px-2.5 w-full text-dark text-sm tablet-md:text-base appearance-none rounded-lg border-0 bg-transparent outline-none transition-slow min-h-20 resize-y textarea-scrollbar"
                            ref={ ref as Ref<HTMLTextAreaElement> }
                            id={ id }
                            name={ name }
                            placeholder="hidden"
                            value={ value }
                            onChange={ onChange }
                            { ...props }
                        />
                        : <input
                            className={ 'relative z-10 py-1.6 px-2.5 w-full text-dark text-sm tablet-md:text-base appearance-none rounded-lg border-0 bg-transparent outline-none transition-slow' + (type === 'password' ? ' pr-8' : '') }
                            ref={ ref as Ref<HTMLInputElement> }
                            id={ id }
                            name={ name }
                            type={ getTypes(type) }
                            inputMode={ type === 'number' ? 'numeric' : 'text' }
                            autoComplete={ type }
                            placeholder="hidden"
                            value={ value }
                            onChange={ onChange }
                            { ...props }
                        />
                }

                { type === 'password' && (
                    <button
                        className="absolute top-1/2 right-2.5 z-10 -translate-y-1/2"
                        type="button"
                        onClick={ () => setShowPassword(prevState => !prevState) }
                    >
                        { showPassword ? <CloseEyeIcon /> : <EyeIcon /> }
                    </button>
                ) }

                { type === 'search' && (
                    <>
                        { value && value.length > 0 ? (
                            <button
                                className="absolute top-1/2 right-2.5 z-10 -translate-y-1/2 rotate-45 text-3xl"
                                type="button"
                                onClick={ clear }
                            >
                                +
                            </button>
                        ) : (
                            <>
                                <div className="absolute top-1/2 right-2.5 z-10 -translate-y-1/2 flex items-center justify-center transition-slow">
                                    <SearchIcon />
                                </div>

                                {/*<div className="search-icon hovered">*/ }
                                {/*    Search*/ }
                                {/*</div>*/ }
                            </>
                        ) }
                    </>
                ) }

                <label
                    className="absolute top-0 left-0 z-10 flex items-center justify-center gap-1 py-1.5 pr-2.5 text-light text-sm tablet-md:text-base cursor-text whitespace-nowrap transition-slow"
                    htmlFor={ id }
                >
                    { label }
                    { tooltip && tooltip.length > 0 && (
                        <span
                            className="h-0 overflow-hidden transition-slow"
                            data-tooltip-id={ id }
                            data-tooltip-content={ tooltip }
                        >
                            <InfoIcon />
                        </span>
                    ) }
                </label>

                <div className="absolute bottom-0 left-0 z-10 w-full h-0.5 rounded-lg bg-primary pointer-events-none transition-slow"></div>
            </div>

            { error && <p className="error-text">{ error }</p> }
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
