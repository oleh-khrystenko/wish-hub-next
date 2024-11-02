export const ALLOWED_FILE_EXTENSIONS: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
};

export const ALLOWED_MAX_FILE_SIZE_IN_MB = 5;

export const NAME_MIN_LENGTH = 2;

export const NAME_MAX_LENGTH = 80;

export const WISH_NAME_MAX_LENGTH = 400;

export const DELIVERY_ADDRESS_MIN_LENGTH = 4;

export const DELIVERY_ADDRESS_MAX_LENGTH = 200;

export const WISH_PRICE_MAX_LENGTH = 19;

export const WISH_ADDRESS_MIN_LENGTH = 5;

export const WISH_ADDRESS_MAX_LENGTH = 2000;

export const WISH_DESCRIPTION_MIN_LENGTH = 2;

export const WISH_DESCRIPTION_MAX_LENGTH = 10000;

export const MAX_NUMBER_OF_IMAGES_PER_WISH = 10;

export const SIGN_IN_PASSWORD_MIN_LENGTH = 4;

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MAX_LENGTH = 128;

export const WAITING_TIME = 60;

export const USERS_PAGINATION_LIMIT = 20;

export const WISHES_PAGINATION_LIMIT = 24;

export const COLLECTION_PAGINATION_LIMIT = 24;

export const WISH_COLLECTION_PAGINATION_LIMIT = 10;

export const COLLECTION_NAME_MIN_LENGTH = 2;

export const COLLECTION_NAME_MAX_LENGTH = 80;

export const USER_SLUG_TO_ID_MAP: Record<string, string> = {
    'idei-podarunkiv': '660840efccbe41253667c6be',
};

export const COLLECTION_SLUG_TO_ID_MAP: Record<string, string> = {
    'podarunky-dlya-divchyny': '670975eab329d4ec53c55c8a',
};

export const WISH_SLUG_TO_ID_MAP: Record<string, string> = {
    // ***************** podarunky-dlya-divchyny *****************
    'pobachennya-na-dahu': '670975e9b329d4ec53c55c7a',
    'smart-godynnyk': '670a664bb329d4ec53c5651e',
    'nabir-kosmetyky': '670a68ffb329d4ec53c56622',
    'zolote-kolye': '670a6e08257bfbd2432711bc',
    bloknot: '670a6fdb068e42ccdb4e43ee',
    knyga: '670a7096068e42ccdb4e4453',
    'spa-sertyfikat': '670a71ec068e42ccdb4e44c2',
    pizhama: '670a73de068e42ccdb4e45d7',
    'fotosesiya-sertyfikat': '670a7257068e42ccdb4e4517',
    'odyag-sertyfikat': '670a7553068e42ccdb4e46ba',
    'zhinocha-sumochka': '670a75e6068e42ccdb4e472c',
    'zhinochi-parfumy': '670a7729068e42ccdb4e47a5',
    'nike-pro': '670a7850068e42ccdb4e4802',
    'navushnyky-bezdrotovi': '670a7acb068e42ccdb4e4868',
    // ***************** podarunky-dlya-divchyny *****************
    // ===========================================================
    // ***************** name *****************
    // ***************** name *****************
    // ===========================================================
    // ***************** name *****************
    // ***************** name *****************
    // ===========================================================
    // ***************** name *****************
    // ***************** name *****************
    // ===========================================================
    // ***************** name *****************
    // ***************** name *****************
    // ===========================================================
    // ***************** name *****************
    // ***************** name *****************
};
