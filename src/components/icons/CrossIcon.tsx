import { FC } from 'react';

interface IProps {
    classes?: string;
}

const CrossIcon: FC<IProps> = ({
    classes = 'w-6 h-6 stroke-zinc-700 dark:stroke-zinc-800',
}) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </g>
        </svg>
    );
};

export default CrossIcon;
