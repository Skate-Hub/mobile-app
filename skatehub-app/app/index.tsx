import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { coresDark as cores } from "@/temas/cores";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Logo e título */}
      <View style={styles.header}>
        <Text style={styles.titulo}>
          Bem-vindo ao <Text style={{ color: cores.primario }}>SkateHub!</Text>
        </Text>

        {/* Bloco de informações organizado */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitulo}>
              Tudo sobre skate em um só lugar
            </Text>
            <Text style={styles.infoTexto}>
              Treinos, manobras, eventos e até um espaço para mostrar suas conquistas.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitulo}>Evolua nas manobras</Text>
            <Text style={styles.infoTexto}>
              Facilite sua evolução e acompanhe seu progresso dia a dia.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitulo}>Ganhe visibilidade</Text>
            <Text style={styles.infoTexto}>
              Compartilhe suas manobras, participe de eventos e conecte-se com a
              comunidade.
            </Text>
          </View>
        </View>
      </View>

      {/* Botões */}
      <View style={styles.botoesContainer}>
        <Link href={"/login"} asChild>
          <TouchableOpacity style={styles.botaoLogin}>
            <Text style={styles.botaoLoginTexto}>Fazer Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/cadastro"} asChild>
          <TouchableOpacity style={styles.botaoCriarConta}>
            <Text style={styles.botaoCriarContaTexto}>Criar Conta</Text>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 8
  },
  titulo: {
    color: cores.texto,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
  },
  infoCard: {
    backgroundColor: cores.destaque, // cartão com destaque escuro
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  infoTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.primario,
    marginBottom: 6,
    textAlign: "center",
  },
  infoTexto: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: "center",
    lineHeight: 20,
  },
  botoesContainer: {
    width: "100%",
    marginTop: 20,
  },
  botaoLogin: {
    backgroundColor: cores.botao, // laranja da paleta
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: cores.botao,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  botaoLoginTexto: {
    color: cores.botaoTexto,
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoCriarConta: {
    backgroundColor: cores.fundo,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: cores.primario,
  },
  botaoCriarContaTexto: {
    color: cores.primario,
    fontSize: 16,
    fontWeight: "bold",
  },
});
