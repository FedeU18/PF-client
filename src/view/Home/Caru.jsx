import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import promo2 from "./img/promo2.png";
import promo3 from "./img/promo3.png";
import promo4 from "./img/promo4.png";
import styles from "./Caru.module.css"

const Caru = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={`carusellll d-flex justify-content-center ${theme === "dark" ? styles.carrucel_theme : null}`}>
      <Carousel
        className="rounded-5 d-flex "
        style={{ maxWidth: "none", height: "80%" }}
      >
        <Carousel.Item className="carusel-contenedor">
          <img className="imagen-caru" src={promo2} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={promo3}
            alt="Second slide"
            style={{}}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 " src={promo4} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Caru;
