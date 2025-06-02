import { StyleSheet, Platform, StatusBar } from "react-native";

const ManobraStyles = StyleSheet.create({
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
    width: "40%",
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    height: 40,
  },
  menuButton: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    height: 40,
    width: "100%",
    justifyContent: "center",
  },

  menuButtonLabel: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  optionbox: {
    backgroundColor: "#f5f5f5",
    borderColor: "#333"
  },
  menuItemTitle: {
    color: "#000",
    fontWeight: "500",
  },
});

export default ManobraStyles;
