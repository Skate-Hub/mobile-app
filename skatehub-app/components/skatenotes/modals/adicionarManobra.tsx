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
import { adicionarManobra } from "@/service/skatenotes/manobras";
import { Ionicons } from "@expo/vector-icons";
import Obstaculo from "@/interfaces/skatenotes/Obstaculo";

interface ModalAdicionarManobraProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  obstaculoId: string;
}

export default function ModalAdicionarManobra({
  visible,
  onClose,
  onSave,
  obstaculoId
}: ModalAdicionarManobraProps) {
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState<"Aprender" | "Aprimorar" | "Na Base">(
    "Aprender"
  );
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const opcoesStatus: ("Aprender" | "Aprimorar" | "Na Base")[] = [
    "Aprender",
    "Aprimorar",
    "Na Base",
  ];

  const handleAdd = async () => {
    if (!nome.trim()) return;

    const result = await adicionarManobra(obstaculoId, nome, status);
    if (!result.success) return;

    setNome("");
    setStatus("Aprender");
    await onSave();
    onClose();
  };

  const handleClose = () => {
    setNome("");
    setStatus("Aprender");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Adicionar Manobra</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da manobra"
            placeholderTextColor={cores.textoPlaceholder}
            value={nome}
            onChangeText={setNome}
          />

          <View style={{ marginBottom: 20, position: "relative" }}>
            <TouchableOpacity
              style={styles.filtro}
              onPress={() => setDropdownAberto(!dropdownAberto)}
            >
              <Text style={styles.filtroText}>{status}</Text>
              <Ionicons
                name={dropdownAberto ? "chevron-up" : "chevron-down"}
                size={18}
                color={cores.textoSecundario}
              />
            </TouchableOpacity>

            {dropdownAberto && (
              <View style={styles.dropdown}>
                {opcoesStatus.map((opcao) => (
                  <TouchableOpacity
                    key={opcao}
                    style={[
                      styles.dropdownItem,
                      opcao === status && styles.dropdownItemAtivo,
                    ]}
                    onPress={() => {
                      setStatus(opcao);
                      setDropdownAberto(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        opcao === status && styles.dropdownItemTextAtivo,
                      ]}
                    >
                      {opcao}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: cores.destaque }]}
              onPress={handleClose}
            >
              <Text style={{ color: cores.texto }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: cores.primario }]}
              onPress={handleAdd}
            >
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
  filtro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: cores.fundoElevado,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  filtroText: {
    color: cores.textoSecundario,
    fontSize: 14,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: cores.fundoClaro,
    borderRadius: 8,
    zIndex: 10,
    elevation: 5,
    shadowColor: cores.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownItemText: {
    color: cores.texto,
    fontSize: 14,
  },
  dropdownItemAtivo: {
    backgroundColor: cores.destaque,
  },
  dropdownItemTextAtivo: {
    color: cores.primario,
    fontWeight: "bold",
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
