import { logErro } from "../utils/LogErro";
import { getToken } from "../asyncStorage";
import Manobra from "@/interfaces/skatenotes/Manobras";

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
  data?: Manobra[]
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
            Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      const msg = `Erro na requisição: ${response.status} ${response.statusText}`;
      logErro(funcName, msg);
      return { success: false, error: msg };
    }

    const data: Manobra[] = await response.json(); 

    return {success: true, data};
  } catch (err) {
    logErro(funcName, "Erro ao buscar manobras do usuario", err);
    return { success: false, error: "Erro ao buscar manobras do usuario" };
  }
};
