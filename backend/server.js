require("dotenv").config();
const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const produtoRoutes = require("./routes/produtoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const authRoutes = require("./routes/authRoutes");
const seedAdmin = require("./utils/seedAdmin");
const seedCategorias = require("./utils/seedCategorias");

/* DNS publico evita falha querySrv ECONNREFUSED no Windows com mongodb+srv */
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET nao definido no arquivo .env");
  process.exit(1);
}

/* Middleware */
app.use(cors());
app.use(express.json());

/* Rotas */
app.use("/api/auth", authRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/categorias", categoriaRoutes);

/* Conexao MongoDB */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Conectado ao MongoDB");
    await seedAdmin();
    await seedCategorias();
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });

/* Inicializacao do servidor */
app.listen(PORT, () => {
  console.log("Servidor rodando");
  console.log(`http://localhost:${PORT}`);
});
