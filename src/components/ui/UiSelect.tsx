'use client';

import React, { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

function UiSelect() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const activeLocale = useLocale();
    const pathname = usePathname();

    const handle = (val: string) => {
        startTransition(() => {
            const newPath = pathname.replace(`/${activeLocale}`, '');
            router.replace(`/${val}${newPath}`);
        });
    };

    return (
        <div>
            <button type="button" onClick={() => handle('en')}>
                En
            </button>
            <button type="button" onClick={() => handle('uk')}>
                UK
            </button>
        </div>
    );
}

export default UiSelect;
