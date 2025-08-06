const express = require('express');
const router = express.Router();
const obstaculoController = require('../controllers/obstaculoController');
const authMiddleware = require("../middlewares/authMiddleware")


router.get('/', authMiddleware, obstaculoController.listarObstaculos);
router.post('/', authMiddleware, obstaculoController.criarObstaculo);   
router.put('/:id', obstaculoController.atualizarObstaculoNome);
router.delete('/:id', obstaculoController.deletarObstaculo);

module.exports = router;