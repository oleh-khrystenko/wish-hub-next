import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useWishesStore } from '@/stores/wishes';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiTooltip from '@/components/ui/UiTooltip';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    setIsLoading: (value: boolean) => void;
    hide: () => void;
}

export type TInputs = {
    url: string;
};

const FastWish: FC<IProps> = ({ setIsLoading, hide }) => {
    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();

    const fetchWishDataFromLink = useWishesStore(
        (state) => state.fetchWishDataFromLink
    );

    const { onlyWhitespaceValidation } = UseValidations();

    const onSubmit: SubmitHandler<TInputs> = async (data) => {
        setIsLoading(true);

        data.url.length > 0 &&
            (await fetchWishDataFromLink(
                data,
                alertsT('wishes-api.fetch-wish-data.error')
            ));

        setIsLoading(false);

        hide();
    };

    return (
        <form
            className="flex flex-col gap-5 tablet-md:min-w-96"
            onSubmit={handleSubmit(onSubmit)}
        >
            <span className="whitespace-nowrap text-center text-lg font-bold text-zinc-700 dark:text-zinc-300">
                {mainPageT('fast_data_filling')}
            </span>

            <UiInput
                {...register('url', onlyWhitespaceValidation)}
                id="url"
                name="url"
                type="text"
                label={mainPageT('product-link')}
                tooltip={mainPageT('product-link-tooltip')}
                error={errors?.url?.message}
            />
            <UiTooltip id="url" />

            <div className="ml-auto flex w-fit flex-col items-center gap-6 mobile-xs:flex-row">
                <UiButton variant="text" onBtnClick={hide}>
                    {mainPageT('manually')}
                </UiButton>

                <UiButton type="submit">{mainPageT('continue')}</UiButton>
            </div>
        </form>
    );
};

export default FastWish;
