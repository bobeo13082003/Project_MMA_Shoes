import { Button, Space, Tag } from "antd";
import React from "react";
import ButtonTable from "../components/button/ButtonTable";


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
                    {status}
                </Tag>
            );
        },
    },
    {
        title: 'Action',
        key: 'action',

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

    },
];

export const columnsOrder = (handleConfirm) => [
    {
        title: 'Email',
        dataIndex: ['user', 'email'],
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (totalPrice) => `${totalPrice} VND`
    },
    {
        title: 'Total Quantity',
        key: 'totalQuantity',
        dataIndex: 'totalQuantity',

    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        filters: [
            { text: 'Pending', value: 'PENDING' },
            { text: 'Confirmed', value: 'CONFIRMED' },
        ],
        onFilter: (value, record) => record.status === value,
        render: (status) => {
            const color = status === "PENDING" ? 'red' : status === "CONFIRMED" ? "green" : "red";
            return (
                <Tag color={color} key={status}>
                    {status}
                </Tag>
            );
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <>
                <Button type="primary">Detail</Button>
                {record.status === "PENDING" && (
                    <Button
                        type="default"
                        style={{ marginLeft: 8 }}
                        onClick={() => handleConfirm(record)}
                    >
                        Confirm
                    </Button>
                )}
            </>
        )
    },
];