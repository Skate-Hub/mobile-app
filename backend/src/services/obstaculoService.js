const Obstaculo = require("../models/obstaculo");

// Cria um obstáculo associado ao usuário logado
const criarObstaculo = async (userId, nome) => {
  const obstaculo = new Obstaculo({
    nome,
    user: userId, 
    manobras: [],
  });

  return await obstaculo.save();
};

// Lista apenas os obstáculos do usuário logado
const listarObstaculos = async (userId) => {
  return await Obstaculo.find({ user: userId });
};

// Atualiza nome do obstáculo (validação opcional de userId no controller)
const atualizarObstaculoNome = async (id, novoNome) => {
  return await Obstaculo.updateOne(
    { _id: id },
    { $set: { nome: novoNome } }
  );
};

// Deleta obstáculo (validação opcional de userId no controller)
const deletarObstaculo = async (id) => {
  return await Obstaculo.deleteOne({ _id: id });
};

module.exports = {
  criarObstaculo,
  listarObstaculos,
  atualizarObstaculoNome,
  deletarObstaculo,
};
