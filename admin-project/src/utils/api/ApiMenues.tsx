import { data } from 'react-router';
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

export const updateMenu = (id, values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("restaurant", values.restaurant);
    formData.append("isAvailable", values.isAvailable);

    formData.append("image", values.image);
    return axios.put(`/menues/edit-menue/${id}`, formData)
}
export const deleteMenu = (id) => {
    return axios.delete(`/menues/delete-menue/${id}`)
}