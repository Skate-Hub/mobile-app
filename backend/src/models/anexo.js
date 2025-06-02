const mongoose = require("mongoose");

const anexoSchema = new mongoose.Schema(
  {

    //firebase storage
    url: {
      type: String,
      required: true,
    },
    caminhoFirebase: {
        type: String,
        required: true
    },

     //metadados do arquivo
    tipo: {
      type: String,
      enum: ["imagem", "video"],
      required: true,
    },
    nomeOriginal: {
      type: String,
      required: true,
    },
    tamanho: {
      type: Number,
      required: true,
    },
    formato: {
      type: String,
    },
    metadata: {
      largura: { type: Number },
      altura: { type: Number },
      duracao: { type: Number },
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = anexoSchema;
