const manobraService = require("../services/manobraService");

const listarManobras = async (req, res) => {
  const lista = await manobraService.listarManobras();
  res.json(lista);
};

const buscarManobraController = async (req, res) => {
  try {
    const id = req.params.id;
    const manobra = await manobraService.buscarManobra(id);

    if (!manobra) {
      return res.status(404).json({ mensagem: "Manobra não encontrada" });
    }

    res.json(manobra);
  } catch (error) {
    console.error("Erro no controller ao buscar manobra:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
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

const atualizarManobrasStatusController = async (req, res) => {
  const manobraId = req.params.manobraId;
  const novoStatus = req.body.novoStatus;

  try {
    const response = await manobraService.atualizarManobrasStatus(
      novoStatus,
      manobraId
    );

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
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

const adicionarObservacoesController = async (req, res) => {
  const { manobraId } = req.params;
  const { observacoes } = req.body;

  try {
    const manobraAtualizada = await manobraService.adicionarObservacoes(
      observacoes,
      manobraId
    );
    res.status(200).json(manobraAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarManobras,
  adicionarManobra,
  filtrarManobrasStatus,
  deletarManobra,
  buscarManobrasObstaculo,
  adicionarObservacoesController,
  buscarManobraController,
  atualizarManobrasStatusController
};
