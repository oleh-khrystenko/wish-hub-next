import axios from 'axios';
import myUserApi from '@/stores/my-user/api';
import { getLangFromUrl } from '@/helpers/utils/get-lang-from-url';

// Створення екземпляра axios з базовими налаштуваннями
const api = axios.create({
    withCredentials: true,
    baseURL:
        process.env.NODE_ENV === 'development'
            ? process.env.NEXT_PUBLIC_DEV_API_URL
            : process.env.NEXT_PUBLIC_API_URL,
});

// Додавання токену і мови до заголовків кожного запиту
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Додаємо заголовок Accept-Language
    config.headers['Accept-Language'] = getLangFromUrl();

    return config;
});

// Обробка відповідей сервера
api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        // Якщо помилка 401 і це не повторний запит
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await myUserApi.refresh();
                localStorage.setItem('token', response.data.accessToken);
                return api.request(originalRequest);
            } catch (error) {
                console.error(error);
            }
        }
        throw error;
    }
);

export default api;
