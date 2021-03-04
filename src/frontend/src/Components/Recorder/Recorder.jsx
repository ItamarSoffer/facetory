import { useCallback, useRef, useState } from 'react';
import { ReactMic } from 'react-mic'
import ClickEffect from '../../generic-components/ClickEffect';

const Recorder = ({ onFinish }) => {

    const [isRecording, setIsRecording] = useState(false)
    const [recording, setRecording] = useState(null)

    const startDate = useRef()
    const keyWordList = useRef([])
    const audio = useRef()

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
        console.log(blob)
        console.log(keyWordList.current)
        if (onFinish && typeof onFinish === 'function') onFinish(blob.blobURL, keyWordList.current)
        setRecording(blob.blobURL)
        keyWordList.current = []
    }, [keyWordList])

    const playAudio = ()=>{
        audio.current = new Audio(recording)
        audio.current.play()
    }

    return (
        <div id='recorder'>
            {recording ? 
            
            <div onClick={playAudio} >
            sfsfsff
            </div>
                :
                <> 
                <ReactMic
                    record={isRecording}
                    onStop={onStop}
                    visualSetting='frequencyBars'
                    timeSlice={10000}
                />
                    <div
                        onTouchStart={onKeyWord}
                        onMouseDown={onKeyWord}
                        className={isRecording ? 'push-button' : 'push-button push-button-disabled'}>
                    </div>
                    <div
                        onClick={isRecording ? stopRecording : startRecording}
                        className={isRecording ? "recording-animation-on" : 'recording-animation'}>
                        <div
                            className='microphone'>
                            {isRecording ? <img src='/my-icons/frecuency.svg' /> : <img src='/my-icons/microphone.svg' />}
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Recorder
