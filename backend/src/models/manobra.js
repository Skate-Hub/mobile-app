const mongoose = require("mongoose");
import anexoSchema from "./anexo";

const manobraSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    status: { type: String, enum: ["aprender", "aprimorar", "na base"], default: "aprender" },
    observacoes: { type: String },
    anexos: [anexoSchema],
  },
  { timestamps: true }
);

module.exports = manobraSchema;