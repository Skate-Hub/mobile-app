const {
  adicionarAnexoService,
  removerAnexoService,
} = require("../services/anexoService");

const adicionarAnexoController = async (req, res) => {
  const { obstaculoId, manobraId } = req.params;
  const novoAnexo = req.body; 

  try {
    const resultado = await adicionarAnexoService(
      obstaculoId,
      manobraId,
      novoAnexo
    );
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removerAnexoController = async (req, res) => {
  const { obstaculoId, manobraId, anexoId } = req.params;

  try {
    const resultado = await removerAnexoService(
      obstaculoId,
      manobraId,
      anexoId
    );
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  adicionarAnexoController,
  removerAnexoController,
};