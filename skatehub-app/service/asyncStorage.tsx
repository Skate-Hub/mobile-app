import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token === null) {
      Alert.alert("Erro", "não foi possível buscar o seu token de usuário");
      return null;
    }
    return token;
  } catch (error) {
    console.error("Erro ao buscar token do async storage");
  }
};

export const armazenaToken = async (token: string) => {
  await AsyncStorage.setItem("userToken", token);
};
