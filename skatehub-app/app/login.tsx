import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { coresDark as cores } from "@/temas/cores";
import { login } from "@/service/auth/authService";
import { getLoginSalvo, salvaLogin, removeLogin } from "@/service/asyncStorage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checarLoginSalvo = async () => {
      const loginSalvo = await getLoginSalvo();
      if (loginSalvo) {
        setEmail(loginSalvo.email);
        setSenha(loginSalvo.senha);
        setLembrar(true);
        await fazerLogin(loginSalvo.email, loginSalvo.senha);
      }
    };

    checarLoginSalvo();
  }, []);

  const fazerLogin = async (loginEmail = email, loginSenha = senha) => {
    const result = await login(loginEmail, loginSenha);

    if (!result || result.error) {
      Alert.alert("Erro", result?.error || "Não foi possível realizar o login");
      return;
    }

    if (lembrar) {
      await salvaLogin(loginEmail, loginSenha);
    } else {
      await removeLogin();
    }

    router.push("/hub");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkateHub</Text>
      <Text style={styles.subtitle}>Acesse sua conta e explore os módulos</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrar</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor={cores.textoPlaceholder}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.senhaContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Digite sua senha"
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

        <View style={styles.lembrarContainer}>
          <Text style={{ color: cores.texto }}>Lembrar de mim</Text>
          <Switch
            value={lembrar}
            onValueChange={setLembrar}
            trackColor={{ false: "#767577", true: cores.primario }}
            thumbColor={lembrar ? cores.branco : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => fazerLogin()}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Ainda não tem uma conta?{" "}
          <Link href="/cadastro" style={styles.link}>
            Cadastre-se
          </Link>
        </Text>
      </View>
      <View style={styles.infoPrivacidade}>
        <MaterialCommunityIcons
          name="shield-check"
          size={20}
          color={cores.textoSecundario}
        />
        <Text style={styles.infoPrivacidadeTexto}>
          Seus dados estão protegidos conforme nossa política de privacidade
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
    textAlign: "center",
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
    marginBottom: 16,
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
  senhaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoMostrarSenha: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  lembrarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    backgroundColor: cores.primario,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
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
