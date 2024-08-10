import { FC } from 'react';

interface IProps {
    classes?: string;
}

const ForumIcon: FC<IProps> = ({
    classes = 'w-6 h-6 fill-zinc-800 dark:fill-zinc-300',
}) => {
    return (
        <svg
            className={`${classes} transition-all duration-300 ease-in-out`}
            viewBox="0 0 64 64"
            id="icons"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M53,21H48V17a6,6,0,0,0-6-6H11a6,6,0,0,0-6,6V50a2,2,0,0,0,1.19,1.83A2.1,2.1,0,0,0,7,52a2,2,0,0,0,1.35-.52L18,42.7V46a6,6,0,0,0,6,6H45.42l10.51,6.69A2,2,0,0,0,57,59a1.94,1.94,0,0,0,1-.25A2,2,0,0,0,59,57V27A6,6,0,0,0,53,21ZM9,45.48V17a2,2,0,0,1,2-2H42a2,2,0,0,1,2,2V36a2,2,0,0,1-2,2H18a2,2,0,0,0-1.35.52Zm46,7.88-7.93-5A2,2,0,0,0,46,48H24a2,2,0,0,1-2-2V42H42a6,6,0,0,0,6-6V25h5a2,2,0,0,1,2,2Z"></path>
            </g>
        </svg>
    );
};

export default ForumIcon;
