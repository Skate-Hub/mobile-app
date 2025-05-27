const express = require('express');
const router = express.Router();
const manobraController = require('../controllers/manobraController');

router.get('/', manobraController.listarManobras);
router.get('/filter/:status', manobraController.filtrarManobrasStatus);
router.post('/:id', manobraController.adicionarManobra);
router.delete('/:id', manobraController.deletarManobra);

module.exports = router