const express = require("express");
const router = express.Router();
const manobraController = require("../controllers/manobraController");

router.get("/", manobraController.listarManobras);
router.get("/filter/:status", manobraController.filtrarManobrasStatus);
router.get("/manobrasObstaculo/:id", manobraController.buscarManobrasObstaculo);
router.get("/manobra/:id", manobraController.buscarManobraController);
router.post("/:id", manobraController.adicionarManobra);
router.delete("/:id", manobraController.deletarManobra);
router.put(
  "/:manobraId/observacoes",
  manobraController.adicionarObservacoesController
);
router.put(
  "/status/:manobraId",
  manobraController.atualizarManobrasStatusController
);

module.exports = router;
