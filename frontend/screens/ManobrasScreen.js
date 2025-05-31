import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import ManobraCard from "../components/cards/ManobraItem";
import { buscarManobras } from "../services/ManobrasService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/estrutura/Header";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

const ManobrasScreen = () => {
  const navigation = useNavigation();
  const [manobras, setManobras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarManobras = async () => {
      try {
        const data = await buscarManobras();
        if (data) {
          setManobras(data);
        }
      } catch (error) {
        console.error("Erro ao carregar manobras:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarManobras();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.filterSection}>
        <Text style={styles.filterSectionText}>
          Manobras cadastradas: {manobras.length}
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            mode="outlined"
            placeholder="Pesquisar"
            left={<TextInput.Icon icon="magnify" />}
            style={styles.searchInput}
            placeholderTextColor="#999"
            theme={{ colors: { background: "#f5f5f5" } }}
          />
        </View>
      </View>

      {manobras.length > 0 ? (
        <FlatList
          data={manobras}
          renderItem={({ item }) => <ManobraCard item={item} />}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require("../assets/icons/placeholder_skater.png")}
          />
          <Text style={styles.emptyText}>
            Adicione Uma Manobra a Um Obstaculo
          </Text>
          <TouchableOpacity
            style={{ marginTop: 40 }}
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialCommunityIcons name="plus-circle" size={60} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  filterSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  filterSectionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
    searchContainer: {
 
    display: "flex",
    width: "40%"
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    height: 40,
  },
});

export default ManobrasScreen;
