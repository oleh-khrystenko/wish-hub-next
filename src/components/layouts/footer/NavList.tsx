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
                {navList.map(({ href, title }) => {
                    if (href === remove) {
                        return (
                            <li key={href}>
                                <UiButton
                                    variant="text-only"
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
                                </UiButton>
                            </li>
                        );
                    }
                    return (
                        <li key={href}>
                            <UiButton href={href} variant="text-only">
                                <span className="font-bold text-zinc-700 dark:text-zinc-400">
                                    {title}
                                </span>
                            </UiButton>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavList;
