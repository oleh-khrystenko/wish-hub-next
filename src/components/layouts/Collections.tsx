import { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useCollectionStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import UiButton from '@/components/ui/UiButton';
import CollectionIcon from '@/components/icons/CollectionIcon';
import EditIcon from '@/components/icons/EditIcon';
import BasketIcon from '@/components/icons/BasketIcon';

const Collections: FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const collections = useCollectionStore((state) => state.collections);

    const collectionId = searchParams.get('collectionId');

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const handleDeleteCollection = () => {
        console.log('handleDeleteCollection');
    };

    return (
        <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 pl-2 font-bold text-zinc-500 dark:text-zinc-400">
                <CollectionIcon classes="w-5 h-5 fill-cyan-400 dark:fill-cyan-300" />
                {mainPageT('collections')}:
            </p>

            <ul className="flex flex-col gap-1 rounded-xl bg-zinc-300 px-3 py-2 dark:bg-zinc-800">
                {collections.map((collection) => (
                    <li
                        key={collection.id}
                        className={`${collection.id === collectionId ? 'border-cyan-400 dark:border-cyan-300' : 'border-transparent'} flex items-center rounded-md border border-dashed`}
                    >
                        <Link
                            href={`${pathname}?collectionId=${collection.id}`}
                            className="w-full rounded-md px-3 py-2 text-left font-bold text-zinc-600 transition-all duration-300 ease-in-out hover:bg-zinc-200 dark:text-zinc-300 hover:dark:bg-zinc-600"
                            onClick={() => setShowSlidePanel(false)}
                        >
                            {collection.name}
                        </Link>

                        {(collection.id !== collectionId ||
                            pathname !==
                                `/${activeLocale}/user/${selectedUserId}/collection/editor`) && (
                            <UiButton
                                variant="text-only"
                                href={`user/${myUser?.id}/collection/editor?collectionId=${collection.id}`}
                                onLinkClick={() => setShowSlidePanel(false)}
                            >
                                <span className="rounded-md p-3 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600">
                                    <EditIcon classes="w-4 h-4 fill-zinc-800 dark:fill-zinc-300" />
                                </span>
                            </UiButton>
                        )}

                        <button
                            className="rounded-md p-2.5 transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600"
                            type="button"
                            onClick={handleDeleteCollection}
                        >
                            <BasketIcon />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Collections;
