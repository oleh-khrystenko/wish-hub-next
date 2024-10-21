export const getLangFromUrl = () => {
    if (typeof window !== 'undefined') {
        const pathSegments = window.location.pathname.split('/');
        return pathSegments[1] || 'ua'; // Якщо не знайдено, використовується дефолтна мова 'ua'
    }
    return 'ua'; // Дефолтна мова для SSR
};
