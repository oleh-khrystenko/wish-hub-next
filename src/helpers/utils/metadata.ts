import { Metadata } from 'next';

export async function fetchMetadata(
    locale: string,
    page: string
): Promise<Metadata> {
    if (locale === 'en' || locale === 'ru' || locale === 'uk') {
        const messages = await import(`../../../messages/${locale}.json`);
        const metaDescriptionT = (key: string) => messages[key];

        const title =
            metaDescriptionT(`${page}-page`).head.title ||
            'Wish Hub - Про нас: як ми робимо ваші мрії реальністю';

        const description =
            metaDescriptionT(`${page}-page`).head.description ||
            'Wish Hub - робить ваші мрії реальністю!';

        return {
            title,
            description,
            alternates: {
                canonical: `https://wish-hub.net/uk/${page === 'welcome' ? '' : page}`,
                languages: {
                    'x-default': `https://wish-hub.net/uk/${page === 'welcome' ? '' : page}`,
                    'uk-ua': `https://wish-hub.net/uk/${page === 'welcome' ? '' : page}`,
                    'en-ua': `https://wish-hub.net/en/${page === 'welcome' ? '' : page}`,
                    'ru-ua': `https://wish-hub.net/ru/${page === 'welcome' ? '' : page}`,
                },
            },
        };
    }

    return {
        title: 'Сторінку не знайдено',
        description: 'Сторінку не знайдено',
        alternates: {
            canonical: 'https://wish-hub.net/uk/',
            languages: {
                'x-default': 'https://wish-hub.net/uk/',
                'uk-ua': 'https://wish-hub.net/uk/',
                'en-ua': 'https://wish-hub.net/en/',
                'ru-ua': 'https://wish-hub.net/ru/',
            },
        },
    };
}
