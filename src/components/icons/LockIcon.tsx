import { FC } from 'react';

interface IProps {
    classes?: string;
}

const LockIcon: FC<IProps> = ({ classes = 'w-5 h-5' }) => {
    return (
        <svg
            className={`${classes} fill-cyan-400 transition-all duration-300 ease-in-out dark:fill-cyan-300`}
            width="20"
            height="26"
            viewBox="0 0 20 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 0.75C6.61726 0.75 3.875 3.49226 3.875 6.875V10.375C1.942 10.375 0.375 11.942 0.375 13.875V21.75C0.375 23.683 1.942 25.25 3.875 25.25H16.125C18.058 25.25 19.625 23.683 19.625 21.75V13.875C19.625 11.942 18.058 10.375 16.125 10.375V6.875C16.125 3.49226 13.3827 0.75 10 0.75ZM14.375 10.375V6.875C14.375 4.45875 12.4162 2.5 10 2.5C7.58375 2.5 5.625 4.45875 5.625 6.875V10.375H14.375Z"
            />
        </svg>
    );
};

export default LockIcon;
