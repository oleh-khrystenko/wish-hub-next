'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { UA, US } from 'country-flag-icons/react/3x2';
import { ELang } from '@/models/Settings';
import UiSelect, { IOption } from '@/components/ui/UiSelect';

const options: IOption[] = [
    {
        label: (
            <>
                <US title="United States" className="h-5 w-7" />
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    Eng
                </span>
            </>
        ),
        value: ELang.EN,
    },
    {
        label: (
            <>
                <UA title="Ukraine" className="h-5 w-7" />
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    Укр
                </span>
            </>
        ),
        value: ELang.UK,
    },
];

function UiLangSelect() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const activeLocale = useLocale();
    const pathname = usePathname();

    const handleChangeLang = (value: IOption['value']) => {
        startTransition(() => {
            const newPath = pathname.replace(`/${activeLocale}`, '');
            router.replace(`/${value}${newPath}`);
        });
    };

    return (
        <UiSelect
            options={options}
            isPending={isPending}
            value={activeLocale as ELang}
            onChange={handleChangeLang}
        />
    );
}

export default UiLangSelect;
