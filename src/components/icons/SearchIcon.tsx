import { FC } from 'react';

interface IProps {
    classes?: string;
}

const SearchIcon: FC<IProps> = ({ classes = 'h-5 w-5 stroke-zinc-500' }) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            ></path>
        </svg>
    );
};

export default SearchIcon;
