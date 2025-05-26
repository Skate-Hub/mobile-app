const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🟢 Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('🔴 Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

module.exports = connectDB;
