import React, { useState } from "react";
import Popup from "../general-components/Popup";
import ImageUploader from './ImageUploader';
// import ImageSearch from './imageSearch';

const ImagePopup = ({ open }) => {
  const [isUpload, setIsUpload] = useState(true); //state that determines whether the user is uploading an image(true) or searching an image(false)

  return (
    <Popup isShowing={true}>
      <div className="image-popup-body">
        <div className="image-popup-icons">
          <div className="image-popup-icon-wrapper">
            <div
              className="image-popup-icon"
              onClick={() => setIsUpload(true)}
            />
            <div
              className="image-popup-icon"
              onClick={() => setIsUpload(false)}
            />
          </div>
        </div>
        <div>{isUpload ? <ImageUploader /> : <></>}</div>
      </div>
    </Popup>
  );
};

export default ImagePopup;
