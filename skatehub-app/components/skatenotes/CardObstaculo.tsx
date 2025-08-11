import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Obstaculo from "../../interfaces/skatenotes/Obstaculo";

interface CardObstaculoProps {
  obstaculo: Obstaculo;
  onEdit: (item: Obstaculo) => void;
  onDelete: (item: Obstaculo) => void;
}

export default function CardObstaculo({
  obstaculo,
  onEdit,
  onDelete,
}: CardObstaculoProps) {
  return (
    <View style={styles.card}>
      {/* Área clicável do card para editar/ver */}
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => onEdit(obstaculo)}
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.nome}>{obstaculo.nome}</Text>
          <Text style={styles.manobras}>
            {obstaculo.manobras?.length || 0} manobra
            {(obstaculo.manobras?.length || 0) !== 1 ? "s" : ""}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Área dos ícones à direita */}
      <View style={styles.icons}>
        <Ionicons name="chevron-forward" size={18} color="#aaa" />
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => onDelete(obstaculo)}
          activeOpacity={0.6}
        >
          <MaterialIcons name="more-vert" size={20} color="#aaa" />
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1, // ocupa todo espaço à esquerda
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  manobras: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreButton: {
    marginLeft: 8,
    padding: 4,
  },
});
