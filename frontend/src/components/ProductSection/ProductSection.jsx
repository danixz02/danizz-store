import { useEffect, useState } from "react";
import { FilterProduct } from "../FilterProduct/FilterProduct";
import { ProductCard } from "../ProductCard/ProductCard";
import { api } from "../../services/api";
import "./ProductSection.css";

export function ProductSection() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState(["Todos"]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const [produtosApi, categoriasApi] = await Promise.all([
          api.listProducts(),
          api.listCategories(),
        ]);

        setProdutos(produtosApi);
        setCategorias(["Todos", ...categoriasApi.map((categoria) => categoria.nome)]);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            (produto.categoria?.nome || produto.categoriaId?.nome) ===
            categoriaSelecionada,
        );

  return (
    <section className="product-section">
      <h1 style={{ marginLeft: 22, marginBottom: 16, fontSize: 50 }}>
        Lojinha 💸
      </h1>
      <p style={{ marginLeft: 22 }}>Categorias:</p>
      <FilterProduct
        categorias={categorias}
        categoriaSelecionada={categoriaSelecionada}
        onSelectCategoria={setCategoriaSelecionada}
      />

      {carregando && <p style={{ marginLeft: 22 }}>Carregando produtos...</p>}
      {erro && <p style={{ marginLeft: 22 }}>{erro}</p>}

      <div className="product-list">
        {produtosFiltrados.map((produto) => (
          <ProductCard
            key={produto._id || produto.id}
            id={produto._id || produto.id}
            nome={produto.nome}
            descricao={produto.descricao}
            imagem={produto.imagem}
            linkYoutube={produto.linkYoutube}
            linkCompra={produto.linkCompra}
          />
        ))}
      </div>
    </section>
  );
}
