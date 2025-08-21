import Anexo from "@/interfaces/skatenotes/Anexo";
import * as ImagePicker from "expo-image-picker";

export async function selecionarMidia(
  tipo: "fotos" | "videos"
): Promise<Anexo | null> {
  try {
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
      const isImage = tipo === "fotos";

      // Montar FormData para envio ao servidor
      const formData = new FormData();
      formData.append("file", {
        uri: selected.uri,
        type: isImage ? "image/jpeg" : "video/mp4",
        name:
          selected.fileName ||
          `upload_${Date.now()}.${isImage ? "jpg" : "mp4"}`,
      } as any);

      const endpoint = isImage ? "/imagem" : "/video";

      const res = await fetch(
        `https://skatenotes-media-server-production.up.railway.app${endpoint}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Erro no servidor: ${res.status}`);
      }

      const data = await res.json();
      const baseUrl =
        "https://skatenotes-media-server-production.up.railway.app";
      const fullUrl = data.file.startsWith("http")
        ? data.file
        : `${baseUrl}${data.file}`;

      const anexo: Anexo = {
        url: selected.uri,
        serverPath: fullUrl,
        tipo: isImage ? "imagem" : "video",
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
  } catch (error) {
    console.error("Erro ao selecionar mídia:", error);
    alert("Erro ao processar a mídia.");
    return null;
  }
}

export const separarAnexos = (
  anexos: Anexo[] = []
): { fotos: Anexo[]; videos: Anexo[] } => {
  const fotos: Anexo[] = anexos.filter((a) => a.tipo === "imagem");
  const videos: Anexo[] = anexos.filter((a) => a.tipo === "video");
  return { fotos, videos };
};

