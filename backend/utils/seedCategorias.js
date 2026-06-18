const Categoria = require("../models/Categoria");

const categoriasPadrao = [
  "Mousepads",
  "Mouses",
  "Teclados",
  "Headsets",
];

async function seedCategorias() {
  const total = await Categoria.countDocuments();

  if (total > 0) {
    return;
  }

  await Categoria.insertMany(
    categoriasPadrao.map((nome) => ({ nome })),
  );

  console.log("Categorias padrao criadas.");
}

module.exports = seedCategorias;
