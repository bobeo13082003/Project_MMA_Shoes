import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { createMenuSchema } from '../../utils/validate/Validate';
import { Field, Form, Formik } from 'formik';
import InputForm from '../input/InputForm';
import InputSelect from '../input/InputSelect';
import InputUploadImage from '../input/InputUploadImage';
import { updateMenu } from '../../utils/api/ApiMenues';
import { toast } from 'react-toastify';

const ModalAntd = ({ showModal, setShowModal, data, getAllMenues }) => {
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
        console.log(id, data, data.image);

        try {
            const res = await updateMenu(id, data);

            if (res && res.data.code === 200) {
                toast.success("Update Menu Successfully");
                setShowModal(false);
                await getAllMenues()
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
                    title: data?.title || '',
                    description: data?.description || '',
                    price: data?.price || '',
                    restaurant: data?.restaurant?._id || '',
                    isAvailable: data?.isAvailable || false,
                    image: data?.image || '',
                }}
                validationSchema={createMenuSchema}
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
                        <InputForm as="textarea" title="description" label="Description" />
                        <InputForm type="number" title="price" label="Price" />
                        <InputSelect label="Choose restaurant" setFieldValue={setFieldValue} />

                        <label>
                            <Field type="checkbox" name="isAvailable" />
                            <span className="bold ms-2">Is Available</span>
                        </label>

                        <InputUploadImage
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            setImage={(file) => {
                                setImage(file)
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

export default ModalAntd;
