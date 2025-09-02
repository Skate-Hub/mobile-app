import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { coresDark as cores } from "@/temas/cores";
import { router } from "expo-router";

interface DefineConfigsProps {
  montarTreino: () => void;
}

const DefineConfigs = ({ montarTreino }: DefineConfigsProps) => {
  return (
    <>
      <Text style={styles.subtitle}>Defina suas configurações de treino</Text>
      <TouchableOpacity
        style={[styles.finalizarBtn, { backgroundColor: "red" }]}
        onPress={() => {
          montarTreino();
        }}
      >
        <Text style={styles.finalizarBtnText}>Confirmar</Text>
      </TouchableOpacity>
    </>
  );
};

export default DefineConfigs;

const styles = StyleSheet.create({
  subtitle: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginBottom: 20,
    marginLeft: 10,
  },
  finalizarBtn: {
    backgroundColor: cores.primario,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  finalizarBtnText: { color: cores.branco, fontWeight: "bold", fontSize: 16 },
});
