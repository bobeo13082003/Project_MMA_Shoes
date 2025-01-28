import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import FormAddRestaurant from '../../components/form/FormAddRestaurant';
import { columnsAddRestaurant } from '../../utils/ColumsTable';
import { allRestaurants } from '../../utils/api/ApiRestaurant';

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const getAllRestaurants = async () => {
        try {
            const res = await allRestaurants();

            if (res && res.data.code === 200) {
                setRestaurants(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllRestaurants()
    }, [])
    return (
        <div>
            <h2>Restaurant</h2>
            <div className='mb-2'>
                <FormAddRestaurant />
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columnsAddRestaurant} dataSource={restaurants} />
        </div>
    );
};

export default Restaurant;