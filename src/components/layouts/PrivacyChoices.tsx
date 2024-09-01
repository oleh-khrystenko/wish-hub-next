import { ChangeEvent, FC } from 'react';
import { useTranslations } from 'next-intl';
import { EPrivacy } from '@/models/Settings';
import UiTooltip from '@/components/ui/UiTooltip';
import UiRadio from '@/components/ui/UiRadio';
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
    bgRadio = 'after:bg-zinc-300 dark:after:bg-zinc-800',
    tooltipContent,
    show,
    showError,
    onChange,
}) => {
    const mainPageT = useTranslations('main-page');

    const handleChangeShow = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value as EPrivacy);
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
        </div>
    );
};

export default PrivacyChoices;
