import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from './Carousel2.module.css'

function useSwipeDetection(onSwipe) {
  const handleTouchStart = useRef(null);

  const handleTouchEnd = (e) => {
    if (!handleTouchStart.current) return;

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - handleTouchStart.current;
    const threshold = 50; // Adjust based on your desired sensitivity

    if (deltaX > threshold) {
      onSwipe("left"); // Swipe right (previous item)
    } else if (deltaX < -threshold) {
      onSwipe("right"); // Swipe left (next item)
    }

    handleTouchStart.current = null; // Reset touch position for next swipe
  };

  return {
    onTouchStart: (e) => {
      handleTouchStart.current = e.touches[0].clientX;
    },
    onTouchEnd: handleTouchEnd,
  };
}

function MyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = []; // Your carousel items
  for (let i = 0; i <= 50; i++) {
    items.push(i + 1);
  }

  const { onTouchStart, onTouchEnd } = useSwipeDetection((direction) => {
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + items.length) % items.length
        : (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
  });

//   const settings = {
//     // Your React Slick settings (arrows, dots, etc.)
//     dots: true,
//     infinite: true,
//     beforeChange: (current, next) => setCurrentIndex(next),
//   };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className={classes['item']}>
          {item}
        </div>
      ))}
    </Slider>
  );
}

export default MyCarousel