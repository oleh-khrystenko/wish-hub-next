'use client';

import { FC, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import { EPrivacy } from '@/models/Settings';
import ShareIcon from '@/components/icons/ShareIcon';
import { useLocale, useTranslations } from 'next-intl';
import ConfirmModal from '@/components/layouts/ConfirmModal';

interface IProps {
    actionClasses?: string;
    iconClasses?: string;
    link?: string;
    wishShow?: EPrivacy;
    children?: ReactNode;
}

const ShareButton: FC<IProps> = ({
    actionClasses = 'gap-2',
    iconClasses,
    link = '',
    wishShow,
    children,
}) => {
    const [show, setShow] = useState<boolean>(false);

    const activeLocale = useLocale();
    const shareButtonT = useTranslations('share-button');

    const shareContent = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Wish Hub',
                    text: shareButtonT('share-text'),
                    url: `https://wish-hub.net/${activeLocale}/${link}`,
                })
                .then(() =>
                    toast.success(
                        link === 'welcome'
                            ? shareButtonT('alerts.share.wish_hub_success')
                            : shareButtonT('alerts.share.wish_success')
                    )
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
                    toast.success(
                        link === 'welcome'
                            ? shareButtonT('alerts.clipboard.wish_hub_success')
                            : shareButtonT('alerts.clipboard.wish_success')
                    )
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
            <button
                className={`${actionClasses} flex items-center`}
                type="button"
                onClick={handleClick}
            >
                <ShareIcon iconClasses={iconClasses} />
                {children}
            </button>

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
