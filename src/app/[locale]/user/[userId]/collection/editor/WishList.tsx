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
import { useCollectionStore } from '@/stores/collection';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import useValidations from '@/helpers/hooks/UseValidations';
import UseInitialCollection from '@/helpers/hooks/UseInitialCollection';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import WishItem from '@/app/[locale]/user/[userId]/collection/editor/WishItem';
import SlidePanel from '@/components/layouts/SlidePanel';
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
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
    const [selectedWishError, setSelectedWishError] = useState<string>('');

    const wishListRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const activeLocale = useLocale();

    const collectionPageT = useTranslations('collection-page');
    const allPagesT = useTranslations('all-pages');
    const validationsT = useTranslations('validations');

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

    const collections = useCollectionStore((state) => state.collections);
    const createCollection = useCollectionStore(
        (state) => state.createCollection
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

    const { collectionNameValidation } = useValidations();

    const { getInitialWishList } = UseInitialWishes();
    const { getInitialCollection } = UseInitialCollection();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        if (!myUser) return;

        const wishIdList = wishes
            .filter((wish) => wish.selected)
            .map((wish) => wish.id);

        if (wishIdList.length === 0) {
            setSelectedWishError(validationsT('collection_wishes'));
            return;
        } else {
            setSelectedWishError('');
        }

        const collection = await createCollection(
            {
                userId,
                wishIdList,
                name: data.collectionName,
            },
            allPagesT('my-user-api.create-collection.error')
        );

        if (!collection) {
            toast(allPagesT('my-user-api.create-collection.error'), {
                type: 'error',
            });
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

            await addWishList(
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

            setIsLoadingAdd(false);
        };
        fetchWishList().finally();
    }, [inView]);

    useEffect(() => {
        const fetchWishes = async () => {
            const collectionId = searchParams.get('collectionId');

            const editingCollection = collections.find(
                (collection) => collection.id === collectionId
            );
            if (editingCollection) {
                setValue('collectionName', editingCollection.name);
            }

            const wishes = await getInitialWishList(
                myUser?.id,
                userId,
                `collectionId:${collectionId}`
            );

            if (!wishes) return;
            getInitialCollection(wishes);
        };
        fetchWishes().finally();
    }, [searchParams, userId, collections.length]);

    return (
        <>
            {wishes.length > 0 && (
                <UiButton
                    variant="text"
                    onBtnClick={() => setShowSlidePanel(true)}
                >
                    <SliderIcon classes="w-6 h-6 stroke-cyan-400 dark:stroke-cyan-300" />

                    <span className="py-3 text-sm text-zinc-500 dark:text-zinc-400 tablet-md:text-base">
                        {allPagesT('display_settings')}
                    </span>
                </UiButton>
            )}

            <form
                className="my-6 flex items-start gap-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <UiInput
                    {...register('collectionName', collectionNameValidation)}
                    id="collectionName"
                    name="collectionName"
                    type="text"
                    label={collectionPageT('collection_name')}
                    error={errors?.collectionName?.message}
                />

                <UiButton type="submit">{collectionPageT('create')}</UiButton>
            </form>

            {selectedWishError && (
                <p className="mb-2 text-sm text-red-500">{selectedWishError}</p>
            )}

            <div ref={wishListRef}>
                <ul className="grid grid-cols-2 gap-1.5 tablet-xl:grid-cols-3 tablet-xl:gap-4 desktop-sm:grid-cols-4">
                    {wishes.length > 0 &&
                        wishes.map((wish, idx) => (
                            <WishItem
                                key={wish.id + idx}
                                wish={wish}
                                idx={idx}
                                resetSelectedWishError={() =>
                                    setSelectedWishError('')
                                }
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
                        <UiLoading isLocal />
                    </div>
                )}
            </div>

            <SlidePanel wishListRefCurrent={wishListRef.current} />
        </>
    );
};

export default WishList;
