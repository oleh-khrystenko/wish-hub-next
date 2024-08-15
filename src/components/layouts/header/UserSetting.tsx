'use client';

import { FC, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { EWishSort } from '@/models/Wish';
import { ETheme } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import getFullName from '@/helpers/utils/get-full-name';
import SocialNetworks from '@/components/layouts/SocialNetworks';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import UiThemeSwitcher from '@/components/ui/UiThemeSwitcher';
import UiLangSelect from '@/components/ui/UiLangSelect';
import UiShareButton from '@/components/ui/UiShareButton';
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

interface IProps {
    logoutWithUpdate: boolean;
    logoutErrorT: string;
    singInT: string;
    userNotFoundT: string;
    singUpT: string;
    myWishesT: string;
    myProfileT: string;
    interfaceLanguageT: string;
    themeT: string;
    aboutT: string;
    shareTextT: string;
    shareWishHubSuccessT: string;
    shareWishSuccessT: string;
    shareConsoleErrorT: string;
    shareErrorT: string;
    clipboardWishHubSuccessT: string;
    clipboardWishSuccessT: string;
    clipboardConsoleErrorT: string;
    clipboardErrorT: string;
    confirmT: string;
    titleModalT: string;
    confirmModalT: string;
    closeModalT: string;
    questionNobodyT: string;
    questionFriendsT: string;
    contactsT: string;
    logoutT: string;
    privacyPolicyT: string;
}

const UserSetting: FC<IProps> = ({
    logoutWithUpdate = false,
    logoutErrorT,
    singInT,
    userNotFoundT,
    singUpT,
    myWishesT,
    myProfileT,
    interfaceLanguageT,
    themeT,
    aboutT,
    shareTextT,
    shareWishHubSuccessT,
    shareWishSuccessT,
    shareConsoleErrorT,
    shareErrorT,
    clipboardWishHubSuccessT,
    clipboardWishSuccessT,
    clipboardConsoleErrorT,
    clipboardErrorT,
    confirmT,
    titleModalT,
    confirmModalT,
    closeModalT,
    questionNobodyT,
    questionFriendsT,
    contactsT,
    logoutT,
    privacyPolicyT,
}) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const myUser = useMyUserStore((state) => state.myUser);
    const logout = useMyUserStore((state) => state.logout);
    const theme = useSettingsStore((state) => state.theme);
    const setShowBurgerMenu = useSettingsStore(
        (state) => state.setShowBurgerMenu
    );

    const router = useRouter();
    const pathname = usePathname();

    const activeLocale = useLocale();

    const { getInitialWishList, getInitialAllWishes } = UseInitialWishes();

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    // SelectWish
    const handleSelectMyWishes = async () => {
        if (pathname.split('/')[2] === 'main') {
            router.push(`/${activeLocale}/main`);
        } else {
            return router.push(`/${activeLocale}/main?my-wishes`);
        }

        if (!myUser) return;

        await getInitialWishList(myUser.id, myUser.id, EWishSort.CREATED_DESC);
        setShowPopup(false);
        setShowBurgerMenu(false);
    };

    // Logout
    const handleLogout = async () => {
        await logout(logoutErrorT);
        logoutWithUpdate && (await getInitialAllWishes());
        setShowPopup(false);
    };

    return (
        <div className="relative flex items-center justify-center gap-4">
            <UiButton href="auth" variant="text">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        {getFullName(myUser, singInT)}
                    </span>

                    {myUser?.email && (
                        <span className="text-xs text-zinc-700 dark:text-zinc-400">
                            {myUser?.email}
                        </span>
                    )}
                </div>
            </UiButton>

            <UiAvatar
                avatar={myUser?.avatar}
                alt={getFullName(myUser, userNotFoundT)}
                size={44}
                handleClick={handleShowPopup}
            />

            <UiPopup
                classes="pt-12"
                show={showPopup}
                hide={() => setShowPopup(false)}
            >
                {!myUser && (
                    <div className="mx-4 mt-4 flex flex-col items-center justify-evenly gap-2 rounded-lg bg-zinc-600 p-2 mobile-xs:flex-row">
                        <UiButton href="auth" variant="outline">
                            {singInT}
                        </UiButton>
                        <UiButton href="auth?register">{singUpT}</UiButton>
                    </div>
                )}

                <div className="flex flex-col items-stretch gap-2 px-2 pb-2 pt-4 tablet-md:px-4 tablet-md:py-2">
                    {myUser && (
                        <>
                            <UiButton
                                variant="text"
                                onClick={handleSelectMyWishes}
                            >
                                <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                    {theme === ETheme.DARK ? (
                                        <LogoLightIcon classes="h-6 w-6" />
                                    ) : (
                                        <LogoDarkIcon classes="h-6 w-6" />
                                    )}
                                    {myWishesT}
                                </span>
                            </UiButton>

                            <UiButton
                                variant="text"
                                href={`/profile/${myUser?.id}`}
                            >
                                <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                    <PersonIcon />
                                    {myProfileT}
                                </span>
                            </UiButton>
                        </>
                    )}

                    <div className="flex items-center gap-2 whitespace-nowrap text-lg font-bold text-zinc-800 dark:text-zinc-300">
                        <LangIcon />
                        {interfaceLanguageT}:
                        <UiLangSelect />
                    </div>

                    <div className="flex items-center gap-2 whitespace-nowrap text-lg font-bold text-zinc-800 dark:text-zinc-300">
                        <LightDarkThemeIcon />
                        {themeT}:
                        <UiThemeSwitcher />
                    </div>
                </div>

                <div className="flex flex-col items-stretch gap-2 border-t border-zinc-500 px-2 py-2 dark:border-zinc-600 tablet-md:px-4 tablet-md:py-2">
                    {/*<UiButton href="instruction" variant="text">*/}
                    {/*    <YouTubeIcon*/}
                    {/*        backgroundColor={ StylesVariables.lightColor }*/}
                    {/*        playColor={ StylesVariables.backgroundColor }*/}
                    {/*    />*/}
                    {/*    { t('main-page.instruction') }*/}
                    {/*</UiButton>*/}

                    <UiButton href="about" variant="text">
                        <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                            <InfoIcon classes="h-6 w-6 stroke-zinc-700 dark:stroke-zinc-300" />
                            {aboutT} Wish Hub
                        </span>
                    </UiButton>

                    <UiShareButton
                        classes="flex-row-reverse mr-auto"
                        shareTextT={shareTextT}
                        shareWishHubSuccessT={shareWishHubSuccessT}
                        shareWishSuccessT={shareWishSuccessT}
                        shareConsoleErrorT={shareConsoleErrorT}
                        shareErrorT={shareErrorT}
                        clipboardWishHubSuccessT={clipboardWishHubSuccessT}
                        clipboardWishSuccessT={clipboardWishSuccessT}
                        clipboardConsoleErrorT={clipboardConsoleErrorT}
                        clipboardErrorT={clipboardErrorT}
                        titleModalT={titleModalT}
                        confirmModalT={confirmModalT}
                        closeModalT={closeModalT}
                        questionNobodyT={questionNobodyT}
                        questionFriendsT={questionFriendsT}
                    >
                        <span className="flex items-center gap-2 py-1.5 text-lg font-bold text-zinc-800 dark:text-zinc-300">
                            {confirmT} Wish Hub
                        </span>
                    </UiShareButton>

                    <UiButton href="about" variant="text">
                        <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                            <ForumIcon />
                            {contactsT}
                        </span>
                    </UiButton>
                </div>

                <div className="flex flex-col items-stretch gap-2 border-t border-zinc-500 px-2 pb-4 pt-2 dark:border-zinc-600 tablet-md:px-4 tablet-md:py-2">
                    {myUser && (
                        <UiButton
                            variant="text"
                            type="button"
                            onClick={handleLogout}
                        >
                            <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                <LogoutIcon />
                                {logoutT}
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
                                {privacyPolicyT}
                            </span>
                        </UiButton>
                    </div>
                </div>
            </UiPopup>
        </div>
    );
};

export default UserSetting;
