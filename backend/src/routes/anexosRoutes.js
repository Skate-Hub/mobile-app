const express = require("express");
const router = express.Router();
const anexoController = require("../controllers/anexoController");

router.post("/obstaculo/:obstaculoId/manobraId/:id/anexos", anexoController.adicionarAnexoController);
router.delete("/obstaculo/:obstaculoId/manobraId/:id/anexos/:id", anexoController.removerAnexoController)


module.exports = router;
