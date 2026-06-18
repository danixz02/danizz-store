import { useNavigate } from "react-router-dom";
import logoFooter from "../../assets/imagens/logo-branca.png";
import "./Footer.css";
export function Footer() {
 return (
    <footer className="footer-container">
        <div className="footer-logo-container">
            <img src={logoFooter} alt="Logo" className="footer-logo" />
        </div>

        <div className="footer-menus">
            <p>Menu</p>
            <span className="footer-links">
                <a href="https://danizz-store.vercel.app/">
                 Início
          </a>
                <a href="https://www.youtube.com/@dan1zzyt?sub_confirmation=1">Youtube</a>
                <a href="https://www.instagram.com/dan1zz_yt">Instagram</a>
            </span>
        </div>

        <div className="footer-contact">
            <p>Contato</p>
            <a href="mailto:dan1zzcontato@gmail.com" target="_blank" rel="noreferrer">dan1zzcontato@gmail.com</a>
        </div>
    </footer>
 );
}
