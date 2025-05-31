// screens/Home.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/estrutura/Header";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { buscarManobrasObstaculo } from "../services/ManobrasService";
import ManobraCard from "../components/cards/ManobraItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Obstaculo = () => {
  const [manobras, setManobras] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const id = route.params.id;

  const navigation = useNavigation();

  //buscar manobras atreladas ao id do item passado
  useEffect(() => {
    const carregarManobrasObstaculo = async () => {
      try {
        const data = await buscarManobrasObstaculo(id);
        if (data) {
          setManobras(data);
        }
      } catch (error) {
        console.error("Erro ao carregar obstáculos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarManobrasObstaculo();
  }, []);

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

      {manobras.length > 0 ? (
        <FlatList
          data={manobras}
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
            Esse obstaculo ainda nao tem nenhuma manobra cadastrada!
          </Text>
          <TouchableOpacity
            style={styles.backSection}
            onPress={() => navigation.navigate("HomeStack")}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={60}
              color="#000"
            />
            <Text style={{ fontSize: 30, fontWeight: 500 }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

//lembrar de passar a estilização do card de obstaculos pra o arquivo do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  backSection: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Obstaculo;
