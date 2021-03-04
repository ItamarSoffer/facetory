import React, { useState } from "react";
import Popup from "../general-components/Popup";
import ImageSearch from "./ImageSearch";
import ImageUploader from "./ImageUploader";
import "../../styles/imagePopup.scss";

const ImagePopup = ({ open }) => {
  const [isUpload, setIsUpload] = useState(true); //state that determines whether the user is uploading an image(true) or searching an image(false)

  return (
    <Popup isShowing={true}>
      <div className="image-popup-body">
        <div className="image-popup-icons">
          <div
            className="image-popup-icon"
            onClick={() => setIsUpload(false)}
            style={{ borderBottom: isUpload ? "none" : "2px solid #4b7cff" }}
          >
            <div style={{ backgroundColor: isUpload ? "#ffffff" : "#4b7cff" }}>
              <img
                src={`/my-icons/search-${isUpload ? "blue" : "white"}.svg`}
                alt="חיפוש"
              />
            </div>
          </div>
          <div
            className="image-popup-icon"
            onClick={() => setIsUpload(true)}
            style={{ borderBottom: !isUpload ? "none" : "2px solid #4b7cff" }}
          >
            <div style={{ backgroundColor: !isUpload ? "#ffffff" : "#4b7cff" }}>
              <img
                src={`/my-icons/upload-${!isUpload ? "blue" : "white"}.svg`}
                alt="העלאה"
              />
            </div>
          </div>
        </div>
        <div>{isUpload ? <ImageUploader /> : <ImageSearch />}</div>
      </div>
    </Popup>
  );
};

export default ImagePopup;
