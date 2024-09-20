import { Metadata } from 'next';

export async function fetchMetadata(
    locale: string,
    page: string,
    href: string
): Promise<Metadata> {
    const messages = await import(`../../../messages/${locale}.json`);
    const metaDescriptionT = (key: string) => messages[key];

    const title = metaDescriptionT(`${page}-page`).head.title || 'Wish Hub';

    const description =
        metaDescriptionT(`${page}-page`).head.description ||
        'Wish Hub - робить ваші мрії реальністю!';

    return {
        title,
        description,
        alternates: {
            canonical: `https://wish-hub.net/uk/${href === 'welcome' ? '' : href}`,
            languages: {
                'x-default': `https://wish-hub.net/uk/${href === 'welcome' ? '' : href}`,
                'uk-ua': `https://wish-hub.net/uk/${href === 'welcome' ? '' : href}`,
                'en-ua': `https://wish-hub.net/en/${href === 'welcome' ? '' : href}`,
                'ru-ua': `https://wish-hub.net/ru/${href === 'welcome' ? '' : href}`,
            },
        },
    };
}
