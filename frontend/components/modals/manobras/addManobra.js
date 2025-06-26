import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { adicionarManobra, criarManobra } from "../../../services/ManobrasService";
import { useState } from "react";

const AddManobraModal = ({ onClose, idObstaculo }) => {
  const [nomeNovaManobra, setNomeNovaManobra] = useState("");
  const [statusNovaManobra, setStatusNovaManobra] = useState("aprender");

  const handleAdicionar = async () => {
    try {
      const nova = {
        nome: nomeNovaManobra,
        status: statusNovaManobra,
      };

      await adicionarManobra(nova, idObstaculo);
      onClose();
    } catch (error) {
      console.error("Erro ao criar manobra:", error);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Nova Manobra</Text>

        <TextInput
          placeholder="Digite o nome da manobra"
          value={nomeNovaManobra}
          onChangeText={setNomeNovaManobra}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.subtitle}>Status da manobra:</Text>
        <View style={styles.menuContainer}>
          {["aprender", "aprimorar", "na base"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.menuButton,
                statusNovaManobra === status && styles.menuButtonSelected,
              ]}
              onPress={() => setStatusNovaManobra(status)}
            >
              <Text
                style={[
                  styles.menuButtonText,
                  statusNovaManobra === status && styles.menuButtonTextSelected,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.add]}
            onPress={handleAdicionar}
          >
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  menuButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  menuButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  menuButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  menuButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    borderRadius: 6,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  add: {
    backgroundColor: "green",
  },
  cancel: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddManobraModal;
