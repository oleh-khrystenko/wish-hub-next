'use client';

import { useSearchParams } from 'next/navigation';

const UseUTMParams = () => {
    const searchParams = useSearchParams();

    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');

    const utmParams = [
        utm_source ? `utm_source=${utm_source}` : '',
        utm_medium ? `utm_medium=${utm_medium}` : '',
        utm_campaign ? `utm_campaign=${utm_campaign}` : '',
    ].filter(Boolean); // Видаляємо порожні значення

    return utmParams.length > 0 ? utmParams.join('&') : ''; // Об'єднуємо за допомогою амперсанда, якщо є параметри
};

export default UseUTMParams;
