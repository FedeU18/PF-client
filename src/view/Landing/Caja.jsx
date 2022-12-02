import React from "react";

function Caja(props) {
  return (
    <div className="a-box">
      <div className="a-b-img">
        <img src={props.image} alt="" />
      </div>
      <div className="s-b-text">
        <h2>{props.title}</h2>
        <p>{props.resumen}</p>
      </div>
    </div>
  );
}
export default Caja;
