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
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);

  const stageRef = useRef();

  useEffect(() => {
    if (wrapperRef.current) {
      setCanvasWidth(wrapperRef.current.offsetWidth / 100);
      setCanvasHeight(wrapperRef.current.offsetHeight / 100);
    }
  }, [wrapperRef]);

  console.log(canvasHeight)

  return (
    <div>
      <div>
        <div
          className="slide-canvas-wrapper"
          ref={wrapperRef}
          style={{ backgroundColor: props.backgroundColor }}
        >
          <Stage
            width={canvasWidth ? 100 * canvasWidth : 0}
            height={canvasHeight ? 100 * canvasHeight : 0}
            ref={stageRef}
          >
            <Layer width={canvasWidth ? 100 * canvasWidth : 0} height={canvasHeight ? 100 * canvasHeight : 0}>
              <CanvasImage
                key={0}
                src={props.backgroundImageSrc}
                x={props.backgroundImagePosition.x * canvasWidth}
                y={props.backgroundImagePosition.y * canvasHeight}
                size={props.backgroundImageSize * canvasWidth}
                angle={props.backgroundImageAngle}
              />
              {props.stickers.map((sticker, index) => {
                return (
                  <CanvasImage
                    key={index}
                    src={sticker.src}
                    x={sticker.x * canvasWidth}
                    y={sticker.y * canvasHeight}
                    size={sticker.size * canvasHeight}
                    angle={sticker.angle * canvasHeight}
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
