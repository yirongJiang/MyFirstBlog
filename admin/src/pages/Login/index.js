import { Input, message, Card, Form, Button, Checkbox } from "antd";
import React from "react";
import { login } from "../../api";
import { useNavigate } from 'react-router-dom'
import './login.css'
function Login() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        handleLogin(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleLogin = async ({ username, password }) => {
        // console.log(username, password)
        const res = await login({ username, password })
        if (res.data.message = '登陆成功') {
            message.success('登陆成功')
            localStorage.username = username
            localStorage.token = res.data.token
            navigate('/dashboard/blog')
        }
    }

    return <div className="bg-container">
        <div className="login-container">
            <Card className="login-card" title="登陆" bordered={false} >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        <Input />
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
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
                {/* <Input onChange={e => setUsername(e.target.value)}></Input>
    <Input onChange={e => setPassword(e.target.value)}></Input>
    <Button onClick={handleLogin}>登陆</Button> */}
            </Card>
        </div>
    </div>
}


export default Login