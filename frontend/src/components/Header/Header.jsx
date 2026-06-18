import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/imagens/logo.png";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  function handleCardClick() {
    navigate(`/`);
  }

  function handleAdminClick() {
    navigate(isAdmin ? "/admin" : "/login");
  }

  return (
    <header className="header-container">
      <nav className="nav-container">
        <img src={Logo} alt="Logo" className="logo-img" />

        <div className="nav-links">
          <a
            className="nav-itens"
            onClick={handleCardClick}
            tabIndex="0"
            role="link"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCardClick();
              }
            }}
            style={{ cursor: "pointer" }}
          >
            Início
          </a>
          <a className="nav-itens" href="https://www.youtube.com/@dan1zzyt?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
            Youtube
          </a>
          <a className="nav-itens" href="https://www.instagram.com/dan1zz_yt" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </nav>
    </header>
  );
}
