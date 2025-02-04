import React, { useEffect, useState } from 'react';
import { columnsAddmenu } from '../../utils/ColumsTable';
import { Table } from 'antd';
import FormAddMenu from '../../components/form/FormAddMenu';
import { allMenues } from '../../utils/api/ApiMenues';


const MenuPage = () => {
    const [menues, setMenues] = useState([]);
    const getAllMenues = async () => {
        try {
            const res = await allMenues();

            if (res && res.data.code === 200) {
                setMenues(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllMenues()
    }, [])
    return (
        <div>
            <h2>Menues</h2>
            <div className='mb-2'>
                <FormAddMenu getAllMenues={getAllMenues} />
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columnsAddmenu} dataSource={menues} />
        </div>
    );
};

export default MenuPage;