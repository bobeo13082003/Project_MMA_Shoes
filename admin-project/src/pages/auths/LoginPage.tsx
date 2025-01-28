import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import './Login.css'
import { toast } from 'react-toastify'
import { loginAdmin } from '../../utils/api/ApiAuths';
import { useNavigate } from 'react-router';
const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handelLogin = async () => {
        try {
            if (!email || !password) {
                return toast.error("Input Not empty")
            }
            const res = await loginAdmin(email, password);
            if (res && res.data.code === 200) {
                toast.success("Login Successfully")
                localStorage.setItem('token', res.data.token);
                navigate('/')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='login-form'>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" onClick={handelLogin}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;