import React from "react";
import "../../styles/imageUploader.scss";
import { useFiles, FileInput } from "@hilma/fileshandler-client";

const ImageUploader = ({ source, setSource }) => {
  const filesUploader = useFiles();
  return (
    <div className="image-upload-body">
      {source ? (
        <div className="image-picked">
          <img
            src="/my-icons/close.svg"
            onClick={() => {
              setSource(null);
              filesUploader.deleteAll();
            }}
            className="image-x"
          />
          <img src={source} />
        </div>
      ) : (
        <div className="image-upload-title">העלאת תמונה מהקבצים שלך</div>
      )}
      <div className="image-picker-button">
        <label>
          גלריה
          <FileInput
            type="image"
            filesUploader={filesUploader}
            onChange={(uploaded) => {
            console.log('uploaded :', uploaded);
              setSource(uploaded.link);
            }}
            singleUpload={true}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
