import Obstaculo from "@/interfaces/skatenotes/Obstaculo";
import { getToken } from "../asyncStorage";
import { logErro } from "../utils/LogErro";

export const buscarObstaculos = async (): Promise<{
  success: boolean;
  data?: Obstaculo[];
  error?: string;
}> => {
  const funcName = "buscarObstaculos";
  try {
    const token = await getToken();
    if (!token) {
      logErro(funcName, "Token não encontrado");
      return { success: false, error: "Token não encontrado" };
    }

    const response = await fetch(
      "https://skatenotes-production.up.railway.app/obstaculos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    const data: Obstaculo[] = await response.json();
    return { success: true, data };
  } catch (err) {
    logErro(funcName, "Erro ao buscar obstáculos", err);
    return { success: false, error: "Erro ao buscar obstáculos" };
  }
};

export const buscarObstaculoById = async (obstaculoId: string): Promise<{
  success: boolean;
  data?: Obstaculo[];
  error?: string;
}> => {
  const funcName = "buscarObstaculoById";
  try {
    const token = await getToken();
    if (!token) {
      logErro(funcName, "Token não encontrado");
      return { success: false, error: "Token não encontrado" };
    }

    const response   = await fetch(
      `https://skatenotes-production.up.railway.app/obstaculos/${obstaculoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    const data: Obstaculo[] = await response.json();
    return { success: true, data };
  } catch (err) {
    logErro(funcName, "Erro ao buscar obstáculo", err);
    return { success: false, error: "Erro ao buscar obstáculo" };
  }
};

export const adicionarObstaculo = async (
  nome: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "adicionarObstaculo";
  try {
    const token = await getToken();
    if (!token) {
      logErro(funcName, "Token não encontrado");
      return { success: false, error: "Token não encontrado" };
    }

    const response = await fetch(
      "https://skatenotes-production.up.railway.app/obstaculos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome }),
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao adicionar obstáculos", err);
    return { success: false, error: "Erro ao adicionar obstáculos" };
  }
};

export const editarObstaculo = async (
  novoNome: string,
  obstaculoId: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "editarObstaculo";
  try {

    const response = await fetch(
      `https://skatenotes-production.up.railway.app/obstaculos/${obstaculoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novoNome }),
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao editar obstáculo", err);
    return { success: false, error: "Erro ao editar obstáculo" };
  }
};

export const excluirObstaculo = async (
  obstaculoId: string
): Promise<{ success: boolean; error?: string }> => {
  const funcName = "excluirObstaculo";
  try {

    const response = await fetch(
      `https://skatenotes-production.up.railway.app/obstaculos/${obstaculoId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    logErro(funcName, "Erro ao excluir obstáculo", err);
    return { success: false, error: "Erro ao excluir obstáculo" };
  }
};
