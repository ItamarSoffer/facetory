import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Title } = Typography;

export default function LoginPage () {
    /*return (
        <div>
            LoginPage
        </div>
    )*/
    return <NormalLoginForm />
    
}

const NormalLoginForm = () => {
  const onFinish = (values) => {
    alert("hi")
    console.log('Received values of form: ', values);
  };

  return (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', left: '50%', top: '30%',
            transform: 'translate(-50%, -50%)'

        }}>
        <Card
            style={{
                width: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                borderColor: '#ddd',
                minHeight: 300

            }}>
            <Title level={1} style={{textAlign:"center"}}>Tell Your Story </Title>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}

            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '350px'}}>
                        Log in
                    </Button>

                </Form.Item>
            </Form>
        </Card>
    </div>
);
};

//ReactDOM.render(<NormalLoginForm />, mountNode);