'use client';

import { IGuestWish } from '@/models/wish';
import { encryptedData } from '@/helpers/utils/encryption-data';

const UseGuestWishes = () => {
    const getGuestWishes = (): string | null => {
        const localGuestWishes = localStorage.getItem('guestWishes') || '';
        const parsedGuestWishes: IGuestWish[] =
            localGuestWishes.length > 0
                ? (JSON.parse(localGuestWishes) as IGuestWish[])
                : [];

        const secretKey = process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET;
        let encryptedGuestWishes: IGuestWish[] = [];
        if (parsedGuestWishes.length > 0 && secretKey) {
            encryptedGuestWishes = parsedGuestWishes.map((wish) => {
                return {
                    id: wish.id,
                    userId: wish.userId,
                    material: wish.material,
                    show: wish.show,
                    name: encryptedData(wish.name, secretKey),
                    price: wish.price,
                    currency: wish.currency,
                    addresses: wish.addresses?.map((address) => ({
                        ...address,
                        value: encryptedData(address.value, secretKey),
                    })),
                    description: encryptedData(wish.description, secretKey),
                };
            });
        }

        return encryptedGuestWishes.length > 0
            ? JSON.stringify(encryptedGuestWishes)
            : null;
    };

    return { getGuestWishes };
};

export default UseGuestWishes;
