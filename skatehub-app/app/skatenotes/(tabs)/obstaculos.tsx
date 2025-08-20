import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import CardObstaculo from "@/components/skatenotes/CardObstaculo";
import Obstaculo from "../../../interfaces/skatenotes/Obstaculo";
import { buscarObstaculos } from "@/service/skatenotes/obstaculoService";
import TabHeader from "@/components/skatenotes/tabHeader";
import { useFocusEffect, useRouter } from "expo-router";
import { coresDark as cores } from "@/temas/cores";
import ModalAdicionarObstaculo from "../../../components/skatenotes/modals/adicionarObstaculo";

export default function Obstaculos() {
  const router = useRouter();
  const [obstaculos, setObstaculos] = useState<Obstaculo[]>([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);

  async function carregarObstaculos() {
    const result = await buscarObstaculos();
    if (!result.success) {
      console.error("Erro ao buscar obstáculos:", result.error);
      return;
    }
    setObstaculos(result.data || []);
  }

  useFocusEffect(
    useCallback(() => {
      carregarObstaculos();
    }, [])
  );

  const handleOnAdd = () => {
    setModalAddVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader
        title="Obstáculos"
        onAdd={handleOnAdd}
        onSettings={() => router.push("../configuracoes")}
      />
      <View style={styles.content}>
        <FlatList<Obstaculo>
          contentContainerStyle={{ paddingBottom: 24 }}
          data={obstaculos}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <CardObstaculo
              obstaculo={item}
              onPress={() => {
                router.push({
                  pathname: "/skatenotes/manobras_obstaculo/[obstaculoId]",
                  params: { obstaculoId: item._id },
                });
              }}
              onSave={carregarObstaculos}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum obstáculo encontrado.</Text>
          }
        />
      </View>

      <ModalAdicionarObstaculo
        visible={modalAddVisible}
        onClose={() => setModalAddVisible(false)}
        onSave={carregarObstaculos}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
