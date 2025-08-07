import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { coresDark as cores } from "@/temas/cores";

export default function Hub() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkateHub</Text>
      <Text style={styles.subtitle}>Explore os módulos abaixo</Text>

      <View style={styles.card}>
        <Link href="/skatenotes" asChild>
          <TouchableOpacity style={styles.moduleButton}>
            <Text style={styles.moduleText}>SkateNotes</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: cores.primario,
    marginBottom: 4,
  },
  subtitle: {
    color: cores.cinzaClaro,
    fontSize: 14,
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: cores.destaque,
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  moduleButton: {
    backgroundColor: cores.botao,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  moduleText: {
    color: cores.botaoTexto,
    fontSize: 16,
    fontWeight: "bold",
  },
});
