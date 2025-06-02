const Obstaculo = require("../models/obstaculo");

const listarManobras = async () => {
  const obstaculos = await Obstaculo.find();
  const manobras = obstaculos.flatMap((obstaculo) => obstaculo.manobras);
  return manobras;
};

const buscarManobra = async (idManobra) => {
  try {
    const obstaculo = await Obstaculo.findOne({ "manobras._id": idManobra });

    if (!obstaculo) {
      console.log(
        `Manobra com ID ${idManobra} não encontrada em nenhum obstáculo.`
      );
      return null;
    }

    return obstaculo.manobras.id(idManobra);
  } catch (error) {
    console.error("Erro ao buscar manobra:", error);
    return null;
  }
};

const buscarManobrasObstaculo = async (id) => {
  try {
    const obstaculo = await Obstaculo.findById(id);

    if (!obstaculo) {
      throw new Error("Obstaculo nao encontrado");
    }

    return obstaculo.manobras || [];
  } catch (err) {
    if (err) {
      console.error("erro ao buscar manobras: ", err);
      return [];
    }
  }
};

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

const atualizarManobrasStatus = async (novoStatus, manobraId) => {
  try {
    const obstaculo = await Obstaculo.findOne({ "manobras._id": manobraId });

    if (!obstaculo) {
      console.log(
        `Manobra com ID ${manobraId} não encontrada em nenhum obstáculo.`
      );
      return null;
    }

    const manobra = obstaculo.manobras.id(manobraId);

    if (!manobra) {
      console.log(
        `Manobra com ID ${manobraId} não encontrada dentro do obstáculo.`
      );
      return null;
    }

    manobra.status = novoStatus;

    await obstaculo.save();

    return obstaculo;
  } catch (err) {
    console.error("Erro ao atualizar status da manobra:", err);
    throw err;
  }
};

const deletarManobras = async (manobraId) => {
  const obstaculos = await Obstaculo.find();
  for (const obstaculo of obstaculos) {
    const index = obstaculo.manobras.findIndex((manobra) => {
      return manobra._id.toString() === manobraId;
    });

    if (index !== -1) {
      obstaculo.manobras.splice(index, 1);
      await obstaculo.save();
      return {
        mensagem: "manobra deletada com sucesso",
        obstaculo: obstaculo.nome,
      };
    }
  }
  throw new Error("manobra nao encontrada");
};

const adicionarObservacoes = async (texto, manobraId) => {
  try {
    const obstaculo = await Obstaculo.findOne({ "manobras._id": manobraId });

    if (!obstaculo) {
      throw new Error("Manobra não encontrada.");
    }

    const manobra = obstaculo.manobras.id(manobraId);
    if (!manobra) {
      throw new Error("Manobra não encontrada no obstáculo.");
    }

    manobra.observacoes = texto;

    await obstaculo.save();

    return manobra;
  } catch (error) {
    throw error;
  }
};

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
  buscarManobrasObstaculo,
  buscarManobra,
};
