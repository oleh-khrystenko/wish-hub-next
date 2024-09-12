import { Metadata } from 'next';

export async function fetchMetadata(
    locale: string,
    page: string
): Promise<Metadata> {
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
            canonical: `https://wish-hub.net/uk/${page}`,
            languages: {
                'x-default': `https://wish-hub.net/uk/${page}`,
                'uk-ua': `https://wish-hub.net/uk/${page}`,
                'en-ua': `https://wish-hub.net/en/${page}`,
                'ru-ua': `https://wish-hub.net/ru/${page}`,
            },
        },
    };
}
