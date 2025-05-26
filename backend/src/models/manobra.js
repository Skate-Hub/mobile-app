const mongoose = require("mongoose");

const manobra = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    status: { type: String, enum: ["aprender", "aprimorar", "na base"], default: "aprender" },
    observacoes: { type: String },
    imagens: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = { manobra }