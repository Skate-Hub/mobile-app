// screens/Home.js
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
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
import OpcoesModal from "../components/modals/opcoesModal";
import AddObstaculoModal from "../components/modals/obstaculos/addObstaculo";
import DeleteObstaculoModal from "../components/modals/obstaculos/deleteObstaculo";
import EditObstaculoModal from "../components/modals/obstaculos/editObstaculo";

const HomeScreen = () => {
  const [obstaculos, setObstaculos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [abrirOpcoesModal, setAbrirOpcoesModal] = useState(false);
  const [abrirAddObstaculoModal, setAbrirAddObstaculoModal] = useState(false);
  const [mostrarDeleteModal, setMostrarDeleteModal] = useState(false);
  const [mostrarEditModal, setMostrarEditModal] = useState(false);
  const [obstaculoSelecionado, setObstaculoSelecionado] = useState(null);

  const [modoExcluir, setModoExcluir] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      carregarObstaculos();
    }, [])
  );

  const abrirAdicionarObstaculo = () => {
    setAbrirOpcoesModal(false);
    setAbrirAddObstaculoModal(true);
    carregarObstaculos();
  };

  const abrirExcluir = () => {
    setAbrirOpcoesModal(false);
    setModoExcluir(true);
  };

  const abrirEditar = () => {
    setAbrirOpcoesModal(false);
    setModoEditar(true);
  };

  const aoTocarItem = (item) => {
    if (modoExcluir) {
      setObstaculoSelecionado(item);
      setMostrarDeleteModal(true);
    } else if (modoEditar) {
      setObstaculoSelecionado(item);
      setMostrarEditModal(true);
    } else {
      navigation.navigate("Obstaculo", { id: item });
    }
  };

  const fecharModaisEAcoes = () => {
    setModoExcluir(false);
    setModoEditar(false);
    setMostrarDeleteModal(false);
    setMostrarEditModal(false);
    setAbrirAddObstaculoModal(false);
    setObstaculoSelecionado(null);
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
          {(modoExcluir || modoEditar) && (
            <View
              style={[
                styles.modoBanner,
                modoExcluir ? styles.modoExcluir : styles.modoEditar,
              ]}
            >
              <Text style={styles.modoTexto}>
                {modoExcluir
                  ? "Toque no obstáculo para EXCLUIR."
                  : "Toque no obstáculo para EDITAR."}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModoExcluir(false);
                  setModoEditar(false);
                }}
              >
                <Text style={[styles.modoTexto, styles.cancelarTexto]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={obstaculos}
            renderItem={({ item }) => (
              <ObstaculoCard
                item={item}
                onPress={() => aoTocarItem(item._id)}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={styles.listContent}
          />

          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => setAbrirOpcoesModal(true)}
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
          <TouchableOpacity
            style={{ marginTop: 40 }}
            onPress={() => setAbrirOpcoesModal(true)}
          >
            <Ionicons name="add-circle" size={60} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal Opções */}
      <Modal
        visible={abrirOpcoesModal}
        transparent
        animationType="fade"
        onRequestClose={() => setAbrirOpcoesModal(false)}
      >
        <OpcoesModal
          visible={abrirOpcoesModal}
          onClose={() => setAbrirOpcoesModal(false)}
          onAdicionar={abrirAdicionarObstaculo}
          onExcluir={abrirExcluir}
          onEditar={abrirEditar}
        />
      </Modal>

      {/* Modal Adicionar */}
      <Modal
        visible={abrirAddObstaculoModal}
        transparent
        animationType="slide"
        onRequestClose={fecharModaisEAcoes}
      >
        <AddObstaculoModal onClose={fecharModaisEAcoes} />
      </Modal>

      {mostrarDeleteModal && obstaculoSelecionado && (
        <Modal
          visible={mostrarDeleteModal}
          transparent
          animationType="fade"
          onRequestClose={fecharModaisEAcoes}
        >
          <DeleteObstaculoModal
            obstaculoId={obstaculoSelecionado}
            onClose={fecharModaisEAcoes}
          />
        </Modal>
      )}

      {/* Modal Editar */}
      <Modal
        visible={mostrarEditModal}
        transparent
        animationType="slide"
        onRequestClose={fecharModaisEAcoes}
      >
        <EditObstaculoModal
          obstaculo={obstaculoSelecionado}
          onClose={fecharModaisEAcoes}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
