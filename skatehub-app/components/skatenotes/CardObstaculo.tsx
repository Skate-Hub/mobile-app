import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Obstaculo from "../../interfaces/skatenotes/Obstaculo";
import ModalOptions from "./modals/options";
import { editarObstaculo, excluirObstaculo } from "@/service/skatenotes/obstaculoService";

interface CardObstaculoProps {
  obstaculo: Obstaculo;
  onPress: () => void;
  onSave: () => void;
}

export default function CardObstaculo({
  obstaculo,
  onPress,
  onSave,
}: CardObstaculoProps) {
  const [modalOptionsVisible, setModalOptionsVisible] = useState(false);

  const abrirModalOptions = () => {
    setModalOptionsVisible(true);
  };

  const onEdit = async (novoNome: string, obstaculoId: string) => {
    await editarObstaculo(novoNome, obstaculoId);
    await onSave();
  };

  const onDelete = async (obstaculoId: string) => {
    await excluirObstaculo(obstaculoId)
    await onSave();
  };

  return (
    <View style={styles.card}>
      {/* Área clicável principal */}
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={onPress}
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

      {/* Botão de opções */}
      <View style={styles.icons}>
        <Ionicons name="chevron-forward" size={18} color="#aaa" />
        <TouchableOpacity
          style={styles.moreButton}
          onPress={abrirModalOptions}
          activeOpacity={0.6}
        >
          <MaterialIcons name="more-vert" size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Modal de Opções */}
      <ModalOptions
        visible={modalOptionsVisible}
        onClose={() => setModalOptionsVisible(false)}
        onEditConfirm={onEdit}
        onDeleteConfirm={onDelete}
        obstaculo={obstaculo}
      />
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
    height: 100,
  },
  infoContainer: {
    flex: 1, // ocupa todo espaço à esquerda
  },
  nome: {
    fontSize: 18,
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
