import { FC } from 'react';

interface IProps {
    classes?: string;
}

const LangIcon: FC<IProps> = ({
    classes = 'h-6 w-6 stroke-zinc-800 dark:stroke-zinc-300',
}) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M5 8l6 6"></path>
                <path d="M4 14l6-6 2-3"></path>
                <path d="M2 5h12"></path>
                <path d="M7 2h1"></path>
                <path d="M22 22l-5-10-5 10"></path>
                <path d="M14 18h6"></path>
            </g>
        </svg>
    );
};

export default LangIcon;
