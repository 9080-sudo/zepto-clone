import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MySlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      swipeToSlide: true, // Enable swiping
      swipe: true,
      arrows: true,
    };
    return (
      <div style={{ width: "300px" }}>
        <Slider {...settings}>
          <div>
            <h3>Slide 1</h3>
          </div>
          <div>
            <h3>Slide 2</h3>
          </div>
          <div>
            <h3>Slide 3</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

export default MySlider;
