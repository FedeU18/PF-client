import React from "react";
import "./Footer.css";
import {FaInstagram} from "react-icons/fa";
import {BsFacebook}from "react-icons/bs";
import {AiFillTwitterCircle} from "react-icons/ai";
import {IoLogoYoutube} from "react-icons/io";
import { Link } from "react-router-dom";

function Footer() {
  return (
    
      <div className="footer-contenedor">
       
        <div className="footer">
          
          {/* Column1 */}
          <div >
            <h4 className="fab-titulos-footer">Soporte</h4>
            <li className="fab-subtitulos-footer">Politicas de privacidad</li>
            <li className="fab-subtitulos-footer">Terminos del servicio</li>
            <li className="fab-subtitulos-footer">Legal</li>
            <li className="fab-subtitulos-footer">Acerca de nosotro</li>
            <li className="fab-subtitulos-footer">findteacher2@gmail.com</li>
          </div>
          {/* Column2 */}
          <div>
            <h4 className="fab-titulos-footer">Mas soporte</h4>
            <li className="fab-subtitulos-footer"> <Link to="/about" className="aFootAbout">
            About
          </Link></li>
              <li className="fab-subtitulos-footer">accesibilidad</li>
              <li className="fab-subtitulos-footer">Como cuidamos tu privacidad</li>
              <li className="fab-subtitulos-footer">Ayuda</li>
              
              <li className="fab-subtitulos-footer">etc...</li>
            
          </div>
          {/* Column3 */}
          <div>
            <h4 className="fab-titulos-footer">Redes Sociales</h4>

            <ul className="list-unstyled">
              <a href="https://www.youtube.com/channel/UCsUXZoWZow_fXUi1ATVbsGg" target="_blank">
              <li className="text-danger"><IoLogoYoutube size={22}/> Youtube</li>

              </a>
              <a href="https://www.instagram.com/findteacher2/" target="_blank">
              <li className="fab-subtitulos-footer"><FaInstagram size={22}/> Instagram</li>
              </a>
              <a>
              <li className="text-primary"><BsFacebook size={22}/> Facebook</li>
              </a>
              <a>
              <li className="fab-subtitulos-footer"><AiFillTwitterCircle size={22}/> Twitter</li>
              </a>
              
            </ul>

            

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