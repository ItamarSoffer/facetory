import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";

const Canvas = (props) => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.offsetWidth);
      setHeight(wrapperRef.current.offsetHeight);
    }
  }, [wrapperRef]);

  return (
    <div className="slide-canvas-wrapper" ref={wrapperRef}>
      <img
        width={width ? width : 0}
        // height={height ? height : 0}
        className="slide-canvas-image"
        src={props.imageUrl}
        alt="תמונה"
      />
      <Stage width={width ? width : 0} height={height ? height : 0}>
        <Layer width={width ? width : 0} height={height ? height : 0}>
          <Text
            id="slide-canvas-sticker"
            text="Draggable Text"
            x={x}
            y={y}
            draggable
            fill={isDragging ? "green" : "black"}
            onDragStart={() => {
              setIsDragging(true);
            }}
            onDragEnd={(e) => {
              setIsDragging(false);
              setX(e.target.x());
              setY(e.target.y());
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
