const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");
const { auth, requireAdmin } = require("../middleware/auth");

/* GET */
router.get('/', async (req, res) => {
    try{
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* GET pelo ID */
router.get("/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (categoria == null) {
      return res.status(404).json({ message: "Categoria nao encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* POST */
router.post("/", auth, requireAdmin, async (req, res) => {
    const categoria = new Categoria(req.body);
    try{
        const novaCategoria = await categoria.save();
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* PUT */
router.put("/:id", auth, requireAdmin, async (req, res) => {
    try{
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* DELETE */
router.delete("/:id", auth, requireAdmin, async (req, res) => {
    try{
        await Categoria.findByIdAndDelete(req.params.id);
        res.json({ message: "Categoria removida com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;