import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { coresDark as cores } from "@/temas/cores";

export default function Hub() {
  const navegar = (referencia: string) => {
    const router = useRouter();
    switch (referencia) {
      case "skatenotes":
        router.push("/skatenotes/(tabs)/obstaculos");
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Acesse as seções</Text>
        <Text style={styles.subtitulo}>
          Selecione qual seção deseja acessar. Você pode voltar aqui a qualquer
          momento.
        </Text>
      </View>

      {/* Container de Módulos*/}
      <View style={styles.modulosContainer}>
        {/* Módulos ativos */}

        <TouchableOpacity
          style={[styles.modulo, styles.moduloAtivo]}
          onPress={() => navegar("skatenotes")}
        >
          <View style={[styles.icone, styles.iconeAtivo]} />
          <View>
            <Text style={styles.moduloTitulo}>SkateNotes</Text>
            <Text style={styles.moduloDescricao}>
              Organize suas manobras e progresso
            </Text>
          </View>
        </TouchableOpacity>

        {/* Módulos inativos */}
        <View style={[styles.modulo, styles.moduloInativo]}>
          <View style={[styles.icone, styles.iconeInativo]} />
          <View>
            <Text style={styles.moduloTituloInativo}>Eventos</Text>
            <Text style={styles.moduloDescricaoInativo}>
              Em breve - Descubra rolês e campeonatos
            </Text>
          </View>
        </View>

        <View style={[styles.modulo, styles.moduloInativo]}>
          <View style={[styles.icone, styles.iconeInativo]} />
          <View>
            <Text style={styles.moduloTituloInativo}>Marketplace</Text>
            <Text style={styles.moduloDescricaoInativo}>
              Em breve - Compra, venda e troca de equipamentos
            </Text>
          </View>
        </View>
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
  header: {
    marginTop: 60, // mais espaço do topo
    marginBottom: 30,
    alignItems: "center",
  },
  titulo: {
    color: cores.texto,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 15,
    textAlign: "center",
    maxWidth: 280,
  },
  secaoTitulo: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "center",
  },
  modulosContainer: {
    padding: 10,
  },
  modulo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icone: {
    width: 24,
    height: 24,
    borderRadius: 5,
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
    fontSize: 16,
  },
  moduloDescricao: {
    color: cores.textoSecundario,
    fontSize: 14,
  },
  moduloInativo: {
    backgroundColor: cores.destaque,
    opacity: 0.6,
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
});
