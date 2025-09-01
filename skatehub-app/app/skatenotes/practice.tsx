import { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { coresDark as cores } from "@/temas/cores";
import TabHeader from "@/components/skatenotes/tabHeader";
import { buscarTreino, atualizarStatus } from "@/service/skatenotes/treinos";
import {
  salvarHorarioFinalizacao,
  carregarHorarioFinalizacao,
  limparHorarioFinalizacao,
  salvarRelatorioTreino,
  carregarRelatorioTreino,
  limparRelatorioTreino,
} from "@/service/asyncStorage";

import Treino, { SecaoTreino } from "@/interfaces/skatenotes/Treino";
import Manobra from "@/interfaces/skatenotes/Manobras";

const PracticeScreen = () => {
  const [treino, setTreino] = useState<Treino | null>(null);
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({});
  const [treinoFinalizado, setTreinoFinalizado] = useState(false);
  const [relatorio, setRelatorio] = useState<string | null>(null);

  // -------------------- CARREGAR TREINO --------------------
  const carregarTreinoAPI = useCallback(async () => {
    try {
      const result = await buscarTreino();
      if (result.success) {
        setTreino(result.data || null);
        console.log(treino)
      }
    } catch (error) {
      console.error("Erro ao carregar treino:", error);
    }
  }, []);

  // -------------------- VERIFICA TREINO FINALIZADO --------------------
  const verificarTreinoFinalizado = useCallback(async () => {
    const horaFinalizacao = await carregarHorarioFinalizacao();
    const relatorioSalvo = await carregarRelatorioTreino();

    if (horaFinalizacao && relatorioSalvo) {
      const agora = new Date();
      const proximoDia = new Date(horaFinalizacao);
      proximoDia.setDate(proximoDia.getDate() + 1);
      proximoDia.setHours(0, 0, 0, 0);

      if (agora >= proximoDia) {
        // Treino expirou
        setTreinoFinalizado(false);
        setRelatorio(null);
        setChecked({});
        await limparHorarioFinalizacao();
        await limparRelatorioTreino();
        carregarTreinoAPI();
      } else {
        setTreinoFinalizado(true);
        setRelatorio(relatorioSalvo);
      }
    } else {

      carregarTreinoAPI();
    }
  }, [carregarTreinoAPI]);

  useFocusEffect(
    useCallback(() => {
      verificarTreinoFinalizado();
    }, [verificarTreinoFinalizado])
  );

  // -------------------- TOGGLE CHECK --------------------
  const toggleCheck = (id: string, secao: keyof Treino) => {
    setChecked((prev) => {
      const novoValor = !prev[id];

      if (secao === "aprender" && novoValor) {
        const manobra = treino?.aprender.manobras.find(
          (m) => (m as Manobra)._id === id
        ) as Manobra;
        if (manobra) {
          Alert.alert(
            "Mover para Aprimorar?",
            `Deseja mover "${manobra.nome}" para Aprimorar?`,
            [
              { text: "Não", style: "cancel" },
              {
                text: "Sim",
                onPress: () => atualizarStatusParaAprimorar(manobra),
              },
            ]
          );
        }
      }

      return { ...prev, [id]: novoValor };
    });
  };

  // -------------------- ATUALIZAR STATUS --------------------
  const atualizarStatusParaAprimorar = async (manobra: Manobra) => {
    try {
      await atualizarStatus(manobra._id, "Aprimorar");
      setChecked({});
      carregarTreinoAPI();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // -------------------- RENDER SEÇÃO --------------------

  const renderSecao = (titulo: string, secao: SecaoTreino) => {
    const lista = secao.manobras as Manobra[];
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{titulo}</Text>
        {lista.length > 0 ? (
          lista.map((item) => (
            <TouchableOpacity
              key={(item as Manobra)._id}
              style={styles.itemContainer}
              onPress={() =>
                toggleCheck(
                  (item as Manobra)._id,
                  titulo.toLowerCase() as keyof Treino
                )
              }
            >
              <View
                style={[
                  styles.checkbox,
                  checked[(item as Manobra)._id] && styles.checkboxSelecionado,
                ]}
              >
                {checked[(item as Manobra)._id] && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color={cores.branco}
                  />
                )}
              </View>
              <Text style={styles.itemText}>{(item as Manobra).nome}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhuma manobra nessa seção</Text>
        )}
      </View>
    );
  };

  // -------------------- FINALIZAR TREINO --------------------
  const finalizarTreino = async () => {
    if (!treino) return;

    const secoes = ["aprimorar", "aprender", "naBase"] as const;
    let totalMarcadas = 0;
    let mensagem = "✅ Treino Finalizado!\n\n";

    secoes.forEach((secao) => {
      const marcadas = (treino[secao].manobras as Manobra[]).filter(
        (m) => checked[m._id]
      );
      if (marcadas.length) {
        mensagem += `${secao.charAt(0).toUpperCase() + secao.slice(1)} (${
          marcadas.length
        }): ${marcadas.map((m) => m.nome).join(", ")}\n`;
        totalMarcadas += marcadas.length;
      }
    });

    mensagem = `Total de manobras praticadas: ${totalMarcadas}\n\n${mensagem}\nVolte amanhã para um novo treino!`;

    setChecked({});
    setTreinoFinalizado(true);
    setRelatorio(mensagem);

    await salvarHorarioFinalizacao(new Date());
    await salvarRelatorioTreino(mensagem);
  };

  const handleLimpezaTeste = async () => {
    await limparHorarioFinalizacao();
    await limparRelatorioTreino();
    setTreinoFinalizado(false);
  };

  return (
    <View style={styles.screen}>
      <TabHeader
        title="Treino do Dia"
        onSettings={() => router.push("/skatenotes/configuracoes")}
      />
      <Text style={styles.subtitle}>
        Marque o que praticou e acompanhe a evolução
      </Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!treinoFinalizado ? (
          treino && (
            <>
              {renderSecao("Aprimorar", treino.aprimorar)}
              {renderSecao("Aprender", treino.aprender)}
              {renderSecao("Na Base", treino.naBase)}
              <TouchableOpacity
                style={styles.finalizarBtn}
                onPress={finalizarTreino}
              >
                <Text style={styles.finalizarBtnText}>Finalizar Treino</Text>
              </TouchableOpacity>
            </>
          )
        ) : (
          <View>
            <View style={styles.relatorioContainer}>
              <Text style={styles.relatorioText}>{relatorio}</Text>
            </View>
            <TouchableOpacity
              style={styles.finalizarBtn}
              onPress={handleLimpezaTeste}
            >
              <Text>Limpar dados de treino finalizado e relatorio</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, paddingHorizontal: 10 },
  scrollContent: { paddingBottom: 40 },
  subtitle: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginBottom: 20,
    marginLeft: 10,
  },
  card: {
    backgroundColor: cores.destaque,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: cores.texto,
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: cores.borda,
  },
  itemText: { color: cores.texto, fontSize: 15, marginLeft: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: cores.primario,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelecionado: {
    backgroundColor: cores.primario,
    borderColor: cores.primario,
  },
  emptyText: {
    color: cores.textoSecundario,
    fontSize: 14,
    textAlign: "center",
    marginVertical: 8,
  },
  relatorioContainer: {
    backgroundColor: cores.destaque,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  relatorioText: { color: cores.texto, fontSize: 15, lineHeight: 22 },
  finalizarBtn: {
    backgroundColor: cores.primario,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  finalizarBtnText: { color: cores.branco, fontWeight: "bold", fontSize: 16 },
});
