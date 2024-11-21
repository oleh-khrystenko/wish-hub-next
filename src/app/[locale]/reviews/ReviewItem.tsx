import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { IReview } from '@/models/Review';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import reviewApi from '@/helpers/api/review';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiAvatar from '@/components/ui/UiAvatar';
import UiButton from '@/components/ui/UiButton';
import StarIcon from '@/components/icons/StarIcon';
import BasketIcon from '@/components/icons/BasketIcon';

interface IProps {
    review: IReview;
    deleteReview: (id: IReview['id']) => void;
}

const ReviewItem: FC<IProps> = ({ review, deleteReview }) => {
    const [showConfirmDeleteReview, setShowConfirmDeleteReview] =
        useState<boolean>(false);
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const { getFullShortDate } = UseLocaleFormats();

    const handleDeleteReview = async () => {
        setShowGlobalLoading(true);

        try {
            await reviewApi.deleteReview({ reviewId: review.id });

            deleteReview(review.id);

            toast(allPagesT('reviews-api.delete-review.success'), {
                type: 'success',
            });
        } catch (error: any) {
            toast(
                error.response?.data?.message ||
                    allPagesT('reviews-api.delete-review.error'),
                { type: 'error' }
            );
        }

        setShowConfirmDeleteReview(false);
        setShowGlobalLoading(false);
    };

    return (
        <li className="relative ml-5 rounded-xl bg-zinc-300 py-6 pl-4 pr-2 dark:bg-zinc-800">
            <div className="absolute -left-4 -top-4 rounded-full">
                <UiAvatar
                    avatar={review.authorAvatar}
                    alt={review.authorFullName}
                    priority
                    size={64}
                    sizeTailwind="w-16 min-w-16 h-16 min-h-16"
                    sizeIcon="w-12 h-12"
                />
            </div>

            {review.userId === myUser?.id && (
                <>
                    <UiButton
                        variant="clear-styles"
                        classesWrap="absolute -right-1.5 -top-4 rounded-md p-2 bg-zinc-300 dark:bg-zinc-700 shadow desktop-xs:p-1.5 desktop-xs:-right-1 desktop-xs:-top-2"
                        onBtnClick={() => setShowConfirmDeleteReview(true)}
                    >
                        <BasketIcon classes="w-6 h-6 desktop-xs:w-5 desktop-xs:h-5 stroke-rose-500" />
                    </UiButton>

                    <ConfirmModal
                        show={showConfirmDeleteReview}
                        confirm={handleDeleteReview}
                        hide={() => setShowConfirmDeleteReview(false)}
                        confirmModalT={allPagesT('delete')}
                        closeModalT={allPagesT('leave_with_changes.close')}
                    >
                        <span className="text-zinc-700 dark:text-zinc-300">
                            {allPagesT('sure_review')}
                        </span>
                    </ConfirmModal>
                </>
            )}

            <div className="ml-auto flex w-fit items-center pr-2">
                {[1, 2, 3, 4, 5].map((value) => (
                    <StarIcon
                        key={value}
                        classes={`${value <= review.rating ? 'fill-amber-500 dark:fill-amber-400' : 'fill-transparent'} w-6 h-6 stroke-amber-500 dark:stroke-amber-400`}
                    />
                ))}
            </div>

            <p
                className="mt-4 truncate pr-2 text-center text-lg font-bold text-zinc-800 dark:text-zinc-200"
                title={review.authorFullName}
            >
                {review.authorFullName}
            </p>

            <p className="mt-4 max-h-72 overflow-y-auto overflow-x-hidden pr-2 text-zinc-700 dark:text-zinc-300">
                {review.text}
            </p>

            <p className="ml-auto mt-4 pr-2 text-right text-xs text-zinc-600 dark:text-zinc-400">
                {dayjs(review.updatedAt).format(getFullShortDate())}
            </p>
        </li>
    );
};

export default ReviewItem;
