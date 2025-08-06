const obstaculoService = require("../services/obstaculoService");

// Criação de obstáculo vinculado ao usuário autenticado
const criarObstaculo = async (req, res) => {
  const { nome } = req.body;
  const userId = req.userId;

  if (!nome) {
    return res.status(400).json({ message: "O campo 'nome' é obrigatório" });
  }

  try {
    const novoObstaculo = await obstaculoService.criarObstaculo(userId, nome);
    res.status(201).json(novoObstaculo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lista apenas os obstáculos do usuário autenticado
const listarObstaculos = async (req, res) => {
  const userId = req.userId;

  try {
    const lista = await obstaculoService.listarObstaculos(userId);
    res.json(lista);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualiza nome do obstáculo, com verificação de usuário (se quiser aplicar)
const atualizarObstaculoNome = async (req, res) => {
  const id = req.params.id;
  const novoNome = req.body.novoNome;

  if (!novoNome) {
    return res.status(400).json({ message: "O novo nome é obrigatório" });
  }

  try {
    const update = await obstaculoService.atualizarObstaculoNome(id, novoNome);
    if (update.modifiedCount === 1) {
      return res.status(200).json({ message: "Nome do obstáculo atualizado com sucesso" });
    } else {
      return res.status(404).json({ message: "Obstáculo não encontrado ou sem permissão" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Deleta obstáculo, com verificação de usuário (se quiser aplicar)
const deletarObstaculo = async (req, res) => {
  const id = req.params.id;

  try {
    const deleta = await obstaculoService.deletarObstaculo(id);
    if (deleta.deletedCount === 1) {
      return res.status(200).json({ message: "Obstáculo deletado com sucesso" });
    } else {
      return res.status(404).json({ message: "Obstáculo não encontrado ou sem permissão" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  criarObstaculo,
  listarObstaculos,
  atualizarObstaculoNome,
  deletarObstaculo,
};
