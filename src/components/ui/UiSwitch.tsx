import { ChangeEvent, FC, ReactNode } from 'react';

interface IProps {
    id: string;
    name: string;
    checked: boolean;
    bg?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
}

const UiSwitch: FC<IProps> = ({
    id,
    name,
    checked,
    bg = 'bg-neutral-500',
    onChange,
    children,
}) => {
    return (
        <label className="cursor-pointer py-2">
            <div
                style={{
                    boxShadow:
                        'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2), inset 0 0 4px 2px rgba(0, 0, 0, 0.2)',
                }}
                className={`${checked ? 'before:left-1' : 'before:left-6'} ${bg} relative flex h-6 w-12 items-center justify-between gap-2 rounded-full px-1.5 py-1 transition-all duration-300 ease-in-out before:absolute before:top-1/2 before:h-5 before:w-5 before:-translate-y-1/2 before:rounded-full before:bg-gradient-to-b before:from-stone-600 before:to-stone-800 before:transition-all before:duration-300 before:ease-in-out dark:before:from-stone-600 dark:before:to-stone-800`}
            >
                <input
                    className="hidden"
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
                {children}
            </div>
        </label>
    );
};

export default UiSwitch;
