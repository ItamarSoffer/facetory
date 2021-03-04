import React, { useState, useRef } from 'react';
import Canvas from "../Canvas";
import Colors from '../Colors'
import Recorder from '../Recorder/Recorder';
import ImagePopup from '../imageComponents/ImagePopup'

//HARD-CODED
const slide =
{
    canvas: {
        imageUrl: 'https://sites.google.com/site/mychetsite/_/rsrc/1468863654615/home/mychetsite/summer2.jpg',
        backgroundColor: '#FFFFFF',
        imagePosition: { x: 50, y: 50 },
        imageAngle: 0,
        imageSize: 80,
        stickers: [
            {
                src: '/stickers/sticker_1.svg',
                x: 15,
                y: 15,
                size: 10,
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
                size: 30,
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
    const recordBlob = useRef(null)
    const keyWordsTimes = useRef(null)
    const [isImagesPopupOpen, setIsImagesPopupOpen] = useState(false)
    const [color, setColor] = useState(slide.canvas.backgroundColor);
    const [backgroundImageSrc, setBackgroundImageSrc] = useState(null);
    const [backgroundImagePosition, setBackgroundImagePosition] = useState(slide.canvas.imagePosition);
    const [backgroundImageAngle, setBackgroundImageAngle] = useState(slide.canvas.imageAngle);
    const [backgroundImageSize, setBackgroundImageSize] = useState(slide.canvas.imageSize);
    const [stickers, setstickers] = useState(slide.canvas.stickers);
    const [colorsOpen, setColorsOpen] = useState(false);
    const [stickersOpen, setStickersOpen] = useState(false);

    const onRecorderFinish = (blob, array) => {
        recordBlob.current = blob
        keyWordsTimes.current = array
    }

    const onRecordDelete = () => {
        recordBlob.current = null
        keyWordsTimes.current = null
    }


    const toggleColors = () => {
        setColorsOpen(!colorsOpen);
    }

    const toggleStickers = () => {
        setStickersOpen(!stickersOpen);
    }

    return (
        <div className='slide-editor-page'>
            <div>
                <div>
                    <div className='title'>שקופית חדשה</div>
                    {!backgroundImageSrc ?
                        <div className='upload-image-conteiner' onClick={() => { setIsImagesPopupOpen(true) }}>
                            <div>
                                <img src='/my-icons/default-image.svg' />
                                <div>העלאת תמונה</div>
                            </div>
                        </div> :
                        <Canvas
                            backgroundImageSrc={backgroundImageSrc}
                            backgroundImagePosition={backgroundImagePosition}
                            backgroundImageAngle={backgroundImageAngle}
                            backgroundImageSize={backgroundImageSize}
                            backgroundColor={color}
                            stickers={stickers}
                        />
                    }
                    <div className='slide-tool-bar'>
                        <div
                            className='tool-bar-icon'
                            onClick={toggleStickers}
                        >
                            <img src='/my-icons/smiley.svg' />
                        </div>
                        <div
                            className='tool-bar-icon'
                            onClick={toggleColors}
                        >
                            <img src='/my-icons/color-fill.svg' />
                        </div>
                        <Colors
                            currentColor={color}
                            setColor={(color) => setColor(color)}
                            open={colorsOpen}
                        />
                        <u className='toolbar-button'>החלפת תמונה</u>
                    </div>
                </div>
                <Recorder
                    onFinish={onRecorderFinish}
                    onDelete={onRecordDelete}
                />
                <button>שמירת השקופית</button>
            </div>
            <ImagePopup isOpen={isImagesPopupOpen} setImageSource={setBackgroundImageSrc} close={() => { setIsImagesPopupOpen(false) }} />
        </div>
    )
}
