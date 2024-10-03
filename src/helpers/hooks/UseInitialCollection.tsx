import { IWish } from '@/models/Wish';
import { useSearchParams } from 'next/navigation';
import { useWishesStore } from '@/stores/wishes';
import { useCollectionStore } from '@/stores/collection';

const UseInitialCollection = () => {
    const searchParams = useSearchParams();

    const setSelectedWishes = useWishesStore(
        (state) => state.setSelectedWishes
    );

    const collections = useCollectionStore((state) => state.collections);

    const setSelectedWishesInEditCollection = (wishes: IWish[]) => {
        if (wishes.length === 0 || collections.length === 0) return;

        const collectionId = searchParams.get('collectionId');
        const editingCollection = collections.find(
            (collection) => collection.id === collectionId
        );

        if (!editingCollection) return;

        setSelectedWishes(editingCollection.wishIdList);
    };

    return {
        setSelectedWishesInEditCollection,
    };
};

export default UseInitialCollection;
