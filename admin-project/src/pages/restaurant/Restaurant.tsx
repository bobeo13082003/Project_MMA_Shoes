import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import FormAddRestaurant from '../../components/form/FormAddRestaurant';
import { columnsAddRestaurant } from '../../utils/ColumsTable';
import { allRestaurants } from '../../utils/api/ApiRestaurant';
import ButtonTable from '../../components/button/ButtonTable';


const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const getAllRestaurants = async () => {
        try {
            const res = await allRestaurants();

            if (res && res.data.code === 200) {
                const updatedData = res.data.data.map(item => ({
                    ...item,
                    type: "restaurant"
                }));

                setRestaurants(updatedData)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllRestaurants()
    }, [])

    const columns = columnsAddRestaurant.map((col) =>
        col.key === 'action'
            ? {
                ...col,
                render: (_, record) => <ButtonTable record={record} resetData={getAllRestaurants} />
            }
            : col
    );
    return (
        <div>
            <h2>Restaurant</h2>
            <div className='mb-2'>
                <FormAddRestaurant getAllRestaurants={getAllRestaurants} />
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columns} dataSource={restaurants} />
        </div>
    );
};

export default Restaurant;