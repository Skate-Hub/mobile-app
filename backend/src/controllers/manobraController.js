const manobraService = require("../services/manobraService");

const listarManobras = async (req, res) => {
  const lista = await manobraService.listarManobras();
  res.json(lista);
};

const buscarManobrasObstaculo = async (req, res) => {
  const id = req.params.id;

  try {
    const lista = await manobraService.buscarManobrasObstaculo(id);

    res.json(lista);
  } catch (err) {
    console.error("erro ao buscar manobras (controller): ", err);
  }
};

const filtrarManobrasStatus = async (req, res) => {
  const status = req.params.status;
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
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const deletarManobra = async (req, res) => {
  const manobraId = req.params.id;

  try {
    const deleta = await manobraService.deletarManobras(manobraId);

    res.status(201).json(deleta);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

module.exports = {
  listarManobras,
  adicionarManobra,
  filtrarManobrasStatus,
  deletarManobra,
  buscarManobrasObstaculo
};
