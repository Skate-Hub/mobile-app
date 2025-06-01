import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { buscarManobra } from "../../services/ManobrasService";
import Header from "../estrutura/Header";

const NotesModal = ({ idManobra, onCLose }) => {
  const [manobra, setManobra] = useState([]);
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    const carregarManobra = async () => {
      try {
        const data = await buscarManobra(idManobra);
        setManobra(data);
        setObservacoes(data.observacoes)
      } catch (error) {
        console.error("Erro ao carregar manobra:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarManobra();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{manobra.nome}</Text>
      </View>
      <View >
        <Text >{observacoes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default NotesModal;
