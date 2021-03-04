import useImage from "use-image";
import React, { useRef } from "react";
import { Image } from "react-konva";

const CanvasImage = (props) => {
  const [img] = useImage(props.src);
  const imageRef = useRef();
  return (
    <Image
      ref={imageRef}
      image={img}
      x={props.x}
      y={props.y}
      angle={props.angle}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      width={props.size}
      height={props.size}
      draggable
      onDragStart={(e) => {
        // console.log("started dragging!!");
      }}
      onDragEnd={() => {
        // console.log("ended drag!");
      }}
    />
  );
};

export default CanvasImage;
