import React, { useState } from "react";
import Popup from "../general-components/Popup";
import ImageSearch from "./ImageSearch";
import ImageUploader from "./ImageUploader";
import "../../styles/imagePopup.scss";

const ImagePopup = ({ open }) => {
  const [isUpload, setIsUpload] = useState(true); //state that determines whether the user is uploading an image(true) or searching an image(false)
  const [imageSource, setImageSource] = useState("");

  return (
    <Popup isShowing={true}>
      <div className="image-popup-body" dir="rtl">
        <div className="image-popup-icons">
          <div
            className="image-popup-icon"
            onClick={() => setIsUpload(false)}
            style={{ borderBottom: isUpload ? "none" : "2px solid #4b7cff" }}
          >
            <div style={{ backgroundColor: isUpload ? "#ffffff" : "#4b7cff" }}>
              <div
                style={{
                  WebkitMaskImage: `url(/my-icons/search-blue.svg)`,
                  background: isUpload ? "#4b7cff" : "#ffffff"
                }}
              />
            </div>
          </div>
          <div
            className="image-popup-icon"
            onClick={() => setIsUpload(true)}
            style={{ borderBottom: !isUpload ? "none" : "2px solid #4b7cff" }}
          >
            <div style={{ backgroundColor: !isUpload ? "#ffffff" : "#4b7cff" }}>
              <div
                style={{
                  WebkitMaskImage: `url(/my-icons/upload-blue.svg)`,
                  background: !isUpload ? "#4b7cff" : "#ffffff"
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {isUpload ? (
            <ImageUploader source={imageSource} setSource={setImageSource} />
          ) : (
            <ImageSearch setSource={setImageSource} />
          )}
        </div>
      </div>
    </Popup>
  );
};

export default ImagePopup;
