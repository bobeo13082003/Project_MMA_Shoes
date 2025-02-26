import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { columnsAddmenu } from '../../utils/ColumsTable';
import { allMenues } from '../../utils/api/ApiMenues';
import ModalAntd from '../../components/modal/ModalUpdateMenu';
import ButtonTable from '../../components/button/ButtonTable';
import FormAddMenu from '../../components/form/FormAddMenu';

const MenuPage = () => {
    const [menues, setMenues] = useState([]);

    const getAllMenues = async () => {
        try {
            const res = await allMenues();

            if (res && res.data.code === 200) {
                const updatedData = res.data.data.map(item => ({
                    ...item,
                    type: "menu"
                }));
                setMenues(updatedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllMenues();
    }, []);

    const columns = columnsAddmenu.map((col) =>
        col.key === 'action'
            ? {
                ...col,
                render: (_, record) => <ButtonTable record={record} resetData={getAllMenues} />, // 👈 Truyền xuống ButtonTable
            }
            : col
    );

    return (
        <div>
            <h2>Menues</h2>
            <div className='mb-2'>
                <FormAddMenu getAllMenues={getAllMenues} />
            </div>
            <Table pagination={{ pageSize: 5 }} rowKey="_id" columns={columns} dataSource={menues} />
        </div>
    );
};

export default MenuPage;
