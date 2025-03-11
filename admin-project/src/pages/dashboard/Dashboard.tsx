import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table } from "antd";
import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import { allOrder } from "../../utils/api/ApiOrder";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async () => {
        try {
            const res = await allOrder();
            if (res?.data?.code === 200) {
                setOrders(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Tính toán dữ liệu thống kê
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalOrders = orders.length;
    const totalCustomers = new Set(orders.map(order => order.user?.email)).size; // Đếm số khách hàng duy nhất

    // ✅ Chuẩn bị dữ liệu cho biểu đồ doanh thu
    const revenueData = orders.map(order => ({
        date: new Date(order.createdAt).toLocaleDateString("vi-VN"),
        revenue: order.totalPrice,
    }));

    // ✅ Cấu hình biểu đồ Line Chart (Ant Design Charts)
    const config = {
        data: revenueData,
        xField: "date",
        yField: "revenue",
        smooth: true,
        height: 300,
        point: { size: 5, shape: "circle" },
    };

    // ✅ Cấu hình bảng đơn hàng gần đây
    const columns = [
        {
            title: "Email",
            dataIndex: ["user", "email"],
            key: "email",
        },
        {
            title: "Total Price",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price) => `${price.toLocaleString("vi-VN")} VND`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => new Date(date).toLocaleString("vi-VN"),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h2>Dashboard</h2>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Revenue"
                            value={totalRevenue}
                            prefix={<DollarCircleOutlined />}
                            suffix="VND"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Orders"
                            value={totalOrders}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Customers"
                            value={totalCustomers}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="Revenue Over Time" style={{ marginTop: 20 }}>
                <Line {...config} />
            </Card>

            <Card title="Recent Orders" style={{ marginTop: 20 }}>
                <Table columns={columns} dataSource={orders.slice(0, 5)} loading={loading} rowKey="_id" pagination={false} />
            </Card>
        </div>
    );
};

export default Dashboard;
