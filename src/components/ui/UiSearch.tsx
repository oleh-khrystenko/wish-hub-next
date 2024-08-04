'use client';

import { FC, ChangeEvent, useState, useRef, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import UiInput from '@/components/ui/UiInput';

const useDebounce = (callback: () => void) => {
    const ref = useRef<() => void>();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    return useMemo(() => {
        const callRef = () => {
            ref?.current?.();
        };

        return debounce(callRef, 500);
    }, []);
};

interface Props {
    id: string;
    label: string;
    value?: string;
    changeSearchBar: (value: string) => void;
}

const UiSearch: FC<Props> = ({ id, label, value, changeSearchBar }) => {
    const [searchBar, setSearchBar] = useState('');

    const send = useDebounce(() => changeSearchBar(searchBar.trim()));

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();

        if (event.target.value.startsWith(' ')) {
            setSearchBar(value);
        } else if (value.length > 0) {
            setSearchBar(event.target.value);
        } else {
            setSearchBar('');
        }
        send();
    };

    const clear = () => {
        setSearchBar('');
        send();
    };

    useEffect(() => {
        if (value !== undefined && value !== searchBar) {
            setSearchBar(value);
        }
    }, [value]);

    return (
        <UiInput
            id={id}
            name={id}
            type="search"
            label={label}
            value={searchBar}
            clear={clear}
            onChange={(event) => change(event as ChangeEvent<HTMLInputElement>)}
        />
    );
};

export default UiSearch;
