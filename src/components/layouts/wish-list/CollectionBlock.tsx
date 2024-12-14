import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import UiButton from '@/components/ui/UiButton';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon';

interface IProps {
    backLink: string;
    visibleCollectionsCount: number;
}

const CollectionBlock: FC<IProps> = ({ backLink, visibleCollectionsCount }) => {
    const searchParams = useSearchParams();

    const allPagesT = useTranslations('all-pages');

    const collections = useCollectionsStore((state) => state.list);

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const collectionId = searchParams.get('collectionId');

    if (collectionId) {
        return (
            <li>
                <UiButton
                    href={backLink}
                    variant="clear-styles"
                    classesWrap="flex items-center justify-center gap-2 h-full w-full min-h-56 p-3 text-zinc-600 dark:text-zinc-400 rounded-md border-2 border-zinc-300 p-4 dark:border-zinc-700"
                >
                    <ArrowBackIcon classes="w-4 h-4 fill-zinc-600 dark:fill-zinc-400" />
                    {allPagesT('all_wishes')}
                </UiButton>
            </li>
        );
    }

    return (
        <>
            {collections.length > 0 &&
                collections.map((collection, idx) => {
                    if (idx > visibleCollectionsCount) return null;

                    if (idx === visibleCollectionsCount) {
                        return (
                            <li
                                key={collection.id}
                                className="h-full min-h-56 w-full"
                            >
                                <UiButton
                                    variant="clear-styles"
                                    classesWrap="flex items-center justify-center gap-1 h-full w-full text-center text-sm text-zinc-600 dark:text-zinc-400 tablet-md:text-base rounded-md border-2 border-zinc-300 p-4 dark:border-zinc-700"
                                    onBtnClick={() => setShowSlidePanel(true)}
                                >
                                    {allPagesT('all_collections')}
                                </UiButton>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={collection.id}
                            className="h-full min-h-56 w-full"
                        >
                            <UiButton
                                href={`${backLink}?collectionId=${collection.id}`}
                                variant="clear-styles"
                                classesWrap="flex flex-col items-center justify-center gap-1 h-full w-full rounded-md border-2 border-zinc-300 p-4 dark:border-zinc-700"
                            >
                                <span className="text-center text-sm text-zinc-600 dark:text-zinc-400 tablet-md:text-base">
                                    {allPagesT('Collection')}:
                                </span>
                                <span className="text-center text-lg font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-xl">
                                    {collection.name}
                                </span>
                            </UiButton>
                        </li>
                    );
                })}
        </>
    );
};

export default CollectionBlock;
