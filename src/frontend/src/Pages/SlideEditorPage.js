import React, { useEffect, useState } from 'react';
import '../styles/slideEditorPage.scss';
import { Form, Input, Button, Card, Typography } from 'antd';

//COMPONENTS
import ColorToolbar from '../Components/ColorToolbar'

const { Title } = Typography;

export default function SlideEditorPage() {

    const [color, setColor] = useState('#FFFFFF');

    useEffect(() => {
        console.log(color);
    }, [color]);

    return (
        <div className="border-box">
            <div className='main-container' style={{ backgroundColor: color }}>
                <Title level={1} style={{ textAlign: "center" }}>New Slide </Title>
                <div> canvas </div>
                <ColorToolbar setColor={(color) => setColor(color)} />
                <div> recording </div>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '350px' }}>
                    save slide
                      </Button>
            </div>
            <div className='sidebar'>

            </div>
        </div>
    )
}