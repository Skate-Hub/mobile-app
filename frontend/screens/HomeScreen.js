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
import ObstaculoCard from "../components/cards/ObstacleItem";
import { buscarObstaculos } from "../services/obstaculosService";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/estrutura/Header";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [obstaculos, setObstaculos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const carregarObstaculos = async () => {
      try {
        const data = await buscarObstaculos();
        if (data) {
          setObstaculos(data);
        }
      } catch (error) {
        console.error("Erro ao carregar obstáculos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarObstaculos();
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
      <Header/>
      {obstaculos.length > 0 ? (
        <FlatList
          data={obstaculos}
          renderItem={({ item }) => <ObstaculoCard item={item} navigation={navigation} />}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require("../assets/icons/placeholder_skater.png")}
          />
          <Text style={styles.emptyText}>Cadastre Seu Primeiro Obstáculo</Text>
          <TouchableOpacity style={{ marginTop: 40 }}>
            <Ionicons name="add-circle" size={60} color="#000" />
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
  
});

export default HomeScreen;
