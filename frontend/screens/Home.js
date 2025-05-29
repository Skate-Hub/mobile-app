// frontend/screens/Home.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { buscarObstaculos } from "../services/obstaculosService";

const HomeScreen = () => {
  const [obstaculos, setObstaculos] = useState([]);

  useEffect(() => {
    const carregarObstaculos = async () => {
      const data = await buscarObstaculos();
      if (data) {
        setObstaculos(data);
      }
    };
    carregarObstaculos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SkateNotes</Text>
      </View>
      <View>
        {obstaculos.map((item, index) => (
          <Text key={index}>{item.nome}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    display: "flex",
    marginBottom: 20,
    marginTop: 15
  },
  headerTitle: {
    fontSize: 30,
    
  }
});

export default HomeScreen;
