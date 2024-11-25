'use client';

import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import VideoItem from '@/components/layouts/VideoItem';
import UiButton from '@/components/ui/UiButton';
import UiImage from '@/components/ui/UiImage';

const Tabs: FC = () => {
    const [isInstructionActive, setIsInstructionActive] =
        useState<boolean>(true);

    const searchParams = useSearchParams();

    const instructionPageT = useTranslations('instruction-page');
    const allPagesT = useTranslations('all-pages');

    useEffect(() => {
        const features = searchParams.get('features');
        setIsInstructionActive(features === null);
    }, [searchParams]);

    return (
        <>
            <div
                className="mt-6 flex items-center transition-all duration-300 ease-in-out"
                role="tablist"
                aria-label={`${instructionPageT('title')} Wish Hub`}
            >
                <UiButton
                    classesWrap={`${isInstructionActive ? 'bg-cyan-400 dark:bg-cyan-300 text-zinc-700' : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 hover:dark:text-cyan-300'} px-3 mobile-sm:px-4 py-0.5 text-xs mobile-xs:text-sm mobile-md:text-base rounded-l mobile-md:rounded-l-md font-bold transition-all duration-300 ease-in-out`}
                    variant="clear-styles"
                    role="tab"
                    id="tab-instructions"
                    ariaControls="panel-instructions"
                    ariaSelected="true"
                    onBtnClick={() => setIsInstructionActive(true)}
                >
                    {instructionPageT('instructions')}
                </UiButton>

                <UiButton
                    classesWrap={`${isInstructionActive ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 hover:dark:text-cyan-300' : 'bg-cyan-400 dark:bg-cyan-300 text-zinc-700'} px-3 mobile-sm:px-4 py-0.5 text-xs mobile-xs:text-sm mobile-md:text-base rounded-r mobile-md:rounded-r-md font-bold transition-all duration-300 ease-in-out`}
                    variant="clear-styles"
                    role="tab"
                    id="tab-features"
                    ariaControls="panel-features"
                    ariaSelected="false"
                    onBtnClick={() => setIsInstructionActive(false)}
                >
                    {instructionPageT('features')}
                </UiButton>
            </div>

            {/* instructions */}
            <div
                className="mt-6"
                role="tabpanel"
                id="panel-instructions"
                aria-labelledby="tab-instructions"
                hidden={!isInstructionActive}
            >
                <div className="grid gap-8 tablet-lg:grid-cols-5 tablet-xl:gap-12">
                    <div className="tablet-lg:col-span-3">
                        <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-xl">
                            {instructionPageT('subtitle_instructions')}
                        </p>

                        <p className="mt-3 font-medium text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-lg">
                            {instructionPageT('here_you_find')}
                        </p>

                        <p className="mt-6 pl-2 text-sm text-zinc-700 dark:text-zinc-300 tablet-md:mt-8 tablet-md:pl-8 tablet-md:text-justify tablet-md:text-base">
                            {instructionPageT('list_title')}
                        </p>

                        <ul className="mt-2 flex list-disc flex-col gap-1 pl-8 marker:text-zinc-700 marker:dark:text-zinc-300 tablet-md:pl-14">
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT('tips_and_tricks')}
                                </p>
                            </li>
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT(
                                        'instructions_for_setting'
                                    )}
                                </p>
                            </li>
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT('tips_for_making')}
                                </p>
                            </li>
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT('unlock')}
                                </p>
                            </li>
                        </ul>

                        <p className="mt-6 text-sm font-bold text-zinc-700 dark:text-zinc-300 tablet-md:mt-8 tablet-md:text-justify tablet-md:text-base">
                            {instructionPageT('subscribe_instructions')}
                        </p>
                    </div>

                    <div className="relative hidden h-full w-full tablet-lg:col-span-2 tablet-lg:block">
                        <UiImage
                            src="/images/instruction.svg"
                            alt={allPagesT('instruction')}
                        />
                    </div>
                </div>

                <ul className="mt-6 grid gap-6 tablet-md:grid-cols-2 tablet-md:gap-8">
                    <VideoItem
                        src="https://www.youtube.com/embed/Kpp4cVX9hAk?si=-vqjlSy1muDdWc5p"
                        title={instructionPageT('overview')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/dcB6G9u1CzI?si=Oigoujz3AjTYSmwb"
                        title={instructionPageT('create_wish')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/_XiMVoMufUg?si=rFOTakdph0NTjzgS"
                        title={instructionPageT('create_collection')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/DswAfrw47dw?si=u6GwXAo5qvccJBG6"
                        title={instructionPageT('book_wish')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/RprNSADQzQA?si=eZAjRAnmpKQ3q6vI"
                        title={instructionPageT('install_ios')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/_BqeXkZkzyc?si=hGGy-gM5VkGri-98"
                        title={instructionPageT('install_android')}
                    />
                </ul>
            </div>

            {/* features */}
            <div
                className="mt-6"
                role="tabpanel"
                id="panel-features"
                aria-labelledby="tab-features"
                hidden={isInstructionActive}
            >
                <div className="grid gap-8 tablet-lg:grid-cols-5 tablet-xl:gap-12">
                    <div className="tablet-lg:col-span-3">
                        <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-xl">
                            {instructionPageT('subtitle_features')}
                        </p>

                        <p className="mt-3 font-medium text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-lg">
                            {instructionPageT('find_showcasing')}
                        </p>

                        <p className="mt-6 pl-2 text-sm text-zinc-700 dark:text-zinc-300 tablet-md:mt-8 tablet-md:pl-8 tablet-md:text-justify tablet-md:text-base">
                            {instructionPageT('list_title')}
                        </p>

                        <ul className="mt-2 flex list-disc flex-col gap-1 pl-8 marker:text-zinc-700 marker:dark:text-zinc-300 tablet-md:pl-14">
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT('an_overview_of')}
                                </p>
                            </li>
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT('ideas_for_using')}
                                </p>
                            </li>
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT('tips_for_organizing')}
                                </p>
                            </li>
                            <li>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                    {instructionPageT('everyday_life')}
                                </p>
                            </li>
                        </ul>

                        <p className="mt-6 text-sm font-bold text-zinc-700 dark:text-zinc-300 tablet-md:mt-8 tablet-md:text-justify tablet-md:text-base">
                            {instructionPageT('subscribe_features')}
                        </p>
                    </div>

                    <div className="relative hidden h-full w-full tablet-lg:col-span-2 tablet-lg:block">
                        <UiImage
                            src="/images/features.svg"
                            alt={instructionPageT('features')}
                        />
                    </div>
                </div>

                <ul className="mt-6 grid gap-6 tablet-md:grid-cols-2 tablet-md:gap-8">
                    <VideoItem
                        src="https://www.youtube.com/embed/VTXq1_CaIu0?si=2gqJY4EMRCGPwCxM"
                        title={instructionPageT('how_wish_hub')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/9gJoAS2FyLE?si=M_vabhSwS6w0qW-f"
                        title={instructionPageT('keep_all_your')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/ztMC4ezBq3c?si=cM8QyCnIORppGSic"
                        title={instructionPageT('wish_hub_business')}
                    />

                    <VideoItem
                        src="https://www.youtube.com/embed/k3KC1mTtnp0?si=04RCtvPjwB7dV_hr"
                        title={instructionPageT('secret_santa')}
                    />
                </ul>
            </div>
        </>
    );
};

export default Tabs;
