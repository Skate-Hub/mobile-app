import Obstaculo from "@/interfaces/skatenotes/Obstaculo";
import { getToken } from "../asyncStorage";
import { logErro } from "../utils/LogErro";
import Treino from "@/interfaces/skatenotes/Treino";

export const buscarTreino = async (): Promise<{
  success: boolean;
  data?: Treino | null;
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
      "https://skatenotes-production.up.railway.app/treinos",
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

    const data: Treino = await response.json();
    return { success: true, data };
  } catch (err) {
    logErro(funcName, "Erro ao buscar obstáculos", err);
    return { success: false, error: "Erro ao buscar obstáculos" };
  }
}