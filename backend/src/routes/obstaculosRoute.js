const express = require('express');
const router = express.Router();
const obstaculoController = require('../controllers/obstaculoController');


router.get('/', obstaculoController.listarObstaculos);
router.post('/', obstaculoController.criarObstaculo);   
router.put('/:id', obstaculoController.atualizarObstaculoNome);
router.delete('/:id', obstaculoController.deletarObstaculo)

module.exports = router;