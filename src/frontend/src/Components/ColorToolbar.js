import React, { Component, useRef } from 'react';

const ColorToolbar = (props) => {

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
        '#000206'
    ])

    return (<div className='color-toolbar'>
        {colors.current.map(color => {
            return <div
                style={{ backgroundColor: color }}
                className='color-button'
                onClick={() => props.setColor(color)}
            />
        })}
    </div>)
}

export default ColorToolbar;