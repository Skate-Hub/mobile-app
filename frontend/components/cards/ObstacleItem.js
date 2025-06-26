// components/ObstacleItem.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ObstaculoCard = ({ item, onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Usar o comportamento customizado vindo da HomeScreen
    } else {
      navigation.navigate("Obstaculo", {
        id: item._id,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View>
        <Text style={styles.title}>{item.nome}</Text>
        <Text>manobras adicionadas: {item.manobras.length}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ObstaculoCard;
