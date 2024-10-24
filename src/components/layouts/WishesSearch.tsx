import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useWishesStore } from '@/stores/wishes';
import UseChangeWishes from '@/helpers/hooks/UseChangeWishes';
import UiSearch from '@/components/ui/UiSearch';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishesSearch: FC<IProps> = ({ wishListRefCurrent }) => {
    const mainPageT = useTranslations('main-page');

    const status = useWishesStore((state) => state.status);
    const privacy = useWishesStore((state) => state.privacy);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);

    const { handleChangeWishes } = UseChangeWishes();

    const handleChangeSearchBar = async (value: string) => {
        setWishesSearch(value);

        await handleChangeWishes(
            status,
            privacy,
            value,
            sort,
            wishListRefCurrent
        );
    };

    return (
        <UiSearch
            id="wishes-search"
            label={mainPageT('wishes-search')}
            value={search}
            changeSearchBar={handleChangeSearchBar}
        />
    );
};

export default WishesSearch;
