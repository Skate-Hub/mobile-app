import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { atualizarObservacoes, buscarManobra } from "../../services/ManobrasService";
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles/modals/NotesStyles";

const NotesModal = ({ idManobra, onClose }) => {
  const [manobra, setManobra] = useState({});
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [anexos, setAnexos] = useState([]); // Estado para os anexos

  useEffect(() => {
    const carregarManobra = async () => {
      try {
        const data = await buscarManobra(idManobra);
        setManobra(data);
        setObservacoes(data.observacoes || "");
        // Simulando anexos existentes - substitua pela sua lógica real
        setAnexos(data.anexos || []);
      } catch (error) {
        console.error("Erro ao carregar manobra:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarManobra();
  }, [idManobra]);

  // Função para adicionar um novo anexo (simulado)
  const adicionarAnexo = () => {
    // Aqui você implementaria a lógica real para adicionar anexos
    // Pode ser com ImagePicker, DocumentPicker, ou câmera
    const novoAnexo = {
      id: Date.now().toString(),
      nome: `Anexo_${anexos.length + 1}.jpg`,
      tipo: 'imagem',
      data: new Date().toISOString()
    };
    setAnexos([...anexos, novoAnexo]);
  };

  // Função para remover um anexo
  const removerAnexo = (id) => {
    setAnexos(anexos.filter(anexo => anexo.id !== id));
  };

  const salvarObservacoes = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const manobraAtualizada = {
        ...manobra,
        observacoes: observacoes,
        anexos: anexos // Incluindo anexos no salvamento
      };
      
      await atualizarObservacoes(idManobra, observacoes, anexos);
      setManobra(manobraAtualizada);
    } catch (error) {
      console.error("Erro ao salvar observações:", error);
    } finally {
      setIsSaving(false);
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>{manobra.nome || 'Sem nome'}</Text>
          
          <TouchableOpacity 
            onPress={salvarObservacoes} 
            style={styles.saveButton}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Salvando...' : 'Salvar'}
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
        
        {/* Seção de Anexos */}
        <View style={styles.anexosContainer}>
          <View style={styles.anexosHeader}>
            <Text style={styles.anexosTitle}>Anexos</Text>
            <TouchableOpacity onPress={adicionarAnexo} style={styles.addButton}>
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
          
          {anexos.length > 0 ? (
            <View style={styles.anexosList}>
              {anexos.map(anexo => (
                <View key={anexo.id} style={styles.anexoItem}>
                  <Ionicons 
                    name={anexo.tipo === 'imagem' ? 'image' : 'document'} 
                    size={20} 
                    color="#555" 
                  />
                  <Text style={styles.anexoNome} numberOfLines={1}>
                    {anexo.nome}
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