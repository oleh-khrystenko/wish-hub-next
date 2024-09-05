import { FC, Fragment } from 'react';
import Image from 'next/image';

interface IProps {
    iconAlt: string;
}

const Divider: FC<IProps> = ({ iconAlt }) => {
    return (
        <div className="flex w-full items-center justify-center gap-5 overflow-hidden border-y border-dashed border-cyan-400 bg-[#164e6388] py-0.5 dark:border-cyan-300">
            {Array.from({ length: 40 }).map((_, index) => (
                <Fragment key={index}>
                    <span className="whitespace-nowrap text-xs font-bold text-cyan-400 dark:text-cyan-300">
                        Wish Hub
                    </span>

                    <Image
                        src="/icons/star-icon.svg"
                        alt={iconAlt}
                        width={12}
                        height={12}
                        className="object-contain"
                    />
                </Fragment>
            ))}
        </div>
    );
};

export default Divider;
