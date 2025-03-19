import axios from '../customizeApi'

export const allOrder = () => {
    return axios.get('admin/order');
}
export const confirmOrder = (orderId: string) => {
    return axios.put(`admin/order/confirm/${orderId}`)
}