'use client';

import { FC, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import { EPrivacy } from '@/models/Settings';
import ShareIcon from '@/components/icons/ShareIcon';
import { useLocale } from 'next-intl';
import UiConfirmModal from '@/components/ui/UiConfirmModal';

interface IProps {
    classes?: string;
    link?: string;
    wishShow?: EPrivacy;
    children?: ReactNode;
    shareTextT: string;
    shareWishHubSuccessT: string;
    shareWishSuccessT: string;
    shareConsoleErrorT: string;
    shareErrorT: string;
    clipboardWishHubSuccessT: string;
    clipboardWishSuccessT: string;
    clipboardConsoleErrorT: string;
    clipboardErrorT: string;
    titleModalT: string;
    confirmModalT: string;
    closeModalT: string;
    questionNobodyT: string;
    questionFriendsT: string;
}

const UiShareButton: FC<IProps> = ({
    classes,
    link = '',
    wishShow,
    children,
    shareTextT,
    shareWishHubSuccessT,
    shareWishSuccessT,
    shareConsoleErrorT,
    shareErrorT,
    clipboardWishHubSuccessT,
    clipboardWishSuccessT,
    clipboardConsoleErrorT,
    clipboardErrorT,
    titleModalT,
    confirmModalT,
    closeModalT,
    questionNobodyT,
    questionFriendsT,
}) => {
    const [show, setShow] = useState<boolean>(false);

    const activeLocale = useLocale();

    const shareContent = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Wish Hub',
                    text: shareTextT,
                    url: `https://wish-hub.net/${activeLocale}/${link}`,
                })
                .then(() =>
                    toast.success(
                        link === 'welcome'
                            ? shareWishHubSuccessT
                            : shareWishSuccessT
                    )
                )
                .catch((error) => {
                    console.log(shareConsoleErrorT, error);
                    toast.error(shareErrorT);
                });
        } else {
            navigator.clipboard
                .writeText(`https://wish-hub.net/${activeLocale}/${link}`)
                .then(() =>
                    toast.success(
                        link === 'welcome'
                            ? clipboardWishHubSuccessT
                            : clipboardWishSuccessT
                    )
                )
                .catch((error) => {
                    console.log(clipboardConsoleErrorT, error);
                    toast.error(clipboardErrorT);
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
                className={`${classes} flex items-center gap-2`}
                type="button"
                onClick={handleClick}
            >
                {children}
                <ShareIcon />
            </button>

            <UiConfirmModal
                show={show}
                confirm={shareContent}
                hide={() => setShow(false)}
                titleModalT={titleModalT}
                confirmModalT={confirmModalT}
                closeModalT={closeModalT}
            >
                {/*<p className="text-base font-bold text-zinc-300">*/}
                {wishShow === EPrivacy.NOBODY
                    ? questionNobodyT
                    : questionFriendsT}
                {/*</p>*/}
            </UiConfirmModal>
        </>
    );
};

export default UiShareButton;
