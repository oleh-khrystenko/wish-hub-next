import { Metadata } from 'next';
import { IMeta } from '@/models/article';

export async function fetchMetadata(
    locale: string,
    page: string | null,
    href: string,
    meta?: IMeta
): Promise<Metadata> {
    let title = 'Wish Hub';
    let description = 'Wish Hub - робить ваші мрії реальністю!';

    if (page === null) {
        if (meta) {
            title = meta.title;
            description = meta.description;
        }
    } else {
        const messages = await import(`../../../messages/${locale}.json`);
        const metaT = (key: string) => messages[key];

        title = metaT(`${page}-page`).head.title;

        description = metaT(`${page}-page`).head.description;
    }

    return {
        title,
        description,
        alternates: {
            canonical: `https://wish-hub.net/${locale}${href === 'welcome' ? '' : `/${href}`}`,
            languages: {
                'x-default': `https://wish-hub.net/ua/${href === 'welcome' ? '' : href}`,
                'uk-ua': `https://wish-hub.net/ua/${href === 'welcome' ? '' : href}`,
                'en-ua': `https://wish-hub.net/en/${href === 'welcome' ? '' : href}`,
                'ru-ua': `https://wish-hub.net/ru/${href === 'welcome' ? '' : href}`,
            },
        },
    };
}
