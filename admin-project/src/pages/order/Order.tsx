import React, { useEffect, useState } from 'react';
import { allOrder, confirmOrder } from '../../utils/api/ApiOrder';
import { Input, Table } from 'antd';
import { columnsOrder } from '../../utils/ColumsTable';
import ButtonTable from '../../components/button/ButtonTable';
import { toast } from 'react-toastify';

const Order = () => {
    const [order, setOrder] = useState([]);
    const [search, setSearch] = useState("");

    const getAllOrder = async () => {
        try {
            const res = await allOrder();
            if (res && res.data.code === 200) {
                setOrder(res.data.data);
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllOrder();
    }, [])
    const filteredOrders = order.filter((item) => {
        const userEmail = item.user?.email || "";
        const userName = item.user?.userName || "";
        const phone = item.phone || "";

        return (
            userEmail.toLowerCase().includes(search.toLowerCase()) ||
            userName.toLowerCase().includes(search.toLowerCase()) ||
            phone.toLowerCase().includes(search.toLowerCase())
        );
    });
    const handleConfirm = async (record) => {
        try {
            const res = await confirmOrder(record._id);
            if (res && res.data.code === 200) {
                toast.success("Confirm Order Successfully");
                await getAllOrder();
            } else {
                toast.error("Confirm Fail")
            }
        } catch (error) {

        }
    };

    return (
        <div>
            <div>
                <h2>Orders</h2>
                <Input placeholder='Search email, name, phone' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='mb-2'>
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columnsOrder(handleConfirm)} dataSource={filteredOrders} />
        </div>
    );
};

export default Order;