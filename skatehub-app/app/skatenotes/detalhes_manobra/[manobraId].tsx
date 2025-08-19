import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  atualizarStatus,
  buscarManobraById,
  deletarManobra,
  editarManobra,
  adicionarObservacoes,
} from "@/service/skatenotes/manobras";
import Manobra from "@/interfaces/skatenotes/Manobras";
import { coresDark as cores } from "@/temas/cores";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/skatenotes/HeaderDetalhes_manobra";
import {
  salvarObservacoesLocal,
  carregarObservacoesLocal,
  limparObservacoesLocal,
} from "@/service/asyncStorage";

export default function Observacoes() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { manobraId } = params;
  const [manobra, setManobra] = useState<Manobra | null>(null);
  const [texto, setTexto] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [statusSelecionado, setStatusSelecionado] = useState<
    Manobra["status"] | null
  >(null);
  const [abaSelecionada, setAbaSelecionada] = useState<
    "fotos" | "videos" | null
  >(null);
  const [statusSync, setStatusSync] = useState<"ok" | "pendente" | "erro">(
    "ok"
  );

  async function carregarManobra(manobraId: string) {
    const result = await buscarManobraById(manobraId);
    if (!result.success) {
      console.error("Erro ao buscar informações da manobra:", result.error);
      return;
    }
    setManobra(result.data || null);

    const observacoesLocais = await carregarObservacoesLocal(manobraId);
    setTexto(observacoesLocais || result.data?.observacoes || "");
    setStatusSelecionado(result.data?.status || null);

    if (observacoesLocais) {
      try {
        await adicionarObservacoes(observacoesLocais, manobraId);
        setStatusSync("ok");
        await salvarObservacoesLocal(manobraId, observacoesLocais);
      } catch (err) {
        console.error("Erro ao sincronizar com backend:", err);
        setStatusSync("erro");
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarManobra(manobraId.toString());
    }, [])
  );

  const handleEdit = async (manobraId: string, novoNome: string) => {
    const result = await editarManobra(manobraId, novoNome);
    if (!result.success) {
      console.error("erro ao editar manobra");
      return;
    }
    carregarManobra(manobraId);
  };

  const handleAtualizarStatus = async (
    manobraId: string,
    novoStatus: string
  ) => {
    const result = await atualizarStatus(manobraId, novoStatus);
    if (!result.success) {
      console.error("erro ao atualizar status da manobra");
      return;
    }
    carregarManobra(manobraId);
  };

  const handleDelete = async (manobraId: string) => {
    const result = await deletarManobra(manobraId);
    if (!result.success) {
      console.error("erro ao deletar manobra");
      return;
    }
    await limparObservacoesLocal(manobraId);
    router.back();
  };

  const handleChangeTexto = async (novoTexto: string) => {
    setTexto(novoTexto);
    setStatusSync("pendente");
    await salvarObservacoesLocal(manobraId.toString(), novoTexto);
  };

  const opcoesStatus: Manobra["status"][] = [
    "Na Base",
    "Aprimorar",
    "Aprender",
  ];

  const fotos = [
    "https://picsum.photos/400/300?1",
    "https://picsum.photos/400/300?2",
    "https://picsum.photos/400/300?3",
  ];
  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ];

  return (
    <View style={styles.container}>
      <Header
        title={manobra?.nome.toString()}
        manobraId={manobraId.toString()}
        nome={manobra?.nome.toString()}
        onSettings={() => router.push("/skatenotes/configuracoes")}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* --- STATUS --- */}
      <View style={styles.statusBox}>
        <Text style={styles.label}>Alterar Status</Text>
        <TouchableOpacity
          style={styles.filtro}
          onPress={() => setDropdownAberto(!dropdownAberto)}
        >
          <Text style={styles.status}>
            {statusSelecionado || "Selecione um status"}
          </Text>
          <MaterialCommunityIcons
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
                  opcao === statusSelecionado && styles.dropdownItemAtivo,
                ]}
                onPress={() => {
                  setStatusSelecionado(opcao);
                  handleAtualizarStatus(manobraId.toString(), opcao);
                  setDropdownAberto(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    opcao === statusSelecionado && styles.dropdownItemTextAtivo,
                  ]}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* --- AÇÕES --- */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.botao,
            abaSelecionada === "fotos" && styles.botaoAtivo,
          ]}
          onPress={() => setAbaSelecionada("fotos")}
        >
          <MaterialCommunityIcons name="camera" size={20} color={cores.texto} />
          <Text style={styles.botaoTexto}>Fotos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botao,
            abaSelecionada === "videos" && styles.botaoAtivo,
          ]}
          onPress={() => setAbaSelecionada("videos")}
        >
          <MaterialCommunityIcons name="video" size={20} color={cores.texto} />
          <Text style={styles.botaoTexto}>Vídeos</Text>
        </TouchableOpacity>
      </View>

      {/* --- MÍDIA --- */}
      {/* --- MÍDIA --- */}
      <View style={styles.mediaSection}>
        {abaSelecionada === "fotos" &&
          (fotos.length > 0 ? (
            fotos.map((foto, index) => (
              <Image
                key={index}
                source={{ uri: foto }}
                style={styles.card}
                resizeMode="cover"
              />
            ))
          ) : (
            <Text style={styles.placeholder}>
              Nenhuma foto adicionada ainda 📷
            </Text>
          ))}

        {abaSelecionada === "videos" &&
          (videos.length > 0 ? (
            videos.map((video, index) => (
              <View
                key={index}
                style={[
                  styles.card,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <MaterialCommunityIcons
                  name="video"
                  size={32}
                  color={cores.texto}
                />
                <Text
                  style={{
                    color: cores.textoSecundario,
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Vídeo {index + 1}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.placeholder}>
              Nenhum vídeo adicionado ainda 🎬
            </Text>
          ))}

        {!abaSelecionada && (
          <Text style={styles.placeholder}>
            Selecione "Fotos" ou "Vídeos" para visualizar os anexos
          </Text>
        )}
      </View>

      {/* --- EDITOR --- */}
      <ScrollView
        style={styles.editorWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TextInput
          style={styles.editor}
          multiline
          textAlignVertical="top"
          value={texto}
          onChangeText={handleChangeTexto}
          placeholder="# Escreva suas anotações aqui..."
          placeholderTextColor={cores.textoSecundario}
        />

        <View style={styles.indicadores}>
          {statusSync === "pendente" && (
            <MaterialCommunityIcons
              name="cloud-upload-outline"
              size={16}
              color={cores.textoSecundario}
            />
          )}
          {statusSync === "ok" && (
            <MaterialCommunityIcons name="check" size={16} color="#4CAF50" />
          )}
          {statusSync === "erro" && (
            <MaterialCommunityIcons name="alert-circle" size={16} color="red" />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  statusBox: { marginBottom: 16, padding: 10 },
  label: { fontSize: 14, color: cores.textoSecundario, marginBottom: 6 },
  filtro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: cores.fundoClaro,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  status: { fontSize: 16, color: cores.texto, fontWeight: "600" },
  dropdown: {
    marginTop: 6,
    backgroundColor: cores.fundoElevado,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.borda,
    elevation: 5,
  },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 10 },
  dropdownItemText: { color: cores.texto, fontSize: 14 },
  dropdownItemAtivo: { backgroundColor: cores.destaque },
  dropdownItemTextAtivo: { color: cores.primario, fontWeight: "bold" },
  actions: { flexDirection: "row", gap: 10, marginBottom: 16, padding: 10 },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.fundoClaro,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },
  botaoAtivo: { backgroundColor: cores.destaque },
  botaoTexto: { marginLeft: 6, color: cores.texto, fontSize: 15 },
  mediaSection: {
    backgroundColor: cores.fundoElevado,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    minHeight: 120,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  card: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: cores.botao,
  },
  placeholder: {
    color: cores.textoSecundario,
    fontSize: 14,
    textAlign: "center",
  },
  editorWrapper: { flex: 1, backgroundColor: cores.fundo },
  editor: {
    flex: 1,
    fontSize: 15,
    color: cores.texto,
    lineHeight: 22,
    padding: 14,
    backgroundColor: cores.input,
    borderRadius: 10,
  },
  indicadores: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});
