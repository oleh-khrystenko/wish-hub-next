'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import useValidations from '@/helpers/hooks/UseValidations';
import WishList from '@/app/[locale]/user/[userId]/collection/editor/WishList';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import MainIcon from '@/components/icons/MainIcon';
import CollectionIcon from '@/components/icons/CollectionIcon';
import EditIcon from '@/components/icons/EditIcon';

type TInputs = {
    collectionName: ICollection['name'];
};

const Body: FC = () => {
    const [selectedWishError, setSelectedWishError] = useState<string>('');

    const { userId } = useParams<{ userId: string }>();

    const collectionPageT = useTranslations('collection-page');
    const allPagesT = useTranslations('all-pages');

    const collections = useMyUserStore((state) => state.collections);
    const createCollection = useMyUserStore((state) => state.createCollection);

    const wishes = useWishesStore((state) => state.list);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>({
        defaultValues: {
            collectionName: collections[0]?.name || '',
        },
    });

    const { collectionNameValidation } = useValidations();

    const breadcrumbsPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: `user/${userId}/collection`,
            icon: (
                <CollectionIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('collection'),
        },
        {
            href: `user/${userId}/collection/editor`,
            icon: (
                <EditIcon classes="w-3.5 h-3.5 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('collection_editor'),
        },
    ];

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        console.log('onSubmit: ', data);
        console.log('wishes: ', wishes);
        console.log('selectedWishError: ', selectedWishError);

        await createCollection(
            {
                userId,
                wishIdList: [],
                name: data.collectionName,
            },
            allPagesT('my-user-api.create-collection.error')
        );
    };

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-3 flex grow flex-col px-3 pb-5 desktop-sm:px-0">
                <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {collectionPageT('editor_title')}
                </h1>

                <form
                    className="mt-6 flex items-start gap-10"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <UiInput
                        {...register(
                            'collectionName',
                            collectionNameValidation
                        )}
                        id="collectionName"
                        name="collectionName"
                        type="text"
                        label={collectionPageT('collection_name')}
                        error={errors?.collectionName?.message}
                    />

                    <UiButton type="submit">
                        {collectionPageT('create')}
                    </UiButton>
                </form>

                <WishList userId={userId} />
            </div>
        </main>
    );
};

export default Body;
