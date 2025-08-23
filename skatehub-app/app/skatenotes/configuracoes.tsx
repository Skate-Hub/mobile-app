import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
  Switch,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { coresDark as cores } from "@/temas/cores";
//import { signOut } from "@/service/auth";

export default function Configuracoes() {
  const router = useRouter();
  const [sugestao, setSugestao] = useState("");
<<<<<<< Updated upstream
  const [notificacoes, setNotificacoes] = useState(true);
=======
  const [montagemTreino, setmontagemTreino] = useState(true);
>>>>>>> Stashed changes
  const [modoEscuro, setModoEscuro] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  /*const handleLogout = async () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          onPress: async () => {
            await signOut();
            router.replace("/login");
          },
          style: "destructive"
        }
      ]
    );
  };*/

  const handleEnviarSugestao = () => {
    if (!sugestao.trim()) {
      Alert.alert("Erro", "Por favor, digite sua sugestão");
      return;
    }

    // Aqui você pode implementar o envio para seu backend
    Alert.alert(
      "Sugestão Enviada",
      "Obrigado por contribuir com o SkateNotes! Sua sugestão foi enviada para nossa equipe.",
      [
        {
          text: "OK",
          onPress: () => setSugestao("")
        }
      ]
    );
  };

  const handleAbrirTermos = () => {
    Linking.openURL("https://seusite.com/termos");
  };

  const handleAbrirPrivacidade = () => {
    Linking.openURL("https://seusite.com/privacidade");
  };

  const handleLimparCache = () => {
    Alert.alert(
      "Limpar Cache",
      "Isso irá remover dados temporários. Tem certeza?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Limpar",
          onPress: () => {
            // Implementar limpeza de cache
            Alert.alert("Sucesso", "Cache limpo com sucesso!");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Configurações</Text>
        <Text style={styles.subtitulo}>Personalize sua experiência</Text>
      </View>

      {/* Seção: Preferências do SkateNotes */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>SkateNotes</Text>
        
        <View style={styles.opcao}>
          <View style={styles.opcaoInfo}>
            <MaterialCommunityIcons name="cloud-upload" size={24} color={cores.primario} />
            <View style={styles.opcaoTexto}>
              <Text style={styles.opcaoTitulo}>Auto-save</Text>
              <Text style={styles.opcaoDescricao}>Salva automaticamente suas anotações</Text>
            </View>
          </View>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{ false: cores.borda, true: cores.primario }}
            thumbColor={modoEscuro ? "#fff" : "#fff"}
          />
        </View>

        <View style={styles.opcao}>
          <View style={styles.opcaoInfo}>
<<<<<<< Updated upstream
            <MaterialCommunityIcons name="bell" size={24} color={cores.primario} />
            <View style={styles.opcaoTexto}>
              <Text style={styles.opcaoTitulo}>Lembretes de treino</Text>
              <Text style={styles.opcaoDescricao}>Notificações para praticar</Text>
=======
            <MaterialCommunityIcons
              name="progress-check"
              size={24}
              color={cores.primario}
            />
            <View style={styles.opcaoTexto}>
              <Text style={styles.opcaoTitulo}>Montagem de treinos</Text>
              <Text style={styles.opcaoDescricao}>
                Treinos montados automaticamente para te ajudar a evoluir
              </Text>
>>>>>>> Stashed changes
            </View>
          </View>
          <Switch
            value={montagemTreino}
            onValueChange={setmontagemTreino}
            trackColor={{ false: cores.borda, true: cores.primario }}
            thumbColor={modoEscuro ? "#fff" : "#fff"}
          />
        </View>
      </View>

      {/* Seção: Aparência */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Aparência</Text>
        
        <View style={styles.opcao}>
          <View style={styles.opcaoInfo}>
            <MaterialCommunityIcons name="weather-night" size={24} color={cores.primario} />
            <View style={styles.opcaoTexto}>
              <Text style={styles.opcaoTitulo}>Modo Escuro</Text>
              <Text style={styles.opcaoDescricao}>Melhor visualização à noite</Text>
            </View>
          </View>
          <Switch
            value={modoEscuro}
            onValueChange={setModoEscuro}
            trackColor={{ false: cores.borda, true: cores.primario }}
            thumbColor={modoEscuro ? "#fff" : "#fff"}
          />
        </View>
      </View>

      {/* Seção: Sugestões para SkateNotes */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Sugerir Melhorias</Text>
        <Text style={styles.secaoDescricao}>
          Sua opinião é importante! Compartilhe ideias para melhorar o SkateNotes.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Adicionar temporizador de treino, categorias de manobras, etc."
          placeholderTextColor={cores.textoPlaceholder}
          value={sugestao}
          onChangeText={setSugestao}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.botaoEnviar} onPress={handleEnviarSugestao}>
          <Text style={styles.botaoEnviarTexto}>Enviar Sugestão</Text>
        </TouchableOpacity>

      </View>

      {/* Seção: Privacidade e Segurança */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Privacidade</Text>
        
        <TouchableOpacity style={styles.opcao} onPress={handleAbrirTermos}>
          <MaterialCommunityIcons name="file-document" size={24} color={cores.textoSecundario} />
          <Text style={styles.opcaoTextoSimples}>Termos de Uso</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={cores.textoSecundario} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao} onPress={handleAbrirPrivacidade}>
          <MaterialCommunityIcons name="shield-account" size={24} color={cores.textoSecundario} />
          <Text style={styles.opcaoTextoSimples}>Política de Privacidade</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={cores.textoSecundario} />
        </TouchableOpacity>
      </View>

      {/* Seção: Utilidades */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Utilitários</Text>
        
        <TouchableOpacity style={styles.opcao} onPress={handleLimparCache}>
          <MaterialCommunityIcons name="trash-can" size={24} color={cores.textoSecundario} />
          <Text style={styles.opcaoTextoSimples}>Limpar Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao} onPress={() => Linking.openURL("mailto:support@skatehub.com")}>
          <MaterialCommunityIcons name="help-circle" size={24} color={cores.textoSecundario} />
          <Text style={styles.opcaoTextoSimples}>Suporte</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={cores.textoSecundario} />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.botaoLogout} onPress={() => router.push("/login")}>
        <MaterialCommunityIcons name="logout" size={24} color={cores.erro} />
        <Text style={styles.botaoLogoutTexto}>Sair da Conta</Text>
      </TouchableOpacity>

      {/* Versão do App */}
      <View style={styles.versaoContainer}>
        <Text style={styles.versaoTexto}>SkateHub v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  titulo: {
    color: cores.texto,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 16,
  },
  secao: {
    backgroundColor: cores.fundoElevado,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  secaoTitulo: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  secaoDescricao: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  opcaoInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  opcaoTexto: {
    marginLeft: 15,
    flex: 1,
  },
  opcaoTitulo: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: "600",
  },
  opcaoDescricao: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginTop: 2,
  },
  opcaoTextoSimples: {
    color: cores.texto,
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
  },
  input: {
    backgroundColor: cores.input,
    borderRadius: 8,
    padding: 15,
    color: cores.texto,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  botaoEnviar: {
    backgroundColor: cores.primario,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoEnviarTexto: {
    color: cores.botaoTexto,
    fontSize: 16,
    fontWeight: "bold",
  },
  exemplosContainer: {
    backgroundColor: cores.fundoClaro,
    borderRadius: 8,
    padding: 15,
  },
  exemplosTitulo: {
    color: cores.primario,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exemplo: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginBottom: 5,
  },
  botaoLogout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.fundoElevado,
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: cores.erro,
  },
  botaoLogoutTexto: {
    color: cores.erro,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  versaoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  versaoTexto: {
    color: cores.textoSecundario,
    fontSize: 12,
  },
});