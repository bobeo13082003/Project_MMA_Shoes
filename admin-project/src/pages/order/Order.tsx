import React, { useEffect, useState } from 'react';
import { allOrder } from '../../utils/api/ApiOrder';
import { Input, Table } from 'antd';
import { columnsOrder } from '../../utils/ColumsTable';
import ButtonTable from '../../components/button/ButtonTable';

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
    return (
        <div>
            <div>
                <h2>Orders</h2>
                <Input placeholder='Search email, name, phone' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='mb-2'>
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columnsOrder} dataSource={filteredOrders} />
        </div>
    );
};

export default Order;