import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactMic } from 'react-mic'
import ClickEffect from '../../generic-components/ClickEffect';
import Popup from '../general-components/Popup';

const Recorder = ({ onFinish }) => {

    const [isRecording, setIsRecording] = useState(false)
    const [recording, setRecording] = useState(null)
    const [isPlaying, setIsPlaying] = useState(null)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

    const startDate = useRef()
    const keyWordList = useRef([])
    const audio = useRef()

    useEffect(() => {
        return () => {
            window.removeEventListener('mouseup', stopKeyWord)
            window.removeEventListener('touchend', stopKeyWord)
            if (audio.current) audio.current.removeEventListener('ended', () => { setIsPlaying(false) })
        }
    }, [])

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

    const playAudio = () => {
        console.log(audio.current)
        if (!audio.current) {
            audio.current = new Audio(recording)
            audio.current.addEventListener('ended', () => { setIsPlaying(false) })
        }
        audio.current.play()
        setIsPlaying(true)
    }

    const pauseAudio = () => {
        audio.current.pause()
        setIsPlaying(false)
    }

    return (
        <div >
            <div id='recorder'>
                {recording ?

                    <div className='play-pause-btn' onClick={isPlaying ? pauseAudio : playAudio} >
                        {isPlaying ?
                            <img width='100%' src='/my-icons/PauseBtn.svg' />
                            :
                            <img width='100%' src='/my-icons/PlayBtn.svg' />
                        }
                    </div>
                    :
                    <>
                        <ReactMic
                            record={isRecording}
                            onStop={onStop}
                            visualSetting='frequencyBars'
                            timeSlice={10000}
                        />
                        <div style={{ display: 'flex' }}>
                            <div
                                onTouchStart={onKeyWord}
                                onMouseDown={onKeyWord}
                                className={isRecording ? 'push-button' : 'push-button push-button-disabled'}>
                                {/* <div> </div> */}
                            </div>
                            <div style={{ color: '#373A42' }}>
                                לחצו על המיקרופון כדי להתחיל להקליט.<br />
                        החזיקו את הכפתור האדום בזמן אמירת שם הילד.
                    </div>
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
            {recording ? <div onClick={()=>{setIsDeletePopupOpen(true)}} className='delete-recording'> מחק הקלטה</div> : <div className='delete-recording' ></div>}

            <Popup
                onClose={() => { setIsDeletePopupOpen(false) }}
                isShowing={isDeletePopupOpen}
            >
                <h2>
                    האם אתה בטוח שברצונך למחוק את ההקלטה?
                </h2>
                <div className='delete-recording-popup-buttons'>
                    <div onClick={()=>{setIsDeletePopupOpen(false)}}>ביטול</div>
                    <div onClick={()=>{
                        audio.current.pause()
                        setIsDeletePopupOpen(false)
                        setIsPlaying(false)
                        setRecording(null)
                        audio.current = null
                    }}>אישור</div>
                </div>
           </Popup>
        </div>
    );
};

export default Recorder
