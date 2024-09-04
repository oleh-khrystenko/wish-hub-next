'use client';

import { FC, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { UA, US } from 'country-flag-icons/react/3x2';
import { ELang } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import UiSelect, { IOption } from '@/components/ui/UiSelect';

const options = (withoutText: boolean = false): IOption[] => [
    {
        label: (
            <div className="flex items-center gap-1.5">
                <US title="United States" className="h-5 w-7" />
                {!withoutText && (
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        Eng
                    </span>
                )}
            </div>
        ),
        value: ELang.EN,
    },
    {
        label: (
            <div className="flex items-center gap-1.5">
                <UA title="Ukraine" className="h-5 w-7" />
                {!withoutText && (
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        Укр
                    </span>
                )}
            </div>
        ),
        value: ELang.UK,
    },
];

interface IProps {
    withoutText?: boolean;
    expandTop?: boolean;
}

const LangSelect: FC<IProps> = ({ withoutText, expandTop }) => {
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);
    const changeLang = useMyUserStore((state) => state.changeLang);

    const handleChangeLang = (value: IOption['value']) => {
        startTransition(async () => {
            if (myUser) {
                await changeLang(
                    { userId: myUser.id, lang: value as ELang },
                    alertsT('my-user-api.change-lang.error')
                );
            }

            const newPath = pathname.replace(`/${activeLocale}`, '');
            router.replace(`/${value}${newPath}`);
        });
    };

    return (
        <UiSelect
            options={options(withoutText)}
            bg="bg-zinc-300 dark:bg-zinc-800"
            isPending={isPending}
            withoutIcon
            expandTop={expandTop}
            value={activeLocale as ELang}
            onChange={handleChangeLang}
        />
    );
};

export default LangSelect;
