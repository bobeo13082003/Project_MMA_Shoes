import axios from '../customizeApi'

export const addNewRestaurant = (title, image, phone, address, email) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("email", email);

    return axios.post('admin/restaurant/new-restaurant', formData)
}

export const allRestaurants = () => {
    return axios.get('admin/restaurant/all-restaurant')
}

export const updateRestaurant = (id, values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("email", values.email);

    formData.append("image", values.image);
    return axios.put(`admin/restaurant/edit-restaurant/${id}`, formData)
}
export const deleteRestaurant = (id) => {
    return axios.delete(`admin/restaurant/delete-restaurant/${id}`)
}