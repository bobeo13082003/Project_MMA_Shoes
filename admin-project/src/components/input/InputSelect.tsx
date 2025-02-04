import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { allRestaurants } from '../../utils/api/ApiRestaurant';

const InputSelect = ({ setFieldValue, label }) => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const getAllRestaurants = async () => {
        try {
            const res = await allRestaurants();
            if (res && res.data.code === 200) {
                setOptions(res.data.data.map((r) => ({ value: r._id, label: r.title })))
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
            <label style={{ fontWeight: 'bold' }}>{label}</label>
            <Select
                className='mb-2'
                onChange={(option) => setFieldValue("restaurant", option ? option.value : "")}
                options={options}
            />
        </div>
    );
};

export default InputSelect;