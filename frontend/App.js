// frontend/App.js
import React, { useEffect } from 'react'; // 1. IMPORTAÇÃO CORRETA do React e useEffect
import { Text, View, StyleSheet } from "react-native";
import * as Updates from "expo-updates";
import { useFonts } from 'expo-font';
import HomeScreen from './screens/Home'; // Certifique-se que o caminho está correto

// 2. O componente App começa AQUI
const App = () => {
  // 3. useFonts é chamado DENTRO do componente App, no nível superior
  const [fontsLoaded, fontError] = useFonts({
    'Roboto_Mono_400Regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
    'Roboto_Mono_700Bold': require('./assets/fonts/RobotoMono-Bold.ttf'),
  });

  // 4. useEffect para checkUpdate também DENTRO do componente App
  useEffect(() => {
    async function checkUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // Considerar se reloadAsync() é realmente necessário aqui ou se pode causar loops
          // await Updates.reloadAsync();
          console.log("Update fetched, will be applied on next app reload/restart.");
        }
      } catch (e) {
        console.log("Erro ao buscar update OTA:", e);
      }
    }
    checkUpdate();
  }, []); // Array de dependências vazio, roda uma vez após a montagem

  // 5. Lógica para lidar com o carregamento e erros das fontes ANTES de renderizar HomeScreen
  if (fontError) {
    console.error("Erro ao carregar fontes (useFonts):", fontError);
    return (
      <View style={styles.container}>
        <Text>Ocorreu um erro ao carregar as fontes.</Text>
        <Text>{fontError.message}</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    // Se as fontes ainda não foram carregadas (e não houve erro fatal),
    // você pode retornar null ou um componente de tela de carregamento (Splash Screen).
    return null; // Ou <ActivityIndicator /> ou uma tela de Splash
  }

  // Se as fontes foram carregadas com sucesso e sem erro crítico, renderize o HomeScreen
  return (
    <HomeScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  text: { // Este estilo não está sendo usado ativamente pelo App.js agora
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;