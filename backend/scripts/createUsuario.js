require("dotenv").config();
const dns = require("dns");
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function criarUsuario() {
  const [, , nome, email, senha, tipo = "usuario"] = process.argv;

  if (!nome || !email || !senha) {
    console.log(
      "Uso: node scripts/createUsuario.js \"Nome\" email@exemplo.com senha123 [admin|usuario]",
    );
    process.exit(1);
  }

  if (!["admin", "usuario"].includes(tipo)) {
    console.log('Tipo invalido. Use "admin" ou "usuario".');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const existente = await Usuario.findOne({ email: email.toLowerCase() });

  if (existente) {
    console.log("Ja existe um usuario com este email.");
    process.exit(1);
  }

  await Usuario.create({
    nome,
    email,
    senha,
    tipo,
  });

  console.log(`Usuario ${tipo} criado: ${email}`);
  process.exit(0);
}

criarUsuario().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
