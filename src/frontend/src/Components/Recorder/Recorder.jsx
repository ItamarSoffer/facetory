import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactMic } from 'react-mic'
import ClickEffect from '../../generic-components/ClickEffect';
import './recorder.scss'

const Recorder = ({ onFinish }) => {

    const [isRecording, setIsRecording] = useState(false)
    const startDate = useRef()
    const keyWordList = useRef([])

    const startRecording = () => {
        setIsRecording(true)
        startDate.current = new Date()
    }

    const stopRecording = () => {
        setIsRecording(false)
    }

    const onKeyWord = () => {
        if (!isRecording) return
        const keyWordsStartDate = new Date()
        keyWordList.current.push({ start: keyWordsStartDate - startDate.current })
        window.addEventListener('mouseup', stopKeyWord)
        window.addEventListener('touchend', stopKeyWord)
    }

    const stopKeyWord = () => {
        if (!isRecording) return
        window.removeEventListener('mouseup', stopKeyWord)
        window.removeEventListener('touchend', stopKeyWord)
        const keyWordsStopDate = new Date()
        keyWordList.current[keyWordList.current.length - 1].stop = keyWordsStopDate - startDate.current
    }

    const onStop = useCallback((blob) => {
        console.log(keyWordList.current)
        if (onFinish && typeof onFinish === 'function') onFinish(blob, keyWordList.current)
        keyWordList.current = []
    }, [keyWordList])

    return (
        <div id='recorder'>
            <ReactMic
                record={isRecording}
                onStop={onStop}
                visualSetting='frequencyBars'
                timeSlice={10000}
            />
            <div
                onTouchStart={onKeyWord}
                onMouseDown={onKeyWord}
                id='push-button'>
            </div>
            <div
                onClick={isRecording ? stopRecording : startRecording}
                className={isRecording ? "recording-animation-on" : 'recording-animation'}>
                <div
                    className='microphone'>
                    {isRecording ? <img src='/my-icons/frecuency.svg' /> : <img src='/my-icons/microphone.svg' />}
                </div>
            </div>
        </div>
    );
};

export default Recorder
