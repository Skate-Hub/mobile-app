// components/skatenotes/ModalAdicionarObstaculo.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { coresDark as cores } from "@/temas/cores";
import { adicionarObstaculo } from "@/service/skatenotes/obstaculoService";

interface ModalAdicionarObstaculoProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalAdicionarObstaculo({
  visible,
  onClose,

}: ModalAdicionarObstaculoProps) {
  const [nome, setNome] = useState("");

  const handleAdd = () => {
    if (!nome.trim()) return;
    adicionarObstaculo(nome); 
    setNome(""); 
    onClose();
  };

  const handleClose = () => {
    setNome("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Adicionar Obstáculo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do obstáculo"
            placeholderTextColor={cores.textoPlaceholder}
            value={nome}
            onChangeText={setNome}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, { backgroundColor: cores.destaque }]} onPress={handleClose}>
              <Text style={{ color: cores.texto }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: cores.primario }]} onPress={handleAdd}>
              <Text style={{ color: cores.branco }}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: cores.destaque,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: cores.texto,
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: cores.input,
    color: cores.texto,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
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
  },
});
