import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import FormAddRestaurant from '../../components/form/FormAddRestaurant';
import { columnsAddRestaurant } from '../../utils/ColumsTable';
import { allRestaurants } from '../../utils/api/ApiRestaurant';


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
                <FormAddRestaurant getAllRestaurants={getAllRestaurants} />
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columnsAddRestaurant} dataSource={restaurants} />
        </div>
    );
};

export default Restaurant;