import { useCallback, useRef, useState } from 'react';
import { ReactMic } from 'react-mic'
import ClickEffect from '../../generic-components/ClickEffect';

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
            <div onClick={stopRecording}>stop</div>
      
            <div
                onTouchStart={onKeyWord}
                onMouseDown={onKeyWord}
                id='push-button'>

            </div>
            <ClickEffect
                onClick={startRecording}
                id='microphone'>
                <img src='/my-icons/microphone.svg' />
            </ClickEffect>
        </div>
    );
};

export default Recorder
