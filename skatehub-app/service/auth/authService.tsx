import AsyncStorage from "@react-native-async-storage/async-storage";
import { armazenaToken } from "../asyncStorage";

export const login = async (email: string, senha: string) => {
  try {
    const response = await fetch(
      "https://backend-auth-production-ed55.up.railway.app/auth/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      }
    );

    if (response.status === 401) {
      return { error: "Senha incorreta" };
    }

    if (response.status === 404) {
      return { error: "Usuário não encontrado" };
    }

    if (!response.ok) {
      return { error: "Erro desconhecido" };
    }

    const data = await response.json();
    const token = data.token;

    if (!token) {
      return { error: "Token não recebido do servidor" };
    }

    await armazenaToken(token);

    return { token };
  } catch (error) {
    return { error: "Erro na requisição" };
  }
};
