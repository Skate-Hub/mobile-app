import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Token
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

// Login e senha
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
