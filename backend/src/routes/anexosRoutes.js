const express = require("express");
const router = express.Router();
const anexoController = require("../controllers/anexoController");

router.post("/obstaculo/:obstaculoId/manobra/:manobraId/anexo", anexoController.adicionarAnexoController);
router.delete("/obstaculo/:obstaculoId/manobra/:manobraId/anexo/:anexoId", anexoController.removerAnexoController)


module.exports = router;
