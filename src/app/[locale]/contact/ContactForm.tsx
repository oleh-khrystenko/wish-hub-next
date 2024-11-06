'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';

type TInputs = {
    name: string;
    email: string;
    message: string;
};

interface IShouldTriggerValidation {
    type: keyof TInputs | null;
    value: boolean;
}

const ContactForm: FC = () => {
    const [messageLength, setMessageLength] = useState<number>(0);
    const [shouldTriggerValidation, setShouldTriggerValidation] =
        useState<IShouldTriggerValidation>({
            type: null,
            value: false,
        });

    const contactPageT = useTranslations('contact-page');

    const {
        register,
        setValue,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();

    const {
        accountFirstNameValidation,
        emailValidation,
        wishDescriptionValidation,
    } = UseValidations();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        console.log('data: ', data);
    };

    const handleReactHookFormMessageChange = async (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;

        setMessageLength(value.length);

        setValue('message', value);

        setShouldTriggerValidation({
            type: 'message',
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-5"
        >
            <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
                {contactPageT('contact_form')}
            </p>

            <div className="flex flex-col gap-7">
                <UiInput
                    {...register('name', accountFirstNameValidation)}
                    id="name"
                    name="name"
                    type="text"
                    label={contactPageT('name')}
                    error={errors?.name?.message}
                />

                <UiInput
                    {...register('email', emailValidation)}
                    id="email"
                    name="email"
                    type="text"
                    label={contactPageT('email')}
                    error={errors?.email?.message}
                />

                <UiInput
                    {...register(
                        'message',
                        wishDescriptionValidation(messageLength)
                    )}
                    id="message"
                    name="message"
                    type="multiline"
                    label={contactPageT('message')}
                    error={errors?.message?.message}
                    onChange={handleReactHookFormMessageChange}
                />

                <div className="ml-auto">
                    <UiButton type="submit">{contactPageT('send')}</UiButton>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
