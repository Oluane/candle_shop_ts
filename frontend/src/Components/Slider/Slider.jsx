import "./Slider.scss";

import React, { useState } from "react";
import { useEffect } from "react";

const Slider = ({ typeId, requiredImg }) => {
  const constructSliderImgPathArray = (typeId, requiredImg) => {
    const reg = new RegExp(`_${typeId}_`, "");
    const importAll = (require) =>
      require
        .keys()
        .filter((key) => {
          return reg.test(key);
        })
        .map(require);

    const images = importAll(requiredImg);

    return images;
  };

  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    setSliderItems(constructSliderImgPathArray(typeId, requiredImg));
  }, [typeId, requiredImg]);

  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(0);
  }, [sliderItems]);
  return (
    <div className="slider">
      <div className="sliderContent">
        <div className="sliderItems">
          <img src={sliderItems[active]} alt="slider candles" />
        </div>
      </div>
      <div className="sliderIndicators">
        {sliderItems.map((item, i) => {
          return (
            <div key={"sliderIndic" + i} className="imgThumbnails" onClick={() => setActive(i)}>
              <img src={item} alt="candles preview" />
              <span className={"imgBorder" + (active === i ? " active" : "")}></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
