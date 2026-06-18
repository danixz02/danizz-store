const mongoose = require('mongoose');
const Produto = require('../models/Produto');

async function updateProducts() {
  try {
    await mongoose.connect('mongodb://localhost:27017/danizz-store');
    console.log('Conectado ao MongoDB');

    const produtos = await Produto.find({});
    console.log(`Encontrados ${produtos.length} produtos`);

    for (const produto of produtos) {
      const needsUpdate = 
        produto.possuiUrlYoutube === undefined || 
        produto.possuiUrlCompra === undefined;

      if (needsUpdate) {
        await Produto.findByIdAndUpdate(produto._id, {
          possuiUrlYoutube: produto.possuiUrlYoutube ?? false,
          possuiUrlCompra: produto.possuiUrlCompra ?? false,
        });
        console.log(`Atualizado produto: ${produto.nome}`);
      }
    }

    console.log('Atualização concluída!');
    process.exit(0);
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

updateProducts();
