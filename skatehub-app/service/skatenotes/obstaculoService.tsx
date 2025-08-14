import Obstaculo from "@/interfaces/skatenotes/Obstaculo";
import { getToken } from "../asyncStorage";

// Função utilitária para logs de erro
const logErro = (func: string, mensagem: string | unknown, err?: unknown) => {
  console.error(`[${func}] ${mensagem}`, err ?? "");
};

export const buscarObstaculos = async (): Promise<{ success: boolean; data?: Obstaculo[]; error?: string }> => {
  const funcName = "buscarObstaculos";
  try {
    const token = await getToken();
    if (!token) {
      logErro(funcName, "Token não encontrado");
      return { success: false, error: "Token não encontrado" };
    }

    const response = await fetch("https://skatenotes-production.up.railway.app/obstaculos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export const adicionarObstaculo = async (nome: string): Promise<{ success: boolean; error?: string }> => {
  const funcName = "adicionarObstaculo";
  try {
    const token = await getToken();
    if (!token) {
      logErro(funcName, "Token não encontrado");
      return { success: false, error: "Token não encontrado" };
    }

    const response = await fetch("https://skatenotes-production.up.railway.app/obstaculos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome }),
    });

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
