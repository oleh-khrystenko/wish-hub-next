'use client';

import { FC } from 'react';
import { INavItem } from '@/models/Settings';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    navList: INavItem[];
    remove?: INavItem['href'];
}

const NavList: FC<IProps> = ({ navList, remove }) => {
    // navList не переносимо в цей компонент
    // тому що потрібно буде використовувати тут переклади
    // а це лишне навантаження

    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {navList.map(({ href, title, isNew }, idx) => {
                    if (remove && href.includes(remove)) {
                        return (
                            <li key={href + idx}>
                                <UiButton
                                    variant="clear-styles"
                                    classesWrap="flex items-center gap-8"
                                    onBtnClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    <span className="font-bold text-zinc-700 dark:text-zinc-400">
                                        {title}
                                    </span>

                                    {isNew && (
                                        <span className="-my-1 rounded-md border border-rose-500 px-2 font-bold text-rose-500">
                                            NEW
                                        </span>
                                    )}
                                </UiButton>
                            </li>
                        );
                    }
                    return (
                        <li key={href + idx}>
                            <UiButton
                                href={href}
                                variant="clear-styles"
                                classesWrap="flex items-center gap-8"
                            >
                                <span className="font-bold text-zinc-700 dark:text-zinc-400">
                                    {title}
                                </span>

                                {isNew && (
                                    <span className="-my-1 rounded-md border border-rose-500 px-2 font-bold text-rose-500">
                                        NEW
                                    </span>
                                )}
                            </UiButton>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavList;
