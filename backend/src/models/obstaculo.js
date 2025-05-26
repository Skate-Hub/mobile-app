const mongoose = require("mongoose");
const manobraSchema = require("./manobra");

const obstaculo = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    manobras: [manobraSchema],
  },
  { timestamps: true }
);

module.exports = { obstaculo };
