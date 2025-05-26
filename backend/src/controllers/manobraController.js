const manobraService = require("../services/manobraService");

const listarManobras = async (req, res) => {
  const lista = await manobraService.listarManobras();
  res.json(lista);
};

const filtrarManobrasStatus = async (req, res) => {
  const status = req.params.status
  const lista = await manobraService.filtrarManobrasStatus(status);
  res.json(lista);
};

const adicionarManobra = async (req, res) => {
  const obstaculoId = req.params.id;
  const nome = req.body.nome;
  const status = req.body.status;

  const manobraData = { nome, status };

  try {
    const manobraAdicionada = await manobraService.adicionarManobra(
      obstaculoId,
      manobraData
    );
    res.status(201).json(manobraAdicionada);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  listarManobras,
  adicionarManobra,
  filtrarManobrasStatus
};
