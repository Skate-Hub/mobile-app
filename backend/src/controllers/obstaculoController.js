const obstaculoService = require("../services/obstaculoService");

const criarObstaculo = async (req, res) => {
  const nome = req.body.nome;

  try {
    const novoObstaculo = await obstaculoService.criarObstaculo({ nome });
    res.status(201).json(novoObstaculo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listarObstaculos = async (req, res) => {
  try {
    const lista = await obstaculoService.listarObstaculos();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const atualizarObstaculoNome = async (req, res) => {
  try {
    const id = req.params.id;
    const novoNome = req.body.novoNome;
    const iconKey = req.body.iconKey;
    const update = await obstaculoService.atualizarObstaculoNome(
      id,
      novoNome,
      iconKey
    );
    if (update.modifiedCount == 1) {
      return res
        .status(200)
        .json({ message: "Nome do obstáculo atualizado com sucesso" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletarObstaculo = async (req, res) => {
  try {
    const id = req.params.id;
    const deleta = await obstaculoService.deletarObstaculo(id);
    if (deleta.deletedCount == 1) {
      res.status(200).json({ message: "Obstaculo deletado com sucesso" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const adicionarObservacoesController = async (req, res) => {
  const { manobraId } = req.params;
  const { observacoes } = req.body;

  try {
    const manobraAtualizada = await adicionarObservacoes(
      observacoes,
      manobraId
    );
    res.status(200).json(manobraAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarObstaculo,
  listarObstaculos,
  atualizarObstaculoNome,
  deletarObstaculo,
  adicionarObservacoesController
};
