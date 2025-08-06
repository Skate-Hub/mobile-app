const mongoose = require("mongoose");
const manobraSchema = require("./manobra");

const obstaculoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    manobras: [manobraSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  { timestamps: true }
);

const Obstaculo = mongoose.model("Obstaculo", obstaculoSchema);

module.exports = Obstaculo;
