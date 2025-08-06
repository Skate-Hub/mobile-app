const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.criarUsuario);
router.get("/", userController.listarUsuarios);
router.get("/:id", userController.buscarUsuario);
router.put("/:id", userController.atualizarUsuario);
router.delete("/:id", userController.deletarUsuario);

module.exports = router;
