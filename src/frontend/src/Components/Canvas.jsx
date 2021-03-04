import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import CanvasImage from "./CanvasImage";
import useImage from "use-image";

// const URLImage = ({ image, dragUrl }) => {
//   const [img] = useImage(image.src);
//   const imageRef = useRef();
//   return (
//     <Image
//       ref={imageRef}
//       image={img}
//       x={image.x}
//       y={image.y}
//       offsetX={img ? img.width / 2 : 0}
//       offsetY={img ? img.height / 2 : 0}
//       draggable
//       onDragStart={(e) => {
//         console.log("started dragging!!");
//         dragUrl.current = e.target.src;
//       }}
//       onDragEnd={() => {
//         console.log("ended drag!");
//       }}
//     />
//   );
// };

const Canvas = (props) => {
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const stageRef = useRef();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.offsetWidth);
      setHeight(wrapperRef.current.offsetHeight);
    }
  }, [wrapperRef]);

  return (
    <div>
      {/* <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      /> */}
      <div
      /*         onDrop={(e) => {
          console.log("dropped!!");
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
        onDragOver={(e) => e.preventDefault()} */
      >
        <div
          className="slide-canvas-wrapper"
          ref={wrapperRef}
          style={{ backgroundColor: props.backgroundColor }}
        >
          <Stage
            width={width ? width : 0}
            height={height ? height : 0}
            ref={stageRef}
          >
            <Layer width={width ? width : 0} height={height ? height : 0}>
              <CanvasImage
                key={0}
                src={props.backgroundImageSrc}
                x={props.backgroundImagePosition.x}
                y={props.backgroundImagePosition.y}
                size={props.backgroundImageSize}
                angle={props.backgroundImageAngle}
              />
              {props.stickers.map((sticker, index) => {
                return (
                  <CanvasImage
                    key={index}
                    src={sticker.src}
                    x={sticker.x}
                    y={sticker.y}
                    size={sticker.size}
                    angle={sticker.angle}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
