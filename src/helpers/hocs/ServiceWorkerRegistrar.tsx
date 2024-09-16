'use client';

import { FC, useEffect } from 'react';

const ServiceWorkerRegistrar: FC = () => {
    useEffect(() => {
        const registerServiceWorker = () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log(
                        'Service Worker registered with scope:',
                        registration.scope
                    );
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        };

        if ('serviceWorker' in navigator) {
            // Перевірка, чи документ вже завантажено
            if (document.readyState === 'complete') {
                // Якщо так, реєструємо відразу
                registerServiceWorker();
            } else {
                // Інакше чекаємо події load
                window.addEventListener('load', registerServiceWorker);
            }
        }

        return () => {
            window.removeEventListener('load', registerServiceWorker);
        };
    }, []);

    return null;
};

export default ServiceWorkerRegistrar;
