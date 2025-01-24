import React from 'react';
import { Button } from 'antd';
const ButtonForm = ({ title }) => {
    return (
        <div style={{ marginTop: '16px' }}>
            <Button type="primary" htmlType="submit">
                {title}
            </Button>
        </div>
    );
};

export default ButtonForm;