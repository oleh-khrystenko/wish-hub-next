import { AxiosResponse } from 'axios';
import { IContact, TSendContact } from '@/models/Contact';
import api from '@/helpers/api/settings';

const createContact = async (
    data: TSendContact
): Promise<AxiosResponse<IContact>> => {
    return await api.post('/contact', data);
};

const contactApi = { createContact };

export default contactApi;
