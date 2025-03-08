import React, { useEffect, useState } from 'react';
import { allOrder } from '../../utils/api/ApiOrder';
import { Table } from 'antd';
import { columnsOrder } from '../../utils/ColumsTable';

const Order = () => {
    const [order, setOrder] = useState([]);
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
    return (
        <div>
            <h2>Restaurant</h2>
            <div className='mb-2'>
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columnsOrder} dataSource={order} />
        </div>
    );
};

export default Order;