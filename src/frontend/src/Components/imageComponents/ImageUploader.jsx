import React, { useState } from "react";
import "../../styles/imageUploader.scss";
import { useFiles, FileInput } from "@hilma/fileshandler-client";

const ImageUploader = ({source, setSource}) => {

  return (
    <div className="image-upload-body">
      <div className="image-upload-title">העלאת תמונה מהקבצים שלך</div>
      {source && <img src="/my-icons/close.svg" width={15} onClick={()=>setSource(null)}/>}
      {source && <img src={source} width={200}/>}
      {/* <div className="image-upload-button">גלריה</div> */}
      <br />
      <FileInput
        type="image"
        filesUploader={useFiles()}
        onChange={(uploaded) => {
          setSource(uploaded.link)
        }}
        singleUpload={true}
      />
    </div>
  );
};

export default ImageUploader;
