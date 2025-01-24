import React, { useState } from 'react';
import { Collapse } from 'antd';
import { Formik, Form } from 'formik';
import InputForm from '../../components/input/InputForm';
import InputUploadImage from '../../components/input/InputUploadImage';
import ButtonForm from '../button/ButtonFrom';
import { createRestaurantSchema } from '../../utils/validate/Validate';
const { Panel } = Collapse;
const FormAddRestaurant = () => {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("")


    const handleSubmit = (values) => {
        console.log('Form values:', values);
        console.log('Image:', image);
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
                    }}
                    validationSchema={createRestaurantSchema}
                    onSubmit={handleSubmit}
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