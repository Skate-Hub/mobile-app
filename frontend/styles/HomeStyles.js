import { StyleSheet, Platform, StatusBar } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listContent: {
    padding: 16,
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
  addButtonContainer: {
    position: "absolute",
    top: 630,
    right: 30,
  },

  modoBanner: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 6,
  },
  modoExcluir: {
    backgroundColor: "#ffdddd", // vermelho claro para exclusão
  },
  modoEditar: {
    backgroundColor: "#ddeeff", // azul claro para edição
  },
  modoTexto: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  cancelarTexto: {
    color: "red",
    fontWeight: "bold",
  },
});

export default HomeStyles;
