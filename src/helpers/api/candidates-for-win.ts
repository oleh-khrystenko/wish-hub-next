import { AxiosResponse } from 'axios';
import api from '@/helpers/api/settings';
import { ICandidateForWin } from '@/models/User';

const getCandidatesForWin = async (): Promise<
    AxiosResponse<ICandidateForWin[]>
> => {
    return await api.get('/candidates-for-win');
};

const candidatesForWinApi = {
    getCandidatesForWin,
};

export default candidatesForWinApi;
