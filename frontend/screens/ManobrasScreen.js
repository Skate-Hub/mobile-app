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
import ManobraCard from "../components/cards/ManobraItem";
import { buscarManobras } from "../services/ManobrasService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/estrutura/Header";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import styles from "../styles/ManobraStyles";
import NotesModal from "../components/modals/NotesModal";
import { Menu, Button, Divider, Provider } from "react-native-paper";

const ManobrasScreen = () => {
  const navigation = useNavigation();
  const [manobras, setManobras] = useState([]);
  const [manobrasFiltradas, setManobrasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [manobraBuscada, setManobraBuscada] = useState("");
  const [abrirNotesModal, setAbrirNotesModal] = useState(false);
  const [idManobraSelecionada, setIdManobraselecionada] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [status, setStatus] = useState("");

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

  const handleChangeStatus = (novoStatus) => {
    if (status === novoStatus) {
      setStatus("");
      setManobrasFiltradas(manobras);
    } else {
      setStatus(novoStatus);
      const filtradas = manobras.filter(
        (manobra) => manobra.status.toLowerCase() === novoStatus.toLowerCase()
      );
      setManobrasFiltradas(filtradas);
    }

    setMenuVisible(false);
  };

  const handleAbrirNotesModal = (id) => {
    setIdManobraselecionada(id);
    setAbrirNotesModal(true);
  };

  const handleModalClose = () => {
    setAbrirNotesModal(false);
    setIdManobraselecionada(null);
  };

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
    <Provider>
      <SafeAreaView style={styles.container}>
        <Header />

        <View style={styles.filterSection}>
          <View>
            <Menu
              contentStyle={styles.optionbox}
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  onPress={() => setMenuVisible(true)}
                  mode="outlined"
                  style={styles.menuButton}
                  labelStyle={styles.menuButtonLabel}
                >
                  {status ? status.toUpperCase() : "Selecionar status"}
                </Button>
              }
            >
              <Menu.Item
                onPress={() => handleChangeStatus("aprender")}
                title="Aprender"
                titleStyle={styles.menuItemTitle}
              />
              <Divider />
              <Menu.Item
                onPress={() => handleChangeStatus("aprimorar")}
                title="Aprimorar"
                titleStyle={styles.menuItemTitle}
              />
              <Divider />
              <Menu.Item
                onPress={() => handleChangeStatus("na base")}
                title="Na base"
                titleStyle={styles.menuItemTitle}
              />
            </Menu>
          </View>

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
                  primary: "#6200ee",
                  background: "#f5f5f5",
                  text: "#333",
                  placeholder: "#999",
                },
              }}
            />
          </View>
        </View>

        {manobrasFiltradas.length > 0 ? (
          <FlatList
            data={manobrasFiltradas}
            renderItem={({ item }) => (
              <ManobraCard item={item} onPress={handleAbrirNotesModal} />
            )}
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
              <MaterialCommunityIcons
                name="plus-circle"
                size={60}
                color="#000"
              />
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
    </Provider>
  );
};

export default ManobrasScreen;
