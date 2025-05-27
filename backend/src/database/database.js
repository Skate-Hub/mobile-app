const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("🟢 Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
