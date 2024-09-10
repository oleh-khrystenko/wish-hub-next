import { FC } from 'react';

interface IProps {
    classes?: string;
}

const InstallIcon: FC<IProps> = ({
    classes = 'w-6 h-6 fill-zinc-800 dark:fill-zinc-300',
}) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M30.92,8H26.55a1,1,0,0,0,0,2H31V30H5V10H9.38a1,1,0,0,0,0-2H5.08A2,2,0,0,0,3,10V30a2,2,0,0,0,2.08,2H30.92A2,2,0,0,0,33,30V10A2,2,0,0,0,30.92,8Z"></path>
            <path d="M10.3,18.87l7,6.89a1,1,0,0,0,1.4,0l7-6.89a1,1,0,0,0-1.4-1.43L19,22.65V4a1,1,0,0,0-2,0V22.65l-5.3-5.21a1,1,0,0,0-1.4,1.43Z"></path>
            <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>
        </svg>
    );
};

export default InstallIcon;
