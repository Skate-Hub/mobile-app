import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { coresDark as cores } from "@/temas/cores";
import { Ionicons } from "@expo/vector-icons";

interface CardManobraProps {
  nome: string;
  obstaculo: string;
  status: "Na Base" | "Aprimorar" | "Aprender";
  corStatus?: string;
  onPress: () => void;
}

export default function CardManobra({
  nome,
  status,
  corStatus,
  onPress,
}: CardManobraProps) {
  const statusColors: Record<string, string> = {
    "Na Base": "#008f39",
    Aprimorar: "#ffb400",
    Aprender: "#0066ff",
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{nome}</Text>
      </View>

      <View style={styles.rightContainer}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: corStatus || statusColors[status] },
          ]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={cores.textoSecundario}
          style={{ marginLeft: 8 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.destaque,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.texto,
  },
  obstaculo: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 4,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
