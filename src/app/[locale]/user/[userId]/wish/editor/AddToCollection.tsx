import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { TWishFormInputs } from '@/models/Wish';
import { ECollectionSort } from '@/models/Collection';
import { EAddToCollection } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useCollectionsStore } from '@/stores/collection';
import { COLLECTION_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UiRadio from '@/components/ui/UiRadio';
import UiInput from '@/components/ui/UiInput';
import UiLoading from '@/components/ui/UiLoading';

interface IProps {
    register: UseFormRegister<TWishFormInputs>;
    errors: FieldErrors<TWishFormInputs>;
    handleReactHookFormInputChange: (
        type: keyof TWishFormInputs,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const AddToCollection: FC<IProps> = ({
    register,
    errors,
    handleReactHookFormInputChange,
}) => {
    const [show, setShow] = useState<EAddToCollection>(EAddToCollection.NONE);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const { userId } = useParams<{ userId: string }>();

    const allPagesT = useTranslations('all-pages');
    const mainPageT = useTranslations('main-page');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const collections = useCollectionsStore((state) => state.list);
    const page = useCollectionsStore((state) => state.page);
    const stopRequests = useCollectionsStore((state) => state.stopRequests);
    const getCollections = useCollectionsStore((state) => state.getCollections);
    const addCollections = useCollectionsStore((state) => state.addCollections);

    const handleChangeShow = (e: ChangeEvent<HTMLInputElement>) => {
        setShow(e.target.value as EAddToCollection);
    };

    useEffect(() => {
        const fetchWishes = async () => {
            if (firstLoad) {
                setFirstLoad(false);
                return;
            }

            if (!inView || stopRequests || !userId) return;

            setIsLoadingAdd(true);

            await addCollections(
                {
                    myId: myUser?.id,
                    userId,
                    page,
                    limit: COLLECTION_PAGINATION_LIMIT,
                    search: '',
                    sort: ECollectionSort.CREATED_DESC,
                },
                allPagesT('collections.get-collections.error')
            );

            setIsLoadingAdd(false);
        };

        fetchWishes().finally();
    }, [inView]);

    useEffect(() => {
        if (!userId) return;

        getCollections(
            {
                myId: myUser?.id,
                userId,
                page: 1,
                limit: COLLECTION_PAGINATION_LIMIT,
                search: '',
                sort: ECollectionSort.CREATED_DESC,
            },
            allPagesT('collections.get-collections.error')
        ).finally();
    }, [userId]);

    return (
        <>
            <div className="mb-2 mt-7 flex w-full items-center justify-center gap-2.5 text-zinc-500 before:flex-1 before:border-b before:border-solid before:border-zinc-500 after:flex-1 after:border-t after:border-solid after:border-zinc-500">
                {mainPageT('collection_block')}
            </div>

            <UiRadio
                id="none-collection"
                label={mainPageT('none_collection')}
                name="collection"
                checked={show === EAddToCollection.NONE}
                value={EAddToCollection.NONE}
                onChange={handleChangeShow}
            />

            <div className="mt-4">
                <UiRadio
                    id="create-collection"
                    label={mainPageT('create_for_wish')}
                    name="collection"
                    checked={show === EAddToCollection.CREATE}
                    value={EAddToCollection.CREATE}
                    onChange={handleChangeShow}
                />
            </div>
            <div
                className={`${show === EAddToCollection.CREATE ? 'max-h-16 pt-6' : 'max-h-0 pt-0'} overflow-hidden transition-all duration-300 ease-in-out`}
            >
                <UiInput
                    {...register('collection')}
                    id="collection"
                    name="collection"
                    type="text"
                    label={allPagesT('collection_name')}
                    error={errors?.collection?.message}
                    onChange={(event) =>
                        handleReactHookFormInputChange('collection', event)
                    }
                />
            </div>

            <div className="mt-4">
                <UiRadio
                    id="create-collection"
                    label={mainPageT('add_to_collection')}
                    name="collection"
                    checked={show === EAddToCollection.ADD}
                    value={EAddToCollection.ADD}
                    onChange={handleChangeShow}
                />
            </div>
            <div
                className={`${show === EAddToCollection.ADD ? 'mt-4 max-h-80 py-3' : 'mt-0 max-h-0 py-0'} overflow-hidden rounded-md bg-zinc-300 px-2 transition-all duration-300 ease-in-out dark:bg-zinc-800`}
            >
                <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1">
                    {collections.map((collection) => (
                        <li key={collection.id}>
                            <button
                                className="relative flex w-full items-center justify-between gap-4 truncate rounded-md py-1.5 pl-8 pr-3 text-left text-sm font-bold text-zinc-600 transition-all duration-300 ease-in-out hover:bg-zinc-200 dark:text-zinc-300 hover:dark:bg-zinc-600 mobile-lg:py-2 mobile-lg:text-base"
                                type="button"
                            >
                                {collection.name}

                                <div
                                    className={`${false ? 'border-cyan-300 before:w-4 before:shadow-checked-outline-light before:delay-100 after:h-2 dark:before:shadow-checked-outline-dark tablet-md:before:shadow-checked-outline-light-tablet tablet-md:dark:before:shadow-checked-outline-dark-tablet' : 'border-zinc-800 after:delay-100 dark:border-zinc-300'} absolute left-2 top-1/2 z-10 inline-block h-4 w-4 -translate-y-1/2 rounded-sm border-2 bg-transparent transition-all duration-300 ease-in-out before:absolute before:left-1.5 before:top-2 before:inline-block before:h-0.75 before:w-0 before:origin-top-left before:-rotate-45 before:rounded-full before:bg-cyan-300 before:transition-all before:duration-150 before:ease-in-out after:absolute after:left-0.5 after:top-1 after:inline-block after:h-0 after:w-0.75 after:origin-top-left after:-rotate-45 after:rounded-full after:bg-cyan-300 after:transition-all after:duration-150 after:ease-in-out`}
                                ></div>
                            </button>
                        </li>
                    ))}

                    <li
                        className="h-px w-full"
                        style={{
                            display: stopRequests ? 'none' : 'block',
                        }}
                        ref={ref}
                    ></li>
                </ul>

                {isLoadingAdd && (
                    <div className="relative mt-5 h-20 w-full">
                        <UiLoading isLocal bg="bg-transparent" />
                    </div>
                )}
            </div>
        </>
    );
};

export default AddToCollection;
