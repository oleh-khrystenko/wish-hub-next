'use client';

import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { IReview } from '@/models/Review';
import UseValidations from '@/helpers/hooks/UseValidations';
import BloggerList from '@/app/[locale]/reviews/BloggerList';
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

interface IProps {
    reviews: IReview[];
}

const Tabs: FC<IProps> = ({ reviews }) => {
    const [isBloggerActive, setIsBloggerActive] = useState<boolean>(true);
    const [rating, setRating] = useState<IReview['rating']>(0);
    const [textLength, setTextLength] = useState<number>(0);
    const [shouldTriggerValidation, setShouldTriggerValidation] =
        useState<IShouldTriggerValidation>({
            type: null,
            value: false,
        });

    const formRef = useRef<HTMLFormElement>(null);

    const reviewsPageT = useTranslations('reviews-page');

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

    const { reviewTextValidation } = UseValidations();

    const handleRating = (value: IReview['rating']) => {
        setRating(value);
    };

    const handleGoToForm = () => {
        if (formRef.current) {
            const formPosition =
                formRef.current.getBoundingClientRect().top + window.scrollY;
            const offset = 80;

            window.scrollTo({
                top: formPosition - offset,
                behavior: 'smooth',
            });
        }
    };

    const onSubmit: SubmitHandler<TInput> = async (data) => {
        console.log('data: ', data);
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
                className="mt-4"
                role="tabpanel"
                id="panel-users"
                aria-labelledby="tab-users"
                hidden={isBloggerActive}
            >
                {reviews.length > 0 && (
                    <ul className="grid gap-3 tablet-md:grid-cols-2 tablet-lg:grid-cols-4 tablet-lg:gap-4">
                        {reviews.map((review) => (
                            <li key={review.id}>{review.fullName}</li>
                        ))}
                    </ul>
                )}
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

                    <div>
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
        </>
    );
};

export default Tabs;
