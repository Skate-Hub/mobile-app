const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dbSkateNotes:A9v%23kT2z%21Lp8wR3d@clusterskatenotes.mwz9yji.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSkateNotes"
    );

    console.log("🟢 Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); 
  }
};

connectDB();

module.exports = connectDB;
