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
import ObstaculoCard from "../components/ObstacleItem";
import { buscarObstaculos } from "../services/obstaculosService";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

const ManobrasScreen = () => {
  const [obstaculos, setObstaculos] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Header />
      <View>
        <Text>Manobras</Text>
      </View>
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

export default ManobrasScreen;
