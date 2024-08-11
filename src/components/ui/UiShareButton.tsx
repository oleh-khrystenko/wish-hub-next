'use client';

import { FC, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
// import ConfirmModal from '@/components/ConfirmModal';
import { EPrivacy } from '@/models/Settings';
import ShareIcon from '@/components/icons/ShareIcon';
import { useLocale } from 'next-intl';

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
    confirmT: string;
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
    confirmT,
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

            {/*<ConfirmModal*/}
            {/*    show={show}*/}
            {/*    confirmText={confirmT}*/}
            {/*    close={() => setShow(false)}*/}
            {/*    confirm={shareContent}*/}
            {/*>*/}
            {/*    <p className="text-lg">*/}
            {/*        {wishShow === EPrivacy.NOBODY*/}
            {/*            ? questionNobodyT*/}
            {/*            : questionFriendsT}*/}
            {/*    </p>*/}
            {/*</ConfirmModal>*/}
        </>
    );
};

export default UiShareButton;
