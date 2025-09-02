import { Link } from "react-router-dom";
import PocketImg from "../../Images/pocket.png"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Style from './Footer.module.scss'

function Footer(){
    return(
        <footer className="flex flex-direction-column">
            <div className="row">
                <div className="row">
                    <img src={PocketImg} alt="pocket image" title="pocket image" width={30} height={30}/>
                    <h4>TaskPocket</h4>
                </div>
                <ul className={`row ${Style.links}`} aria-label="Main navigation links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/user/tasks">Tasks</Link></li>
                </ul>
            </div>
            <div className="row">
                <ul className={`row ${Style.social}`} aria-label="Social accounts nagivation links">
                    <li><a href="https://www.facebook.com/raheeqm.mousa" aria-label="Raheeq Mousa's Facebook prfile" target="_blank" rel="noopener noreferrer"><FaFacebook color="white" size={28} /></a></li>
                    <li><a href="https://www.instagram.com/heko._.spams/" aria-label="Raheeq Mousa's Instagram prfile" target="_blank" rel="noopener noreferrer"><FaInstagram color="white" size={28} /></a></li>
                    <li><a href="www.linkedin.com/in/raheeq-mousa" aria-label="Raheeq Mousa's Linkedin prfiele" target="_blank" rel="noopener noreferrer"><FaLinkedin color="white" size={28} /></a></li>
                </ul>
                <span>
                    CopyRight &copy; <a href="mailto:raheeqmousa99@gmail.com">raheeqmousa99@gmail.com</a>. All rights reserved
                </span>
            </div>
        </footer>
    )
}
export default Footer;