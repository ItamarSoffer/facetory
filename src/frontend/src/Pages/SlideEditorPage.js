import React from 'react';
import Recorder from '../Components/Recorder/Recorder';

export default function SlideEditorPage() {
    return (
        <div className='slide-editor-page'>
            <div>
                <div>
                    <div className='title'>שקופית חדשה</div>
                    <div className='upload-image-conteiner'>
                        <div>
                            <img src='/my-icons/default-image.svg' />
                            <div>העלאת תמונה</div>
                        </div>
                    </div>
                    <div className='sile-tool-bar'>
                        <div>
                            <img src='/my-icons/smiley.svg' />
                        </div>
                        <div>
                            <img src='/my-icons/color-fill.svg' />
                        </div>
                    </div>
                </div>
                <Recorder onFinish={(blob, array) => { console.log(blob, array) }} />
            </div>
        </div>
    )
}