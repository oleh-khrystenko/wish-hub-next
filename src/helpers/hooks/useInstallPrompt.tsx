'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

interface IBeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Хук для обробки запитів на встановлення PWA
export const useInstallPrompt = () => {
    // Стан для зберігання події запиту на встановлення
    const [installPWAPrompt, setInstallPWAPrompt] = useState<Event | null>(
        null
    );
    // Стан для зберігання інформації про те, чи користувач відмовився від показу запиту на встановлення
    const [neverInstallPWA, setNeverInstallPWA] = useState<boolean>(false);

    // Отримуємо поточну локалізацію та функцію для перекладів
    const mainPageT = useTranslations('main-page');

    // Функція для обробки запиту на встановлення PWA
    const handleInstallPWA = async () => {
        try {
            // Перевіряємо, чи є запит на встановлення
            if (installPWAPrompt && 'prompt' in installPWAPrompt) {
                const promptEvent =
                    installPWAPrompt as IBeforeInstallPromptEvent;
                await promptEvent.prompt(); // Викликаємо запит на встановлення

                const choiceResult = await promptEvent.userChoice; // Отримуємо результат вибору користувача
                if (choiceResult.outcome === 'accepted') {
                    // Якщо користувач погодився
                    toast(mainPageT('pwa.accepted'), { type: 'success' });
                } else {
                    // Якщо користувач відмовився
                    toast(mainPageT('pwa.dismissed'), { type: 'error' });
                }

                setInstallPWAPrompt(null); // Скидаємо подію запиту
            }
        } catch (error) {
            // Обробка помилок
            toast(mainPageT('pwa.error'), { type: 'error' });
        }
    };

    // Функція для того, щоб не показувати запит на встановлення знову
    const handleNeverShowInstallation = () => {
        setNeverInstallPWA(true);
        localStorage.setItem('neverInstallPWA', 'true'); // Зберігаємо в локальному сховищі
    };

    // Функція для приховування модального вікна
    const handleHideModal = () => {
        setInstallPWAPrompt(null);
    };

    // Ефект для обробки події beforeinstallprompt
    useEffect(() => {
        console.log('neverInstallPWA: ', neverInstallPWA);
        console.log('window: ', window);
        console.log('typeof window: ', typeof window);
        console.log(
            'beforeinstallprompt in window: ',
            'beforeinstallprompt' in window
        );
        if (neverInstallPWA) return; // Якщо користувач вибрав не показувати запит

        const beforeInstallHandler = (event: Event) => {
            console.log('event: ', event);
            event.preventDefault(); // Запобігаємо стандартному показу запиту
            setInstallPWAPrompt(event); // Зберігаємо подію запиту
        };

        window.addEventListener('beforeinstallprompt', beforeInstallHandler);

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                beforeInstallHandler
            );
        };
        // Додали pathname для кейса коли переходимо з іншої сторінки
    }, [neverInstallPWA]);

    // Ефект для перевірки локального сховища при завантаженні
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const neverInstall =
                localStorage.getItem('neverInstallPWA') === 'true';
            setNeverInstallPWA(neverInstall); // Оновлюємо стан
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
