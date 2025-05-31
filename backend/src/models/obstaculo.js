// models/obstaculo.js
const mongoose = require("mongoose");
const manobraSchema = require("./manobra");

const obstaculoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    manobras: [manobraSchema],
  },
  { timestamps: true }
);


const Obstaculo = mongoose.model("Obstaculo", obstaculoSchema);


module.exports = Obstaculo;
