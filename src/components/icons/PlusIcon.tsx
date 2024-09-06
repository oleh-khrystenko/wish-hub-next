import { FC } from 'react';

interface IProps {
    classes?: string;
}

const PlusIcon: FC<IProps> = ({ classes = 'w-5 h-5' }) => {
    return (
        <svg
            className={`${classes} fill-cyan-400 transition-all duration-300 ease-in-out dark:fill-cyan-300`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 0.625C5.71776 0.625 0.625 5.71776 0.625 12C0.625 18.2822 5.71776 23.375 12 23.375C18.2822 23.375 23.375 18.2822 23.375 12C23.375 5.71776 18.2822 0.625 12 0.625ZM12.875 8.5C12.875 8.01675 12.4832 7.625 12 7.625C11.5168 7.625 11.125 8.01675 11.125 8.5V11.125H8.5C8.01675 11.125 7.625 11.5168 7.625 12C7.625 12.4832 8.01675 12.875 8.5 12.875H11.125V15.5C11.125 15.9832 11.5168 16.375 12 16.375C12.4832 16.375 12.875 15.9832 12.875 15.5V12.875H15.5C15.9832 12.875 16.375 12.4832 16.375 12C16.375 11.5168 15.9832 11.125 15.5 11.125H12.875V8.5Z"
            />
        </svg>
    );
};

export default PlusIcon;
