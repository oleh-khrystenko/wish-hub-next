import { ChangeEvent, FC } from 'react';
import { useTranslations } from 'next-intl';
import UiTooltip from '@/components/ui/UiTooltip';
import { EPrivacy } from '@/models/Settings';
import InfoIcon from '@/components/icons/InfoIcon';
import UiRadio from '@/components/ui/UiRadio';

interface IProps {
    id: string;
    tooltipContent: {
        all: string;
        friends: string;
        nobody: string;
    };
    show: EPrivacy | null;
    showError?: string;
    onChange: (show: EPrivacy) => void;
}

const UiPrivacyChoices: FC<IProps> = ({
    id,
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
        <div className="privacy-choices">
            <span className="privacy-choices-label">
                {mainPageT('can-see.title')}
            </span>

            <div className="privacy-choices-actions">
                <div className="privacy-choices-item">
                    <UiRadio
                        label={mainPageT('can-see.all')}
                        id={`${id}-all`}
                        name="show"
                        checked={show === EPrivacy.ALL}
                        value={EPrivacy.ALL}
                        onChange={handleChangeShow}
                    />

                    <span
                        className="tooltip"
                        data-tooltip-id={`${id}-all`}
                        data-tooltip-content={tooltipContent.all}
                    >
                        <InfoIcon />
                    </span>
                    <UiTooltip id={`${id}-all`} />
                </div>

                <div className="privacy-choices-item">
                    <UiRadio
                        label={mainPageT('can-see.friends')}
                        id={`${id}-friends`}
                        name="show"
                        checked={show === EPrivacy.FRIENDS}
                        value={EPrivacy.FRIENDS}
                        onChange={handleChangeShow}
                    />

                    <span
                        className="tooltip"
                        data-tooltip-id={`${id}-friends`}
                        data-tooltip-content={tooltipContent.friends}
                    >
                        <InfoIcon />
                    </span>
                    <UiTooltip id={`${id}-friends`} />
                </div>

                <div className="privacy-choices-item">
                    <UiRadio
                        label={mainPageT('can-see.nobody')}
                        id={`${id}-nobody`}
                        name="show"
                        checked={show === EPrivacy.NOBODY}
                        value={EPrivacy.NOBODY}
                        onChange={handleChangeShow}
                    />

                    <span
                        className="tooltip"
                        data-tooltip-id={`${id}-nobody`}
                        data-tooltip-content={tooltipContent.nobody}
                    >
                        <InfoIcon />
                    </span>
                    <UiTooltip id={`${id}-nobody`} />
                </div>
            </div>

            {showError && <p className="error">{showError}</p>}
        </div>
    );
};

export default UiPrivacyChoices;
