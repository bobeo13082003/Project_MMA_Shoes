import axios from '../customizeApi'

export const addNewRestaurant = (title, image, phone, address, email) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("email", email);

    return axios.post('/restaurant/new-restaurant', formData)
}

export const allRestaurants = () => {
    return axios.get('restaurant/all-restaurant')
}