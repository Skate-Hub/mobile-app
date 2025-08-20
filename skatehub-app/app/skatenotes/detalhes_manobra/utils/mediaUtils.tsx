import Anexo from "@/interfaces/skatenotes/Anexo";
import * as ImagePicker from "expo-image-picker";

export const separarAnexos = (anexos: Anexo[] = []): { fotos: Anexo[]; videos: Anexo[] } => {
  const fotos: Anexo[] = anexos.filter(a => a.tipo === "imagem");
  const videos: Anexo[] = anexos.filter(a => a.tipo === "video");
  return { fotos, videos };
};

export const selecionarMidia = async (
  tipo: "fotos" | "videos"
): Promise<Anexo | null> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Permissão necessária para acessar a galeria!");
    return null;
  }

  const mediaType = tipo === "fotos" ? "images" : "videos";

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: mediaType,
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    const selected = result.assets[0];
    const anexo: Anexo = {
      url: selected.uri,
      caminhoFirebase: "",
      tipo: tipo === "fotos" ? "imagem" : "video",
      nomeOriginal: selected.fileName || "nome_desconhecido",
      tamanho: selected.fileSize || 0,
      formato: selected.type,
      metadata: {
        largura: selected.width,
        altura: selected.height,
        duracao: selected.duration || undefined,
      },
    };
    return anexo;
  }

  return null;
};
