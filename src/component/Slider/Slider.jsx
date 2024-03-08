import React, { useState } from "react";
import "./Slider.scss";

const Slider = ({ image, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const listImage = [image, ...images];

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listImage.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider">
      <button
        type="button"
        className="slider__btn slider__btn--prev"
        onClick={prevSlide}
      >
        Prev
      </button>
      <img src={listImage[currentImageIndex].src} alt="product" className="slider__img" />
      <button
        type="button"
        className="slider__btn slider__btn--next"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Slider;
