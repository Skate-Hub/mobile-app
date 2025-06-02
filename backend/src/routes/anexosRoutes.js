const express = require("express");
const router = express.Router();
const anexoController = require("../controllers/anexoController");

router.post("/obstaculo/:obstaculoId/manobra/:manobraId/anexos", anexoController.adicionarAnexoController);
router.delete("/obstaculo/:obstaculoId/manobra/:manobraId/anexos/:id", anexoController.removerAnexoController)


module.exports = router;
