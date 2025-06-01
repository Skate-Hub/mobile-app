import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import ManobraCard from "../components/cards/ManobraItem";
import { buscarManobras } from "../services/ManobrasService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/estrutura/Header";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import styles from "../styles/ManobraStyles";

const ManobrasScreen = () => {
  const navigation = useNavigation();
  const [manobras, setManobras] = useState([]);
  const [manobrasFiltradas, setManobrasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [manobraBuscada, setManobraBuscada] = useState("");

  useEffect(() => {
    const carregarManobras = async () => {
      try {
        const data = await buscarManobras();
        if (data) {
          setManobras(data);
          setManobrasFiltradas(data); 
        }
      } catch (error) {
        console.error("Erro ao carregar manobras:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarManobras();
  }, []);

  const filtrarManobras = (texto) => {
    setManobraBuscada(texto);
    if (texto === "") {
      setManobrasFiltradas(manobras);
    } else {
      const filtrado = manobras.filter((manobra) =>
        manobra.nome.toLowerCase().includes(texto.toLowerCase())
      );
      setManobrasFiltradas(filtrado);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.filterSection}>
        <Text style={styles.filterSectionText}>
          Manobras cadastradas: {manobrasFiltradas.length}
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            mode="outlined"
            placeholder="Pesquisar"
            value={manobraBuscada}
            onChangeText={filtrarManobras}
            left={<TextInput.Icon icon="magnify" />}
            style={styles.searchInput}
            placeholderTextColor="#999"
            theme={{
              colors: {
                primary: '#6200ee',
                background: "#f5f5f5",
                text: "#333",
                placeholder: "#999"
              }
            }}
          />
        </View>
      </View>

      {manobrasFiltradas.length > 0 ? (
        <FlatList
          data={manobrasFiltradas}
          renderItem={({ item }) => <ManobraCard item={item} />}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require("../assets/icons/placeholder_skater.png")}
          />
          <Text style={styles.emptyText}>
            {manobraBuscada
              ? "Nenhuma manobra encontrada"
              : "Adicione Uma Manobra a Um Obstaculo"}
          </Text>
          <TouchableOpacity
            style={{ marginTop: 40 }}
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialCommunityIcons name="plus-circle" size={60} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ManobrasScreen;