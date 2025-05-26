const Obstaculo = require("../models/obstaculo");

const listarManobras = async () => {
  const obstaculos = await Obstaculo.find();
  const manobras = obstaculos.flatMap((obstaculo) => obstaculo.manobras);
  return manobras;
};

const filtrarManobrasStatus = async (status) => {
  const obstaculos = await Obstaculo.find();
  const manobras = obstaculos.flatMap((obstaculo) => obstaculo.manobras.filter((manobra)=>(
    manobra.status === status
  )));
  return manobras;
};

const adicionarManobra = async (obstaculoId, manobraData) => {
  const obstaculo = await Obstaculo.findById(obstaculoId);

  if (!obstaculo) {
    throw new Error("Obstáculo não encontrado");
  }

  obstaculo.manobras.push(manobraData);

  await obstaculo.save();

  return obstaculo.manobras[obstaculo.manobras.length - 1];
};

const atualizarManobrasNome = async () => {};

const atualizarManobrasStatus = async () => {};

const deletarManobras = async () => {};

const adicionarObservacoes = async () => {};

const adicionarAnexosObservacoes = async () => {};

module.exports = {
  listarManobras,
  filtrarManobrasStatus,
  adicionarManobra,
  adicionarAnexosObservacoes,
  adicionarObservacoes,
  atualizarManobrasNome,
  atualizarManobrasStatus,
  deletarManobras,
};
