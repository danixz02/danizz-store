import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import "./AdminPanel.css";

const formularioVazio = {
  nome: "",
  descricao: "",
  descricaoCompleta: "",
  categoria: "",
  imagem: "",
  linkYoutube: "",
  linkCompra: "",
  possuiUrlYoutube: false,
  possuiUrlCompra: false,
};

export function AdminPanel() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [view, setView] = useState("add"); // "add", "list", or "categories"
  const [categoriaForm, setCategoriaForm] = useState({ nome: "" });
  const [salvandoCategoria, setSalvandoCategoria] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);


  async function carregarDados() {
    setCarregando(true);
    setErro("");

    try {
      const [produtosApi, categoriasApi] = await Promise.all([
        api.listProducts(),
        api.listCategories(),
      ]);

      setProdutos(produtosApi);
      setCategorias(categoriasApi);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function handleChange(campo, valor) {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
  }

  function iniciarEdicao(produto) {
    setProdutoEditando(produto._id);
    setFormulario({
      nome: produto.nome,
      descricao: produto.descricao,
      descricaoCompleta: produto.descricaoCompleta,
      categoria: produto.categoria?._id || produto.categoria || "",
      imagem: produto.imagem,
      linkYoutube: produto.linkYoutube,
      linkCompra: produto.linkCompra,
      possuiUrlYoutube: !!produto.linkYoutube,
      possuiUrlCompra: !!produto.linkCompra,
    });
    setMensagem("");
    setErro("");
    setModalAberto(true);
  }

  function cancelarEdicao() {
    setProdutoEditando(null);
    setFormulario(formularioVazio);
    setModalAberto(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      if (produtoEditando) {
        await api.atualizarProduto(produtoEditando, formulario);
        setMensagem("Produto atualizado com sucesso.");
        setModalAberto(false);
      } else {
        await api.adicionarProduto(formulario);
        setMensagem("Produto adicionado com sucesso.");
      }

      cancelarEdicao();
      await carregarDados();
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir(id, nome) {
    const confirmar = window.confirm(`Deseja excluir o produto "${nome}"?`);

    if (!confirmar) return;

    setErro("");
    setMensagem("");

    try {
      await api.removerProduto(id);
      setMensagem("Produto excluido com sucesso.");

      if (produtoEditando === id) {
        cancelarEdicao();
      }

      await carregarDados();
    } catch (error) {
      setErro(error.message);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  async function handleAddCategoria(event) {
    event.preventDefault();
    setSalvandoCategoria(true);
    setErro("");
    setMensagem("");

    try {
      await api.addCategory(categoriaForm);
      setMensagem("Categoria adicionada com sucesso.");
      setCategoriaForm({ nome: "" });
      await carregarDados();
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvandoCategoria(false);
    }
  }

  async function handleDeleteCategoria(id, nome) {
    const confirmar = window.confirm(`Deseja excluir a categoria "${nome}"?`);

    if (!confirmar) return;

    setErro("");
    setMensagem("");

    try {
      await api.deleteCategory(id);
      setMensagem("Categoria excluida com sucesso.");
      await carregarDados();
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <button
          className={`sidebar-btn ${view === "add" ? "active" : ""}`}
          onClick={() => setView("add")}
        >
          Adicionar produto
        </button>
        <button
          className={`sidebar-btn ${view === "list" ? "active" : ""}`}
          onClick={() => setView("list")}
        >
          Todos produto
        </button>
        <button
          className={`sidebar-btn ${view === "categories" ? "active" : ""}`}
          onClick={() => setView("categories")}
        >
          Categorias
        </button>
        <button className="sidebar-btn logout" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="admin-content">
        {view === "add" ? (
          <>
            <div className="content-header">
              <h1>{produtoEditando ? "Editar produto" : "Adicionar produto"}</h1>
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={salvando}
              >
                {salvando
                  ? "Salvando..."
                  : produtoEditando
                    ? "Salvar alteracoes"
                    : "Adicionar produto"}
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  value={formulario.nome}
                  onChange={(event) => handleChange("nome", event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select
                  value={formulario.categoria}
                  onChange={(event) => handleChange("categoria", event.target.value)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Descricao curta</label>
                <textarea
                  value={formulario.descricao}
                  onChange={(event) => handleChange("descricao", event.target.value)}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Descricao completa</label>
                <textarea
                  value={formulario.descricaoCompleta}
                  onChange={(event) =>
                    handleChange("descricaoCompleta", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>URL da imagem</label>
                <input
                  value={formulario.imagem}
                  onChange={(event) => handleChange("imagem", event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Link do YouTube</label>
                <input
                  value={formulario.linkYoutube}
                  onChange={(event) => handleChange("linkYoutube", event.target.value)}
                  disabled={!formulario.possuiUrlYoutube}
                />
                <div className="toggle-container">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={formulario.possuiUrlYoutube}
                      onChange={(event) =>
                        handleChange("possuiUrlYoutube", event.target.checked)
                      }
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">Possui URL?</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Link de compra</label>
                <input
                  value={formulario.linkCompra}
                  onChange={(event) => handleChange("linkCompra", event.target.value)}
                  disabled={!formulario.possuiUrlCompra}
                />
                <div className="toggle-container">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={formulario.possuiUrlCompra}
                      onChange={(event) =>
                        handleChange("possuiUrlCompra", event.target.checked)
                      }
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">Possui URL?</span>
                  </label>
                </div>
              </div>

              {produtoEditando && (
                <button type="button" className="cancel-btn" onClick={cancelarEdicao}>
                  Cancelar edicao
                </button>
              )}
            </form>

            {mensagem && <p className="admin-success">{mensagem}</p>}
            {erro && <p className="admin-error">{erro}</p>}
          </>
        ) : view === "list" ? (
          <>
            <h1>Todos produtos</h1>

            {carregando ? (
              <p>Carregando produtos...</p>
            ) : produtos.length === 0 ? (
              <p>Nenhum produto cadastrado ainda.</p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Categoria</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.map((produto) => (
                      <tr key={produto._id}>
                        <td>
                          <div className="admin-product-cell">
                            <img src={produto.imagem} alt={produto.nome} />
                            <span>{produto.nome}</span>
                          </div>
                        </td>
                        <td>{produto.categoria?.nome || "-"}</td>
                        <td>
                          <div className="admin-row-actions">
                            <button type="button" onClick={() => iniciarEdicao(produto)}>
                              Editar
                            </button>
                            <button
                              type="button"
                              className="danger"
                              onClick={() => handleExcluir(produto._id, produto.nome)}
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : view === "categories" ? (
          <>
            <div className="content-header">
              <h1>Gerenciar Categorias</h1>
            </div>

            <form className="admin-form category-form" onSubmit={handleAddCategoria}>
              <div className="form-group">
                <label>Nome da categoria</label>
                <input
                  value={categoriaForm.nome}
                  onChange={(event) =>
                    setCategoriaForm({ nome: event.target.value })
                  }
                  required
                  placeholder="Ex: Eletrônicos, Roupas, etc."
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={salvandoCategoria}
                >
                  {salvandoCategoria ? "Salvando..." : "Adicionar categoria"}
                </button>
              </div>
            </form>

            {mensagem && <p className="admin-success">{mensagem}</p>}
            {erro && <p className="admin-error">{erro}</p>}

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria._id}>
                      <td>{categoria.nome}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button
                            type="button"
                            className="danger"
                            onClick={() =>
                              handleDeleteCategoria(categoria._id, categoria.nome)
                            }
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </main>

      {modalAberto && (
        <div className="modal-overlay" onClick={() => cancelarEdicao()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar produto</h2>
              <button className="modal-close" onClick={() => cancelarEdicao()}>
                ×
              </button>
            </div>

            <form className="admin-form modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  value={formulario.nome}
                  onChange={(event) => handleChange("nome", event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select
                  value={formulario.categoria}
                  onChange={(event) => handleChange("categoria", event.target.value)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Descricao curta</label>
                <textarea
                  value={formulario.descricao}
                  onChange={(event) => handleChange("descricao", event.target.value)}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Descricao completa</label>
                <textarea
                  value={formulario.descricaoCompleta}
                  onChange={(event) =>
                    handleChange("descricaoCompleta", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>URL da imagem</label>
                <input
                  value={formulario.imagem}
                  onChange={(event) => handleChange("imagem", event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Link do YouTube</label>
                <input
                  value={formulario.linkYoutube}
                  onChange={(event) => handleChange("linkYoutube", event.target.value)}
                  disabled={!formulario.possuiUrlYoutube}
                />
                <div className="toggle-container">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={formulario.possuiUrlYoutube}
                      onChange={(event) =>
                        handleChange("possuiUrlYoutube", event.target.checked)
                      }
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">Possui URL?</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Link de compra</label>
                <input
                  value={formulario.linkCompra}
                  onChange={(event) => handleChange("linkCompra", event.target.value)}
                  disabled={!formulario.possuiUrlCompra}
                />
                <div className="toggle-container">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={formulario.possuiUrlCompra}
                      onChange={(event) =>
                        handleChange("possuiUrlCompra", event.target.checked)
                      }
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">Possui URL?</span>
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={cancelarEdicao}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar alteracoes"}
                </button>
              </div>
            </form>

            {mensagem && <p className="admin-success">{mensagem}</p>}
            {erro && <p className="admin-error">{erro}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
