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
  const [ch, setCh] = useState(0);
  const [cw, setCw] = useState(0);

  const stageRef = useRef();

  useEffect(() => {
    if (wrapperRef.current) {
      setCw(wrapperRef.current.offsetWidth / 100);
      setCh(wrapperRef.current.offsetHeight / 100);
    }
  }, [wrapperRef]);

  return (
    <div>
      <div>
        <div
          className="slide-canvas-wrapper"
          ref={wrapperRef}
          style={{ backgroundColor: props.backgroundColor }}
        >
          <Stage
            width={cw ? 100 * cw : 0}
            height={ch ? 100 * ch : 0}
            ref={stageRef}
          >
            <Layer width={cw ? 100 * cw : 0} height={ch ? 100 * ch : 0}>
              <CanvasImage
                key={0}
                src={props.backgroundImageSrc}
                x={props.backgroundImagePosition.x * cw}
                y={props.backgroundImagePosition.y * ch}
                size={props.backgroundImageSize * cw}
                angle={props.backgroundImageAngle}
              />
              {props.stickers.map((sticker, index) => {
                return (
                  <CanvasImage
                    key={index}
                    src={sticker.src}
                    x={sticker.x * cw}
                    y={sticker.y * ch}
                    size={sticker.size * cw}
                    angle={sticker.angle * ch}
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
