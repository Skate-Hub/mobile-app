import {
  atualizarStatus,
  deletarManobra,
  editarManobra,
  buscarManobraById
} from "@/service/skatenotes/manobras";
import Manobra from "@/interfaces/skatenotes/Manobras";

export const buscarManobraPorId = async (manobraId: string): Promise<Manobra | null> => {
  const result = await buscarManobraById(manobraId);
  if (!result.success) {
    console.error("Erro ao buscar informações da manobra:", result.error);
    return null;
  }
  return result.data || null;
};

export const atualizarStatusManobra = async (id: string, status: string) => {
  const result = await atualizarStatus(id, status);
  if (!result.success) throw new Error("Erro ao atualizar status");
  return result.success;
};

export const deletarManobraHelper = async (id: string) => {
  const result = await deletarManobra(id);
  if (!result.success) throw new Error("Erro ao deletar manobra");
  return result.success;
};

export const editarManobraHelper = async (id: string, nome: string) => {
  const result = await editarManobra(id, nome);
  if (!result.success) throw new Error("Erro ao editar manobra");
  return result.success;
};
