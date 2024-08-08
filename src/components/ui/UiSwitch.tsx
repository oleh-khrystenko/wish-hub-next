import { ChangeEvent, FC, ReactNode } from 'react';

interface IProps {
    id: string;
    name: string;
    checked: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
}

const UiSwitch: FC<IProps> = ({ id, name, checked, onChange, children }) => {
    return (
        <label className="cursor-pointer py-2">
            <div
                className={`${checked ? 'before:left-6' : 'before:left-1'} relative flex h-6 w-12 items-center justify-between gap-2 rounded-full bg-neutral-400 px-1.5 py-1 shadow-inner before:absolute before:top-1/2 before:h-5 before:w-5 before:-translate-y-1/2 before:rounded-full before:bg-gradient-to-b before:from-stone-500 before:to-stone-700 before:transition-all before:duration-300 before:ease-in-out dark:bg-neutral-500 dark:before:from-stone-600 dark:before:to-stone-800`}
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
