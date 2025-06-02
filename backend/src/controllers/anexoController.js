const {
  adicionarAnexoService,
  removerAnexoService,
} = require("../services/anexoService");

const adicionarAnexoController = async (req, res) => {
  const { obstaculoId, manobraId } = req.params;

  const url = req.body.url;
  const caminhoFirebase = req.body.caminhoFirebase;
  const tipo = req.body.tipo;
  const nomeOriginal = req.body.nomeOriginal;
  const tamanho = req.body.tamanho;
  const formato = req.body.formato;
  const metadata = req.body.metadata;

  if (!url || !caminhoFirebase || !tipo || !nomeOriginal || !tamanho) {
    return res.status(400).json({
      error:
        "Campos obrigatórios faltando: url, caminhoFirebase, tipo, nomeOriginal, tamanho",
    });
  }

  try {
    const novoAnexo = {
      url: url,
      caminhoFirebase: caminhoFirebase,
      tipo: tipo,
      nomeOriginal: nomeOriginal,
      tamanho: tamanho,
      formato: formato || null,
      metadata: metadata || {},
    };

    const resultado = await adicionarAnexoService(
      obstaculoId,
      manobraId,
      novoAnexo
    );

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removerAnexoController = async (req, res) => {
  const { obstaculoId, manobraId, anexoId } = req.params;

  try {
    const resultado = await removerAnexoService(
      obstaculoId,
      manobraId,
      anexoId
    );
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  adicionarAnexoController,
  removerAnexoController,
};
