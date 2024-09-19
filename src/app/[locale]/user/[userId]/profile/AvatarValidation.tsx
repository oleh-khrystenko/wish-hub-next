import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { TCurrentAvatar } from '@/models/User';
import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MAX_FILE_SIZE_IN_MB,
} from '@/helpers/utils/constants';

interface IProps {
    avatar: TCurrentAvatar;
}

const AvatarValidation: FC<IProps> = ({ avatar }) => {
    const profilePageT = useTranslations('profile-page');

    if (!(avatar instanceof File)) {
        return null;
    }

    // --------------------------------------------------

    const fileExtension = avatar.type.split('/')[1];
    if (!Object.keys(ALLOWED_FILE_EXTENSIONS).includes(fileExtension)) {
        return (
            <p className="mt-1 text-xs text-red-500">
                {profilePageT('avatar-error.file-type')}{' '}
                {Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}.
            </p>
        );
    }

    // --------------------------------------------------

    if (avatar.size > ALLOWED_MAX_FILE_SIZE_IN_MB * 1024 * 1024) {
        return (
            <p className="mt-1 text-xs text-red-500">
                {profilePageT('avatar-error.file-size', {
                    size: ALLOWED_MAX_FILE_SIZE_IN_MB,
                })}
            </p>
        );
    }

    return null;
};

export default AvatarValidation;
