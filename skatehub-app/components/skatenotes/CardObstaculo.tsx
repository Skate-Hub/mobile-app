import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Obstaculo from "../../interfaces/skatenotes/Obstaculo";


interface CardObstaculoProps {
  obstaculo: Obstaculo;
  onEdit: (item: Obstaculo) => void;
  onDelete: (item: Obstaculo) => void;
}

export default function CardObstaculo ({ obstaculo, onEdit, onDelete }: CardObstaculoProps) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{obstaculo.nome}</Text>
        <Text style={styles.manobras}>
          {obstaculo.manobras?.length || 0} manobra(s)
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(obstaculo)}>
          <Ionicons name="create-outline" size={20} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(obstaculo)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color="#d00" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  manobras: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  deleteButton: {
    marginLeft: 12,
  },
});
