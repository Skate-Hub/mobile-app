import AsyncStorage from "@react-native-async-storage/async-storage";

export const cadastro = async (nome: string, email: string, senha: string) => {
  try {
    const response = await fetch(
      "https://backend-auth-production-ed55.up.railway.app/user/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome, email, senha }),
      }
    );


    if (!response.ok) {
      return { error: "Não conseguimos realizar seu cadastro, tente novamente mais tarde!" };
    }

    const data = await response.json();
    const token = data.token;

    if (token) {
      await AsyncStorage.setItem("userToken", token);
    }

    return { token };
  } catch (error) {
    return { error: "Erro na requisição" };
  }
};
