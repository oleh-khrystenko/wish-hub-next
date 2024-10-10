import { FC, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import { useCollectionsStore } from '@/stores/collection';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseValidations from '@/helpers/hooks/UseValidations';
import UseInitialCollection from '@/helpers/hooks/UseInitialCollection';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import WishItem from '@/app/[locale]/user/[userId]/collection/editor/WishItem';
import SlidePanel from '@/components/layouts/slide-panel/SlidePanel';
import UiLoading from '@/components/ui/UiLoading';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import SliderIcon from '@/components/icons/SliderIcon';

type TInputs = {
    collectionName: ICollection['name'];
};

interface IProps {
    userId: string;
}

const WishList: FC<IProps> = ({ userId }) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const activeLocale = useLocale();

    const collectionPageT = useTranslations('collection-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const status = useWishesStore((state) => state.status);
    const page = useWishesStore((state) => state.page);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const addWishList = useWishesStore((state) => state.addWishList);

    const collections = useCollectionsStore((state) => state.list);
    const createCollection = useCollectionsStore(
        (state) => state.createCollection
    );
    const updateCollection = useCollectionsStore(
        (state) => state.updateCollection
    );

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TInputs>();

    const { collectionNameValidation } = UseValidations();

    const { getInitialWishList } = UseInitialWishes();
    const { setSelectedWishesInEditCollection } = UseInitialCollection();

    const collectionId = searchParams.get('collectionId');

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        if (!myUser) return;

        setIsLoading(true);

        const wishIdList = wishes
            .filter((wish) => wish.selected)
            .map((wish) => wish.id);

        const collection = collectionId
            ? await updateCollection(
                  {
                      collectionId,
                      userId,
                      wishIdList,
                      name: data.collectionName.trim(),
                  },
                  allPagesT('collections.update-collection.success', {
                      name: data.collectionName.trim(),
                  }),
                  allPagesT('collections.update-collection.error')
              )
            : await createCollection(
                  {
                      userId,
                      wishIdList,
                      name: data.collectionName.trim(),
                  },
                  allPagesT('collections.create-collection.success', {
                      name: data.collectionName.trim(),
                  }),
                  allPagesT('collections.create-collection.error')
              );

        if (!collection) {
            toast(
                allPagesT(
                    `collections.${collectionId ? 'update' : 'create'}-collection.error`
                ),
                {
                    type: 'error',
                }
            );

            setIsLoading(false);
            return;
        }

        router.push(
            `/${activeLocale}/user/${myUser.id}/collection?collectionId=${collection.id}`
        );
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests) return;

        const fetchWishList = async () => {
            setIsLoadingAdd(true);

            const responseWishes = await addWishList(
                {
                    myId: myUser?.id,
                    userId,
                    status,
                    page,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort,
                },
                allPagesT('wishes-api.get-wish-list.error')
            );

            if (!responseWishes) return;
            setSelectedWishesInEditCollection(responseWishes);

            setIsLoadingAdd(false);
        };
        fetchWishList().finally();
    }, [inView]);

    useEffect(() => {
        const fetchWishes = async () => {
            const editingCollection = collections.find(
                (collection) => collection.id === collectionId
            );
            if (editingCollection) {
                setValue('collectionName', editingCollection.name);
            } else {
                setValue('collectionName', '');
            }

            const responseWishes = await getInitialWishList(
                myUser?.id,
                userId,
                collectionId
                    ? `collectionId:${collectionId}`
                    : 'sortByLikes:desc'
            );

            if (responseWishes && responseWishes.length === 0) {
                router.replace(`/${activeLocale}/main`);
            }

            if (!responseWishes) return;
            setSelectedWishesInEditCollection(responseWishes);
        };
        fetchWishes().finally();
    }, [searchParams, userId, collections.length]);

    return (
        <>
            <div>
                <UiButton
                    variant="text"
                    onBtnClick={() => setShowSlidePanel(true)}
                >
                    <SliderIcon classes="w-6 h-6 stroke-cyan-400 dark:stroke-cyan-300" />

                    <span className="py-3 text-sm text-zinc-500 dark:text-zinc-400 tablet-md:text-base">
                        {allPagesT('filters')}
                    </span>
                </UiButton>
            </div>

            <form
                className="sticky top-[66px] z-20 my-6 flex items-start gap-8 rounded-md bg-zinc-300 px-2 pb-2 pt-6 dark:bg-zinc-800 tablet-md:top-[74px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <UiInput
                    {...register('collectionName', collectionNameValidation)}
                    id="collectionName"
                    name="collectionName"
                    type="text"
                    label={allPagesT('collection_name')}
                    error={errors?.collectionName?.message}
                />

                <UiButton type="submit">
                    {collectionPageT(collectionId ? 'update' : 'create')}
                </UiButton>
            </form>

            <div ref={wishListRef}>
                <ul className="grid grid-cols-2 gap-1.5 tablet-md:grid-cols-3 tablet-lg:grid-cols-4 tablet-xl:grid-cols-5 tablet-xl:gap-4 desktop-sm:grid-cols-6">
                    {wishes.length > 0 &&
                        wishes.map((wish, idx) => (
                            <WishItem
                                key={wish.id + idx}
                                wish={wish}
                                idx={idx}
                            />
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

            <SlidePanel wishListRefCurrent={wishListRef.current} />

            {isLoading && <UiLoading />}
        </>
    );
};

export default WishList;
