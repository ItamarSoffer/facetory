import React, { Component, useRef, useEffect } from 'react';


const nameMentions = [
    {
        startTime: 1.5,
        endTime: 2.3
    },
    {
        startTime: 4,
        endTime: 5
    },
    {
        startTime: 6,
        endTime: 7
    },
    {
        startTime: 10,
        endTime: 11
    },
    {
        startTime: 14,
        endTime: 14.5
    }
]

const AudioPlaying = () => {

    const audio1 = useRef();
    const audio2 = useRef();
    const lastPlayed = useRef(1); //stage 2
    const nameTimeout = useRef(null);


    const handleNameEnd = () => {
        audio1.current.play();
    }

    const handleNextMention = () => {

        console.log('handling mention', audio1.current.currentTime);
        const nextMention = nameMentions.find(m => m.startTime >= audio1.current.currentTime)
        console.log(nextMention);

        if (nextMention) {
            const timeout = (nextMention.startTime - audio1.current.currentTime) * 1000;
            nameTimeout.current = setTimeout(() => {
                audio1.current.pause();
                audio1.current.currentTime = nextMention.endTime;
                audio2.current.play();
            }, timeout);
        }
    }

    const handlePlayButton = () => {
        console.log(`handling play button with ${lastPlayed.current}`);
        //first we check if one of them is playing
        if (!audio1.current.paused) {
            console.log('pausing 1');
            audio1.current.pause();
            lastPlayed.current = 1;
            clearTimeout(nameTimeout.current);
        } else if (!audio2.current.paused) {
            console.log('pausing 2');
            audio2.current.pause();
            lastPlayed.current = 2;
        } else if (lastPlayed.current === 1) {
            console.log('playing 1');
            lastPlayed.current = null;
            audio1.current.play();
        } else if (lastPlayed.current === 2) {
            console.log('playing 2');
            lastPlayed.current = null;
            audio2.current.play();
        }
    }

    return (
        <>
            <audio ref={audio1}
                onPlay={handleNextMention}
                src=''
            />
            <audio ref={audio2}
                onEnded={handleNameEnd}
                src=''
            />
            <img
                onClick={handlePlayButton}
                className='playButton'
                src={'/my-icons/PlayBtn.svg'}
            />
        </>
    )
}

export default AudioPlaying;
