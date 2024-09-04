import { FC } from 'react';
import Image from 'next/image';

const CoverFigure: FC = () => {
    return (
        <div className="relative mx-auto mt-16 w-48 rounded-xl bg-zinc-400 px-2 py-3 dark:bg-zinc-700 mobile-xs:w-56 mobile-sm:w-60 mobile-md:w-[266px] tablet-md:mt-40 tablet-md:w-[438px] tablet-md:rounded-3xl tablet-md:px-4 tablet-md:py-6 desktop-sm:row-span-2 desktop-sm:ml-20 desktop-sm:mr-[70px] desktop-sm:mt-auto desktop-sm:translate-y-8">
            <Image
                src="/images/winking-emoji.webp"
                alt="test"
                width={500}
                height={500}
            />
        </div>
    );
};

export default CoverFigure;
