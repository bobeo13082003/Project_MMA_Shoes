import axios from '@/services/api.customize'

export const register = (userName: string, email: string, password: string) => {
    const url = '/api/v1/auth/register';

    return axios.post<IBackendRes<IRegister>>(url, { userName, email, password })
}
export const login = (email: string, password: string) => {
    const url = '/api/v1/auth/login';

    return axios.post<IBackendRes<ILogin>>(url, { email, password })
}

export const vertify = (otp: string, email: string) => {
    const url = '/api/v1/auth/vertify-email';

    return axios.post<IBackendRes<IRegister>>(url, { otp, email })
}

export const resendOtp = (email: string) => {
    const url = '/api/v1/auth/resend-otp';

    return axios.post<IBackendRes<IRegister>>(url, { email })
}

export const account = () => {
    const url = '/api/v1/auth/profile';

    return axios.get<IBackendRes<IAccount>>(url)
}

export const getRestaurantHome = (refId: string) => {
    const url = `/api/v1/restaurant/${refId}`;

    return axios.get<IBackendRes<IRestaurant>>(url)
}
export const getRestaurant = (id: string) => {
    const url = `/api/v1/restaurant/detail-restaurant`;

    return axios.get<IBackendRes<IRestaurantDetail>>(url, { params: { id } })
}
export const getMenues = (idRestaurant: string) => {
    const url = `/api/v1/menues/menues-restaurant`;

    return axios.get<IBackendRes<IMenues>>(url, { params: { idRestaurant } })
}