import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// -------------------- TOKEN --------------------
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token === null) {
      Alert.alert("Erro", "Não foi possível buscar o seu token de usuário");
      return null;
    }
    return token;
  } catch (error) {
    console.error("Erro ao buscar token do async storage:", error);
  }
};

export const armazenaToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.error("Erro ao armazenar token:", error);
  }
};

// -------------------- LOGIN E SENHA --------------------
export const getLoginSalvo = async () => {
  try {
    const email = await AsyncStorage.getItem("@login_email");
    const senha = await AsyncStorage.getItem("@login_senha");
    if (email && senha) return { email, senha };
    return null;
  } catch (error) {
    console.error("Erro ao buscar login salvo:", error);
    return null;
  }
};

export const salvaLogin = async (email: string, senha: string) => {
  try {
    await AsyncStorage.setItem("@login_email", email);
    await AsyncStorage.setItem("@login_senha", senha);
  } catch (error) {
    console.error("Erro ao salvar login:", error);
  }
};

export const removeLogin = async () => {
  try {
    await AsyncStorage.removeItem("@login_email");
    await AsyncStorage.removeItem("@login_senha");
  } catch (error) {
    console.error("Erro ao remover login:", error);
  }
};

// -------------------- OBSERVAÇÕES --------------------
const OBSERVACOES_KEY = "@observacoes";

export const salvarObservacoesLocal = async (
  manobraId: string,
  texto: string
) => {
  try {
    await AsyncStorage.setItem(`${OBSERVACOES_KEY}:${manobraId}`, texto);
  } catch (err) {
    console.error("Erro ao salvar observações localmente:", err);
  }
};

export const carregarObservacoesLocal = async (manobraId: string) => {
  try {
    const texto = await AsyncStorage.getItem(`${OBSERVACOES_KEY}:${manobraId}`);
    return texto || "";
  } catch (err) {
    console.error("Erro ao carregar observações localmente:", err);
    return "";
  }
};

export const limparObservacoesLocal = async (manobraId: string) => {
  try {
    await AsyncStorage.removeItem(`${OBSERVACOES_KEY}:${manobraId}`);
  } catch (err) {
    console.error("Erro ao limpar observações localmente:", err);
  }
};

// -------------------- TREINO FINALIZADO --------------------
const TREINO_FINALIZADO_KEY = "@treinoFinalizadoHora";

/**
 * Salva o horário de finalização do treino.
 * @param date Data de finalização
 */
export const salvarHorarioFinalizacao = async (date: Date) => {
  try {
    await AsyncStorage.setItem(TREINO_FINALIZADO_KEY, date.toISOString());
  } catch (error) {
    console.error("Erro ao salvar horário de finalização:", error);
  }
};

/**
 * Retorna o horário de finalização salvo.
 */
export const carregarHorarioFinalizacao = async (): Promise<Date | null> => {
  try {
    const valor = await AsyncStorage.getItem(TREINO_FINALIZADO_KEY);
    return valor ? new Date(valor) : null;
  } catch (error) {
    console.error("Erro ao carregar horário de finalização:", error);
    return null;
  }
};

/**
 * Limpa o horário de finalização.
 */
export const limparHorarioFinalizacao = async () => {
  try {
    await AsyncStorage.removeItem(TREINO_FINALIZADO_KEY);
  } catch (error) {
    console.error("Erro ao limpar horário de finalização:", error);
  }
};

// -------------------- RELATORIO TREINO --------------------
const RELATORIO_TREINO_KEY = "@relatorioTreino";

export const salvarRelatorioTreino = async (texto: string) => {
  try {
    await AsyncStorage.setItem(RELATORIO_TREINO_KEY, texto);
  } catch (error) {
    console.error("Erro ao salvar relatório do treino:", error);
  }
};

export const carregarRelatorioTreino = async (): Promise<string | null> => {
  try {
    const valor = await AsyncStorage.getItem(RELATORIO_TREINO_KEY);
    return valor || null;
  } catch (error) {
    console.error("Erro ao carregar relatório do treino:", error);
    return null;
  }
};

export const limparRelatorioTreino = async () => {
  try {
    await AsyncStorage.removeItem(RELATORIO_TREINO_KEY);
  } catch (error) {
    console.error("Erro ao limpar relatório do treino:", error);
  }
};
