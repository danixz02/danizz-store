const Usuario = require("../models/Usuario");

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn(
      "ADMIN_EMAIL e ADMIN_PASSWORD nao definidos. Nenhum admin inicial sera criado.",
    );
    return;
  }

  const adminExistente = await Usuario.findOne({ email: adminEmail.toLowerCase() });

  if (adminExistente) {
    adminExistente.senha = adminPassword;
    await adminExistente.save();
  } else {
    await Usuario.create({
      nome: "Administrador",
      email: adminEmail,
      senha: adminPassword,
      tipo: "admin",
    });
  }
}

module.exports = seedAdmin;
