import { ChangeEvent, FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { EPrivacy } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UiTooltip from '@/components/ui/UiTooltip';
import UiRadio from '@/components/ui/UiRadio';
import UiModal from '@/components/ui/modal/UiModal';
import UiButton from '@/components/ui/UiButton';
import InfoIcon from '@/components/icons/InfoIcon';

interface IProps {
    id: string;
    bgRadio?: string;
    tooltipContent: {
        all: string;
        friends: string;
        nobody: string;
    };
    show: EPrivacy | null;
    showError?: string;
    onChange: (show: EPrivacy) => void;
}

const PrivacyChoices: FC<IProps> = ({
    id,
    bgRadio = 'after:bg-zinc-200 dark:after:bg-zinc-900',
    tooltipContent,
    show,
    showError,
    onChange,
}) => {
    const [showAttention, setShowAttention] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const utmParams = UseUTMParams();

    const handleChangeShow = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as EPrivacy;

        onChange(value);

        if (!myUser && value !== EPrivacy.NOBODY) {
            setShowAttention(true);
        }
    };

    const handleUnderstood = () => {
        setShowAttention(false);
        onChange(EPrivacy.NOBODY);
    };

    return (
        <div className="mt-3 flex flex-col gap-2">
            <span className="text-sm text-cyan-500 dark:text-cyan-300">
                {mainPageT('can-see.title')}
            </span>

            <div className="flex flex-col items-start gap-4 tablet-md:flex-row tablet-md:items-center">
                <div className="flex items-center gap-1">
                    <UiRadio
                        id={`${id}-all`}
                        label={mainPageT('can-see.all')}
                        bg={bgRadio}
                        name="show"
                        checked={show === EPrivacy.ALL}
                        value={EPrivacy.ALL}
                        onChange={handleChangeShow}
                    />

                    <span
                        className="cursor-pointer"
                        data-tooltip-id={`${id}-all`}
                        data-tooltip-content={tooltipContent.all}
                    >
                        <InfoIcon />
                    </span>
                    <UiTooltip id={`${id}-all`} />
                </div>

                <div className="flex items-center gap-1">
                    <UiRadio
                        id={`${id}-friends`}
                        label={mainPageT('can-see.friends')}
                        bg={bgRadio}
                        name="show"
                        checked={show === EPrivacy.FRIENDS}
                        value={EPrivacy.FRIENDS}
                        onChange={handleChangeShow}
                    />

                    <span
                        className="cursor-pointer"
                        data-tooltip-id={`${id}-friends`}
                        data-tooltip-content={tooltipContent.friends}
                    >
                        <InfoIcon />
                    </span>
                    <UiTooltip id={`${id}-friends`} />
                </div>

                <div className="flex items-center gap-1">
                    <UiRadio
                        id={`${id}-nobody`}
                        label={mainPageT('can-see.nobody')}
                        bg={bgRadio}
                        name="show"
                        checked={show === EPrivacy.NOBODY}
                        value={EPrivacy.NOBODY}
                        onChange={handleChangeShow}
                    />

                    <span
                        className="cursor-pointer"
                        data-tooltip-id={`${id}-nobody`}
                        data-tooltip-content={tooltipContent.nobody}
                    >
                        <InfoIcon />
                    </span>
                    <UiTooltip id={`${id}-nobody`} />
                </div>
            </div>

            {showError && (
                <p className="mt-1 text-xs text-red-500">{showError}</p>
            )}

            <UiModal
                rounded="rounded-2xl"
                show={showAttention}
                hide={handleUnderstood}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-amber-400">
                    ⚠️{' '}
                    <span className="text-center">
                        {mainPageT('only_registered_users')}
                    </span>{' '}
                    ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('you_trying_private')}
                    <br />
                    {mainPageT('can_choose_private')}
                    <br />
                    <br />
                    {mainPageT('sign_up_private')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton variant="outline" onBtnClick={handleUnderstood}>
                        {mainPageT('i_see')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>
        </div>
    );
};

export default PrivacyChoices;
