export type TSendContact = {
    name: string;
    email: string;
    message: string;
};

export interface IContact extends TSendContact {
    id: string;
}
