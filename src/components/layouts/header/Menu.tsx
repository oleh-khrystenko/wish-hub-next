'use client';

import { FC, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ETheme } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import SocialNetworks from '@/components/layouts/SocialNetworks';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import ShareButton from '@/components/layouts/ShareButton';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import UiAvatar from '@/components/ui/UiAvatar';
import UiModal from '@/components/ui/modal/UiModal';
import LangIcon from '@/components/icons/LangIcon';
import LightDarkThemeIcon from '@/components/icons/LightDarkThemeIcon';
import InfoIcon from '@/components/icons/InfoIcon';
import ForumIcon from '@/components/icons/ForumIcon';
import LogoutIcon from '@/components/icons/LogoutIcon';
import PrivacyPolicyIcon from '@/components/icons/PrivacyPolicyIcon';
import LogoDarkIcon from '@/components/icons/LogoDarkIcon';
import LogoLightIcon from '@/components/icons/LogoLightIcon';
import PersonIcon from '@/components/icons/PersonIcon';
import SettingIcon from '@/components/icons/SettingIcon';
import MainIcon from '@/components/icons/MainIcon';
// import YouTubeIcon from '@/components/icons/YouTubeIcon';

interface IProps {
    isMainPage?: boolean;
    showPopupUp?: boolean;
    logoIconId?: string;
}

const Menu: FC<IProps> = ({ isMainPage, showPopupUp, logoIconId }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showContacts, setShowContacts] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);
    const logout = useMyUserStore((state) => state.logout);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);
    const setSelectedUserId = useUsersStore((state) => state.setSelectedUserId);

    const theme = useSettingsStore((state) => state.theme);
    const setShowSidebar = useSettingsStore((state) => state.setShowSidebar);

    const { getInitialWishList, getInitialAllWishes } = UseInitialWishes();
    const { getFullName } = UseFullName();

    const handleSelectMyWishes = async () => {
        if (!myUser) return;

        await getInitialWishList(myUser.id, myUser.id, 'createdAt:desc');
        setShowPopup(false);
        setShowSidebar(false);

        router.push(`/${activeLocale}/main`);
    };

    const handleHidePopup = () => {
        setTimeout(() => {
            setShowPopup(false);
        }, 300);
    };

    const handleShowContacts = () => {
        setShowContacts(true);
        handleHidePopup();
    };

    const handleLogout = async () => {
        await logout(allPagesT('my-user-api.logout.error'));
        isMainPage && (await getInitialAllWishes());
        setShowPopup(false);
    };

    return (
        <div className="relative ml-auto flex items-center justify-center gap-1 mobile-sm:gap-4">
            {myUser ? (
                <>
                    {myUser.id === selectedUserId || !isMainPage ? (
                        <div className="flex max-w-40 flex-col items-end gap-1 mobile-xs:max-w-48 mobile-sm:max-w-52 mobile-md:max-w-56 mobile-lg:max-w-60 tablet-sm:max-w-72">
                            <p className="w-full truncate text-right text-sm font-bold text-zinc-800 dark:text-zinc-300">
                                {getFullName(myUser)}
                            </p>

                            {myUser?.email && (
                                <p className="w-full truncate text-right text-xs text-zinc-700 dark:text-zinc-400">
                                    {myUser?.email}
                                </p>
                            )}
                        </div>
                    ) : (
                        <UiButton
                            variant="text"
                            onBtnClick={handleSelectMyWishes}
                        >
                            <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                {theme === ETheme.DARK ? (
                                    <LogoLightIcon
                                        classes="h-6 w-6"
                                        id={logoIconId}
                                    />
                                ) : (
                                    <LogoDarkIcon
                                        classes="h-6 w-6"
                                        id={logoIconId}
                                    />
                                )}
                                {mainPageT('my_wishes')}
                            </span>
                        </UiButton>
                    )}
                </>
            ) : (
                <UiButton href="auth" variant="text">
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        {mainPageT('sign-in')}
                    </span>
                </UiButton>
            )}

            <div className="relative">
                <UiAvatar
                    avatar={myUser?.avatar}
                    alt={getFullName(myUser)}
                    handleClick={() => setShowPopup(true)}
                />

                <SettingIcon classes="w-3.5 h-3.5 absolute bottom-0 right-0 fill-zinc-800 dark:fill-zinc-300" />
            </div>

            <UiPopup
                classes={showPopupUp ? 'pb-12' : 'pt-12'}
                show={showPopup}
                showPopupUp={showPopupUp}
                hide={() => setShowPopup(false)}
            >
                {!myUser && (
                    <div className="mx-4 mt-4 flex flex-col items-center justify-evenly gap-2 rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800 mobile-xs:flex-row">
                        <UiButton href="auth" variant="outline">
                            {mainPageT('sign-in')}
                        </UiButton>
                        <UiButton href="auth?register">
                            {mainPageT('sign-up')}
                        </UiButton>
                    </div>
                )}

                <div className="flex flex-col items-stretch gap-1 px-4 pb-2 pt-4 mobile-xs:gap-2 tablet-md:py-2">
                    {pathname !== `/${activeLocale}/main` && (
                        <UiButton href="main" variant="text">
                            <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                <div className="p-0.5">
                                    <MainIcon />
                                </div>
                                {mainPageT('to_main')}
                            </span>
                        </UiButton>
                    )}

                    {myUser && (
                        <>
                            {pathname !==
                                `/${activeLocale}/user/${myUser.id}/collection` && (
                                <UiButton
                                    href={`/user/${myUser.id}/collection`}
                                    variant="text"
                                    onLinkClick={() =>
                                        setSelectedUserId(myUser.id)
                                    }
                                >
                                    <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                        {theme === ETheme.DARK ? (
                                            <LogoLightIcon
                                                classes="h-6 w-6"
                                                id={`${logoIconId}-popup`}
                                            />
                                        ) : (
                                            <LogoDarkIcon
                                                classes="h-6 w-6"
                                                id={`${logoIconId}-popup`}
                                            />
                                        )}
                                        {mainPageT('my_wishes_collection')}
                                    </span>
                                </UiButton>
                            )}

                            {pathname !==
                                `/${activeLocale}/user/${myUser.id}/profile` && (
                                <UiButton
                                    href={`/user/${myUser.id}/profile`}
                                    variant="text"
                                >
                                    <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                        <PersonIcon />
                                        {mainPageT('my-profile')}
                                    </span>
                                </UiButton>
                            )}
                        </>
                    )}

                    <div className="flex items-center gap-2 whitespace-nowrap text-lg font-bold text-zinc-800 dark:text-zinc-300">
                        <LangIcon />
                        {mainPageT('interface_language')}:
                        <LangSelect />
                    </div>

                    <div className="flex items-center gap-2 whitespace-nowrap text-lg font-bold text-zinc-800 dark:text-zinc-300">
                        <LightDarkThemeIcon />
                        {mainPageT('theme')}:
                        <ThemeSwitcher hide={handleHidePopup} />
                    </div>
                </div>

                <div className="flex flex-col items-stretch gap-1 border-t border-zinc-500 px-4 py-2 dark:border-zinc-600 mobile-xs:gap-2">
                    {/*<UiButton*/}
                    {/*    href="instruction"*/}
                    {/*    variant="text"*/}
                    {/*>*/}
                    {/*    <span*/}
                    {/*        className="*/}
                    {/*            flex items-center gap-2 py-1.5*/}
                    {/*            text-lg text-zinc-800 dark:text-zinc-300*/}
                    {/*        "*/}
                    {/*    >*/}
                    {/*        <YouTubeIcon />*/}
                    {/*        {mainPageT('instruction')}*/}
                    {/*    </span>*/}
                    {/*</UiButton>*/}

                    <UiButton href="about" variant="text">
                        <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                            <InfoIcon classes="h-6 w-6 stroke-zinc-700 dark:stroke-zinc-300" />
                            {mainPageT('about_us')}
                        </span>
                    </UiButton>

                    <ShareButton iconClasses="h-6 w-6 fill-zinc-800 dark:fill-zinc-300">
                        <span className="flex items-center gap-2 py-1.5 text-lg font-bold text-zinc-800 dark:text-zinc-300">
                            {mainPageT('share')} Wish Hub
                        </span>
                    </ShareButton>

                    <UiButton variant="text" onBtnClick={handleShowContacts}>
                        <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                            <ForumIcon />
                            {mainPageT('contacts')}
                        </span>
                    </UiButton>
                </div>

                <div className="flex flex-col items-stretch gap-1 border-t border-zinc-500 p-4 dark:border-zinc-600 mobile-xs:gap-2">
                    {myUser && (
                        <UiButton variant="text" onBtnClick={handleLogout}>
                            <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                <LogoutIcon />
                                {mainPageT('logout')}
                            </span>
                        </UiButton>
                    )}

                    <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800">
                        <div className="flex items-center justify-evenly gap-4">
                            <SocialNetworks />
                        </div>

                        <UiButton href="privacy-policy" variant="text">
                            <span className="flex items-center gap-2 text-xs text-zinc-800 underline dark:text-zinc-300">
                                <PrivacyPolicyIcon />
                                {mainPageT('privacy_policy_title')}
                            </span>
                        </UiButton>
                    </div>
                </div>
            </UiPopup>

            {/* Contacts */}
            <UiModal
                rounded="rounded-2xl"
                show={showContacts}
                hide={() => setShowContacts(false)}
            >
                <p className="text-center text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                    {mainPageT('contacts')}:
                </p>

                <p className="mt-6 text-zinc-600 dark:text-zinc-400">
                    {mainPageT('phone')}{' '}
                    <a
                        href="tel:+380508899268"
                        className="text-cyan-400 dark:text-cyan-300"
                    >
                        +38 050 88 99 268
                    </a>
                </p>

                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                    {mainPageT('email')}{' '}
                    <a
                        href="mailto:wish.hub.net@gmail.com"
                        className="text-cyan-400 dark:text-cyan-300"
                    >
                        wish.hub.net@gmail.com
                    </a>
                </p>

                <div className="mt-4 flex items-center gap-4">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {mainPageT('social-networks')}
                    </p>

                    <div className="flex items-center justify-evenly gap-4">
                        <SocialNetworks />
                    </div>
                </div>

                <p className="mt-4 text-sm text-zinc-500">
                    {mainPageT('contact-us')}
                </p>
            </UiModal>
        </div>
    );
};

export default Menu;
