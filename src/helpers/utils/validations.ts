import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    WISH_NAME_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    WISH_DESCRIPTION_MIN_LENGTH,
    WISH_PRICE_MAX_LENGTH,
    DELIVERY_ADDRESS_MIN_LENGTH,
    DELIVERY_ADDRESS_MAX_LENGTH,
} from '@/helpers/utils/constants';

// Only whitespace
export const onlyWhitespaceValidation = (
    validationOnlyWhitespacesT: string
) => {
    return {
        validate: (value?: string) => {
            if (!value) {
                return true;
            }
            const trimmedValue = value.trim();
            if (trimmedValue === '' && value.length > 0) {
                return validationOnlyWhitespacesT;
            }
            return true;
        },
    };
};

// Wish name
// export const wishNameValidation = {
//     ...onlyWhitespaceValidation,
//     required: {
//         value: true,
//         message: t('validations.wish-name.required'),
//     },
//     minLength: {
//         value: NAME_MIN_LENGTH,
//         message: t('validations.wish-name.min', { min: NAME_MIN_LENGTH - 1 }),
//     },
//     maxLength: {
//         value: WISH_NAME_MAX_LENGTH,
//         message: t('validations.wish-name.max', { max: WISH_NAME_MAX_LENGTH }),
//     },
// };

// Wish price
// export const wishPriceValidation = {
//     ...onlyWhitespaceValidation,
//     required: {
//         value: true,
//         message: t('validations.wish-price.required'),
//     },
//     pattern: {
//         value: /^(?!0)\d+(\s\d+)*$/,
//         message: t('validations.wish-price.pattern'),
//     },
//     maxLength: {
//         value: WISH_PRICE_MAX_LENGTH,
//         message: t('validations.wish-price.max', {
//             max: WISH_PRICE_MAX_LENGTH,
//         }),
//     },
// };

// Wish description
// export const wishDescriptionValidation = {
//     ...onlyWhitespaceValidation,
//     minLength: {
//         value: WISH_DESCRIPTION_MIN_LENGTH,
//         message: t('validations.wish-price.min', {
//             min: WISH_DESCRIPTION_MIN_LENGTH - 1,
//         }),
//     },
// };

// Email
export const emailValidation = (
    validationEmailRequiredT: string,
    validationOnlyWhitespacesT: string,
    validationEmailPatternT: string
) => {
    return {
        required: {
            value: true,
            message: validationEmailRequiredT,
        },
        validate: (value?: string) => {
            if (!value) {
                return true;
            }

            const trimmedValue = value.trim();
            if (trimmedValue === '' && value.length > 0) {
                return validationOnlyWhitespacesT;
            }

            if (
                !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                    trimmedValue
                )
            ) {
                return validationEmailPatternT;
            }

            return true;
        },
    };
};

// Password
export const passwordValidation = (
    validationPasswordRequiredT: string,
    validationPasswordWhitespacesT: string,
    validationPasswordMinT: string,
    validationPasswordMaxT: string
) => {
    return {
        required: {
            value: true,
            message: validationPasswordRequiredT,
        },
        validate: (value: string) => {
            if (value[0] === ' ' || value[value.length - 1] === ' ') {
                return validationPasswordWhitespacesT;
            }
            return true;
        },
        minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: validationPasswordMinT,
        },
        maxLength: {
            value: PASSWORD_MAX_LENGTH,
            message: validationPasswordMaxT,
        },
    };
};

// Account first name
export const accountFirstNameValidation = (
    validationFirstNameRequiredT: string,
    validationFirstNameMinT: string,
    validationFirstNameMaxT: string
) => {
    return {
        ...onlyWhitespaceValidation,
        required: {
            value: true,
            message: validationFirstNameRequiredT,
        },
        minLength: {
            value: NAME_MIN_LENGTH,
            message: validationFirstNameMinT,
        },
        maxLength: {
            value: NAME_MAX_LENGTH,
            message: validationFirstNameMaxT,
        },
    };
};

// Account last name
// export const accountLastNameValidation = {
//     ...onlyWhitespaceValidation,
//     minLength: {
//         value: NAME_MIN_LENGTH,
//         message: t('validations.last-name.min', { min: NAME_MIN_LENGTH }),
//     },
//     maxLength: {
//         value: NAME_MAX_LENGTH,
//         message: t('validations.last-name.max', { max: NAME_MAX_LENGTH }),
//     },
// };

// Account delivery address
// export const accountDeliveryAddress = {
//     ...onlyWhitespaceValidation,
//     minLength: {
//         value: DELIVERY_ADDRESS_MIN_LENGTH,
//         message: t('validations.delivery-address.min', {
//             min: DELIVERY_ADDRESS_MIN_LENGTH,
//         }),
//     },
//     maxLength: {
//         value: DELIVERY_ADDRESS_MAX_LENGTH,
//         message: t('validations.delivery-address.max', {
//             max: DELIVERY_ADDRESS_MAX_LENGTH,
//         }),
//     },
// };
