// frontend/screens/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import styles, { colors } from '../styles/HomeStyles'; // Importando os estilos
import ObstacleItem from '../components/ObstacleItem';



const HomeScreen = ({ navigation }) => { // navigation virá do React Navigation
  const [obstacles, setObstacles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    // Define a função de busca aqui dentro ou chame uma definida fora
    const loadObstacles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/obstaculos'); // Atenção a este URL!
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setObstacles(data);
      } catch (e) {
        console.error("Erro ao buscar obstáculos:", e); // Verifique o objeto 'e' completo
        setError(e.message || 'Falha ao carregar obstáculos.');
      } finally {
        setIsLoading(false);
      }
    };

    loadObstacles(); // Chama a função para carregar os dados
  }, []);

  useEffect(() => {
    fetchObstacles();
  }, [fetchObstacles /*, navigation (se usar o listener) */]);

  const handleSelectObstacle = (obstacleId) => {
    console.log('Obstáculo selecionado:', obstacleId);
    // navigation.navigate('ObstacleDetails', { obstacleId }); // Exemplo de navegação
  };

  const handleAddObstacle = () => {
    console.log('Adicionar novo obstáculo');
    // navigation.navigate('AddObstacleScreen'); // Exemplo de navegação
  };

  if (isLoading) {
    return (
      <View style={styles.centeredMessageContainer}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  if (error) {
    return (
        
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity onPress={fetchObstacles} style={{marginTop: 10}}>
            <Text style={{color: colors.textPrimary, textDecorationLine: 'underline'}}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Renderização do Estado Vazio ---
  if (obstacles.length === 0) {
    return (
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SkateNotes</Text>
        </View>
        <View style={styles.emptyStateContainer}>
          {/* <SkaterIllustration style={styles.emptyStateImage} /> */}
          <Image source={require('../assets/icons/placeholder_skater.png')} style={styles.emptyStateImage} />
          <Text style={styles.emptyStateText}>Cadastre o seu primeiro obstaculo</Text>
          <TouchableOpacity style={styles.emptyStateAddButton} onPress={handleAddObstacle}>
            {/* <PlusIcon width={30} height={30} fill={colors.fabColor} /> */}
            <Text style={{fontSize: 30, color: colors.fabColor}}>+</Text>
          </TouchableOpacity>
        </View>
        {/* Tab Bar Simulada */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}><Image source={require('../assets/icons/placeholder_home.png')} style={styles.tabIcon} /><Text style={[styles.tabText, styles.tabTextActive]}>Início</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}><Image source={require('../assets/icons/placeholder_manobras.png')} style={styles.tabIcon} /><Text style={styles.tabText}>Manobras</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}><Image source={require('../assets/icons/placeholder_settings.png')} style={styles.tabIcon} /><Text style={styles.tabText}>Config</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- Renderização da Lista de Obstáculos ---
  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SkateNotes</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Obstaculos:</Text>
        <FlatList
          data={obstacles}
          renderItem={({ item }) => (
            <ObstacleItem
              item={item}
              onPress={() => handleSelectObstacle(item._id)}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
          // ListHeaderComponent={<Text style={styles.sectionTitle}>Obstaculos:</Text>} // Se não quiser dentro do ScrollView
        />
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={handleAddObstacle}>
        {/* <PlusIcon width={24} height={24} fill={colors.fabColor} /> */}
        <Text style={{fontSize: 24, color: colors.fabColor}}>+</Text>
      </TouchableOpacity>
      {/* Tab Bar Simulada */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}><Image source={require('../assets/icons/placeholder_home.png')} style={styles.tabIcon} /><Text style={[styles.tabText, styles.tabTextActive]}>Início</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Image source={require('../assets/icons/placeholder_manobras.png')} style={styles.tabIcon} /><Text style={styles.tabText}>Manobras</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Image source={require('../assets/icons/placeholder_settings.png')} style={styles.tabIcon} /><Text style={styles.tabText}>Config</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;