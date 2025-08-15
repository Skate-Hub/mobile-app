import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { coresDark as cores } from "@/temas/cores";
import { useEffect, useState } from "react";
import { buscarObstaculoById } from "@/service/skatenotes/obstaculoService";
import Obstaculo from "@/interfaces/skatenotes/Obstaculo";
import TabHeader from "@/components/skatenotes/tabHeader";
import ModalAdicionarManobra from "@/components/skatenotes/modals/adicionarManobra";
import CardManobra from "@/components/skatenotes/CardManobra";

export default function Manobras_Obstaculo() {
  const params = useLocalSearchParams();
  const { obstaculoId } = params;

  const [obstaculo, setObstaculo] = useState<Obstaculo | null>(null);
  const [modalAddManobraVisible, setModalAddManobraVisible] = useState(false);

  async function carregarObstaculo(id: string) {
    const result = await buscarObstaculoById(id);
    if (!result.success) {
      console.error("Erro ao buscar obstáculo:", result.error);
      return;
    }
    setObstaculo(result.data || null);
  }

  useEffect(() => {
    if (obstaculoId) {
      carregarObstaculo(obstaculoId.toString());
    }
  }, [obstaculoId]);

  const handleAdd = () => {
    setModalAddManobraVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title={obstaculo?.nome || "Obstáculo"} onAdd={handleAdd} />

      {!obstaculo && <Text style={styles.emptyText}>Carregando...</Text>}

      {obstaculo && obstaculo.manobras && obstaculo.manobras.length === 0 && (
        <Text style={styles.emptyText}>Nenhuma manobra cadastrada</Text>
      )}

      {obstaculo && obstaculo.manobras && obstaculo.manobras.length > 0 && (
        <FlatList
          data={obstaculo.manobras}
          keyExtractor={(item) => item._id.toString()} 
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => (
            <CardManobra
              nome={item.nome}
              status={item.status}
              obstaculo={obstaculo.nome}
              onPress={() => console.log("clicou na manobra", item.nome)}
            />
          )}
        />
      )}

      <ModalAdicionarManobra
        visible={modalAddManobraVisible}
        onClose={() => setModalAddManobraVisible(false)}
        onSave={() => {
          console.log("atualizou");
          if (obstaculoId) carregarObstaculo(obstaculoId.toString());
        }}
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
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
