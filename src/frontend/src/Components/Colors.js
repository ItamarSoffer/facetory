import React, { Component, useRef } from 'react';

const Colors = (props) => {

    const colors = useRef([
        '#4B5DFF',
        '#874BFF',
        '#FF4BEC',
        '#FF4B6E',
        '#FF5C4B',
        '#FFB14B',
        '#FFDB4B',
        '#239784',
        '#519723',
        '#237197',
        '#000206',
        '#F4F8FF',
        '#FFFFFF'
    ])

    return (<div className='colors'>
        {props.open && colors.current.map(color => {
            return <div
                style={{ backgroundColor: color }}
                className={`color-button ${props.currentColor === color && 'current-color'}`}
                onClick={() => props.setColor(color)}
            />
        })}
    </div>)
}

export default Colors;