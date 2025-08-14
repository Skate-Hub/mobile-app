import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Manobras_Obstaculo() {

  const params = useLocalSearchParams();
  const { obstaculoId } = params

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{obstaculoId}</Text>
    </View>
  );
}
