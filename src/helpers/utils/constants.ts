export const ALLOWED_FILE_EXTENSIONS: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp'
};

export const ALLOWED_MAX_FILE_SIZE_IN_MB = 5;

export const NAME_MIN_LENGTH = 2;

export const NAME_MAX_LENGTH = 80;

export const WISH_NAME_MAX_LENGTH = 400;

export const DELIVERY_ADDRESS_MIN_LENGTH = 4;

export const DELIVERY_ADDRESS_MAX_LENGTH = 200;

export const WISH_PRICE_MAX_LENGTH = 19;

export const WISH_DESCRIPTION_MIN_LENGTH = 2;

export const WISH_DESCRIPTION_MAX_LENGTH = 5000;

export const MAX_NUMBER_OF_IMAGES_PER_WISH = 10;

export const PASSWORD_MIN_LENGTH = 4;

export const PASSWORD_MAX_LENGTH = 128;

export const WAITING_TIME = 60;

export const USERS_PAGINATION_LIMIT = 20;

export const WISHES_PAGINATION_LIMIT = 12;
