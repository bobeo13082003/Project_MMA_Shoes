import axios from '@/services/api.customize'

export const register = (userName: string, email: string, password: string) => {
    const url = '/api/v1/auth/register';

    return axios.post<IBackendRes<IRegister>>(url, { userName, email, password })
}
export const login = (email: string, password: string) => {
    const url = '/api/v1/auth/login';

    return axios.post<IBackendRes<IRegister>>(url, { email, password })
}

export const vertify = (otp: string, email: string) => {
    const url = '/api/v1/auth/vertify-email';

    return axios.post<IBackendRes<IRegister>>(url, { otp, email })
}

export const resendOtp = (email: string) => {
    const url = '/api/v1/auth/resend-otp';

    return axios.post<IBackendRes<IRegister>>(url, { email })
}