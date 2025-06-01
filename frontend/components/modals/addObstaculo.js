import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { criarObstaculo } from "../../services/obstaculosService";
import { useState } from "react";

const AddObstaculoModal = ({ onClose }) => {
  const [novoObstaculo, setNovoObstaculo] = useState("");

  const handleAdicionar = async () => {
    try {
      await criarObstaculo(novoObstaculo);
      onClose();
    } catch (error) {
      console.error("Erro ao criar obstáculo:", error);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Novo Obstáculo</Text>

        <TextInput
          placeholder="Digite o nome do novo obstáculo"
          value={novoObstaculo}
          onChangeText={setNovoObstaculo}
          style={styles.input}
          placeholderTextColor="#999"
        />

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
  card: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  input: {
    backgroundColor: "#f5f5f5",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
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

export default AddObstaculoModal;
