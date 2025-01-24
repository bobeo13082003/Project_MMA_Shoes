import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
const items = [
    {
        key: '/',
        icon: <PieChartOutlined />,
        label: 'Dasboard',

    },
    {
        key: '/restaurant',
        icon: <DesktopOutlined />,
        label: 'Restaurant',
    },
    {
        key: '/menues',
        icon: <ContainerOutlined />,
        label: 'Menues',
    },
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined />,
        children: [
            {
                key: '5',
                label: 'Option 5',
            },
            {
                key: '6',
                label: 'Option 6',
            },
            {
                key: '7',
                label: 'Option 7',
            },
            {
                key: '8',
                label: 'Option 8',
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    {
                        key: '11',
                        label: 'Option 11',
                    },
                    {
                        key: '12',
                        label: 'Option 12',
                    },
                ],
            },
        ],
    },
];
const SidebarPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate()
    const handleClick = ({ key }) => {
        navigate(key)
    }
    return (
        <div
            style={{
                width: collapsed ? "80px" : "200px",
                backgroundColor: "#071527",
                height: "100%",
                transition: "width 0.3s ease",
                position: "relative",
            }}
        >
            <div style={{ backgroundColor: "#071527", display: "flex", justifyContent: "end" }}>
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: collapsed ? "-55px" : "-50px",
                        transition: "right 0.3s ease",
                        zIndex: 1000,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <Menu
                style={{ height: "100vh" }}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                onClick={handleClick}
            />
        </div>
    );
};

export default SidebarPage;