'use client';

import { FC, ChangeEvent } from 'react';

interface IProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UiRadio: FC<IProps> = ({ id, name, value, checked, label, onChange }) => {
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="text-gray-700">{label}</span>
        </label>
    );
};

export default UiRadio;
