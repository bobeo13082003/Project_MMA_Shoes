import { Button, Space } from 'antd';
import React, { useState } from 'react';
import ModalAntd from '../modal/ModalUpdateMenu';
import ModalUpdateRestaurant from '../modal/ModalUpdateRestaurant';
import { deleteMenu } from '../../utils/api/ApiMenues';
import { toast } from 'react-toastify';
import { deleteRestaurant } from '../../utils/api/ApiRestaurant';

const ButtonTable = ({ record, resetData }) => {
    const [showModalMenu, setShowModalMenu] = useState(false)
    const [showModalRestaurant, setShowModalRestaurant] = useState(false)
    const handleUpdate = async () => {
        if (record.type === "menu") {
            setShowModalMenu(true);
        } else {
            setShowModalRestaurant(true);
        }
    }
    const handleDelete = async () => {
        if (record.type === "menu") {
            try {
                const res = await deleteMenu(record._id)
                if (res && res.data.code === 200) {
                    toast.success("Delete Menu Successfully");
                    resetData();
                }
            } catch (error) {
                console.log(error);

            }
        } else {
            try {
                const res = await deleteRestaurant(record._id)
                if (res && res.data.code === 200) {
                    toast.success("Delete Restaurant Successfully");
                    resetData();
                }
            } catch (error) {
                console.log(error);

            }
        }
    }
    return (
        <div>
            <Space size="middle">
                <Button onClick={handleUpdate} type="primary">Update</Button>
                <Button onClick={handleDelete} danger>Delete</Button>
            </Space>
            <ModalUpdateRestaurant getAllRestaurant={resetData} data={record} showModal={showModalRestaurant} setShowModal={setShowModalRestaurant} />
            <ModalAntd getAllMenues={resetData} data={record} showModal={showModalMenu} setShowModal={setShowModalMenu} />
        </div>
    );
};

export default ButtonTable;