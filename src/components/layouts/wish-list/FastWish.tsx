import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import UseValidations from '@/helpers/hooks/UseValidations';
import UiInput from '@/components/ui/UiInput';
import UiTooltip from '@/components/ui/UiTooltip';
import UiButton from '@/components/ui/UiButton';
import { useWishesStore } from '@/stores/wishes';
import { useTranslations } from 'next-intl';

interface IProps {
    hide: () => void;
}

export type TInputs = {
    url: string;
};

const FastWish: FC<IProps> = ({ hide }) => {
    const mainPageT = useTranslations('main-page');

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
        await fetchWishDataFromLink(data);
        hide();
    };

    return (
        <form className="edit-wish" onSubmit={handleSubmit(onSubmit)}>
            <span>{mainPageT('fast_data_filling')}</span>

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

            <div className="actions">
                <UiButton variant="text" onClick={hide}>
                    {mainPageT('manually')}
                </UiButton>

                <UiButton type="submit">{mainPageT('continue')}</UiButton>
            </div>
        </form>
    );
};

export default FastWish;
