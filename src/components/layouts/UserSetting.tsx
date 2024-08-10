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

interface IProps {
    singInT: string;
    userNotFoundT: string;
    singUpT: string;
    myWishesT: string;
    myProfileT: string;
    interfaceLanguageT: string;
    themeT: string;
}

const UserSetting: FC<IProps> = ({
    singInT,
    userNotFoundT,
    singUpT,
    myWishesT,
    myProfileT,
    interfaceLanguageT,
    themeT,
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

                <div className="flex flex-col items-stretch gap-4 px-2 pb-2 pt-4 tablet-md:px-4 tablet-md:py-2">
                    {myUser && (
                        <>
                            <UiButton
                                variant="text"
                                onClick={handleSelectMyWishes}
                            >
                                <LogoIcon classes="h-6 w-6 grayscale" />
                                <span className="text-lg text-zinc-800 dark:text-zinc-300">
                                    {myWishesT}
                                </span>
                            </UiButton>

                            <UiButton
                                variant="text"
                                href={`/profile/${myUser?.id}`}
                            >
                                <AvatarIcon height="24px" width="24px" />
                                <span className="text-lg text-zinc-800 dark:text-zinc-300">
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
            </UiPopup>
        </div>
    );
};

export default UserSetting;
