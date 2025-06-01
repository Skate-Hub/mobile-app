import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ManobraCard = ({ item }) => {
  const navigation = useNavigation();

  const getStatusConfig = () => {
    switch (item.status) {
      case "aprender":
        return {
          color: "#FFD700",
          icon: "alert-circle-outline",
        };
      case "aprimorar":
        return {
          color: "#1E90FF",
          icon: "trending-up",
        };
      case "na base":
        return {
          color: "#32CD32",
          icon: "check-circle-outline",
        };
      default:
        return {
          color: "#808080",
          icon: "help-circle-outline",
        };
    }
  };

  const { color, icon } = getStatusConfig();

  const handlePress = () => {
    navigation.navigate("Home", {
      screen: "Notes",
      params: { id: item._id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.nome}</Text>
      </View>
      <View style={styles.statusContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={color}
          style={styles.icon}
        />
        <Text style={[styles.statusText, { color }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
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
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 5,
    fontSize: 10,
    fontWeight: "500",
  },
  icon: {
    marginRight: 5,
  },
});

export default ManobraCard;
