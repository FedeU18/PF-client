import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//inportar archivo css

//importar imagenes
 import imagen1 from "./img-fab/imagen1"
 import imagen2 from "./img-fab/imagen2"
 import imagen3 from "./img-fab/imagen3"
 import imagen4 from "./img-fab/imagen4"
export default class SimpleSlider extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <div>
          <h2> Single Item</h2>
          <Slider {...settings}>
            <div>
              <img className="img" src={imagen1} alt="" />
            </div>
            <div>
              <img className="img" src={imagen2} alt="" />
            </div>
            <div>
              <img className="img" src={imagen3} alt="" />
            </div>
            <div>
              <img className="img" src={imagen4} alt="" />
            </div>
            <div>
              <img className="img" src={imagen1} alt="" />
            </div>
            <div>
              <img className="img" src={imagen1} alt="" />
            </div>
          </Slider>
        </div>
      );
    }
  }