import { useCallback, useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import Manobra from "@/interfaces/skatenotes/Manobras";
import { coresDark as cores } from "@/temas/cores";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/skatenotes/HeaderDetalhes_manobra";
import { salvarObservacoesLocal } from "@/service/asyncStorage";
import * as manobraUtils from "../../../utils/skatenotes/manobraUtils";
import { separarAnexos } from "../../../utils/skatenotes/mediaUtils";
import { carregarObservacoes } from "../../../utils/skatenotes/observacoesUtils";
import { selecionarMidia } from "../../../utils/skatenotes/mediaUtils";
import { removerAnexo, salvarAnexo } from "@/service/skatenotes/manobras";
import Anexo from "@/interfaces/skatenotes/Anexo";
import ModalPlayer from "@/components/skatenotes/MediaPlayer";

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

  const [fotos, setFotos] = useState<Anexo[]>([]);
  const [videos, setVideos] = useState<Anexo[]>([]);
  const [modalPlayerVisivel, setModalPlayerVisivel] = useState(false);
  const [midiaSelecionada, setMidiaSelecionada] = useState<Anexo | null>(null);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  
  // Estados para loading
  const [adicionandoMidia, setAdicionandoMidia] = useState(false);
  const [excluindoMidias, setExcluindoMidias] = useState(false);
  const [midiaAdicionada, setMidiaAdicionada] = useState(false);
  const [midiaExcluida, setMidiaExcluida] = useState(false);

  const handleAbrirPlayer = (item: Anexo) => {
    if (selecionados.size > 0) {
      toggleSelecionado(item._id);
      return;
    }
    setModalPlayerVisivel(true);
    setMidiaSelecionada(item);
  };

  const toggleSelecionado = (id: string) => {
    setSelecionados((prev) => {
      const novo = new Set();
      if (!prev.has(id)) {
        novo.add(id);
      }
      return novo;
    });
  };

  const limparSelecao = () => {
    setSelecionados(new Set());
  };

  async function carregarManobra(manobraId: string) {
    const manobraData = await manobraUtils.buscarManobraPorId(manobraId);
    if (!manobraData) return;

    setManobra(manobraData);

    const anexosArray = Array.isArray(manobraData.anexos)
      ? manobraData.anexos
      : [];
    const { fotos: fotosSeparadas, videos: videosSeparados } =
      separarAnexos(anexosArray);

    setFotos(fotosSeparadas);
    setVideos(videosSeparados);

    const obsResult = await carregarObservacoes(manobraId, manobraData);
    setTexto(obsResult.texto);
    setStatusSelecionado(obsResult.status);
    setStatusSync(
      ["ok", "pendente", "erro"].includes(obsResult.sync)
        ? (obsResult.sync as "ok" | "pendente" | "erro")
        : "erro"
    );
  }

  useFocusEffect(
    useCallback(() => {
      carregarManobra(manobraId.toString());
      limparSelecao();
    }, [])
  );

  // Limpar mensagens de sucesso após alguns segundos
  useEffect(() => {
    if (midiaAdicionada) {
      const timer = setTimeout(() => setMidiaAdicionada(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [midiaAdicionada]);

  useEffect(() => {
    if (midiaExcluida) {
      const timer = setTimeout(() => setMidiaExcluida(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [midiaExcluida]);

  const handleEdit = async (id: string, novoNome: string) => {
    try {
      await manobraUtils.editarManobraHelper(id, novoNome);
      carregarManobra(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAtualizarStatus = async (id: string, status: string) => {
    try {
      await manobraUtils.atualizarStatusManobra(id, status);
      carregarManobra(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await manobraUtils.deletarManobraHelper(id);
      router.back();
    } catch (err) {
      console.error(err);
    }
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

  const handleAddMedia = async () => {
    if (!abaSelecionada) {
      alert("Selecione 'Fotos' ou 'Vídeos' antes de adicionar mídia");
      return;
    }

    setAdicionandoMidia(true);
    
    try {
      const anexo = await selecionarMidia(abaSelecionada);
      if (!anexo) {
        setAdicionandoMidia(false);
        return;
      }

      await salvarAnexo(manobraId.toString(), anexo);
      setMidiaAdicionada(true);
      carregarManobra(manobraId.toString());
      limparSelecao();
    } catch (error) {
      console.error("Erro ao adicionar mídia:", error);
      alert("Erro ao processar a mídia.");
    } finally {
      setAdicionandoMidia(false);
    }
  };

  const handleRemoveSelecionados = async () => {
    setExcluindoMidias(true);
    
    try {
      for (let id of selecionados) {
        await removerAnexo(manobraId.toString(), id);
      }
      setMidiaExcluida(true);
      limparSelecao();
      carregarManobra(manobraId.toString());
    } catch (error) {
      console.error("Erro ao remover mídia:", error);
      alert("Erro ao remover as mídias.");
    } finally {
      setExcluindoMidias(false);
    }
  };

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

      {/* STATUS */}
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

      {/* AÇÕES */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.botao,
            abaSelecionada === "fotos" && styles.botaoAtivo,
          ]}
          onPress={() => {
            setAbaSelecionada("fotos");
            limparSelecao();
          }}
        >
          <MaterialCommunityIcons name="camera" size={20} color={cores.texto} />
          <Text style={styles.botaoTexto}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.botao,
            abaSelecionada === "videos" && styles.botaoAtivo,
          ]}
          onPress={() => {
            setAbaSelecionada("videos");
            limparSelecao();
          }}
        >
          <MaterialCommunityIcons name="video" size={20} color={cores.texto} />
          <Text style={styles.botaoTexto}>Vídeos</Text>
        </TouchableOpacity>
      </View>

      {/* MÍDIA */}
      <View style={styles.mediaSection}>
        {/* Mensagens de sucesso */}
        {midiaAdicionada && (
          <View style={styles.mensagemSucesso}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.mensagemSucessoTexto}>Mídia adicionada com sucesso!</Text>
          </View>
        )}
        
        {midiaExcluida && (
          <View style={styles.mensagemSucesso}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.mensagemSucessoTexto}>Mídia excluída com sucesso!</Text>
          </View>
        )}

        {selecionados.size > 0 && (
          <View style={styles.barraExclusao}>
            <Text style={styles.barraExclusaoTexto}>
              {selecionados.size} mídia selecionada
            </Text>
            <TouchableOpacity
              style={styles.botaoExcluirGlobal}
              onPress={handleRemoveSelecionados}
              disabled={excluindoMidias}
            >
              {excluindoMidias ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                  <Text style={styles.botaoExcluirTexto}>Excluir</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {abaSelecionada === "fotos" && (
          <>
            {fotos.length > 0 ? (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {fotos.map((foto) => (
                  <TouchableOpacity
                    key={foto._id}
                    onPress={() => handleAbrirPlayer(foto)}
                    onLongPress={() => toggleSelecionado(foto._id)}
                    style={[
                      styles.cardContainer,
                      selecionados.has(foto._id) && styles.cardSelecionado,
                    ]}
                  >
                    <Image
                      source={{ uri: foto.serverPath }}
                      style={styles.card}
                      resizeMode="cover"
                    />
                    {selecionados.has(foto._id) && (
                      <View style={styles.overlaySelecionado}>
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={24}
                          color="#4CAF50"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}

                <TouchableOpacity 
                  style={[styles.card, styles.cardAdicionar]} 
                  onPress={handleAddMedia}
                  disabled={adicionandoMidia}
                >
                  {adicionandoMidia ? (
                    <ActivityIndicator size="small" color={cores.textoSecundario} />
                  ) : (
                    <MaterialCommunityIcons
                      name="plus"
                      size={32}
                      color={cores.textoSecundario}
                    />
                  )}
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <View style={styles.mediaVaziaContainer}>
                <Text style={styles.mediaVaziaTexto}>
                  Nenhuma foto adicionada ainda 📷
                </Text>
                <TouchableOpacity
                  style={styles.botaoAdicionarMedia}
                  onPress={handleAddMedia}
                  disabled={adicionandoMidia}
                >
                  {adicionandoMidia ? (
                    <ActivityIndicator size="small" color={cores.textoSecundario} />
                  ) : (
                    <MaterialCommunityIcons
                      name="plus"
                      size={32}
                      color={cores.textoSecundario}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {abaSelecionada === "videos" && (
          <>
            {videos.length > 0 ? (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {videos.map((video) => (
                  <TouchableOpacity
                    key={video._id}
                    onPress={() => handleAbrirPlayer(video)}
                    onLongPress={() => toggleSelecionado(video._id)}
                    style={[
                      styles.cardContainer,
                      selecionados.has(video._id) && styles.cardSelecionado,
                    ]}
                  >
                    <View style={[styles.card, styles.videoCard]}>
                      <MaterialCommunityIcons
                        name="play-circle"
                        size={32}
                        color={cores.texto}
                      />
                      <Text style={styles.videoText}>
                        Vídeo
                      </Text>
                    </View>
                    {selecionados.has(video._id) && (
                      <View style={styles.overlaySelecionado}>
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={24}
                          color="#4CAF50"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.card, styles.cardAdicionar]}
                  onPress={handleAddMedia}
                  disabled={adicionandoMidia}
                >
                  {adicionandoMidia ? (
                    <ActivityIndicator size="small" color={cores.textoSecundario} />
                  ) : (
                    <MaterialCommunityIcons
                      name="plus"
                      size={32}
                      color={cores.textoSecundario}
                    />
                  )}
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <View style={styles.mediaVaziaContainer}>
                <Text style={styles.mediaVaziaTexto}>
                  Nenhum vídeo adicionado ainda 🎬
                </Text>
                <TouchableOpacity
                  style={styles.botaoAdicionarMedia}
                  onPress={handleAddMedia}
                  disabled={adicionandoMidia}
                >
                  {adicionandoMidia ? (
                    <ActivityIndicator size="small" color={cores.textoSecundario} />
                  ) : (
                    <MaterialCommunityIcons
                      name="plus"
                      size={32}
                      color={cores.textoSecundario}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {!abaSelecionada && (
          <Text style={styles.placeholder}>
            Selecione "Fotos" ou "Vídeos" para visualizar as mídias
          </Text>
        )}
      </View>

      {/* Modal */}
      <ModalPlayer
        visivel={modalPlayerVisivel}
        midia={midiaSelecionada}
        onFechar={() => setModalPlayerVisivel(false)}
      />

      {/* EDITOR */}
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
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  // Mensagens de sucesso
  mensagemSucesso: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  mensagemSucessoTexto: {
    color: '#4CAF50',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  barraExclusao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: cores.destaque,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  barraExclusaoTexto: {
    color: cores.texto,
    fontWeight: "bold",
    fontSize: 14,
  },
  botaoExcluirGlobal: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    justifyContent: 'center',
  },
  botaoExcluirTexto: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },
  cardContainer: {
    position: "relative",
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: cores.fundoClaro,
    alignItems: "center",
    justifyContent: "center",
  },
  cardAdicionar: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderStyle: "dashed",
  },
  cardSelecionado: {
    borderWidth: 3,
    borderColor: cores.primario,
  },
  overlaySelecionado: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    padding: 2,
  },
  videoCard: {
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginTop: 4,
  },
  mediaVaziaContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    paddingVertical: 20,
  },
  mediaVaziaTexto: {
    color: cores.textoSecundario,
    fontSize: 14,
    textAlign: "left",
  },
  botaoAdicionarMedia: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: cores.fundoClaro,
    justifyContent: "center",
    alignItems: "center",
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