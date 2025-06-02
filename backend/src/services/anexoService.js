const Obstaculo = require("../models/obstaculo");

const adicionarAnexoService = async (obstaculoId, manobraId, novoAnexo) => {
  console.log("Obstáculo encontrado:", obstaculoId);
  console.log("Novo anexo:", novoAnexo); 
  try {
    const obstaculo = await Obstaculo.findOneAndUpdate(
      {
        _id: obstaculoId,
        "manobras._id": manobraId,
      },
      {
        $push: { "manobras.$.anexos": novoAnexo },
      },
      { new: true }
    );

    if (!obstaculo) {
      throw new Error("Obstáculo ou manobra não encontrado");
    }

    return obstaculo;
  } catch (error) {
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
