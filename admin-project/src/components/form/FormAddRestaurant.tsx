import React, { useState } from 'react';
import { Collapse } from 'antd';
import { Formik, Form } from 'formik';
import InputForm from '../../components/input/InputForm';
import InputUploadImage from '../../components/input/InputUploadImage';
import ButtonForm from '../button/ButtonFrom';
import { createRestaurantSchema } from '../../utils/validate/Validate';
import { addNewRestaurant } from '../../utils/api/ApiRestaurant';
import { toast } from 'react-toastify'
const { Panel } = Collapse;
const FormAddRestaurant = () => {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("")

    const handleSubmit = async (values, { resetForm }) => {
        const { title, phone, address, email } = values;
        try {
            const res = await addNewRestaurant(title, image, phone, address, email)
            if (res && res.data.code === 201) {
                toast.success(res.data.message);
                resetForm()
            } else {
                toast.error("Failed to create new restaurant");
            }

        } catch (error) {
            console.log(error);

        }
    };
    return (
        <Collapse
            style={{
                backgroundColor: '#7EA76A',
                fontWeight: 600,
            }}
        >
            <Panel header="Add New Restaurants" key="1">
                <Formik
                    initialValues={{
                        title: '',
                        phone: '',
                        address: '',
                        email: '',
                    }
                    }
                    validationSchema={createRestaurantSchema}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <InputForm title="title" label="Title" />
                            <InputForm title="phone" label="Phone" />
                            <InputForm title="address" label="Address" />
                            <InputForm title="email" label="Email" />

                            <InputUploadImage
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                                setImage={(file) => {
                                    setImage(file);
                                    setFieldValue('image', file);
                                }}
                            />

                            <ButtonForm title="Add New Restaurant" />
                        </Form>
                    )}
                </Formik>
            </Panel>
        </Collapse>
    );
};

export default FormAddRestaurant;