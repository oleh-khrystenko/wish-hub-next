import myUserApi from '@/stores/my-user/api';
import { IUser } from '@/models/User';

export const checkNotificationSubscription = async (userId: IUser['id']) => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) return;
        await myUserApi.notificationUnsubscribe({ userId });
    } catch (e) {
        console.error(e);
    }
};

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

export const requestNotificationPermission = async (userId: IUser['id']) => {
    if ('Notification' in window && navigator.serviceWorker) {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                if (!process.env.NEXT_PUBLIC_PUBLIC_VAPID_KEY) {
                    return Promise.reject(
                        'NEXT_PUBLIC_PUBLIC_VAPID_KEY is not defined.'
                    );
                }

                const registration = await navigator.serviceWorker.ready;
                const subscription: PushSubscription =
                    await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                            process.env.NEXT_PUBLIC_PUBLIC_VAPID_KEY
                        ),
                    });
                await myUserApi.notificationSubscribe({ userId, subscription });
            }
        } catch (e) {
            console.error(e);
        }
    }
};
