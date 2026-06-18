import "./FilterProduct.css";

export function FilterProduct({ categorias, categoriaSelecionada, onSelectCategoria }) {
  return (
    <div className="filter-product" aria-label="Filtrar produtos por categoria">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={`filter-button ${
            categoriaSelecionada === categoria ? "active" : ""
          }`}
          onClick={() => onSelectCategoria(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}
