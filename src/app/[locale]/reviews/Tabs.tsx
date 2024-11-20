'use client';

import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { IReview } from '@/models/Review';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import reviewApi from '@/helpers/api/review';
import { REVIEW_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UseValidations from '@/helpers/hooks/UseValidations';
import BloggerList from '@/app/[locale]/reviews/BloggerList';
import ReviewList from '@/app/[locale]/reviews/ReviewList';
import UiModal from '@/components/ui/modal/UiModal';
import UiButton from '@/components/ui/UiButton';
import UiInput from '@/components/ui/UiInput';
import StarIcon from '@/components/icons/StarIcon';

interface IShouldTriggerValidation {
    type: 'text' | null;
    value: boolean;
}

type TInput = {
    text: string;
};

const Tabs: FC = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [isBloggerActive, setIsBloggerActive] = useState<boolean>(true);
    const [rating, setRating] = useState<IReview['rating']>(0);
    const [textLength, setTextLength] = useState<number>(0);
    const [shouldTriggerValidation, setShouldTriggerValidation] =
        useState<IShouldTriggerValidation>({
            type: null,
            value: false,
        });
    const [showAttentionAuth, setShowAttentionAuth] = useState<boolean>(false);
    const [showAttention, setShowAttention] = useState<
        'activated' | 'rating' | ''
    >('');

    const formRef = useRef<HTMLFormElement>(null);

    const reviewsPageT = useTranslations('reviews-page');
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const {
        register,
        setValue,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm<TInput>();

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const utmParams = UseUTMParams();
    const { reviewTextValidation } = UseValidations();

    const handleRating = (value: IReview['rating']) => {
        setRating(value);

        if (!myUser) {
            return setShowAttentionAuth(true);
        }

        if (!myUser?.isActivated) {
            setShowAttention('activated');
        }
    };

    const handleGoToForm = () => {
        setIsBloggerActive(true);

        if (formRef.current) {
            const formPosition =
                formRef.current.getBoundingClientRect().top + window.scrollY;
            const offset = 80;

            window.scrollTo({
                top: formPosition - offset,
                behavior: 'smooth',
            });
        }

        if (!myUser) {
            return setShowAttentionAuth(true);
        }

        if (!myUser?.isActivated) {
            setShowAttention('activated');
        }
    };

    const onSubmit: SubmitHandler<TInput> = async (data) => {
        if (!myUser) {
            return setShowAttentionAuth(true);
        }

        if (!myUser.isActivated) {
            return setShowAttention('activated');
        }

        if (rating === 0) {
            return setShowAttention('rating');
        }

        setShowGlobalLoading(true);

        try {
            const response = await reviewApi.createReview({
                userId: myUser.id,
                rating,
                text: data.text,
            });

            toast(allPagesT('reviews-api.create-review.success'), {
                type: 'success',
            });

            setReviews((prevState) => {
                prevState.unshift(response.data);
                return prevState;
            });
        } catch (error: any) {
            toast(
                error.response?.data?.message ||
                    allPagesT('reviews-api.create-review.error'),
                { type: 'error' }
            );
        }

        setIsBloggerActive(false);

        setShowGlobalLoading(false);
    };

    const handleReactHookFormMessageChange = async (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;

        setTextLength(value.length);

        setValue('text', value);

        setShouldTriggerValidation({
            type: 'text',
            value: true,
        });

        if (!myUser) {
            return setShowAttentionAuth(true);
        }

        if (!myUser?.isActivated) {
            setShowAttention('activated');
        }
    };

    useEffect(() => {
        if (shouldTriggerValidation.value) {
            const triggerValidation = async () => {
                shouldTriggerValidation.type !== null &&
                    (await trigger(shouldTriggerValidation.type));
                setShouldTriggerValidation({
                    type: shouldTriggerValidation.type,
                    value: false,
                });
            };

            triggerValidation().finally();
        }
    }, [shouldTriggerValidation.value, trigger]);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await reviewApi.getReviews({
                page: 1,
                limit: REVIEW_PAGINATION_LIMIT,
                userId: myUser?.id,
            });

            setReviews(response.data);
        };

        fetchReviews().finally();
    }, []);

    return (
        <>
            <div
                className="mt-4 flex items-center transition-all duration-300 ease-in-out"
                role="tablist"
                aria-label={reviewsPageT('title')}
            >
                <UiButton
                    classesWrap={`${isBloggerActive ? 'bg-cyan-400 dark:bg-cyan-300 text-zinc-700' : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 hover:dark:text-cyan-300'} px-3 mobile-sm:px-4 py-0.5 text-xs mobile-xs:text-sm mobile-md:text-base rounded-l mobile-md:rounded-l-md font-bold transition-all duration-300 ease-in-out`}
                    variant="clear-styles"
                    role="tab"
                    id="tab-bloggers"
                    ariaControls="panel-bloggers"
                    ariaSelected="true"
                    onBtnClick={() => setIsBloggerActive(true)}
                >
                    {reviewsPageT('blogger_reviews')}
                </UiButton>

                <UiButton
                    classesWrap={`${isBloggerActive ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 hover:dark:text-cyan-300' : 'bg-cyan-400 dark:bg-cyan-300 text-zinc-700'} px-3 mobile-sm:px-4 py-0.5 text-xs mobile-xs:text-sm mobile-md:text-base rounded-r mobile-md:rounded-r-md font-bold transition-all duration-300 ease-in-out`}
                    variant="clear-styles"
                    role="tab"
                    id="tab-users"
                    ariaControls="panel-users"
                    ariaSelected="false"
                    onBtnClick={() => setIsBloggerActive(false)}
                >
                    {reviewsPageT('user_reviews')}
                </UiButton>
            </div>

            <BloggerList isBloggerActive={isBloggerActive} />

            <div
                className="mt-8"
                role="tabpanel"
                id="panel-users"
                aria-labelledby="tab-users"
                hidden={isBloggerActive}
            >
                {reviews.length > 0 && <ReviewList reviews={reviews} />}
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8"
                ref={formRef}
            >
                <h2 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                    {reviewsPageT('your_feedback')}
                </h2>

                <div className="mb-5 mt-3 flex flex-col gap-2 mobile-md:flex-row mobile-md:items-center mobile-md:gap-4">
                    <p className="text-zinc-800 dark:text-zinc-300">
                        {reviewsPageT('your_rating')}
                    </p>

                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <UiButton
                                key={value}
                                variant="clear-styles"
                                onBtnClick={() =>
                                    handleRating(value as IReview['rating'])
                                }
                            >
                                <StarIcon
                                    classes={`${value <= rating ? 'fill-amber-500 dark:fill-amber-400' : 'fill-transparent'} w-10 h-10 stroke-amber-500 dark:stroke-amber-400`}
                                />
                            </UiButton>
                        ))}
                    </div>
                </div>

                <UiInput
                    {...register('text', reviewTextValidation(textLength))}
                    id="review-text"
                    name="review-text"
                    type="multiline"
                    label={reviewsPageT('your_review')}
                    error={errors?.text?.message}
                    onChange={handleReactHookFormMessageChange}
                />

                <div ref={ref}>
                    <UiButton classesWrap="mt-4 ml-auto" type="submit">
                        {reviewsPageT('leave_review')}
                    </UiButton>
                </div>
            </form>

            {!inView && (
                <div
                    style={{
                        filter: 'drop-shadow(0 10px 20px rgba(9, 9, 11, 1)) drop-shadow(0 0 80px rgba(9, 9, 11, 0.9))',
                    }}
                    className="sticky bottom-4 z-30 ml-auto w-fit"
                >
                    <UiButton onBtnClick={handleGoToForm}>
                        {reviewsPageT('leave_review')}
                    </UiButton>
                </div>
            )}

            {/* Auth */}
            <UiModal
                rounded="rounded-2xl"
                show={showAttentionAuth}
                hide={() => setShowAttentionAuth(false)}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-amber-500 dark:text-amber-400">
                    ⚠️{' '}
                    <span className="text-center">
                        {mainPageT('only_registered_users')}
                    </span>{' '}
                    ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {reviewsPageT('to_leave_review')}
                    <br />
                    <br />
                    {reviewsPageT('share_your_impressions')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton
                        href={`/auth${utmParams ? `?${utmParams}` : ''}`}
                        variant="outline"
                    >
                        {mainPageT('sign-in')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>

            {/* Rating */}
            <UiModal
                rounded="rounded-2xl"
                show={showAttention.length > 0}
                hide={() => setShowAttention('')}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-amber-500 dark:text-amber-400">
                    ⚠️{' '}
                    <span className="text-center">
                        {reviewsPageT(
                            showAttention === 'rating'
                                ? 'rating_not_provided'
                                : 'account_not_activated'
                        )}
                    </span>{' '}
                    ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {reviewsPageT(
                        showAttention === 'rating'
                            ? 'to_submit'
                            : 'must_be_activated'
                    )}
                    <br />
                    <br />
                    {reviewsPageT(
                        showAttention === 'rating'
                            ? 'this_will_help'
                            : 'to_resend'
                    )}{' '}
                    {showAttention === 'activated' && (
                        <UiButton
                            href={`main${utmParams ? `?${utmParams}` : ''}`}
                            variant="text-only"
                        >
                            {reviewsPageT('main')}
                        </UiButton>
                    )}{' '}
                    {showAttention === 'activated' &&
                        reviewsPageT('and_follow')}
                    <br />
                    {showAttention === 'activated' &&
                        reviewsPageT('once_activated')}
                </p>

                <UiButton
                    classesWrap="mt-6 ml-auto"
                    onBtnClick={() => setShowAttention('')}
                >
                    {mainPageT('i_see')}
                </UiButton>
            </UiModal>
        </>
    );
};

export default Tabs;
