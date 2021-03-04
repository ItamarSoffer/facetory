import React from 'react';
import Recorder from '../Components/Recorder/Recorder';


export default function SlideEditorPage() {
    return (
        <div>
            <Recorder onFinish={(blob, array) => { console.log(blob, array) }} />
        </div>
    )
}