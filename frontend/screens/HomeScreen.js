// screens/Home.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import ObstaculoCard from "../components/cards/ObstacleItem";
import { buscarObstaculos } from "../services/obstaculosService";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/estrutura/Header";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/HomeStyles";
import AddObstaculoModal from "../components/modals/addObstaculo";


const HomeScreen = () => {
  const [obstaculos, setObstaculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [abrirAddObstaculoModal, setAbrirAddObstaculoModal] = useState(false);

  const navigation = useNavigation();

  
  const carregarObstaculos = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    carregarObstaculos();
  }, []);

  const handleModalClose = () => {
    setAbrirAddObstaculoModal(false);
    carregarObstaculos();
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
      {obstaculos.length > 0 ? (
        <View>
          <FlatList
            data={obstaculos}
            renderItem={({ item }) => (
              <ObstaculoCard item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.listContent}
          />
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => setAbrirAddObstaculoModal(true)}
          >
            <Ionicons name="add-circle" size={60} color="#000" />
          </TouchableOpacity>
        </View>
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

      <Modal
        visible={abrirAddObstaculoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setAbrirAddObstaculoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddObstaculoModal onClose={handleModalClose} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
