import { FC, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';
import { IGuestWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UiButton from '@/components/ui/UiButton';
import UiModal from '@/components/ui/modal/UiModal';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    currentPage: string;
}

const CreateWishAndCollection: FC<IProps> = ({ currentPage }) => {
    const [showAttentionCollection, setShowAttentionCollection] =
        useState<boolean>(false);
    const [showAttentionWish, setShowAttentionWish] = useState<
        '' | 'temp' | 'limit'
    >('');

    const router = useRouter();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const utmParams = UseUTMParams();

    const handleCreateCollection = () => {
        if (myUser) {
            setShowGlobalLoading(true);
            router.push(
                `/${activeLocale}/user/${myUser?.id}/collection/editor`
            );
        } else {
            setShowAttentionCollection(true);
        }
    };

    const handleCreateWish = () => {
        if (myUser) {
            setShowGlobalLoading(true);
            router.push(
                `/${activeLocale}/user/${myUser?.id}/wish/editor?fromPage=${currentPage}`
            );
        } else {
            const guestWishes: string =
                localStorage.getItem('guestWishes') || '';
            const parsedGuestWishes: IGuestWish[] =
                guestWishes.length > 0
                    ? (JSON.parse(guestWishes) as IGuestWish[])
                    : [];

            if (parsedGuestWishes.length >= 3) {
                setShowAttentionWish('limit');
            } else {
                setShowAttentionWish('temp');
            }
        }
    };

    return (
        <>
            <li className="flex flex-col gap-2">
                {/* Collection */}
                {!pathname.includes('/collection/editor') && (
                    <div className="relative flex h-2/3 items-center justify-center rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                        <UiButton
                            variant="clear-styles"
                            classesWrap="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-transparent p-2 transition-all duration-300 ease-in-out hover:-rotate-3 hover:border-cyan-500 hover:dark:border-cyan-300"
                            onBtnClick={handleCreateCollection}
                        >
                            <CrossIcon classes="w-28 h-28 -rotate-45 group-hover:stroke-cyan-500 group-hover:dark:stroke-cyan-300 stroke-zinc-700 dark:stroke-zinc-400" />

                            <span className="text-center text-xs font-bold text-zinc-700 group-hover:text-cyan-500 dark:text-zinc-400 group-hover:dark:text-cyan-300 mobile-xs:text-sm mobile-md:text-base">
                                {mainPageT('create_collection')}
                            </span>
                        </UiButton>
                    </div>
                )}

                {/* Wish */}
                <div className="relative flex h-full items-center justify-center rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                    <UiButton
                        variant="clear-styles"
                        classesWrap="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-transparent p-2 transition-all duration-300 ease-in-out hover:-rotate-3 hover:border-cyan-500 hover:dark:border-cyan-300"
                        onBtnClick={handleCreateWish}
                    >
                        <CrossIcon classes="w-28 h-28 -rotate-45 group-hover:stroke-cyan-500 group-hover:dark:stroke-cyan-300 stroke-zinc-700 dark:stroke-zinc-400" />

                        <span className="text-center text-xl font-bold text-zinc-700 group-hover:text-cyan-500 dark:text-zinc-400 group-hover:dark:text-cyan-300">
                            {mainPageT('create-wish')}
                        </span>
                    </UiButton>
                </div>
            </li>

            {/* Collection */}
            <UiModal
                rounded="rounded-2xl"
                show={showAttentionCollection}
                hide={() => setShowAttentionCollection(false)}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-amber-400">
                    ⚠️{' '}
                    <span className="text-center">
                        {mainPageT('only_registered_users')}
                    </span>{' '}
                    ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('you_trying_collection')}
                    <br />
                    <br />
                    {mainPageT('sign_up_collection')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton
                        href={`/auth${utmParams ? `?${utmParams}` : ''}`}
                        variant="outline"
                    >
                        {mainPageT('sign-in')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>

            {/* Wish */}
            <UiModal
                rounded="rounded-2xl"
                show={showAttentionWish.length > 0}
                hide={() => setShowAttentionWish('')}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-amber-400">
                    ✨{' '}
                    <span className="text-center">
                        {mainPageT(
                            showAttentionWish === 'temp'
                                ? 'create_temporary_wish'
                                : 'wish_limit'
                        )}
                    </span>{' '}
                    ✨
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT(
                        showAttentionWish === 'temp'
                            ? 'you_are_creating'
                            : 'as_guest_user'
                    )}
                    <br />
                    <br />
                    {mainPageT('registration_only')}
                </p>

                <div className="mt-6 flex flex-col items-end justify-end gap-2 tablet-md:flex-row tablet-md:items-center tablet-md:gap-5">
                    {showAttentionWish === 'temp' ? (
                        <UiButton
                            href={`/user/guest-${uuidv4()}/wish/editor?fromPage=${currentPage}`}
                            variant="outline"
                        >
                            {mainPageT('temporary_action')}
                        </UiButton>
                    ) : (
                        <UiButton
                            href={`/auth${utmParams ? `?${utmParams}` : ''}`}
                            variant="outline"
                        >
                            {mainPageT('sign-in')}
                        </UiButton>
                    )}

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>
        </>
    );
};

export default CreateWishAndCollection;
