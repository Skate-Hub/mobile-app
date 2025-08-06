const bcrypt = require("bcrypt")
const userService = require("../services/userService");

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);


    const novoUsuario = await userService.criarUsuario({
      nome,
      email,
      senha: senhaHash
    });
    res.status(201).json(novoUsuario.nome);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await userService.buscarTodosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

const buscarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await userService.buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioAtualizado = await userService.atualizarUsuario(id, req.body);
    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioDeletado = await userService.deletarUsuario(id);
    if (!usuarioDeletado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    res.status(200).json({ mensagem: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
};
