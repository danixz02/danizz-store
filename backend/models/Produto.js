const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  descricaoCompleta: {
    type: String,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  linkYoutube: {
    type: String,
    required: false,
  },
  linkCompra: {
    type: String,
    required: false,
  },
  possuiUrlYoutube: {
    type: Boolean,
    default: false,
  },
  possuiUrlCompra: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Produto", produtoSchema);