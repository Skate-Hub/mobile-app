import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { coresDark as cores } from "@/temas/cores";
import Obstaculo from "@/interfaces/skatenotes/Obstaculo";

interface ModalOptionsProps {
  visible: boolean;
  onClose: () => void;
  obstaculo: Obstaculo;
  onEditConfirm: (novoNome: string, obstaculoId: string) => void;
  onDeleteConfirm: (obstaculoId: string) => void;
}

export default function ModalOptions({
  visible,
  onClose,
  obstaculo,
  onEditConfirm,
  onDeleteConfirm,
}: ModalOptionsProps) {
  const [modo, setModo] = useState<"menu" | "editar" | "excluir">("menu");
  const [novoNome, setNovoNome] = useState(obstaculo.nome);

  const resetar = () => {
    setModo("menu");
    setNovoNome(novoNome);
  };

  const fechar = () => {
    resetar();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={fechar}>
      <TouchableWithoutFeedback onPress={fechar}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {modo === "menu" && (
                <>
                  <Text style={styles.titulo}>Opções para: {obstaculo.nome}</Text>
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: cores.destaque }]}
                      onPress={() => setModo("editar")}
                    >
                      <Text style={{ color: cores.texto }}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: cores.primario }]}
                      onPress={() => setModo("excluir")}
                    >
                      <Text style={{ color: cores.branco }}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {modo === "excluir" && (
                <>
                  <Text style={styles.titulo}>
                    Realmente deseja excluir o obstáculo:
                  </Text>
                  <Text style={styles.nome}>{obstaculo.nome}?</Text>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: cores.primario }]}
                      onPress={() => {
                        onDeleteConfirm(obstaculo._id);
                        fechar();
                      }}
                    >
                      <Text style={{ color: cores.branco }}>Sim</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: cores.destaque }]}
                      onPress={() => setModo("menu")}
                    >
                      <Text style={{ color: cores.texto }}>Não</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {modo === "editar" && (
                <>
                  <Text style={styles.titulo}>Digite o novo nome:</Text>
                  <Text style={styles.h2}>Não será aceita a confirmação em branco</Text>
                  <TextInput
                    style={styles.input}
                    value={novoNome}
                    onChangeText={setNovoNome}
                    placeholder="Novo nome"
                    placeholderTextColor="#888"
                  />

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: cores.destaque }]}
                      onPress={() => {
                        onEditConfirm(novoNome, obstaculo._id);
                        fechar();
                      }}
                    >
                      <Text style={{ color: cores.texto }}>Confirmar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: cores.primario }]}
                      onPress={() => setModo("menu")}
                    >
                      <Text style={{ color: cores.branco }}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: cores.branco,
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
  input: {
    backgroundColor: "#333",
    color: cores.texto,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
    marginBottom: 15,
  },
});
