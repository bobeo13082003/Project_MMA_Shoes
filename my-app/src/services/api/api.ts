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
export const getProduct = (idProduct: string) => {
    const url = `/api/v1/menues/detail-product`;
    return axios.get<IBackendRes<IProductDetail>>(url, { params: { idProduct } })
}

export const userOrder = (data: any) => {
    console.log(data);

    const url = `/api/v1/orders`;
    return axios.post(url, data)
}

export const getProfile = () => {
    const url = `/api/v1/auth/profile`;
    return axios.get<IBackendRes<IProfile>>(url);
}

export const createPayment = (amount: number) => {
    const url = `/api/v1/create_payment_url`;
    return axios.post(url, { amount, bankCode: "NCB", language: "vn" });
}

export const checkPaymentStatus = (queryParams: any) => {
    return axios.get(`/api/v1/vnpay_return`, { params: queryParams })
};

export const getOrderHistory = () => {
    return axios.get('api/v1/orders/order-history')
}