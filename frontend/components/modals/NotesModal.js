import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  atualizarObservacoes,
  buscarManobra,
  atualizarStatusManobra,
} from "../../services/ManobrasService";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/modals/NotesStyles";

const NotesModal = ({ idManobra, onClose }) => {
  const [manobra, setManobra] = useState({});
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [anexos, setAnexos] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState("");

  useEffect(() => {
    const carregarManobra = async () => {
      try {
        const data = await buscarManobra(idManobra);
        setManobra(data);
        setObservacoes(data.observacoes || "");
        setAnexos(data.anexos || []);
        setStatusSelecionado(data.status || "aprender");
      } catch (error) {
        console.error("Erro ao carregar manobra:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarManobra();
  }, [idManobra]);

  const removerAnexo = (id) => {
    setAnexos(anexos.filter((anexo) => anexo.id !== id));
  };

  const salvarObservacoes = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await atualizarObservacoes(idManobra, observacoes);
      setManobra((prev) => ({ ...prev, observacoes }));
    } catch (error) {
      console.error("Erro ao salvar observações:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAtualizarStatus = async (novoStatus) => {
    if (statusSelecionado === novoStatus) return;

    try {
      await atualizarStatusManobra(novoStatus, idManobra);
      setStatusSelecionado(novoStatus);
      setManobra((prev) => ({ ...prev, status: novoStatus }));
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{manobra.nome || "Sem nome"}</Text>

          <TouchableOpacity
            onPress={salvarObservacoes}
            style={styles.saveButton}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.observacoesInput}
          multiline
          value={observacoes}
          onChangeText={setObservacoes}
          placeholder="Digite suas observações aqui..."
          placeholderTextColor="#999"
          textAlignVertical="top"
        />

        {/* Seção de Status da Manobra */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Status</Text>
          <View style={styles.statusOptions}>
            {["aprender", "aprimorar", "na base"].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  statusSelecionado === status && styles.statusButtonSelected,
                ]}
                onPress={() => handleAtualizarStatus(status)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    statusSelecionado === status && styles.statusButtonTextSelected,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Seção de Anexos */}
        <View style={styles.anexosContainer}>
          <View style={styles.anexosHeader}>
            <Text style={styles.anexosTitle}>Anexos</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {anexos.length > 0 ? (
            <View style={styles.anexosList}>
              {anexos.map((anexo) => (
                <View key={anexo._id} style={styles.anexoItem}>
                  <Ionicons
                    name={anexo.tipo === "imagem" ? "image" : "document"}
                    size={20}
                    color="#555"
                  />
                  <Text>{anexo.url}</Text>
                  <Text style={styles.anexoNome} numberOfLines={1}>
                    {anexo.nomeOriginal}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removerAnexo(anexo.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="close" size={18} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.anexosEmpty}>Nenhum anexo adicionado</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NotesModal;
