import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../components/estrutura/Header";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  atualizarObservacoes,
  buscarManobra,
} from "../services/ManobrasService";

const NotesScreen = () => {
  const route = useRoute();

  const idManobra = route.params?.id;

  const [manobra, setManobra] = useState([]);
  const [observacoes, setObservacoes] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarManobra = async () => {
      try {
        const data = await buscarManobra(idManobra);

        setManobra(data);
      } catch (error) {
        console.error("Erro ao carregar obstáculos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarManobra();
  }, []);

  const handleSalvarObservacoes = async () => {
    if (!idManobra) {
      Alert.alert(
        "Erro",
        "ID da Manobra não fornecido. Não é possível salvar."
      );
      return;
    }

    setLoading(true);
    try {
      await atualizarObservacoes(idManobra, observacoes);
      Alert.alert("Sucesso!", "Observações salvas com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar observações:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao salvar as observações. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screenContainer}
    >
      <View style={styles.container}>
        <Header title="Anotações da Manobra" />

        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Digite suas observações aqui..."
          value={observacoes}
          onChangeText={setObservacoes}
          textAlignVertical="top"
          scrollEnabled={true}
        />
        <View style={styles.buttonContainer}>
          {Loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button
              title="Salvar Observações"
              onPress={handleSalvarObservacoes}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    backgroundColor: "#FFF",
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#F5F5F5",
  },
});

export default NotesScreen;
