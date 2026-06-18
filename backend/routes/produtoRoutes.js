const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto");
const { auth, requireAdmin } = require("../middleware/auth");

/* GET */
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find().populate("categoria");
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET pelo ID */
router.get("/:id", getProduct, (req, res) => {
  res.json(res.produto);
});

/* POST */
router.post("/", auth, requireAdmin, async (req, res) => {
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    descricaoCompleta: req.body.descricaoCompleta,
    categoria: req.body.categoria,
    imagem: req.body.imagem,
    linkYoutube: req.body.linkYoutube,
    linkCompra: req.body.linkCompra,
    possuiUrlYoutube: req.body.possuiUrlYoutube,
    possuiUrlCompra: req.body.possuiUrlCompra,
  });
  try {
    const novoProduto = await produto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* PUT */
router.put("/:id", auth, requireAdmin, getProduct, async (req, res) => {
  if (req.body.nome != null) res.produto.nome = req.body.nome;
  if (req.body.descricao != null) res.produto.descricao = req.body.descricao;
  if (req.body.descricaoCompleta != null)
    res.produto.descricaoCompleta = req.body.descricaoCompleta;
  if (req.body.categoria != null) res.produto.categoria = req.body.categoria;
  if (req.body.imagem != null) res.produto.imagem = req.body.imagem;
  if (req.body.linkYoutube != null) res.produto.linkYoutube = req.body.linkYoutube;
  if (req.body.linkCompra != null) res.produto.linkCompra = req.body.linkCompra;
  if (req.body.possuiUrlYoutube != null) res.produto.possuiUrlYoutube = req.body.possuiUrlYoutube;
  if (req.body.possuiUrlCompra != null) res.produto.possuiUrlCompra = req.body.possuiUrlCompra;

  try {
    const produtoAtualizado = await res.produto.save();
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* DELETE */
router.delete("/:id", auth, requireAdmin, getProduct, async (req, res) => {
  try {
    await res.produto.deleteOne();
    res.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Middleware para obter o produto pelo ID */
async function getProduct(req, res, next) {
  let produto;

  try {
    produto = await Produto.findById(req.params.id).populate("categoria");

    if (produto == null) {
      return res.status(404).json({ message: "Produto nao encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.produto = produto;
  next();
}

module.exports = router;
