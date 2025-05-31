const Obstaculo = require("../models/obstaculo");

const criarObstaculo = async (data) => {
  const obstaculo = new Obstaculo(data);
  return await obstaculo.save();
};

const listarObstaculos = async () => {
  return await Obstaculo.find();
};

const atualizarObstaculoNome = async (id, novoNome, iconKey) => {
  const resultado = await Obstaculo.updateOne(
    { _id: id },
    { $set: { nome: novoNome } }
  );
  return resultado; // resultado contém info como matchedCount, modifiedCount
};

const deletarObstaculo = async (id) => {
  const resultado = await Obstaculo.deleteOne({ _id: id });

  return resultado;
};

module.exports = {
  criarObstaculo,
  listarObstaculos,
  atualizarObstaculoNome,
  deletarObstaculo
};
