import { FC, Fragment } from 'react';
import SnowflakeIcon from '@/components/icons/SnowflakeIcon';

const Divider: FC = () => {
    return (
        <div className="flex w-full items-center justify-center gap-5 overflow-hidden border-y border-dashed border-cyan-400 bg-[#164e6388] py-0.5 dark:border-cyan-300">
            {Array.from({ length: 40 }).map((_, index) => (
                <Fragment key={index}>
                    <span className="whitespace-nowrap text-xs font-bold text-cyan-400 dark:text-cyan-300">
                        Wish Hub
                    </span>

                    <SnowflakeIcon />
                </Fragment>
            ))}
        </div>
    );
};

export default Divider;
