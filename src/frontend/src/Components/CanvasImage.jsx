import useImage from "use-image";
import React, {useRef} from "react";
import { Stage, Layer, Image } from "react-konva";

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
    //   width={props.size}
    //   height={props.size}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
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
