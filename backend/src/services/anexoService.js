const Obstaculo = require("../models/obstaculo");

const adicionarAnexoService = async (obstaculoId, manobraId, novoAnexo) => {
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
    console.error("Erro no service:", error);
    throw error;
  }
};

const removerAnexoService = async (obstaculoId, manobraId, anexoId) => {
  try {
    const obstaculo = await Obstaculo.findOne({
      _id: obstaculoId,
      "manobras._id": manobraId,
    });

    if (!obstaculo) {
      throw new Error("Obstáculo ou manobra não encontrado");
    }

    const manobra = obstaculo.manobras.id(manobraId);
    if (!manobra) {
      throw new Error("Manobra não encontrada");
    }

    const anexo = manobra.anexos.id(anexoId);
    if (!anexo) {
      throw new Error("Anexo não encontrado");
    }

    anexo.remove();

    await obstaculo.save();

    return {
      message: "Anexo removido com sucesso",
      obstaculoAtualizado: obstaculo,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  adicionarAnexoService,
  removerAnexoService,
};
