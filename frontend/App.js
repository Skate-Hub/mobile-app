import {React, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Updates from "expo-updates";

const App = () => {

  useEffect(() => {
    async function checkUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.log("Erro ao buscar update OTA:", e);
      }
    }

    checkUpdate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tá ligado, tá funcionando!</Text>
      <Text style={styles.text}>Tá ligado, tá atualizando</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;
