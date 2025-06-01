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
import Header from "../components/estrutura/Header";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { buscarManobrasObstaculo } from "../services/ManobrasService";
import ManobraCard from "../components/cards/ManobraItem";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styles from "../styles/ObstaculoStyles";
import NotesModal from "../components/modals/NotesModal";

const Obstaculo = () => {
  const [manobras, setManobras] = useState([]);
  const [idManobraSelecionada, setIdManobraselecionada] = useState([]);
  const [loading, setLoading] = useState(true);
  const [abrirNotesModal, setAbrirNotesModal] = useState(false);

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

  const handleAbrirNotesModal = (id) => {
    setIdManobraselecionada(id);
    setAbrirNotesModal(true);
  };

  const handleModalClose = () => {
    setAbrirNotesModal(false);
    setIdManobraselecionada(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {manobras.length > 0 ? (
        <View>
          <FlatList
            data={manobras}
            renderItem={({ item }) => (
              <ManobraCard
                item={item}
                onPress={() => handleAbrirNotesModal(item._id)}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.listContent}
          />

          <TouchableOpacity style={styles.addButtonContainer}>
            <Ionicons name="add-circle" size={60} color="#000" />
          </TouchableOpacity>
        </View>
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
      <Modal
        visible={abrirNotesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setAbrirNotesModal(false)}
      >
        <NotesModal
          onClose={handleModalClose}
          idManobra={idManobraSelecionada}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Obstaculo;
