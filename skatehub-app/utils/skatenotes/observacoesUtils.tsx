import { adicionarObservacoes } from "@/service/skatenotes/manobras";
import {
  salvarObservacoesLocal,
  carregarObservacoesLocal,
} from "@/service/asyncStorage";
import Manobra from "@/interfaces/skatenotes/Manobras";

export const carregarObservacoes = async (
  manobraId: string,
  manobraData?: Manobra
) => {
  const observacoesLocais = await carregarObservacoesLocal(manobraId);
  const textoInicial = observacoesLocais || manobraData?.observacoes || "";
  const statusSelecionado = manobraData?.status || null;

  if (observacoesLocais) {
    try {
      await adicionarObservacoes(observacoesLocais, manobraId);
      await salvarObservacoesLocal(manobraId, observacoesLocais);
      return { texto: textoInicial, status: statusSelecionado, sync: "ok" };
    } catch (err) {
      console.error("Erro ao sincronizar observações:", err);
      return { texto: textoInicial, status: statusSelecionado, sync: "erro" };
    }
  }

  return { texto: textoInicial, status: statusSelecionado, sync: "ok" };
};
