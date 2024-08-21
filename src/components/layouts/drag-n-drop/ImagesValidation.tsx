import { FC } from 'react';
import { TCurrentImage } from '@/models/Wish';
import { useTranslations } from 'next-intl';
import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MAX_FILE_SIZE_IN_MB,
    MAX_NUMBER_OF_IMAGES_PER_WISH,
} from '@/helpers/utils/constants';

interface IProps {
    images: TCurrentImage[];
}

const ImagesValidation: FC<IProps> = ({ images }) => {
    const mainPageT = useTranslations('main-page');

    const extensionsValidation = images.some((image) => {
        if (image instanceof File) {
            const fileExtension = image.type.split('/')[1];
            return !Object.keys(ALLOWED_FILE_EXTENSIONS).includes(
                fileExtension
            );
        }

        return false;
    });

    if (extensionsValidation) {
        return (
            <p className="mt-1 text-xs text-red-500">
                {mainPageT('images-error.file-type')}{' '}
                {Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}.
            </p>
        );
    }

    // --------------------------------------------------

    const sizeValidation = images.some((image) => {
        if (image instanceof File) {
            return image.size > ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024;
        }

        return false;
    });

    if (sizeValidation) {
        return (
            <p className="mt-1 text-xs text-red-500">
                {mainPageT('images-error.file-size', {
                    size: ALLOWED_MAX_FILE_SIZE_IN_MB,
                })}
            </p>
        );
    }

    // --------------------------------------------------

    const imagesLength = images.filter(
        (image) =>
            image instanceof File || (!(image instanceof File) && !image.delete)
    ).length;

    if (imagesLength > MAX_NUMBER_OF_IMAGES_PER_WISH) {
        return (
            <p className="mt-1 text-xs text-red-500">
                {mainPageT('images-error.file-count', {
                    count: MAX_NUMBER_OF_IMAGES_PER_WISH,
                })}
            </p>
        );
    }

    return null;
};

export default ImagesValidation;
