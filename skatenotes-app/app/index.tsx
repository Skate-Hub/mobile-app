import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login.</Text>
      <TouchableOpacity>
        <Link href={"/(tabs)/obstaculos"}>ir para obstaculos</Link>
        
        <Link href={"/cadastro"}>ir para cadastro</Link>
        
        <Link href={"/configurações"}>ir para config</Link>
        
        <Link href={"/manobras_obstaculo"}>ir para manobras_obstaculo</Link>
        
        <Link href={"/observacoes"}>ir para observacoes</Link>
      </TouchableOpacity>
    </View>
  );
}
