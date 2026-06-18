const express = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { auth, loadUsuario } = require("../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha sao obrigatorios" });
  }

  try {
    const usuario = await Usuario.findOne({ email: email.toLowerCase().trim() });

    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ message: "Email ou senha invalidos" });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", auth, loadUsuario, (req, res) => {
  res.json(req.usuarioDb);
});

module.exports = router;
