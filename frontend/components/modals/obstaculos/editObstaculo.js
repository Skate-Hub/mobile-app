// components/modals/DeleteObstaculoModal.js
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { deleteObstaculo } from "../../../services/obstaculosService";

const DeleteObstaculoModal = ({ onClose, obstaculoId }) => {
  const handleExcluir = async () => {
    try {
      await deleteObstaculo(obstaculoId);
      onClose();
    } catch (error) {
      console.error("Erro ao excluir obstáculo:", error);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Excluir Obstáculo</Text>
        <Text style={styles.subtitle}>
          Tem certeza que deseja excluir este obstáculo?
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.delete]}
            onPress={handleExcluir}
          >
            <Text style={styles.buttonText}>Excluir</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
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
  delete: {
    backgroundColor: "red",
  },
  cancel: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DeleteObstaculoModal;
