import Manobra from "@/interfaces/skatenotes/Manobras";
import {
  atualizarStatus,
  buscarTodasManobras,
} from "@/service/skatenotes/manobras";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
import { coresDark as cores } from "@/temas/cores";
import TabHeader from "@/components/skatenotes/tabHeader";
import {
  salvarHorarioFinalizacao,
  carregarHorarioFinalizacao,
  limparHorarioFinalizacao,
  salvarRelatorioTreino,
  carregarRelatorioTreino,
  limparRelatorioTreino,
} from "@/service/asyncStorage";

const PracticeScreen = () => {
  const [manobras, setManobras] = useState<Manobra[]>([]);
  const [treino, setTreino] = useState<{ [key: string]: Manobra[] } | null>(
    null
  );
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({});
  const [treinoFinalizado, setTreinoFinalizado] = useState(false);
  const [relatorio, setRelatorio] = useState<string | null>(null);

  const [practiceConfigs] = useState({
    plano: "padrao",
    secaoAprimorar: { rotatividade: "3d", quantManobras: 3 },
    secaoAprender: { rotatividade: null, quantManobras: 1 },
    secaoNaBase: { rotatividade: "1d", quantManobras: 3 },
  });

  // -------------------- CARREGAR MANOBRAS --------------------
  async function carregarManobras() {
    const result = await buscarTodasManobras();
    if (!result.success) {
      console.error("Erro ao buscar manobras do usuário:", result.error);
      return;
    }
    setManobras(result.data || []);
  }

  // -------------------- MONTA TREINO --------------------
  const montarTreino = useCallback(() => {
    if (!manobras || manobras.length === 0) {
      setTreino(null);
      return;
    }
    const treinoMontado: { [key: string]: Manobra[] } = {
      naBase: manobras
        .filter((m) => m.status === "Na Base")
        .slice(0, practiceConfigs.secaoNaBase.quantManobras),
      aprimorar: manobras
        .filter((m) => m.status === "Aprimorar")
        .slice(0, practiceConfigs.secaoAprimorar.quantManobras),
      aprender: manobras
        .filter((m) => m.status === "Aprender")
        .slice(0, practiceConfigs.secaoAprender.quantManobras),
    };
    setTreino(treinoMontado);
  }, [manobras, practiceConfigs]);

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
        montarTreino();
      } else {
        setTreinoFinalizado(true);
        setRelatorio(relatorioSalvo);
      }
    }
  }, [montarTreino]);

  useFocusEffect(
    useCallback(() => {
      carregarManobras();
      verificarTreinoFinalizado();
    }, [verificarTreinoFinalizado])
  );

  useEffect(() => {
    montarTreino();
  }, [manobras, montarTreino]);

  // -------------------- TOGGLE CHECK --------------------
  const toggleCheck = (id: string, secao: string) => {
    setChecked((prev) => {
      const novoValor = !prev[id];

      if (secao === "Aprender" && novoValor) {
        const manobra = treino?.aprender.find((m) => m._id === id);
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
      await carregarManobras();
      setChecked({});
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // -------------------- RENDER SEÇÃO --------------------
  const renderSecao = (titulo: string, lista: Manobra[] = []) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{titulo}</Text>
      {lista.length > 0 ? (
        lista.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.itemContainer}
            onPress={() => toggleCheck(item._id, titulo)}
          >
            <View
              style={[
                styles.checkbox,
                checked[item._id] && styles.checkboxSelecionado,
              ]}
            >
              {checked[item._id] && (
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={cores.branco}
                />
              )}
            </View>
            <Text style={styles.itemText}>{item.nome}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhuma manobra nessa seção</Text>
      )}
    </View>
  );

  // -------------------- FINALIZAR TREINO --------------------
  const finalizarTreino = async () => {
    if (!treino) return;

    const secaoAprimorarMarcadas = treino.aprimorar.filter(
      (m) => checked[m._id]
    );
    const secaoAprenderMarcadas = treino.aprender.filter((m) => checked[m._id]);
    const secaoNaBaseMarcadas = treino.naBase.filter((m) => checked[m._id]);

    const totalMarcadas =
      secaoAprimorarMarcadas.length +
      secaoAprenderMarcadas.length +
      secaoNaBaseMarcadas.length;

    let mensagem = `✅ Treino Finalizado!\n\nTotal de manobras praticadas: ${totalMarcadas}\n\n`;

    if (secaoAprenderMarcadas.length)
      mensagem += `Aprender (${
        secaoAprenderMarcadas.length
      }): ${secaoAprenderMarcadas.map((m) => m.nome).join(", ")}\n`;

    if (secaoAprimorarMarcadas.length)
      mensagem += `Aprimorar (${
        secaoAprimorarMarcadas.length
      }): ${secaoAprimorarMarcadas.map((m) => m.nome).join(", ")}\n`;

    if (secaoNaBaseMarcadas.length)
      mensagem += `Na Base (${
        secaoNaBaseMarcadas.length
      }): ${secaoNaBaseMarcadas.map((m) => m.nome).join(", ")}\n`;

    mensagem += `\nVolte amanhã para um novo treino!`;

    setChecked({});
    setTreinoFinalizado(true);
    setRelatorio(mensagem);

    await salvarHorarioFinalizacao(new Date());
    await salvarRelatorioTreino(mensagem);
  };

  const handleLimpezaTeste = async () => {
    await limparHorarioFinalizacao();
    await limparRelatorioTreino();
    
    setTreinoFinalizado(false)
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
          <>
            {treino && (
              <>
                {renderSecao("Aprimorar", treino.aprimorar)}
                {renderSecao("Aprender", treino.aprender)}
                {renderSecao("Na Base", treino.naBase)}
              </>
            )}
            <TouchableOpacity
              style={styles.finalizarBtn}
              onPress={finalizarTreino}
            >
              <Text style={styles.finalizarBtnText}>Finalizar Treino</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <View style={styles.relatorioContainer}>
              <Text style={styles.relatorioText}>{relatorio}</Text>
            </View>
            {/*botao para teste - limpa os dados de relatorio */}
            <TouchableOpacity style={styles.finalizarBtn} onPress={handleLimpezaTeste}>
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
