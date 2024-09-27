import { FC } from 'react';
import { useMyUserStore } from '@/stores/my-user';
import { useTranslations } from 'next-intl';
import CollectionIcon from '@/components/icons/CollectionIcon';

const Collections: FC = () => {
    const mainPageT = useTranslations('main-page');

    const collections = useMyUserStore((state) => state.collections);

    return (
        <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 pl-2 font-bold text-zinc-500 dark:text-zinc-400">
                <CollectionIcon classes="w-5 h-5 fill-cyan-400 dark:fill-cyan-300" />
                {mainPageT('collections')}:
            </p>

            <ul className="flex flex-col gap-3 rounded-xl bg-zinc-300 px-3 py-2 dark:bg-zinc-800">
                {collections.map((collection) => (
                    <li key={collection.id}>
                        <span className="text-zinc-600 dark:text-zinc-300">
                            {collection.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Collections;
