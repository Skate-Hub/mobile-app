import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { coresDark as cores } from "@/temas/cores";
import { cadastro } from "@/service/auth/cadastro";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaCopia, setSenhaCopia] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaCopia, setMostrarSenhaCopia] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const validarEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const abrirTermosUso = () => {
    Linking.openURL("https://skatenotes-media-server-production.up.railway.app/static/termos-de-uso.html");
  };

  const abrirPoliticaPrivacidade = () => {
    Linking.openURL("https://skatenotes-media-server-production.up.railway.app/static/politica-privacidade.html");
  };

  const realizarCadastro = async () => {
    if (!nome || !senha || !email || !senhaCopia) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (senha !== senhaCopia) {
      Alert.alert("Erro", "As senhas fornecidas não são iguais");
      return;
    }

    if (!aceitouTermos) {
      Alert.alert("Atenção", "Você precisa aceitar os termos de uso e política de privacidade para continuar.");
      return;
    }

    const result = await cadastro(nome, email, senha);

    if (!result || result.error) {
      Alert.alert(
        "Erro",
        result?.error || "Não foi possível realizar o cadastro"
      );
      return;
    }

    Alert.alert("Sucesso", "Seu cadastro foi realizado com sucesso!");
  };

  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>SkateHub</Text>
        <Text style={styles.subtitle}>Crie sua conta para acessar os módulos</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Criar Conta</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            placeholderTextColor={cores.textoPlaceholder}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            placeholderTextColor={cores.textoPlaceholder}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Crie uma senha"
              placeholderTextColor={cores.textoPlaceholder}
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
              style={styles.botaoMostrarSenha}
            >
              <Text style={{ color: cores.primario }}>
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Repita a senha"
              placeholderTextColor={cores.textoPlaceholder}
              secureTextEntry={!mostrarSenhaCopia}
              value={senhaCopia}
              onChangeText={setSenhaCopia}
            />
            <TouchableOpacity
              onPress={() => setMostrarSenhaCopia(!mostrarSenhaCopia)}
              style={styles.botaoMostrarSenha}
            >
              <Text style={{ color: cores.primario }}>
                {mostrarSenhaCopia ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Seção de Termos e Política de Privacidade */}
          <View style={styles.termosContainer}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setAceitouTermos(!aceitouTermos)}
            >
              <View style={[styles.checkbox, aceitouTermos && styles.checkboxSelecionado]}>
                {aceitouTermos && (
                  <MaterialCommunityIcons name="check" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.termosTexto}>
                Eu li e concordo com os{" "}
                <Text style={styles.termosLink} onPress={abrirTermosUso}>
                  Termos de Uso
                </Text>{" "}
                e{" "}
                <Text style={styles.termosLink} onPress={abrirPoliticaPrivacidade}>
                  Política de Privacidade
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, !aceitouTermos && styles.buttonDesabilitado]} 
            onPress={realizarCadastro}
            disabled={!aceitouTermos}
          >
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Já tem uma conta?{" "}
            <Link href="/login" style={styles.link}>
              Faça login
            </Link>
          </Text>
        </View>

        {/* Informações adicionais sobre privacidade */}
        <View style={styles.infoPrivacidade}>
          <MaterialCommunityIcons name="shield-check" size={20} color={cores.textoSecundario} />
          <Text style={styles.infoPrivacidadeTexto}>
            Seus dados estão protegidos conforme nossa política de privacidade
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
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
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: cores.destaque,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: cores.texto,
    textAlign: "center",
    marginBottom: 16,
  },
  label: {
    color: cores.texto,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "500",
  },
  input: {
    backgroundColor: cores.input,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: cores.texto,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  senhaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  botaoMostrarSenha: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  termosContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: cores.primario,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxSelecionado: {
    backgroundColor: cores.primario,
    borderColor: cores.primario,
  },
  termosTexto: {
    color: cores.textoSecundario,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  termosLink: {
    color: cores.primario,
    fontWeight: "600",
  },
  button: {
    backgroundColor: cores.primario,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDesabilitado: {
    backgroundColor: cores.borda,
    opacity: 0.6,
  },
  buttonText: {
    color: cores.branco,
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    marginTop: 16,
    color: cores.textoSecundario,
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: cores.primario,
    fontWeight: "bold",
  },
  infoPrivacidade: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.fundoElevado,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  infoPrivacidadeTexto: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
  },
});