'use client';

import { FC } from 'react';
import { useSettingsStore } from '@/stores/settings';
import InstagramIcon from '@/components/icons/InstagramIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import TikTokDarkIcon from '@/components/icons/TikTokDarkIcon';
import TelegramIcon from '@/components/icons/TelegramIcon';
// Іконки соціальних мереж взято з https://www.svgrepo.com/

const SocialNetworks: FC = () => {
    const theme = useSettingsStore((state) => state.theme);

    return (
        <>
            <a
                href="https://www.instagram.com/wish_hub_net/"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <InstagramIcon />
            </a>

            <a
                href="https://www.facebook.com/wish.hub.net"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <FacebookIcon />
            </a>

            <a
                href="https://www.youtube.com/@wish-hub"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <YouTubeIcon />
            </a>

            <a
                href="https://tiktok.com/@wish.hub.net"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                {theme === 'dark' ? <TikTokDarkIcon /> : <TikTokIcon />}
            </a>

            <a
                href="https://t.me/wish_hub"
                target="_blank"
                rel="noopener noreferrer external nofollow"
            >
                <TelegramIcon />
            </a>
        </>
    );
};

export default SocialNetworks;
