const User = require("../models/user");

const criarUsuario = async (dados) => {
  try {
    const novoUsuario = new User(dados);
    await novoUsuario.save();
    return novoUsuario;
  } catch (error) {
    throw new Error("Erro ao criar usuário: " + error.message);
  }
};

const buscarTodosUsuarios = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Erro ao buscar usuários: " + error.message);
  }
};

const buscarUsuarioPorId = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error("Erro ao buscar usuário: " + error.message);
  }
};

const atualizarUsuario = async (id, novosDados) => {
  try {
    return await User.findByIdAndUpdate(id, novosDados, { new: true });
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
};

const deletarUsuario = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Erro ao deletar usuário: " + error.message);
  }
};

module.exports = {
  criarUsuario,
  buscarTodosUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
};
