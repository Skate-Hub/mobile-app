// screens/Configuracoes.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const ConfiguracoesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [sugestao, setSugestao] = useState("");

  const handleLogout = () => {
    Alert.alert("Logout", "Você saiu da sua conta.");

    // Navega para Login, resetando a pilha para evitar voltar com o botão "voltar"
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleEnviarSugestao = () => {
    if (sugestao.trim() === "") {
      Alert.alert("Aviso", "Digite sua sugestão antes de enviar.");
      return;
    }

    // Lógica para enviar sugestão (pode ser um fetch/post)
    Alert.alert("Obrigado!", "Sua sugestão foi enviada.");
    setSugestao("");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sugestão de melhoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua sugestão..."
          value={sugestao}
          onChangeText={setSugestao}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleEnviarSugestao}>
          <Text style={styles.buttonText}>Enviar sugestão</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>
        <Text style={styles.infoText}>Versão do App: 1.0.0</Text>
        <Text style={styles.infoText}>Contato: marcosbsterceiro@gmail.com</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    textAlignVertical: "top",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default ConfiguracoesScreen;
