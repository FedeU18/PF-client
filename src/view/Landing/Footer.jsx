import React from "react";
import "./Footer.css";
import {FaInstagram} from "react-icons/fa";
import {BsFacebook}from "react-icons/bs";
import {AiFillTwitterCircle} from "react-icons/ai";
import {IoLogoYoutube} from "react-icons/io";

function Footer() {
  return (
    
      <div className="footer-contenedor">
       
        <div className="footer">
          
          {/* Column1 */}
          <div >
            <h4>Soporte</h4>
            <li>Politicas de privacidad</li>
            <li>Terminos del servicio</li>
            <li>Legal</li>
            <li>Acerca de nosotro</li>
            <li>Find el medioambiente</li>
          </div>
          {/* Column2 */}
          <div>
            <h4>Paises</h4>
            <ul className="list-unstyled">
              <li>Peru</li>
              <li>Argentina</li>
              <li>Colombia</li>
              
              <li>etc...</li>
            </ul>
          </div>
          {/* Column3 */}
          <div>
            <h4>Redes Sociales</h4>

            <ui className="list-unstyled">
              <li><BsFacebook size={22}/> Facebook</li>
              <li><AiFillTwitterCircle size={22}/> Twitter</li>
              <li><IoLogoYoutube size={22}/> Youtube</li>
              <li><FaInstagram size={22}/> Instagram</li>
            </ui>

            

          </div>
        </div>
        <hr />
        <div className="copy">
          <p>
            &copy;{new Date().getFullYear()} Find Your Teacher | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
 
  );
}

export default Footer;