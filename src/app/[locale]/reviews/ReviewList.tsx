import { FC } from 'react';
import dayjs from 'dayjs';
import { IReview } from '@/models/Review';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import UiAvatar from '@/components/ui/UiAvatar';
import StarIcon from '@/components/icons/StarIcon';

interface IProps {
    reviews: IReview[];
}

const ReviewList: FC<IProps> = ({ reviews }) => {
    const { getFullShortDate } = UseLocaleFormats();

    return (
        <ul className="grid gap-x-2 gap-y-6 tablet-md:grid-cols-2 tablet-lg:grid-cols-4">
            {reviews.map((review) => (
                <li
                    key={review.id}
                    className="relative ml-5 rounded-xl bg-zinc-300 py-6 pl-4 pr-2 dark:bg-zinc-800"
                >
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
            ))}
        </ul>
    );
};

export default ReviewList;
