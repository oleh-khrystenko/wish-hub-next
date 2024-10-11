import { useTranslations } from 'next-intl';
import {
    PASSWORD_MIN_LENGTH,
    SIGN_IN_PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    WISH_NAME_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    WISH_DESCRIPTION_MIN_LENGTH,
    WISH_PRICE_MAX_LENGTH,
    DELIVERY_ADDRESS_MIN_LENGTH,
    DELIVERY_ADDRESS_MAX_LENGTH,
    WISH_DESCRIPTION_MAX_LENGTH,
    COLLECTION_NAME_MIN_LENGTH,
    COLLECTION_NAME_MAX_LENGTH,
} from '@/helpers/utils/constants';

const UseValidations = () => {
    const validationsT = useTranslations('validations');

    // Only whitespace
    const onlyWhitespaceValidation = {
        validate: (value?: string) => {
            if (!value) {
                return true;
            }
            const trimmedValue = value.trim();
            if (trimmedValue === '' && value.length > 0) {
                return validationsT('only-whitespace');
            }
            return true;
        },
    };

    // Wish name
    const wishNameValidation = {
        ...onlyWhitespaceValidation,
        required: {
            value: true,
            message: validationsT('wish-name.required'),
        },
        minLength: {
            value: NAME_MIN_LENGTH,
            message: validationsT('wish-name.min', {
                min: NAME_MIN_LENGTH - 1,
            }),
        },
        maxLength: {
            value: WISH_NAME_MAX_LENGTH,
            message: validationsT('wish-name.max', {
                max: WISH_NAME_MAX_LENGTH,
            }),
        },
    };

    // Wish price
    const wishPriceValidation = {
        ...onlyWhitespaceValidation,
        required: {
            value: true,
            message: validationsT('wish-price.required'),
        },
        pattern: {
            value: /^(?!0)\d+(\s\d+)*$/,
            message: validationsT('wish-price.pattern'),
        },
        maxLength: {
            value: WISH_PRICE_MAX_LENGTH,
            message: validationsT('wish-price.max', {
                max: WISH_PRICE_MAX_LENGTH,
            }),
        },
    };

    // Wish description
    const wishDescriptionValidation = (descriptionLength: number) => {
        return {
            ...onlyWhitespaceValidation,
            minLength: {
                value: WISH_DESCRIPTION_MIN_LENGTH,
                message: validationsT('wish-description.min', {
                    min: WISH_DESCRIPTION_MIN_LENGTH - 1,
                }),
            },
            maxLength: {
                value: WISH_DESCRIPTION_MAX_LENGTH,
                message: validationsT('wish-description.max', {
                    current: descriptionLength,
                    max: WISH_DESCRIPTION_MAX_LENGTH,
                }),
            },
        };
    };

    // Email
    const emailValidation = {
        required: {
            value: true,
            message: validationsT('email.required'),
        },
        validate: (value?: string) => {
            if (!value) {
                return true;
            }

            const trimmedValue = value.trim();
            if (trimmedValue === '' && value.length > 0) {
                return validationsT('only-whitespace');
            }

            if (
                !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                    trimmedValue
                )
            ) {
                return validationsT('email.pattern');
            }

            return true;
        },
    };

    // Password
    const passwordValidation = {
        required: {
            value: true,
            message: validationsT('password.required'),
        },
        validate: (value: string) => {
            if (value[0] === ' ' || value[value.length - 1] === ' ') {
                return validationsT('password.whitespaces');
            }
            return true;
        },
        minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: validationsT('password.min', {
                min: PASSWORD_MIN_LENGTH - 1,
            }),
        },
        maxLength: {
            value: PASSWORD_MAX_LENGTH,
            message: validationsT('password.max', {
                max: PASSWORD_MAX_LENGTH,
            }),
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            message: validationsT('password.pattern'),
        },
    };

    // Sigh In Password
    const signInPasswordValidation = {
        required: {
            value: true,
            message: validationsT('password.required'),
        },
        validate: (value: string) => {
            if (value[0] === ' ' || value[value.length - 1] === ' ') {
                return validationsT('password.whitespaces');
            }
            return true;
        },
        minLength: {
            value: SIGN_IN_PASSWORD_MIN_LENGTH,
            message: validationsT('password.min', {
                min: SIGN_IN_PASSWORD_MIN_LENGTH - 1,
            }),
        },
        maxLength: {
            value: PASSWORD_MAX_LENGTH,
            message: validationsT('password.max', {
                max: PASSWORD_MAX_LENGTH,
            }),
        },
    };

    // Account first name
    const accountFirstNameValidation = {
        ...onlyWhitespaceValidation,
        required: {
            value: true,
            message: validationsT('first-name.required'),
        },
        minLength: {
            value: NAME_MIN_LENGTH,
            message: validationsT('first-name.min', {
                min: NAME_MIN_LENGTH,
            }),
        },
        maxLength: {
            value: NAME_MAX_LENGTH,
            message: validationsT('first-name.max', {
                max: NAME_MAX_LENGTH,
            }),
        },
    };

    // Account last name
    const accountLastNameValidation = {
        ...onlyWhitespaceValidation,
        minLength: {
            value: NAME_MIN_LENGTH,
            message: validationsT('last-name.min', { min: NAME_MIN_LENGTH }),
        },
        maxLength: {
            value: NAME_MAX_LENGTH,
            message: validationsT('last-name.max', { max: NAME_MAX_LENGTH }),
        },
    };

    // Account delivery address
    const accountDeliveryAddressValidation = {
        ...onlyWhitespaceValidation,
        minLength: {
            value: DELIVERY_ADDRESS_MIN_LENGTH,
            message: validationsT('delivery-address.min', {
                min: DELIVERY_ADDRESS_MIN_LENGTH,
            }),
        },
        maxLength: {
            value: DELIVERY_ADDRESS_MAX_LENGTH,
            message: validationsT('delivery-address.max', {
                max: DELIVERY_ADDRESS_MAX_LENGTH,
            }),
        },
    };

    // Collection name
    const collectionNameValidation = {
        ...onlyWhitespaceValidation,
        required: {
            value: true,
            message: validationsT('collection-name.required'),
        },
        minLength: {
            value: COLLECTION_NAME_MIN_LENGTH,
            message: validationsT('collection-name.min', {
                min: COLLECTION_NAME_MIN_LENGTH,
            }),
        },
        maxLength: {
            value: COLLECTION_NAME_MAX_LENGTH,
            message: validationsT('collection-name.max', {
                max: COLLECTION_NAME_MAX_LENGTH,
            }),
        },
    };

    return {
        onlyWhitespaceValidation,
        wishNameValidation,
        wishPriceValidation,
        wishDescriptionValidation,
        emailValidation,
        passwordValidation,
        signInPasswordValidation,
        accountFirstNameValidation,
        accountLastNameValidation,
        accountDeliveryAddressValidation,
        collectionNameValidation,
    };
};

export default UseValidations;
