const Obstaculo = require("../models/obstaculo");

const listarManobras = async () => {
  const obstaculos = await Obstaculo.find();
  const manobras = obstaculos.flatMap((obstaculo) => obstaculo.manobras);
  return manobras;
};

const buscarManobrasObstaculo = async (id)=>{
  try{
  const obstaculo = await Obstaculo.findById(id)

  if(!obstaculo){
    throw new Error('Obstaculo nao encontrado');
  }
  
  return obstaculo.manobras || [];
}catch(err){
  if (err){
    console.error('erro ao buscar manobras: ', err);
    return []
  }
}
}

const filtrarManobrasStatus = async (status) => {
  const obstaculos = await Obstaculo.find();
  const manobras = obstaculos.flatMap((obstaculo) =>
    obstaculo.manobras.filter((manobra) => manobra.status === status)
  );
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

const atualizarManobrasStatus = async (novoStatus, manobraId) => {};

const deletarManobras = async (manobraId) => {
  const obstaculos = await Obstaculo.find();
  for (const obstaculo of obstaculos) {
    const index = obstaculo.manobras.findIndex((manobra) => {
     return manobra._id.toString() === manobraId;
    });

    if (index !== -1) {
      obstaculo.manobras.splice(index, 1);
      await obstaculo.save();
      return { mensagem: "manobra deletada com sucesso", obstaculo: obstaculo.nome};
    }
  }
  throw new Error("manobra nao encontrada");
};

const adicionarObservacoes = async (texto, manobraId) => {};

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
