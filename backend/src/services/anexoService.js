const Obstaculo = require("../models/obstaculo");

const adicionarAnexoService = async (obstaculoId, manobraId, novoAnexo) => {
  try {
    console.log("Dados recebidos no service:", {
      obstaculoId,
      manobraId,
      novoAnexo,
    }); // Debug

    const obstaculo = await Obstaculo.findOneAndUpdate(
      {
        _id: obstaculoId,
        "manobras._id": manobraId,
      },
      {
        $push: { "manobras.$.anexos": novoAnexo },
      },
      { new: true } // Retorna o documento atualizado
    );

    if (!obstaculo) {
      throw new Error("Obstáculo ou manobra não encontrado");
    }

    console.log("Obstáculo atualizado:", obstaculo); // Debug
    return obstaculo;
  } catch (error) {
    console.error("Erro no service:", error);
    throw error;
  }
};

const removerAnexoService = async (obstaculoId, manobraId, anexoId) => {
  try {
    const obstaculo = await Obstaculo.findOneAndUpdate(
      {
        _id: obstaculoId,
        "manobras._id": manobraId,
      },
      {
        $pull: { "manobras.$.anexos": { _id: anexoId } },
      },
      { new: true }
    );

    if (!obstaculo) {
      throw new Error("Obstáculo, manobra ou anexo não encontrado");
    }

    return obstaculo;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  adicionarAnexoService,
  removerAnexoService,
};
