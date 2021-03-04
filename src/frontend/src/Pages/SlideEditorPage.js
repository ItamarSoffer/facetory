import React, { useEffect, useState } from 'react';
import '../styles/slideEditorPage.scss';
import Canvas from "../Components/Canvas";
import { Form, Input, Button, Card, Typography } from 'antd';
import useImage from "use-image";

//COMPONENTS
import Colors from '../Components/Colors'

const { Title } = Typography;


//HARD-CODED
const slide =
{
    canvas: {
        imageUrl: 'data:image/jpeg;base64,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',
        backgroundColor: '#FFFFFF',
        imagePosition: { x: 0, y: 0 },
        imageAngle: 0,
        imageSize: 100,
        stickers: [
            {
                src: '/stickers/sticker_1.svg',
                x: 15,
                y: 15,
                size: 5,
                angle: 0
            },
            {
                src: '/stickers/sticker_19.svg',
                x: 25,
                y: 25,
                size: 5,
                angle: 0
            },
            {
                src: '/stickers/sticker_23.svg',
                x: 35,
                y: 35,
                size: 5,
                angle: 0
            },
            {
                src: '/stickers/sticker_25.svg',
                x: 45,
                y: 45,
                size: 5,
                angle: 0
            },
            {
                src: '/stickers/sticker_5.svg',
                x: 55,
                y: 55,
                size: 5,
                angle: 0
            },
            {
                src: '/stickers/sticker_14.svg',
                x: 65,
                y: 65,
                size: 5,
                angle: 0
            },
        ]
    }
}

export default function SlideEditorPage() {

    const [color, setColor] = useState(slide.canvas.backgroundColor);
    const [backgroundImageSrc, setBackgroundImageSrc] = useState(slide.canvas.imageUrl);
    const [backgroundImagePosition, setBackgroundImagePosition] = useState(slide.canvas.imagePosition);
    const [backgroundImageAngle, setBackgroundImageAngle] = useState(slide.canvas.imageAngle);
    const [backgroundImageSize, setBackgroundImageSize] = useState(slide.canvas.imageSize);
    const [stickers, setstickers] = useState(slide.canvas.stickers);

    const [colorsOpen, setColorsOpen] = useState(false);
    const [stickersOpen, setStickersOpen] = useState(false);

    const toggleColors = () => {
        setColorsOpen(!colorsOpen);
    }

    const toggleStickers = () => {
        setStickersOpen(!stickersOpen);
    }

    return (
        <div className="border-box">
            <div className='main-container' >
                <Title level={1} style={{ textAlign: "center" }}>New Slide </Title>
                <Canvas
                    backgroundImageSrc={backgroundImageSrc}
                    backgroundImagePosition={backgroundImagePosition}
                    backgroundImageAngle={backgroundImageAngle}
                    backgroundImageSize={backgroundImageSize}
                    backgroundColor={color}
                    stickers={stickers}
                />
                <div className='slide-toolbar'>
                    <img
                        onClick={toggleStickers}
                        className='toolbar-Button'
                        src={'/my-icons/stickers.svg'}
                    />
                    <img
                        onClick={toggleColors}
                        className='toolbar-Button'
                        src={'/my-icons/background.svg'}
                    />
                    <Colors
                        currentColor={color}
                        setColor={(color) => setColor(color)}
                        open={colorsOpen}
                    />
                    <u className='toolbar-button'>החלפת תמונה</u>
                </div>
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