import CryptoJS from 'crypto-js';
import { IWish } from '@/models/wish';
import { EPrivacy } from '@/models/settings';

export const encryptedData = (data: string, secret: string): string =>
    CryptoJS.AES.encrypt(data, secret).toString();

export const decryptedData = (data: string, secret: string): string => {
    try {
        const decrypted = CryptoJS.AES.decrypt(data, secret).toString(
            CryptoJS.enc.Utf8
        );
        if (!decrypted) {
            // TODO: add translation
            throw new Error('Decryption failed');
        }
        return decrypted;
    } catch (error) {
        return data;
    }
};

export const unencryptedData = (data: string, show: IWish['show']): string => {
    if (!data) {
        return '';
    }

    if (show === EPrivacy.ALL || !process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET) {
        return data;
    }

    return decryptedData(data, process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET);
};
