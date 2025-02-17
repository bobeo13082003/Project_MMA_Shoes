import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be 6 characters')
        .required('Password Not Empty'),
    email: Yup.string().email('Invalid email').required('Email Not Empty'),
});

export const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full Name Not Empty'),
    password: Yup.string()
        .min(6, 'Password must be 6 characters')
        .required('Password Not Empty'),
    email: Yup.string().email('Invalid email').required('Email Not Empty'),
});

export const OrderSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full Name Not Empty'),
    address: Yup.string()
        .required('Address Not Empty'),
    phone: Yup.string()
        .required('Phone Not Empty'),
});