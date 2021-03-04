import React, { useRef } from 'react';
import Recorder from '../Components/Recorder/Recorder';

export default function SlideEditorPage() {
    const recordBlob = useRef(null)
    const keyWordsTimes = useRef(null)

    const onRecorderFinish = (blob, array) => {
        recordBlob.current = blob
        keyWordsTimes.current = array
    }

    const onRecordDelete = () => {
        recordBlob.current = null
        keyWordsTimes.current = null
    }

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
                <Recorder
                    onFinish={onRecorderFinish}
                    onDelete={onRecordDelete}
                />
                <button>שמירת השקופית</button>
            </div>
        </div>
    )
}