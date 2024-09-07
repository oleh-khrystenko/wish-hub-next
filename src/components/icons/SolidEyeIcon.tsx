import { FC } from 'react';

interface IProps {
    classes?: string;
}

const SolidEyeIcon: FC<IProps> = ({ classes = 'w-5 h-5' }) => {
    return (
        <svg
            className={`${classes} fill-cyan-400 transition-all duration-300 ease-in-out dark:fill-cyan-300`}
            width="26"
            height="20"
            viewBox="0 0 26 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M13 13.5C14.933 13.5 16.5 11.933 16.5 10C16.5 8.067 14.933 6.5 13 6.5C11.067 6.5 9.5 8.067 9.5 10C9.5 11.933 11.067 13.5 13 13.5Z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.543979 9.35448C2.27911 4.13833 7.19923 0.375 13.0006 0.375C18.7993 0.375 23.7175 4.13483 25.4548 9.3472C25.5952 9.76843 25.5953 10.2242 25.4552 10.6455C23.7201 15.8617 18.7999 19.625 12.9986 19.625C7.19989 19.625 2.28164 15.8652 0.544362 10.6528C0.403963 10.2316 0.40383 9.7758 0.543979 9.35448ZM19.125 10C19.125 13.3827 16.3827 16.125 13 16.125C9.61726 16.125 6.875 13.3827 6.875 10C6.875 6.61726 9.61726 3.875 13 3.875C16.3827 3.875 19.125 6.61726 19.125 10Z"
            />
        </svg>
    );
};

export default SolidEyeIcon;
