import React from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { coresDark as cores } from "@/temas/cores";
import Anexo from "@/interfaces/skatenotes/Anexo";

const { width, height } = Dimensions.get("window");

interface ModalMidiasProps {
  visivel: boolean;
  midia: Anexo | null;
  onFechar: () => void;
}

export default function ModalPlayer({
  visivel,
  midia,
  onFechar,
}: ModalMidiasProps) {
  if (!midia) return null;

  return (
    <Modal
      visible={visivel}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onFechar}
    >
      <View style={styles.container}>
        {/* Botão de fechar */}
        <TouchableOpacity style={styles.closeButton} onPress={onFechar}>
          <MaterialCommunityIcons name="close" size={28} color="#FFF" />
        </TouchableOpacity>

        {/* Conteúdo da mídia */}
        <View style={styles.content}>
          {midia.tipo === "imagem" ? (
            <Image
              source={{ uri: midia.serverPath || midia.url }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Video
              source={{ uri: midia.serverPath }}
              resizeMode={ResizeMode.CONTAIN}
              style={styles.video}
              useNativeControls
              shouldPlay
              isLooping
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  image: {
    width: width,
    height: height * 0.7,
  },
  video: {
    width: width,
    height: height * 0.7,
    backgroundColor: "#000",
  },
});
