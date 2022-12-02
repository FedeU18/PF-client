import React from "react";
import "./Footer.css";

function Footer() {
  return (
    
      <div className="footer-container">
        <div className="footer">
          {/* Column1 */}
          <div className="col">
            <h4>Soporte</h4>
            <li>Politicas de privacidad</li>
            <li>Terminos del servicio</li>
            <li>Legal</li>
            <li>Acerca de nosotro</li>
            <li>Find el medioambiente</li>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Paises</h4>
            <ui className="list-unstyled">
              <li>Peru</li>
              <li>Argentina</li>
              <li>Colombia</li>
              <li>etc...</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Redes Sociales</h4>
            <ui className="list-unstyled">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Youtube</li>
              <li>Instagram</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="abajo">
          <p className="">
            &copy;{new Date().getFullYear()} Find Your Teacher | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
 
  );
}

export default Footer;