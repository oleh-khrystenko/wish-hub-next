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
            <BloggerList isBloggerActive={isBloggerActive} />
        </>
    );
};

export default Tabs;
