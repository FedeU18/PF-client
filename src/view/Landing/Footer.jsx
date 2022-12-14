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
       
        <div className="footer ">
          
          {/* Column1 */}
          <div >
            <h4 className="fab-titulos-footer mt-4">Soporte</h4>
            <li className="fab-subtitulos-footer">Politicas de privacidad</li>
            <li className="fab-subtitulos-footer">Terminos del servicio</li>
            <li className="fab-subtitulos-footer">Legal</li>
            <li className="fab-subtitulos-footer">Acerca de nosotro</li>
            <li className="fab-subtitulos-footer">findteacher2@gmail.com</li>
          </div>
          {/* Column2 */}
          <div>
            <h4 className="fab-titulos-footer mt-4">Mas soporte</h4>
            <li className="fab-subtitulos-footer "> <Link to="/about" className="aFootAbout text-white">
            About
          </Link></li>
              <li className="fab-subtitulos-footer">accesibilidad</li>
              <li className="fab-subtitulos-footer">Como cuidamos tu privacidad</li>
              <li className="fab-subtitulos-footer">Ayuda</li>
              
              <li className="fab-subtitulos-footer">etc...</li>
            
          </div>
          {/* Column3 */}
          <div>
            <h4 className="fab-titulos-footer mt-4">Redes Sociales</h4>

            <ul className="list-unstyled">
              <a href="https://www.youtube.com/channel/UCsUXZoWZow_fXUi1ATVbsGg" target="_blank">
              <li className="text-white"><IoLogoYoutube size={30}/> Youtube</li>
               <br />
              </a>
              <a href="https://www.instagram.com/findteacher2/" target="_blank">
              <li className="fab-subtitulos-footer text-white"><FaInstagram size={30}/> Instagram</li>
              </a>
              
              <a>
              <li className="text-primary text-white"><BsFacebook size={30}/> Facebook</li>
              </a>
              <br />
              <a>
              <li className="fab-subtitulos-footer"><AiFillTwitterCircle size={30}/> Twitter</li>
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