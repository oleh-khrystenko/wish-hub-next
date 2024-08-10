'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useUsersStore } from '@/stores/users';
import getFullName from '@/helpers/utils/get-full-name';
import AvatarIcon from '@/components/icons/AvatarIcon';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import UiThemeSwitcher from '@/components/ui/UiThemeSwitcher';
import UiLangSelect from '@/components/ui/UiLangSelect';
import LangIcon from '@/components/icons/LangIcon';
import LightDarkThemeIcon from '@/components/icons/LightDarkThemeIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import InfoIcon from '@/components/icons/InfoIcon';
import ForumIcon from '@/components/icons/ForumIcon';
import LogoutIcon from '@/components/icons/LogoutIcon';
import PrivacyPolicyIcon from '@/components/icons/PrivacyPolicyIcon';
import SocialNetworks from '@/components/layouts/SocialNetworks';

interface IProps {
    singInT: string;
    userNotFoundT: string;
    singUpT: string;
    myWishesT: string;
    myProfileT: string;
    interfaceLanguageT: string;
    themeT: string;
    aboutT: string;
    contactsT: string;
    logoutT: string;
    privacyPolicyT: string;
}

const UserSetting: FC<IProps> = ({
    singInT,
    userNotFoundT,
    singUpT,
    myWishesT,
    myProfileT,
    interfaceLanguageT,
    themeT,
    aboutT,
    contactsT,
    logoutT,
    privacyPolicyT,
}) => {
    const myUser = useUsersStore((state) => state.myUser);

    // SelectWish
    const handleSelectMyWishes = async () => {
        console.log('handleSelectMyWishes');
        // if (location.pathname.split('/')[1].length > 0) {
        //     return navigate('/?my-wishes');
        // }
        // if (!myUser) return;
        //
        // await handleGetInitialWishList(
        //     dispatch,
        //     myUser.id,
        //     myUser.id,
        //     EWishSort.CREATED_DESC
        // );
        // setAnchor(null);
        // hideHeader && hideHeader();
    };

    // Logout
    const handleLogout = async () => {
        console.log('handleLogout');
        // setAnchor(null);
        // hideHeader && hideHeader();
        // await dispatch(logout());
        // !logoutWithoutUpdate && await handleGetInitialAllWishes(dispatch);
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

            <UiPopup
                action={
                    <div className="flex h-11 w-11 min-w-11 items-center justify-center overflow-hidden rounded-full bg-zinc-500 dark:bg-zinc-600">
                        {myUser?.avatar ? (
                            <Image
                                src={myUser?.avatar}
                                alt={getFullName(myUser, userNotFoundT)}
                                width={44}
                                height={44}
                            />
                        ) : (
                            <AvatarIcon />
                        )}
                    </div>
                }
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
                                    <LogoIcon classes="h-6 w-6" />
                                    {myWishesT}
                                </span>
                            </UiButton>

                            <UiButton
                                variant="text"
                                href={`/profile/${myUser?.id}`}
                            >
                                <span className="flex items-center gap-2 py-1.5 text-lg text-zinc-800 dark:text-zinc-300">
                                    <AvatarIcon classes="w-5 h-5 mx-0.5 fill-zinc-800 dark:fill-zinc-300" />
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
                            {aboutT}
                            Wish Hub
                        </span>
                    </UiButton>

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
