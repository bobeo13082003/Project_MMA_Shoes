import { Button, Space, Tag } from "antd";
import React from "react";
export const columnsAddRestaurant = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (image) => (
            <img
                src={image}
                alt="Restaurant"
                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '8px' }}
            />
        ),
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
            const color = status === 'active' ? 'green' : 'red';
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary">Update</Button>
                <Button danger>Delete</Button>
            </Space>
        ),
    },
];
export const columnsAddmenu = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (image) => (
            <img
                src={image}
                alt="Menue"
                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '8px' }}
            />
        ),
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        key: 'price',
        dataIndex: 'price',

    },
    {
        title: 'Is Available',
        key: 'isAvailable',
        dataIndex: 'isAvailable',
        render: (avaiable) => {
            const color = avaiable === true ? 'green' : 'red';
            return (
                <Tag color={color} key={avaiable}>
                    {avaiable === true ? "Is avalable" : "Not Avaiable"}
                </Tag>
            );
        },
    },
    {
        title: 'Restaurant',
        key: 'restaurant',
        dataIndex: 'restaurant',
        render: (restaurant) => {
            return (
                <p className="fw-bold">{restaurant.title}</p>
            );
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary">Update</Button>
                <Button danger>Delete</Button>
            </Space>
        ),
    },
];