import React, { useState } from "react";
import "./Carousel.css"; // Import your CSS file

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 6; // Number of total items in the carousel
  const visibleItems = 4; // Number of visible items in the carousel

  const moveLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? prevIndex : prevIndex + 1
    );
  };

  const renderCarouselItems = () => {
    const items = [];
    for (let i = 0; i < totalItems; i++) {
      items.push(
        <div
          key={i}
          className="carousel-item"
          style={{ backgroundColor: "green" }}
        >
          Slide {i + 1}
        </div>
      );
    }
    return items;
  };

  

  const carouselContentStyle = {
    transform: `translateX(${-(currentIndex * (100 / visibleItems))}%)`,
  };

  return (
    <div className="carousel">
      <div className="carousel-content" style={carouselContentStyle}>
        {renderCarouselItems()}
      </div>
      <div className="carousel-btn left" onClick={moveLeft}>
        &#10094;
      </div>
      <div className="carousel-btn right" onClick={moveRight}>
        &#10095;
      </div>
    </div>
  );
};

export default Carousel;
