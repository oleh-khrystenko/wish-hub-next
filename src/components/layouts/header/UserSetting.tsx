'use client';

import { FC, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { EWishSort } from '@/models/Wish';
import { EPrivacy, ETheme } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import SocialNetworks from '@/components/layouts/SocialNetworks';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import ShareButton from '@/components/layouts/ShareButton';
import UiAvatar from '@/components/ui/UiAvatar';
import LangIcon from '@/components/icons/LangIcon';
import LightDarkThemeIcon from '@/components/icons/LightDarkThemeIcon';
import InfoIcon from '@/components/icons/InfoIcon';
import ForumIcon from '@/components/icons/ForumIcon';
import LogoutIcon from '@/components/icons/LogoutIcon';
import PrivacyPolicyIcon from '@/components/icons/PrivacyPolicyIcon';
import LogoDarkIcon from '@/components/icons/LogoDarkIcon';
import LogoLightIcon from '@/components/icons/LogoLightIcon';
import PersonIcon from '@/components/icons/PersonIcon';
import UiLoading from '@/components/ui/UiLoading';
// import YouTubeIcon from '@/components/icons/YouTubeIcon';

interface IProps {
    isMainPage?: boolean;
}

const UserSetting: FC<IProps> = ({ isMainPage }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const alertsT = useTranslations('alerts');
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);
    const isLoading = useMyUserStore((state) => state.isLoading);
    const logout = useMyUserStore((state) => state.logout);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const theme = useSettingsStore((state) => state.theme);
    const setActivatedBurgerMenu = useSettingsStore(
        (state) => state.setActivatedBurgerMenu
    );

    const { getInitialWishList, getInitialAllWishes } = UseInitialWishes();
    const { getFullName } = UseFullName();

    const handleSelectMyWishes = async () => {
        if (pathname.split('/')[2] === 'main') {
            router.push(`/${activeLocale}/main`);
        } else {
            return router.push(`/${activeLocale}/main?my-wishes`);
        }

        if (!myUser) return;

        await getInitialWishList(myUser.id, myUser.id, EWishSort.CREATED_DESC);
        setShowPopup(false);
        setActivatedBurgerMenu(false);
    };

    const handleHidePopup = () => {
        setTimeout(() => {
            setShowPopup(false);
        }, 300);
    };

    const handleLogout = async () => {
        await logout(alertsT('my-user-api.logout.error'));
        isMainPage && (await getInitialAllWishes());
        setShowPopup(false);
    };

    return (
        <div className="relative ml-auto flex items-center justify-center gap-4">
            {myUser ? (
                <>
                    {myUser.id === selectedUserId || !isMainPage ? (
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                                {getFullName(myUser)}
                            </span>

                            {myUser?.email && (
                                <span className="text-xs text-zinc-700 dark:text-zinc-400">
                                    {myUser?.email}
                                </span>
                            )}
                        </div>
                    ) : (
                        <UiButton
                            variant="text"
                            onBtnClick={handleSelectMyWishes}
                        >
                            <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                {theme === ETheme.DARK ? (
                                    <LogoLightIcon classes="h-6 w-6" />
                                ) : (
                                    <LogoDarkIcon classes="h-6 w-6" />
                                )}
                                {mainPageT('my-wishes')}
                            </span>
                        </UiButton>
                    )}
                </>
            ) : (
                <UiButton href="auth" variant="text">
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        {mainPageT('sing-in')}
                    </span>
                </UiButton>
            )}

            <UiAvatar
                avatar={myUser?.avatar}
                alt={getFullName(myUser)}
                size={44}
                sizeTailwind="w-11 min-w-11 h-11 min-h-11"
                handleClick={() => setShowPopup(true)}
            />

            <UiPopup
                classes="pt-12"
                show={showPopup}
                hide={() => setShowPopup(false)}
            >
                {!myUser && (
                    <div className="mx-4 mt-4 flex flex-col items-center justify-evenly gap-2 rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800 mobile-xs:flex-row">
                        <UiButton href="auth" variant="outline">
                            {mainPageT('sing-in')}
                        </UiButton>
                        <UiButton href="auth?register">
                            {mainPageT('sing-up')}
                        </UiButton>
                    </div>
                )}

                <div className="flex flex-col items-stretch gap-2 px-2 pb-2 pt-4 tablet-md:px-4 tablet-md:py-2">
                    {myUser && (
                        <>
                            <UiButton
                                variant="text"
                                onBtnClick={handleSelectMyWishes}
                            >
                                <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                    {theme === ETheme.DARK ? (
                                        <LogoLightIcon classes="h-6 w-6" />
                                    ) : (
                                        <LogoDarkIcon classes="h-6 w-6" />
                                    )}
                                    {mainPageT('my-wishes')}
                                </span>
                            </UiButton>

                            <UiButton
                                href={`/profile/${myUser.id}`}
                                variant="text"
                                bgLoading="bg-zinc-100 dark:bg-zinc-700"
                            >
                                <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                    <PersonIcon />
                                    {mainPageT('my-profile')}
                                </span>
                            </UiButton>
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

                <div className="flex flex-col items-stretch gap-2 border-t border-zinc-500 px-2 py-2 dark:border-zinc-600 tablet-md:px-4 tablet-md:py-2">
                    {/*<UiButton*/}
                    {/*    href="instruction"*/}
                    {/*    variant="text"*/}
                    {/*    bgLoading="bg-zinc-100 dark:bg-zinc-700"*/}
                    {/*>*/}
                    {/*    <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">*/}
                    {/*        <YouTubeIcon />*/}
                    {/*        {mainPageT('instruction')}*/}
                    {/*    </span>*/}
                    {/*</UiButton>*/}

                    <UiButton
                        href="about"
                        variant="text"
                        bgLoading="bg-zinc-100 dark:bg-zinc-700"
                    >
                        <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                            <InfoIcon classes="h-6 w-6 stroke-zinc-700 dark:stroke-zinc-300" />
                            {mainPageT('about')} Wish Hub
                        </span>
                    </UiButton>

                    <ShareButton
                        wishShow={EPrivacy.NOBODY}
                        actionClasses="mr-auto"
                        iconClasses="h-6 w-6 fill-zinc-800 dark:fill-zinc-300"
                    >
                        <span className="flex items-center gap-2 py-1.5 text-lg font-bold text-zinc-800 dark:text-zinc-300">
                            {mainPageT('confirm')} Wish Hub
                        </span>
                    </ShareButton>

                    <UiButton
                        href="about"
                        variant="text"
                        bgLoading="bg-zinc-100 dark:bg-zinc-700"
                    >
                        <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                            <ForumIcon />
                            {mainPageT('contacts')}
                        </span>
                    </UiButton>
                </div>

                <div className="flex flex-col items-stretch gap-2 border-t border-zinc-500 px-2 pb-4 pt-2 dark:border-zinc-600 tablet-md:px-4 tablet-md:py-2">
                    {myUser && (
                        <UiButton
                            variant="text"
                            type="button"
                            onBtnClick={handleLogout}
                        >
                            <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                <LogoutIcon />
                                {mainPageT('logout')}
                            </span>
                        </UiButton>
                    )}

                    <div className="mt-2 flex w-full flex-col items-center gap-4 rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800">
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

            {isLoading && <UiLoading />}
        </div>
    );
};

export default UserSetting;
