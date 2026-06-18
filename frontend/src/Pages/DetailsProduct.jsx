import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import "./DetailsProduct.css";

export function DetailsProduct() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProduto() {
      try {
        const produtoApi = await api.getProduct(id);
        setProduto(produtoApi);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto();
  }, [id]);

  if (carregando) {
    return (
      <main className="details-product">
        <h1>Carregando produto...</h1>
      </main>
    );
  }

  if (erro || !produto) {
    return (
      <main className="details-product">
        <h1>Produto nao encontrado</h1>
        <Link to="/">Voltar para a loja</Link>
      </main>
    );
  }

  return (
    <main className="details-product">
      <img src={produto.imagem} alt={produto.nome} className="details-image" />

      <section className="details-info">
        <span className="details-category">
          {produto.categoria?.nome || produto.categoriaId?.nome}
        </span>
        <h1>{produto.nome}</h1>
        <p>{produto.descricaoCompleta || produto.descricao}</p>

        <div className="details-links">
          {(produto.possuiUrlYoutube ?? false) && produto.linkYoutube && (
            <a href={produto.linkYoutube} target="_blank" rel="noopener noreferrer">
              Ver no YouTube
            </a>
          )}

          {(produto.possuiUrlCompra ?? false) && produto.linkCompra && (
            <a href={produto.linkCompra} target="_blank" rel="noopener noreferrer">
              Comprar
            </a>
          )}
        </div>
      </section>
    </main>
  );
}