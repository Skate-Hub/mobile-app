import { StyleSheet, Platform, StatusBar } from "react-native";

const ObstaculoStyles = StyleSheet.create({
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
  backSection: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonContainer: {
    position: "absolute",
    top: 630,
    right: 30,
    
  },
});

export default ObstaculoStyles;
