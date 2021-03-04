import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const Canvas = (props) => {
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const dragUrl = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(images)
  }, [images])

  useEffect(() => {
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.offsetWidth);
      setHeight(wrapperRef.current.offsetHeight);
    }
  }, [wrapperRef]);
  return (
    <div>
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current
              }
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="slide-canvas-wrapper" ref={wrapperRef}>
          <img
            width={width ? width : 0}
            height={height ? height : 0}
            className="slide-canvas-image"
            src={props.imageUrl}
            alt="תמונה"
          />
          <Stage width={width ? width : 0} height={height ? height : 0} ref={stageRef}>
            <Layer width={width ? width : 0} height={height ? height : 0}>
              {images.map((image, index) => {
                return <URLImage key={index} image={image} />;
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
