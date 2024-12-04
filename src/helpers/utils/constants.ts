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

export const MULTILINE_TEXT_MIN_LENGTH = 2;

export const MULTILINE_TEXT_MAX_LENGTH = 10000;

export const REVIEW_TEXT_MAX_LENGTH = 3000;

export const MAX_NUMBER_OF_IMAGES_PER_WISH = 10;

export const SIGN_IN_PASSWORD_MIN_LENGTH = 4;

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MAX_LENGTH = 128;

export const WAITING_TIME = 60;

export const USERS_PAGINATION_LIMIT = 20;

export const WISHES_PAGINATION_LIMIT = 24;

export const COLLECTION_PAGINATION_LIMIT = 24;

export const REVIEW_PAGINATION_LIMIT = 24;

export const WISH_COLLECTION_PAGINATION_LIMIT = 10;

export const COLLECTION_NAME_MIN_LENGTH = 2;

export const COLLECTION_NAME_MAX_LENGTH = 80;

export const GIFT_PRICE = 500;

type ISO8601String = string;
// ISO 8601 format: "YYYY-MM-DDTHH:mm:ss±hh:mm"
// example: "2024-12-25T12:00:00+02:00" = December 25, 2024 at 12 pm Kyiv time

export const GIVEAWAY_DATE_AND_TIME_START: ISO8601String =
    '2024-12-05T12:00:00+02:00';

export const GIVEAWAY_DATE_AND_TIME_END: ISO8601String =
    '2024-12-15T18:00:00+02:00';

export const INSTRUKTOR_WISH_HUB = '66866f6b711bb81655dd35c0';

export const USER_SLUG_TO_ID_MAP: Record<string, string> = {
    'idei-podarunkiv': '660840efccbe41253667c6be',
};

export const COLLECTION_SLUG_TO_ID_MAP: Record<string, string> = {
    'podarunky-dlya-divchyny': '670975eab329d4ec53c55c8a',
    'podarunky-dlya-ditey': '67265aec3454b93cc8203ca2',
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
    // ***************** podarunky-dlya-ditey *****************
    'interaktyvna-knyzhka': '67265aeb3454b93cc8203c94',
    'rozvyvayuchyi-kilymok': '67265c103454b93cc8203d4f',
    'dytiachyi-velosyped': '6726833c3454b93cc8203f11',
    'igrovyi-nabir-likar': '67268b513454b93cc8204074',
    'konstruktor-lego': '67268dce3454b93cc8204134',
    'radiokerovanyi-avtomobil': '672724203454b93cc820459f',
    'nastilna-gra': '6727283f3454b93cc820468e',
    'myaka-igrashka-nichnyk': '67272bab3454b93cc8204794',
    'dytiachyi-nabir-tvorchosti': '67272cf93454b93cc8204890',
    'interaktyvnyi-globus': '67272f5b3454b93cc820499f',
    'dytiachyi-namet-palatka': '672752b03454b93cc82050f9',
    'dytiacha-mini-kuhnya': '672731a73454b93cc8204b0e',
    'nabir-doslidy': '672733033454b93cc8204c51',
    'muzychnyi-instrument': '6727342b3454b93cc8204d6f',
    'magnitna-doshka-malyuvannya': '672751293454b93cc8204f8c',
    // ***************** podarunky-dlya-ditey *****************
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

export const ARTICLE_SLUG_TO_ID_MAP: Record<string, string> = {
    wishes: '672f84db47017ba5704bc374',
    'nevdali-podarunky': '67347856e333ad4061e7b9ad',
};
