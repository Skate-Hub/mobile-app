import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import CardObstaculo from "@/components/skatenotes/CardObstaculo";
import Obstaculo from "../../../interfaces/skatenotes/Obstaculo";
import { buscarObstaculos } from "@/service/skatenotes/obstaculoService";

export default function Obstaculos() {
  const [obstaculos, setObstaculos] = useState<Obstaculo[]>([]);

  useEffect(() => {
    async function carregarObstaculos() {
      const data: Obstaculo[] = await buscarObstaculos();

      if (!data) {
        return;
      }

      setObstaculos(data);
    }
    carregarObstaculos();
  }, []);

  const handleEdit = (obstaculo: Obstaculo) => {
    console.log("Editar:", obstaculo);
    // aqui você pode abrir um modal ou ir para outra tela
  };

  const handleDelete = (obstaculo: Obstaculo) => {
    console.log("Excluir:", obstaculo);
    // aqui você pode confirmar e remover do estado
    setObstaculos((prev) => prev.filter((item) => item._id !== obstaculo._id));
  };

  return (
    <View style={styles.container}>
      <FlatList<Obstaculo>
        data={obstaculos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <CardObstaculo
            obstaculo={item}
            onEdit={handleEdit}
            onDelete={() => {
              console.log("ta ligado");
            }}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum obstáculo encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#f5f5f5",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
