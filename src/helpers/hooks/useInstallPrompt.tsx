import { useState, useEffect } from 'react';

export const useInstallPrompt = () => {
    const [installPWAPrompt, setInstallPWAPrompt] = useState<Event | null>(
        null
    );
    const [isInstallablePWA, setIsInstallablePWA] = useState<boolean>(false);
    const [neverInstallPWA, setNeverInstallPWA] = useState<boolean>(
        localStorage.getItem('neverInstallPWA') === 'true'
    );

    const handleInstallPWA = async () => {
        if (installPWAPrompt) {
            const promptEvent = installPWAPrompt as any;
            promptEvent.prompt();

            const choiceResult = await promptEvent.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            setInstallPWAPrompt(null);
            setIsInstallablePWA(false);
        }
    };

    const handleNeverShowInstallation = () => {
        setNeverInstallPWA(true);
        localStorage.setItem('neverInstallPWA', 'true');
    };

    const handleHideModal = () => {
        setIsInstallablePWA(false);
    };

    useEffect(() => {
        if (neverInstallPWA) return;

        const beforeInstallHandler = (event: Event) => {
            event.preventDefault();
            setInstallPWAPrompt(event);
            setIsInstallablePWA(true);
        };

        window.addEventListener('beforeinstallprompt', beforeInstallHandler);

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                beforeInstallHandler
            );
        };
    }, [neverInstallPWA]);

    return {
        isInstallablePWA,
        neverInstallPWA,
        handleHideModal,
        handleInstallPWA,
        handleNeverShowInstallation,
    };
};
