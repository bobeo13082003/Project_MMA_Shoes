import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { createRestaurantSchema } from '../../utils/validate/Validate';
import { Form, Formik } from 'formik';
import InputForm from '../input/InputForm';
import InputUploadImage from '../input/InputUploadImage';
import { toast } from 'react-toastify';
import { updateRestaurant } from '../../utils/api/ApiRestaurant';

const ModalUpdateRestaurant = ({ showModal, setShowModal, data, getAllRestaurant }) => {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("");
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    useEffect(() => {
        if (data) {
            setDataUpdate(data);
            setPreviewImage(data.image);
        }
    }, [data]);

    const handleSubmit = async (id, data) => {

        try {
            const res = await updateRestaurant(id, data);

            if (res && res.data.code === 200) {
                toast.success("Update Restaurant Successfully");
                setShowModal(false);
                await getAllRestaurant()
            }
        } catch (error) {
            console.log("Validation Failed:", error);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };
    return (
        <Modal title="Update Restaurant" open={showModal} footer={null} >
            <Formik
                initialValues={{
                    title: dataUpdate?.title || '',
                    phone: dataUpdate?.phone || '',
                    address: dataUpdate?.address || '',
                    email: dataUpdate?.email || '',
                    image: dataUpdate?.image || ''
                }}
                validationSchema={createRestaurantSchema}
                onSubmit={(values) => {
                    if (!dataUpdate) {
                        toast.error("Data is not available");
                        return;
                    }
                    handleSubmit(dataUpdate._id, values);
                }}
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

                        <div className="text-end mt-3">
                            <button type="button" className="btn btn-primary" onClick={handleCancel} style={{ marginRight: 8 }}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </Form>

                )}
            </Formik>
        </Modal>
    );
};

export default ModalUpdateRestaurant;
