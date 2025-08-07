import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { coresDark as cores } from "@/temas/cores";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkateHub</Text>
      <Text style={styles.subtitle}>
        Acesse seus módulos de skate em um só lugar
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrar</Text>
        <Text style={styles.cardSubtitle}>
          Entre e explore os módulos do SkateHub
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor={cores.textoPlaceholder}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor={cores.textoPlaceholder}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Link href="/hub" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Link>

        <Text style={styles.footer}>
          Ainda não tem uma conta?{" "}
          <Link href="/cadastro" style={styles.link}>
            Cadastre-se
          </Link>
        </Text>
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
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: cores.texto,
    textAlign: "center",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: cores.textoSecundario,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: cores.texto,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: cores.input,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: cores.texto,
    marginBottom: 10,
  },
  button: {
    backgroundColor: cores.primario,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: cores.branco,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 16,
    color: cores.textoSecundario,
    textAlign: "center",
  },
  link: {
    color: cores.primario,
    fontWeight: "bold",
  },
});
