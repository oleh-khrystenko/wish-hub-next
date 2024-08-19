import React, { FC } from 'react';

interface IProps {
    title: string;
    text: string;
    author: string;
}

const UiQuoteMessage: FC<IProps> = ({ title, text, author }) => {
    return (
        <div className="flex flex-col gap-2 pb-4 pl-2 pr-4">
            <span className="whitespace-nowrap p-2 text-center text-base font-bold">
                {title}
            </span>
            {text && (
                <div className="relative flex flex-col px-4 py-2 before:absolute before:inset-0 before:h-full before:w-full before:-rotate-2 before:rounded-md before:border before:border-dashed before:border-zinc-500">
                    <p className="text-sm">{text}</p>
                    <span className="ml-auto mt-1 text-xs italic">
                        {author}
                    </span>
                </div>
            )}
        </div>
    );
};

export default UiQuoteMessage;
