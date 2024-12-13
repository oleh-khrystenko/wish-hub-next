import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import collectionApi from '@/stores/collection/api';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    selectedUserFullName: string;
}

const Title: FC<IProps> = ({ selectedUserFullName }) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [collectionName, setCollectionName] =
        useState<ICollection['name']>('');

    const searchParams = useSearchParams();

    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const collectionId = searchParams.get('collectionId');

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!collectionId) return;

        const fetchCollection = async () => {
            const response = await collectionApi.getCollection({
                collectionId,
            });

            setCollectionName(response.data.name);
        };

        fetchCollection().finally();
    }, [firstLoad, collectionId]);

    return (
        <div className="my-2 pl-2.5">
            {selectedUserId ? (
                <>
                    {myUser?.id === selectedUserId ? (
                        <h1 className="flex max-w-full flex-wrap items-center">
                            <span className="whitespace-nowrap text-2xl font-bold text-zinc-600 dark:text-zinc-400 tablet-lg:text-3xl">
                                {mainPageT(
                                    collectionId ? 'my_collection' : 'my_wishes'
                                )}
                            </span>
                            {collectionId && collectionName && (
                                <>
                                    &nbsp;
                                    <span
                                        className="min-h-7 max-w-full truncate pr-1 text-2xl font-bold text-zinc-950 dark:text-zinc-100 tablet-md:text-3xl"
                                        title={collectionName}
                                    >
                                        &quot;{collectionName}&quot;
                                    </span>
                                </>
                            )}
                        </h1>
                    ) : (
                        <h1 className="flex max-w-full flex-wrap items-center">
                            {collectionId ? (
                                <>
                                    <span className="mr-1 min-h-7 whitespace-nowrap text-2xl font-bold text-zinc-600 dark:text-zinc-400 tablet-md:text-3xl">
                                        {mainPageT('collection')}
                                    </span>
                                    <span
                                        className="min-h-7 max-w-full truncate pr-1 text-2xl font-bold text-zinc-950 dark:text-zinc-100 tablet-md:text-3xl"
                                        title={collectionName}
                                    >
                                        &quot;{collectionName}&quot;
                                    </span>
                                    &nbsp;
                                    <span className="mr-1 min-h-7 whitespace-nowrap text-2xl font-bold text-zinc-600 dark:text-zinc-400 tablet-md:text-3xl">
                                        {mainPageT('of_user')}
                                    </span>
                                </>
                            ) : (
                                <span className="mr-1 min-h-7 whitespace-nowrap text-2xl font-bold text-zinc-600 dark:text-zinc-400 tablet-md:text-3xl">
                                    {mainPageT('wishes_of_user')}
                                </span>
                            )}
                            <UiButton
                                href={`user/${selectedUserId}/collection`}
                                variant="clear-styles"
                            >
                                <span
                                    className="min-h-7 max-w-full truncate pr-1 text-2xl font-bold text-zinc-950 dark:text-zinc-100 tablet-md:text-3xl"
                                    title={selectedUserFullName}
                                >
                                    &quot;{selectedUserFullName}&quot;
                                </span>
                            </UiButton>
                        </h1>
                    )}
                </>
            ) : (
                <h1 className="text-2xl font-bold text-zinc-600 dark:text-zinc-400 tablet-md:text-3xl">
                    {mainPageT('wishes_of_users')}
                </h1>
            )}
        </div>
    );
};

export default Title;
