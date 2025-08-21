import { logErro } from "../utils/LogErro";
import { getToken } from "../asyncStorage";
import Manobra from "@/interfaces/skatenotes/Manobras";
import Anexo from "@/interfaces/skatenotes/Anexo";

export const buscarManobrasObstaculo = async (
  obstaculoId: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "buscarManobrasObstaculo";
  try {
    const token = await getToken();
    if (!token) {
      logErro(funcName, "Token não encontrado");
      return { success: false, error: "Token não encontrado" };
    }

    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras/manobrasObstaculo/${obstaculoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao buscar manobras de um obstáculo", err);
    return { success: false, error: "Erro ao buscar manobras de um obstáculo" };
  }
};

export const buscarTodasManobras = async (): Promise<{
  success: boolean;
  error?: string;
  data?: Manobra[];
}> => {
  const funcName = "buscarTodasManobras";
  try {
    const token = await getToken();
    if (!token) {
      logErro(funcName, "Token não encontrado");
      return { success: false, error: "Token não encontrado" };
    }

    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    const data: Manobra[] = await response.json();

    return { success: true, data };
  } catch (err) {
    logErro(funcName, "Erro ao buscar manobras do usuario", err);
    return { success: false, error: "Erro ao buscar manobras do usuario" };
  }
};

export const buscarManobraById = async (
  manobraId: string
): Promise<{
  success: boolean;
  error?: string;
  data?: Manobra;
}> => {
  const funcName = "buscarManobraById";
  try {
    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras/manobra/${manobraId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    const data: Manobra = await response.json();

    return { success: true, data };
  } catch (err) {
    logErro(funcName, "Erro ao buscar informações da manobra", err);
    return { success: false, error: "Erro ao buscar informações da manobra" };
  }
};

export const adicionarManobra = async (
  obstaculoId: string,
  nome: string,
  status?: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "adicionarManobra";
  try {
    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras/${obstaculoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          status: status,
        }),
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao adicionar manobra", err);
    return { success: false, error: "Erro ao adicionar manobra" };
  }
};

export const editarManobra = async (
  manobraId: string,
  novoNome: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "editarManobra";
  try {
    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras/${manobraId}/nome`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          novoNome: novoNome,
        }),
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao editar manobra", err);
    return { success: false, error: "Erro ao editar manobra" };
  }
};

export const atualizarStatus = async (
  manobraId: string,
  novoStatus: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "atualizarStatus";
  try {
    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras/status/${manobraId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          novoStatus: novoStatus,
        }),
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao atualizar status da manobra", err);
    return { success: false, error: "Erro ao atualizar status da manobra" };
  }
};

export const adicionarObservacoes = async (
  texto: string,
  manobraId: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "adicionarObservacoes";
  try {
    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras/${manobraId}/observacoes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          novoStatus: texto,
        }),
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao adicionar observacoes na manobra", err);
    return {
      success: false,
      error: "Erro ao adicionar observacoes na manobra",
    };
  }
};

export const deletarManobra = async (
  manobraId: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "deletarManobra";
  try {
    const response = await fetch(
      `https://skatenotes-production.up.railway.app/manobras/${manobraId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao deletar manobra", err);
    return { success: false, error: "Erro ao deletar manobra" };
  }
};

export const salvarAnexo = async (
  manobraId: string,
  anexo: Anexo
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "salvarAnexo";

  try {
    const response = await fetch(
      `https://skatenotes-production.up.railway.app/anexos/${manobraId}/anexo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anexo),
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao salvar anexo no backend", err);
    return { success: false, error: "Erro ao salvar anexo no backend" };
  }
};
