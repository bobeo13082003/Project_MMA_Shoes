import axios from '../customizeApi'

export const addNewMenu = (title, description, price, restaurant, isAvailable, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("restaurant", restaurant);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("isAvailable", isAvailable);

    return axios.post('/menues/new-menues', formData)
}

export const allMenues = () => {
    return axios.get('menues/all-menues')
}