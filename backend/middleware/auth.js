const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token nao fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token invalido ou expirado" });
  }
}

function requireAdmin(req, res, next) {
  if (req.usuario?.tipo !== "admin") {
    return res.status(403).json({
      message: "Acesso negado. Apenas administradores podem realizar esta acao.",
    });
  }

  next();
}

async function loadUsuario(req, res, next) {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-senha");

    if (!usuario) {
      return res.status(401).json({ message: "Usuario nao encontrado" });
    }

    req.usuarioDb = usuario;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { auth, requireAdmin, loadUsuario };
