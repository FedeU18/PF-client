import React from "react";

function CajaInv(props) {
  return (
    <div className="a-box">
     <div className="s-b-text">
        <h2>{props.title}</h2>
        <p>
        {props.resumen}
        </p>
      </div>
      <div className="a-b-img">
        <img src={props.image} alt=""/>
      </div>
    </div>
  );
}

export default CajaInv;