'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useSettingsStore } from '@/stores/settings';
import UseFullName from '@/helpers/hooks/UseFullName';
import WishList from '@/app/[locale]/main/WishList';
import Inactivated from '@/components/layouts/Inactivated';
import UiModal from '@/components/ui/modal/UiModal';
import UiBrand from '@/components/ui/UiBrand';
import UiButton from '@/components/ui/UiButton';
import InstallIcon from '@/components/icons/InstallIcon';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Content: FC = () => {
    // Стан для зберігання події запиту на встановлення
    const [installPWAPrompt, setInstallPWAPrompt] = useState<Event | null>(
        null
    );
    // Стан для зберігання інформації про те, чи користувач відмовився від показу запиту на встановлення
    const [neverInstallPWA, setNeverInstallPWA] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const activatedBurgerMenu = useSettingsStore(
        (state) => state.activatedBurgerMenu
    );
    const setActivatedBurgerMenu = useSettingsStore(
        (state) => state.setActivatedBurgerMenu
    );

    const { getFullName } = UseFullName();

    const selectedUserFullName = useMemo(() => {
        const selectedUser = users.find((user) => user.id === selectedUserId);
        return getFullName(selectedUser);
    }, [users, selectedUserId]);

    // Функція для обробки запиту на встановлення PWA
    const handleInstallPWA = async () => {
        try {
            // Перевіряємо, чи є запит на встановлення
            if (installPWAPrompt && 'prompt' in installPWAPrompt) {
                const promptEvent =
                    installPWAPrompt as BeforeInstallPromptEvent;
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
        if (neverInstallPWA) return; // Якщо користувач вибрав не показувати запит

        const beforeInstallHandler = (event: Event) => {
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
    }, [neverInstallPWA]);

    // Ефект для перевірки локального сховища при завантаженні
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const neverInstall =
                localStorage.getItem('neverInstallPWA') === 'true';
            setNeverInstallPWA(neverInstall); // Оновлюємо стан
        }
    }, []);

    return (
        <div className="relative flex w-full grow flex-col pb-5 pl-1 pr-2 pt-2 tablet-md:w-2/3 tablet-xl:w-3/4">
            <UiModal
                rounded="rounded-2xl"
                show={installPWAPrompt !== null && !neverInstallPWA}
                hide={handleHideModal}
            >
                <p className="pr-9 text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-lg">
                    {mainPageT('pwa.text_before')}{' '}
                    <span className="whitespace-nowrap">Wish Hub</span>{' '}
                    {mainPageT('pwa.text_after')}
                </p>

                <div className="mt-4 flex flex-col items-end justify-end gap-2 mobile-sm:flex-row">
                    <div className="-mr-4 mobile-sm:mr-0">
                        <UiButton
                            variant="text-attention"
                            onBtnClick={handleNeverShowInstallation}
                        >
                            {mainPageT('pwa.never_show')}
                        </UiButton>
                    </div>

                    <UiButton onBtnClick={handleInstallPWA}>
                        <InstallIcon classes="w-6 h-6 fill-zinc-800" />
                        {mainPageT('pwa.install')}
                    </UiButton>
                </div>
            </UiModal>

            <div className="-mr-2 flex items-center justify-between pl-2.5 tablet-md:hidden">
                <button
                    type="button"
                    className="relative z-40 flex h-10 w-10 flex-col justify-between py-1.5"
                    onClick={() => setActivatedBurgerMenu(!activatedBurgerMenu)}
                >
                    <div
                        className={`${activatedBurgerMenu ? 'w-1/2 -translate-x-0.5 translate-y-1.5 -rotate-45' : 'w-full'} h-0.5 rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300`}
                    ></div>

                    <div className="h-0.5 w-full rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300"></div>

                    <div
                        className={`${activatedBurgerMenu ? 'w-1/2 -translate-x-0.5 -translate-y-1.5 rotate-45' : 'w-full'} h-0.5 rounded-full bg-zinc-700 transition-all duration-300 ease-in-out dark:bg-zinc-300`}
                    ></div>
                </button>

                <UiBrand isMainPage />
            </div>

            {selectedUserId && (
                <div className="mb-6 pl-2.5">
                    {myUser?.id === selectedUserId ? (
                        <p className="text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                            {mainPageT('my_wishes')}
                        </p>
                    ) : (
                        <p className="flex max-w-full flex-wrap items-center">
                            <span className="mr-1 min-h-7 whitespace-nowrap text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                                {mainPageT('wishes_of_user')}
                            </span>
                            <span className="min-h-7 max-w-full truncate pr-0.5 text-base font-bold italic text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                                {selectedUserFullName}
                            </span>
                        </p>
                    )}
                </div>
            )}

            <WishList selectedUserFullName={selectedUserFullName} />

            {myUser && !myUser.isActivated && <Inactivated />}
        </div>
    );
};

export default Content;
