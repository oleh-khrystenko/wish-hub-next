import { FC } from 'react';
import { useTranslations } from 'next-intl';
import AlgorithmBox from '@/components/layouts/AlgorithmBox';
import PlusIcon from '@/components/icons/PlusIcon';
import ChainIcon from '@/components/icons/ChainIcon';
import SolidEyeIcon from '@/components/icons/SolidEyeIcon';
import LockIcon from '@/components/icons/LockIcon';

const Algorithm: FC = () => {
    const welcomePageT = useTranslations('welcome-page');

    return (
        <div className="mx-auto mb-10 mt-6 flex max-w-lg flex-col items-center tablet-md:mb-20 tablet-md:mt-14 tablet-lg:mx-0 tablet-lg:max-w-full tablet-lg:flex-row tablet-lg:justify-between">
            <AlgorithmBox
                icon={
                    <PlusIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7" />
                }
                title={welcomePageT('create_wishes')}
                text={welcomePageT('add_your_dreams')}
            />

            <ChainIcon classes="w-12 min-w-12 h-12 -my-3 rotate-90 tablet-lg:rotate-0 tablet-lg:-mx-3.5 tablet-lg:my-0" />

            <AlgorithmBox
                icon={
                    <SolidEyeIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7" />
                }
                title={welcomePageT('share_your_wishes')}
                text={welcomePageT('share_your_lists')}
            />

            <ChainIcon classes="w-12 min-w-12 h-12 -my-3 -rotate-90 tablet-lg:rotate-180 tablet-lg:-mx-3.5 tablet-lg:my-0" />

            <AlgorithmBox
                icon={
                    <LockIcon classes="w-5 h-5 tablet-md:w-7 tablet-md:h-7" />
                }
                title={welcomePageT('book_wishes')}
                text={welcomePageT('book_other_wishes')}
            />
        </div>
    );
};

export default Algorithm;
