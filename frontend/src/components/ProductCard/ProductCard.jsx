import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export function ProductCard({
  id,
  nome,
  descricao,
  imagem,
/*   linkYoutube,
  linkCompra, */
}) {
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/produto/${id}`);
  }

/*   function handleLinkClick(event) {
    event.stopPropagation();
  } */

  return (
    <article
      className="product-card"
      onClick={handleCardClick}
      tabIndex="0"
      role="link"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleCardClick();
        }
      }}
    >
      <img src={imagem} alt={nome} className="product-image" />

      <div className="product-info">
        <h2 className="product-name">{nome}</h2>
        <p className="product-description">{descricao}</p>

        {/* <div className="product-links">
          <a
            href={linkYoutube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            Ver no YouTube
          </a>

          <a
            href={linkCompra}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            Comprar
          </a>
        </div> */}
      </div>
    </article>
  );
}
