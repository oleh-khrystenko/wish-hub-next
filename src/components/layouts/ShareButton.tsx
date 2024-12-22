'use client';

import { FC, ReactNode, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { EPrivacy } from '@/models/settings';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import ShareIcon from '@/components/icons/ShareIcon';
import UiButton, { TUiButtonVariant } from '@/components/ui/UiButton';

interface IProps {
    actionClasses?: string;
    variant?: TUiButtonVariant;
    iconClasses?: string;
    link?: string;
    wishShow?: EPrivacy;
    children?: ReactNode;
}

const ShareButton: FC<IProps> = ({
    actionClasses = 'flex items-center gap-2',
    variant = 'clear-styles',
    iconClasses,
    link = '',
    wishShow,
    children,
}) => {
    const [show, setShow] = useState<boolean>(false);

    const activeLocale = useLocale();
    const shareButtonT = useTranslations('share-button');

    let successT: string = 'wish_hub_success';
    link.includes('collection') && (successT = 'wishes_success');
    link.includes('collectionId') && (successT = 'collection_success');
    link.includes('wish') && (successT = 'wish_success');

    const shareContent = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Wish Hub',
                    text: shareButtonT('share-text'),
                    url: `https://wish-hub.net/${activeLocale}${link}`,
                })
                .then(() =>
                    toast.success(shareButtonT(`alerts.share.${successT}`))
                )
                .catch((error) => {
                    console.log(
                        shareButtonT('alerts.share.console-error'),
                        error
                    );
                    toast.error(shareButtonT('alerts.share.error'));
                });
        } else {
            navigator.clipboard
                .writeText(`https://wish-hub.net/${activeLocale}/${link}`)
                .then(() =>
                    toast.success(shareButtonT(`alerts.clipboard.${successT}`))
                )
                .catch((error) => {
                    console.log(
                        shareButtonT('alerts.clipboard.console-error'),
                        error
                    );
                    toast.error(shareButtonT('alerts.clipboard.error'));
                });
        }

        setShow(false);
    };

    const handleClick = () => {
        wishShow === EPrivacy.FRIENDS || wishShow === EPrivacy.NOBODY
            ? setShow(true)
            : shareContent();
    };

    return (
        <>
            <UiButton
                classesWrap={actionClasses}
                variant={variant}
                onBtnClick={handleClick}
            >
                <ShareIcon iconClasses={iconClasses} />
                {children}
            </UiButton>

            <ConfirmModal
                show={show}
                confirm={shareContent}
                hide={() => setShow(false)}
            >
                {wishShow === EPrivacy.NOBODY
                    ? shareButtonT('question-nobody')
                    : shareButtonT('question-friends')}
            </ConfirmModal>
        </>
    );
};

export default ShareButton;
