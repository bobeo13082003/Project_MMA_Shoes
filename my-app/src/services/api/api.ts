import axios from '@/services/api.customize'

export const register = (userName: string, email: string, password: string) => {
    const url = '/api/v1/auth/register';

    return axios.post<IBackendRes<IRegister>>(url, { userName, email, password })
}