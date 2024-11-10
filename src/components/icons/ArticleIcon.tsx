import { FC } from 'react';

interface IProps {
    classes?: string;
}

const ArticleIcon: FC<IProps> = ({
    classes = 'w-6 h-6 fill-zinc-600 dark:fill-zinc-400',
}) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <rect
                x="106.667"
                y="106.667"
                width="298.666"
                height="106.666"
            ></rect>
            <path d="M0,0v512h512V0H0z M458.667,458.667H53.333V53.333h405.334V458.667z"></path>
            <rect x="256" y="277.333" width="149.333" height="32"></rect>
            <rect x="256" y="362.667" width="149.333" height="32"></rect>
            <rect
                x="106.667"
                y="277.333"
                width="106.666"
                height="117.334"
            ></rect>
        </svg>
    );
};

export default ArticleIcon;
