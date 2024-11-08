export type TSendContact = {
    name: string;
    email: string;
    message: string;
};

export interface TContact extends TSendContact {
    id: string;
}
