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
            <h4>Soporte</h4>
            <li>Politicas de privacidad</li>
            <li>Terminos del servicio</li>
            <li>Legal</li>
            <li>Acerca de nosotro</li>
            <li>findteacher2@gmail.com</li>
          </div>
          {/* Column2 */}
          <div>
            <h4>Mas soporte</h4>
            <li> <Link to="/about" className="aFootAbout">
            About
          </Link></li>
              <li>accesibilidad</li>
              <li>Como cuidamos tu privacidad</li>
              <li>Ayuda</li>
              
              <li>etc...</li>
            
          </div>
          {/* Column3 */}
          <div>
            <h4>Redes Sociales</h4>

            <ul className="list-unstyled">
              <a href="https://www.youtube.com/channel/UCsUXZoWZow_fXUi1ATVbsGg" target="_blank">
              <li><IoLogoYoutube size={22}/> Youtube</li>
              </a>
              <a href="https://www.instagram.com/findteacher2/" target="_blank">
              <li><FaInstagram size={22}/> Instagram</li>
              </a>
              <a>
              <li><BsFacebook size={22}/> Facebook</li>
              </a>
              <a>
              <li><AiFillTwitterCircle size={22}/> Twitter</li>
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