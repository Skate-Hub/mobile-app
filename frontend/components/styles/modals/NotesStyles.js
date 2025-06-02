import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    marginLeft: 16,
  },
  saveButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  observacoesInput: {
    minHeight: 150,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    color: '#333',
    lineHeight: 24,
  },
  // Novos estilos para a seção de anexos
  anexosContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  anexosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  anexosTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    padding: 4,
  },
  anexosList: {
    marginTop: 8,
  },
  anexoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginBottom: 8,
  },
  anexoNome: {
    flex: 1,
    marginLeft: 10,
    color: '#555',
  },
  removeButton: {
    marginLeft: 10,
    padding: 4,
  },
  anexosEmpty: {
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default styles;