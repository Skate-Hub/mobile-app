const {
  adicionarAnexoService,
  removerAnexoService,
} = require("../services/anexoService");

const adicionarAnexoController = async (req, res) => {
  const { obstaculoId, manobraId } = req.params;

  // Extrai e valida cada campo do body individualmente
  const {
    url,
    caminhoFirebase,
    tipo,
    nomeOriginal,
    tamanho,
    formato,
    metadata
  } = req.body;

  // Validação dos campos obrigatórios
  if (!url || !caminhoFirebase || !tipo || !nomeOriginal || !tamanho) {
    return res.status(400).json({
      error: "Campos obrigatórios faltando: url, caminhoFirebase, tipo, nomeOriginal, tamanho"
    });
  }

  try {
    // Cria o objeto do anexo com campos explícitos
    const novoAnexo = {
      url: url,
      caminhoFirebase: caminhoFirebase,
      tipo: tipo,
      nomeOriginal: nomeOriginal,
      tamanho: tamanho,
      formato: formato || null, // Campo opcional (padrão: null)
      metadata: metadata || {}  // Campo opcional (padrão: objeto vazio)
    };

    console.log("Novo anexo criado no controller:", novoAnexo); // Debug

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