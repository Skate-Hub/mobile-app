import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { coresDark as cores } from "@/temas/cores";

interface HeaderProps {
  title?: string;
  manobraId: string;
  nome?: string;
  onEdit?: (manobraId: string, novoNome: string) => void;
  onDelete?: (manobraId: string) => void;
  onSettings?: () => void;
}

export default function Header({
  title,
  manobraId,
  nome,
  onEdit,
  onDelete,
  onSettings,
}: HeaderProps) {
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [novoNome, setNovoNome] = useState(nome || "");

  const abrirModalEdit = () => setModalEditVisible(true);
  const fecharModalEdit = () => {
    setNovoNome(nome || "");
    setModalEditVisible(false);
  };

  const abrirModalDelete = () => setModalDeleteVisible(true);
  const fecharModalDelete = () => setModalDeleteVisible(false);

  const confirmarEdicao = () => {
    if (novoNome.trim() && onEdit) {
      onEdit(manobraId, novoNome.trim());
      fecharModalEdit();
    }
  };

  const confirmarExclusao = () => {
    if (onDelete) {
      onDelete(manobraId);
      fecharModalDelete();
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        {onDelete && (
          <TouchableOpacity onPress={abrirModalDelete} style={styles.iconButton}>
            <Ionicons name="trash" size={22} color="#fff" />
          </TouchableOpacity>
        )}
        {onEdit && (
          <TouchableOpacity onPress={abrirModalEdit} style={styles.iconButton}>
            <Ionicons name="pencil" size={22} color="#fff" />
          </TouchableOpacity>
        )}
        {onSettings && (
          <TouchableOpacity onPress={onSettings} style={styles.iconButton}>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal de edição */}
      <Modal visible={modalEditVisible} animationType="fade" transparent onRequestClose={fecharModalEdit}>
        <TouchableWithoutFeedback onPress={fecharModalEdit}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.titulo}>Editar Manobra</Text>
                <Text style={styles.h2}>Não será aceita a confirmação em branco</Text>
                <TextInput
                  style={styles.input}
                  value={novoNome}
                  onChangeText={setNovoNome}
                  placeholder={nome}
                  placeholderTextColor="#888"
                />
                <View style={styles.buttons}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: cores.destaque }]} onPress={confirmarEdicao}>
                    <Text style={{ color: cores.texto }}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: cores.primario }]} onPress={fecharModalEdit}>
                    <Text style={{ color: cores.branco }}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de exclusão */}
      <Modal visible={modalDeleteVisible} animationType="fade" transparent onRequestClose={fecharModalDelete}>
        <TouchableWithoutFeedback onPress={fecharModalDelete}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.titulo}>Deseja realmente excluir a manobra?</Text>
                <Text style={styles.h2}>{nome}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: cores.primario }]} onPress={confirmarExclusao}>
                    <Text style={{ color: cores.branco }}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: cores.destaque }]} onPress={fecharModalDelete}>
                    <Text style={{ color: cores.texto }}>Não</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: cores.destaque,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: cores.destaque,
    borderRadius: 12,
    padding: 20,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: 10,
  },
  h2: {
    fontSize: 14,
    fontWeight: "600",
    color: cores.textoSecundario,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#333",
    color: cores.texto,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
  },
});
