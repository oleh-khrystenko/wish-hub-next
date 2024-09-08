import myUserApi from '@/stores/my-user/api';
import { IUser } from '@/models/User';

export const checkNotificationSubscription = async (userId: IUser['id']) => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) return;
        await myUserApi.notificationUnsubscribe({ userId });
    } catch (e) {
        console.error('Error checking notification subscription:', e);
    }
};

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
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
                const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;

                if (!publicVapidKey) {
                    throw new Error('NEXT_PUBLIC_VAPID_KEY is not defined.');
                }

                const registration = await navigator.serviceWorker.ready;
                const subscription: PushSubscription =
                    await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:
                            urlBase64ToUint8Array(publicVapidKey),
                    });

                await myUserApi.notificationSubscribe({ userId, subscription });
            } else {
                console.warn('Notification permission was not granted.');
            }
        } catch (e) {
            console.error('Error requesting notification permission:', e);
        }
    } else {
        console.error(
            'Notifications or Service Workers are not supported in this browser.'
        );
    }
};
