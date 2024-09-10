'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const useInstallPrompt = () => {
    const [installPWAPrompt, setInstallPWAPrompt] = useState<Event | null>(
        null
    );
    const [neverInstallPWA, setNeverInstallPWA] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');

    const handleInstallPWA = async () => {
        try {
            if (installPWAPrompt && 'prompt' in installPWAPrompt) {
                const promptEvent =
                    installPWAPrompt as BeforeInstallPromptEvent;
                await promptEvent.prompt();

                const choiceResult = await promptEvent.userChoice;
                if (choiceResult.outcome === 'accepted') {
                    toast(mainPageT('pwa.accepted'), { type: 'success' });
                } else {
                    toast(mainPageT('pwa.dismissed'), { type: 'error' });
                }

                setInstallPWAPrompt(null);
            }
        } catch (error) {
            toast(mainPageT('pwa.error'), { type: 'error' });
        }
    };

    const handleNeverShowInstallation = () => {
        setNeverInstallPWA(true);
        localStorage.setItem('neverInstallPWA', 'true');
    };

    const handleHideModal = () => {
        setInstallPWAPrompt(null);
    };

    useEffect(() => {
        if (neverInstallPWA) return;

        const beforeInstallHandler = (event: Event) => {
            event.preventDefault();
            setInstallPWAPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', beforeInstallHandler);

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                beforeInstallHandler
            );
        };
    }, [neverInstallPWA]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const neverInstall =
                localStorage.getItem('neverInstallPWA') === 'true';
            setNeverInstallPWA(neverInstall);
        }
    }, []);

    return {
        installPWAPrompt,
        neverInstallPWA,
        handleHideModal,
        handleInstallPWA,
        handleNeverShowInstallation,
    };
};
