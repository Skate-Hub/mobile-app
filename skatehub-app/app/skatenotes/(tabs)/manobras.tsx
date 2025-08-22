import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { coresDark as cores } from "@/temas/cores";
import CardManobra from "@/components/skatenotes/CardManobra";
import TabHeader from "@/components/skatenotes/tabHeader";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { buscarTodasManobras } from "@/service/skatenotes/manobras";
import Manobra from "@/interfaces/skatenotes/Manobras";

export default function Manobras() {
  const router = useRouter();
  const [manobras, setManobras] = useState<Manobra[]>([]);
  const [busca, setBusca] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState<
    "Todos" | Manobra["status"]
  >("Todos");
  const [dropdownAberto, setDropdownAberto] = useState(false);

  async function carregarManobras() {
    const result = await buscarTodasManobras();
    if (!result.success) {
      console.error("Erro ao buscar manobras do usuário:", result.error);
      return;
    }
    setManobras(result.data || []);
  }

  useEffect(() => {
    carregarManobras();
  }, []);

  const filtradas = manobras.filter((m) => {
    const matchBusca = m.nome.toLowerCase().includes(busca.toLowerCase());
    const matchStatus =
      statusSelecionado === "Todos" ? true : m.status === statusSelecionado;
    return matchBusca && matchStatus;
  });

  const opcoesStatus: ("Todos" | Manobra["status"])[] = [
    "Todos",
    "Na Base",
    "Aprimorar",
    "Aprender",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader
        title="Manobras"
        onSettings={() => router.push("../configuracoes")}
      />

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color={cores.textoPlaceholder}
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Buscar manobras..."
            placeholderTextColor={cores.textoPlaceholder}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <View style={{ position: "relative" }}>
          <TouchableOpacity
            style={styles.filtro}
            onPress={() => setDropdownAberto(!dropdownAberto)}
          >
            <Text style={styles.filtroText}>
              {statusSelecionado === "Todos"
                ? "Todos os status"
                : statusSelecionado}
            </Text>
            <Ionicons
              name={dropdownAberto ? "chevron-up" : "chevron-down"}
              size={18}
              color={cores.textoSecundario}
              style={{ marginLeft: 6 }}
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
                    setDropdownAberto(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      opcao === statusSelecionado &&
                        styles.dropdownItemTextAtivo,
                    ]}
                  >
                    {opcao === "Todos" ? "Todos os status" : opcao}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <FlatList
          data={filtradas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CardManobra
              nome={item.nome}
              status={item.status}
              onPress={() => router.push(`../detalhes_manobra/${item._id}`)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitulo}>Nenhuma manobra encontrada</Text>
              <Text style={styles.emptyDescricao}>
                Adicione manobras ou altere os filtros para visualizar.
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.fundoElevado,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: cores.texto,
    padding: 0,
  },
  filtro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: cores.fundoElevado,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  filtroText: {
    color: cores.textoSecundario,
    fontSize: 15,
  },
  dropdown: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: cores.fundoClaro,
    borderRadius: 10,
    zIndex: 20,
    elevation: 6,
    shadowColor: cores.sombra,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownItemText: {
    color: cores.texto,
    fontSize: 15,
  },
  dropdownItemAtivo: {
    backgroundColor: cores.destaque,
  },
  dropdownItemTextAtivo: {
    color: cores.primario,
    fontWeight: "600",
  },
  emptyContainer: {
    marginTop: 60,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  emptyTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: cores.texto,
    marginBottom: 6,
  },
  emptyDescricao: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: "center",
    lineHeight: 20,
  },
});
