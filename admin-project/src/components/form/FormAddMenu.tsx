import React, { useState } from 'react';
import { Collapse } from 'antd';
import { Formik, Form, Field } from 'formik';
import InputForm from '../../components/input/InputForm';
import InputUploadImage from '../../components/input/InputUploadImage';
import ButtonForm from '../button/ButtonFrom';
import { createMenuSchema } from '../../utils/validate/Validate';
import InputSelect from '../input/InputSelect';
import { addNewMenu } from '../../utils/api/ApiMenues';
import { toast } from 'react-toastify';
const { Panel } = Collapse;
const FormAddMenu = ({ getAllMenues }: { getAllMenues: () => Promise<void> }) => {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("")


    const handleSubmit = async (values, { resetForm }) => {
        const { title, description, price, restaurant, isAvailable, image } = values;
        try {
            const res = await addNewMenu(title, description, price, restaurant, isAvailable, image)
            if (res && res.data.code === 201) {
                toast.success(res.data.message);
                resetForm()
                setPreviewImage("")
                await getAllMenues();
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
            <Panel header="Add New Menu" key="1">
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        price: "",
                        restaurant: "",
                        isAvailable: false
                    }}
                    validationSchema={createMenuSchema}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <InputForm title="title" label="Title" />
                            <InputForm as="textarea" title="description" label="Description" />
                            <InputForm type="number" title="price" label="Price" />
                            <InputSelect label="Choose restaurant" setFieldValue={setFieldValue} />
                            <label>
                                <Field type="checkbox" name="isAvailable" />
                                <label className='bold ms-2 ms-2 mb-2'>Is Available</label>
                            </label>

                            <InputUploadImage
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                                setImage={(file) => {
                                    setImage(file);
                                    setFieldValue('image', file);
                                }}
                            />

                            <ButtonForm title="Add New Menu" />
                        </Form>
                    )}
                </Formik>
            </Panel>
        </Collapse>
    );
};

export default FormAddMenu;