import * as Yup from 'yup';

export const createRestaurantSchema = Yup.object({
    title: Yup.string().required('Please input the title!'),
    phone: Yup.string().required('Please input the phone number!'),
    address: Yup.string().required('Please input the address!'),
    email: Yup.string().email('Invalid email format').required('Please input the email!'),
});

export const createMenuSchema = Yup.object({
    restaurant: Yup.string().required("Please choose restaurant"),
    title: Yup.string().required('Please input the title!'),
    description: Yup.string().required('Please input the description!'),
    price: Yup.string().required('Please input the price!'),
});