// models/obstaculo.js
const mongoose = require("mongoose");
const manobraSchema = require("./manobra");

const obstaculoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    manobras: [manobraSchema],
    iconKey: {
      type: String
    }
  },
  { timestamps: true }
);

// Aqui criamos o model com o nome 'Obstaculo'
const Obstaculo = mongoose.model("Obstaculo", obstaculoSchema);

// Exportamos diretamente o model
module.exports = Obstaculo;
