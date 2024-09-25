import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import useValidations from '@/helpers/hooks/UseValidations';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import WishItem from '@/app/[locale]/user/[userId]/collection/editor/WishItem';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import UiLoading from '@/components/ui/UiLoading';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';

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

    const activeLocale = useLocale();

    const collectionPageT = useTranslations('collection-page');
    const allPagesT = useTranslations('all-pages');
    const validationsT = useTranslations('validations');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);
    const collections = useMyUserStore((state) => state.collections);
    const createCollection = useMyUserStore((state) => state.createCollection);

    const wishes = useWishesStore((state) => state.list);
    const wishesCreator = useWishesStore((state) => state.creator);
    const status = useWishesStore((state) => state.status);
    const page = useWishesStore((state) => state.page);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const addWishList = useWishesStore((state) => state.addWishList);

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

    const { getInitialWishList } = UseInitialWishes();

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
        getInitialWishList(myUser?.id, userId).finally();
    }, [userId]);

    return (
        <>
            {wishesCreator && wishesCreator.wishList.length > 4 && (
                <div className="mt-6 flex items-center gap-4">
                    <WishListFilter
                        onlySearch
                        wishListRefCurrent={wishListRef.current}
                    />

                    <WishListActions wishListRefCurrent={wishListRef.current} />
                </div>
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
        </>
    );
};

export default WishList;
