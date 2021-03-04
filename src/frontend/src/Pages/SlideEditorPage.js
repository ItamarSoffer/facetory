import React from 'react';
import '../styles/slideEditorPage.scss';
import Canvas from "../Components/Canvas";
import { Form, Input, Button, Card, Typography } from 'antd';
const { Title } = Typography;


export default function SlideEditorPage() {
    return (
        <div>
            <Title level={1} style={{ textAlign: "center" }}>Tell Your Story </Title>
            SlideEditorPage
            <Canvas imageUrl="https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-sunlight.jpg?w=585&scale=down"/>
        </div>
    )
}