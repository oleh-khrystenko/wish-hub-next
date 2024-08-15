import { FC } from 'react';

interface IProps {
    classes?: string;
}

const SortIcon: FC<IProps> = ({
    classes = 'w-6 h-6 stroke-zinc-800 dark:stroke-zinc-300',
}) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 6L19 42"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M7 17.8995L19 5.89949"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M29 42.1005L29 6.10051"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M29 42.1005L41 30.1005"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};

export default SortIcon;
