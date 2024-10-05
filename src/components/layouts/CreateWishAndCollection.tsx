import { FC } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    currentPage: string;
}

const CreateWishAndCollection: FC<IProps> = ({ currentPage }) => {
    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);

    return (
        <li className="flex flex-col gap-2">
            {wishes.length > 0 && (
                <div className="relative flex h-2/3 items-center justify-center rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                    <Link
                        href={`/${activeLocale}/user/${myUser?.id}/collection/editor`}
                        className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-transparent p-2 transition-all duration-300 ease-in-out hover:-rotate-3 hover:border-cyan-500 hover:dark:border-cyan-300"
                    >
                        <CrossIcon classes="w-28 h-28 -rotate-45 group-hover:stroke-cyan-500 group-hover:dark:stroke-cyan-300 stroke-zinc-700 dark:stroke-zinc-400" />

                        <span className="text-center text-xs font-bold text-zinc-700 group-hover:text-cyan-500 dark:text-zinc-400 group-hover:dark:text-cyan-300 mobile-xs:text-sm mobile-md:text-base">
                            {mainPageT('create_collection')}
                        </span>
                    </Link>
                </div>
            )}

            <div className="relative flex h-full items-center justify-center rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                <Link
                    href={`/${activeLocale}/user/${myUser?.id}/wish/editor?fromPage=${currentPage}`}
                    className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-transparent p-2 transition-all duration-300 ease-in-out hover:-rotate-3 hover:border-cyan-500 hover:dark:border-cyan-300"
                >
                    <CrossIcon classes="w-28 h-28 -rotate-45 group-hover:stroke-cyan-500 group-hover:dark:stroke-cyan-300 stroke-zinc-700 dark:stroke-zinc-400" />

                    <span className="text-center text-xl font-bold text-zinc-700 group-hover:text-cyan-500 dark:text-zinc-400 group-hover:dark:text-cyan-300">
                        {mainPageT('create-wish')}
                    </span>
                </Link>
            </div>
        </li>
    );
};

export default CreateWishAndCollection;
