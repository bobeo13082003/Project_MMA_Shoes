import axios from '../customizeApi'

export const allOrder = () => {
    return axios.get('admin/order');
}