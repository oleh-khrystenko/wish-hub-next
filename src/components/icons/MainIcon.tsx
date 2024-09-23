import { FC } from 'react';

interface IProps {
    classes?: string;
}

const MainIcon: FC<IProps> = ({
    classes = 'w-5 h-5 fill-zinc-800 dark:fill-zinc-300',
}) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <rect className="st0" width="112" height="112"></rect>
            <rect
                x="200.008"
                className="st0"
                width="111.984"
                height="112"
            ></rect>
            <rect x="400" className="st0" width="112" height="112"></rect>
            <rect
                y="200.008"
                className="st0"
                width="112"
                height="111.984"
            ></rect>
            <rect
                x="200.008"
                y="200.008"
                className="st0"
                width="111.984"
                height="111.984"
            ></rect>
            <rect
                x="400"
                y="200.008"
                className="st0"
                width="112"
                height="111.984"
            ></rect>
            <rect y="400" className="st0" width="112" height="112"></rect>
            <rect
                x="200.008"
                y="400"
                className="st0"
                width="111.984"
                height="112"
            ></rect>
            <rect
                x="400"
                y="400"
                className="st0"
                width="112"
                height="112"
            ></rect>
        </svg>
    );
};

export default MainIcon;
