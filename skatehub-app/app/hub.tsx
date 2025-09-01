import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { coresDark as cores } from "@/temas/cores";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeLogin } from "@/service/asyncStorage";

export default function Hub() {
  const router = useRouter();

  const navegar = (referencia: string) => {
    if (referencia === "skatenotes") {
      router.push("/skatenotes/(tabs)/obstaculos");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          onPress: async () => {
            await removeLogin();
            router.replace("/login");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Acesse as seções</Text>
        <Text style={styles.subtitulo}>
          Selecione qual seção deseja acessar. Você pode voltar aqui a qualquer momento.
        </Text>
      </View>

      {/* Módulos */}
      <View style={styles.modulosContainer}>
        <TouchableOpacity
          style={[styles.modulo, styles.moduloAtivo]}
          onPress={() => navegar("skatenotes")}
        >
          <View style={[styles.icone, styles.iconeAtivo]} />
          <View style={styles.moduloInfo}>
            <Text style={styles.moduloTitulo}>SkateNotes</Text>
            <Text style={styles.moduloDescricao}>Organize suas manobras e progresso</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.modulo, styles.moduloInativo]}>
          <View style={[styles.icone, styles.iconeInativo]} />
          <View style={styles.moduloInfo}>
            <Text style={styles.moduloTituloInativo}>Eventos</Text>
            <Text style={styles.moduloDescricaoInativo}>Em breve - Descubra rolês e campeonatos</Text>
          </View>
        </View>

        <View style={[styles.modulo, styles.moduloInativo]}>
          <View style={[styles.icone, styles.iconeInativo]} />
          <View style={styles.moduloInfo}>
            <Text style={styles.moduloTituloInativo}>Marketplace</Text>
            <Text style={styles.moduloDescricaoInativo}>Em breve - Compra, venda e troca de equipamentos</Text>
          </View>
        </View>
      </View>

      {/* Logout discreto */}
      <TouchableOpacity style={styles.logoutBottom} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={18} color={cores.textoSecundario} />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  titulo: {
    color: cores.texto,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 15,
    textAlign: "center",
    maxWidth: 300,
  },
  modulosContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  modulo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moduloInfo: {
    flex: 1,
  },
  icone: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginRight: 15,
  },
  moduloAtivo: {
    backgroundColor: cores.destaque,
  },
  iconeAtivo: {
    backgroundColor: cores.primario,
  },
  moduloTitulo: {
    color: cores.texto,
    fontWeight: "bold",
    fontSize: 17,
  },
  moduloDescricao: {
    color: cores.textoSecundario,
    fontSize: 14,
  },
  moduloInativo: {
    backgroundColor: cores.destaque,
    opacity: 0.5,
  },
  iconeInativo: {
    backgroundColor: "#555",
  },
  moduloTituloInativo: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 16,
  },
  moduloDescricaoInativo: {
    color: "#777",
    fontSize: 14,
  },
  logoutBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
    opacity: 0.6,
  },
  logoutText: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginLeft: 6,
  },
});
