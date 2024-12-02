import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { GIFT_PRICE } from '@/helpers/utils/constants';
import AlgorithmBox from '@/app/[locale]/welcome-page-components/AlgorithmBox';
import LogInIcon from '@/components/icons/LogInIcon';
import ChainIcon from '@/components/icons/ChainIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import PeopleIcon from '@/components/icons/PeopleIcon';
import LogoIcon from '@/components/icons/LogoIcon';

const Algorithm: FC = () => {
    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');

    return (
        <div className="mx-auto flex max-w-lg flex-col items-center desktop-xs:col-span-5 desktop-xs:mx-0 desktop-xs:mt-16 desktop-xs:max-w-full">
            <AlgorithmBox
                icon={
                    <LogInIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7 stroke-cyan-500 dark:stroke-cyan-300" />
                }
                title={rozigrashBazhanPageT('sign_up_or')}
                text={rozigrashBazhanPageT('without_account')}
            />

            <ChainIcon classes="w-12 min-w-12 h-12 -my-3 rotate-90 desktop-xs:-my-3.5 desktop-xs:w-16 desktop-xs:min-w-16 desktop-xs:h-16" />

            <AlgorithmBox
                icon={
                    <ShareIcon iconClasses="w-5 h-5 tablet-md:w-7 tablet-md:h-7 fill-cyan-500 dark:fill-cyan-300" />
                }
                title={rozigrashBazhanPageT('share_your_referral')}
                text={
                    <>
                        {rozigrashBazhanPageT('look_for_link')}
                        <ShareIcon iconClasses="inline mx-0.5 w-4 h-4 fill-cyan-500 dark:fill-cyan-300" />
                        {rozigrashBazhanPageT('and_share_your')}
                    </>
                }
            />

            <ChainIcon classes="w-12 min-w-12 h-12 -my-3 -rotate-90 desktop-xs:-my-3.5 desktop-xs:w-16 desktop-xs:min-w-16 desktop-xs:h-16" />

            <AlgorithmBox
                icon={
                    <PeopleIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7 fill-cyan-500 dark:fill-cyan-300" />
                }
                title={rozigrashBazhanPageT('invite_friends')}
                text={rozigrashBazhanPageT('every_registration')}
            />

            <ChainIcon classes="w-12 min-w-12 h-12 -my-3 rotate-90 desktop-xs:-my-3.5 desktop-xs:w-16 desktop-xs:min-w-16 desktop-xs:h-16" />

            <AlgorithmBox
                icon={
                    <LogoIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7" />
                }
                title={rozigrashBazhanPageT('make_sure_you', {
                    price: GIFT_PRICE,
                })}
                text={rozigrashBazhanPageT('this_is_important')}
            />
        </div>
    );
};

export default Algorithm;
