import React from "react";
import "./FooterH.css";
import Footer from ".././Landing/Footer.jsx";
import {useSelector} from 'react-redux'

function FooterH() {
  const theme = useSelector(state => state.theme.theme)
  return (
    <div className={`fab-footer-container ${theme === "dark" ? "dark_footer_theme" : null}`}>
      <div className="fab-footer">
        {/* Column1 */}
        <div className="col" id="fab-col">
          <div className="fab-h1">
            <img
              className="fab-img-footer"
              src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/payment.svg"
              alt=""
            />
          </div>
          <div className="fab-h1">
            <h4>Paga Online</h4>
          </div>
          <p>
            Con Mercado Pago, paga en cuotas y aprovecha la comodidad de
            financiación que te da tu banco, o hazlo con efectivo en puntos de
            pago. ¡Y siempre es seguro!
          </p>
        </div>
        {/* Column2 */}

        <div className="col" id="fab-col">
          <div className="fab-h1">
            <img
              className="fab-img-footer"
              src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/shipping.svg"
              alt=""
            />
          </div>
          <div className="fab-h1">
            <h4>Descuento en tu primera clase</h4>
          </div>
          <div className="fab-h1">
            <p>
              Con estar registrado a la plataforma tendras muchos beneficios.
            </p>
          </div>
        </div>
        {/* Column3 */}

        <div className="col" id="fab-col">
          <div className="fab-h1">
            <img
              className="fab-img-footer"
              src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/protected.svg"
              alt=""
            />
          </div>
          <div className="fab-h1">
            <h4>Seguridad, de principio a fin</h4>
          </div>
          <p>
            ¿No aprendiste? ¡Devuélvelo! En Find, no hay nada que no puedas
            hacer, porque estás siempre protegido.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default FooterH;
