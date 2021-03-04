import React, { useEffect, useState } from "react";
import "../../Styles/imageSearch.scss";
import axios from "axios";

const ImageSearch = (props) => {
  const [searchString, setSearchString] = useState("");
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(false);
  let cancelToken = axios.CancelToken.source();
  const apiKey = process.env.REACT_APP_PIXABAY_API_KEY;

  useEffect(() => {
    (async () => {
      const url = `https://pixabay.com/api/?key=${apiKey}&q=`;
      const res = await axios.get(url, { cancelToken: cancelToken.token });
      if (res)
        setImages(
          res.data.hits.map((image) => {
            return image.largeImageURL;
          })
        );
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  async function getImages(search) {
    const query = encodeURIComponent(search);
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}`;
    cancelToken.cancel();
    cancelToken = axios.CancelToken.source();
    const res = await axios.get(url, { cancelToken: cancelToken.token });
    if (res) {
      setClicked(false);
      setImages(
        res.data.hits.map((image) => {
          return image.largeImageURL;
        })
      );
    }
  }

  const handleImageClick = (imageSource, index) => {
    setClicked(index);
    props.setSource(imageSource);
  };

  return (
    <div className='search-container'>
      <input
        className='searchInput'
        onChange={(e) => {
          if (e.target.value.length > 50) return;
          setSearchString(e.target.value);
          getImages(e.target.value);
        }}
        placeholder=''
        value={searchString}
      />
      <div className={`image-picker`}>
        {images.length !== 0
          ? images.map((imageSource, index) => {
              return (
                <div className={clicked === index ? "clicked" : ""} key={index}>
                  <img
                    src={imageSource}
                    onClick={() => {
                      handleImageClick(imageSource, index);
                    }}
                  />
                  <div></div>
                  <img className='check' src='/my-icons/check.svg' />
                </div>
              );
            })
          : "לא נמצאו תוצאות"}
      </div>
    </div>
  );
};

export default ImageSearch;
