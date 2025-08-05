import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import CardObstaculo from "../../components/CardObstaculo";
import Obstaculo from "@/interfaces/Obstaculo";

export default function Obstaculos() {
  const [obstaculos, setObstaculos] = useState<Obstaculo[]>([
    {
      id: 1,
      nome: "Canteiro Central",
      manobras: [
        { id: 1, nome: "Ollie", status: "média", observacoes: []},
        { id: 2, nome: "Shove-it", status: "difícil", observacoes: []},
        { id: 3, nome: "Flip", status: "difícil", observacoes: []},
        
      ],
    },
    {
      id: 2,
      nome: "Corrimão",
      manobras: [],
    },
    {
      id: 3,
      nome: "Caixote",
      manobras: [],
    },
  ]);

  const handleEdit = (obstaculo: Obstaculo) => {
    console.log("Editar:", obstaculo);
    // aqui você pode abrir um modal ou ir para outra tela
  };

  const handleDelete = (obstaculo: Obstaculo) => {
    console.log("Excluir:", obstaculo);
    // aqui você pode confirmar e remover do estado
    setObstaculos((prev) => prev.filter((item) => item.id !== obstaculo.id));
  };

  return (
    <View style={styles.container}>
      <FlatList<Obstaculo>
        data={obstaculos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardObstaculo
            obstaculo={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
