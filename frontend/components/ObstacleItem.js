// components/ObstacleItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ObstaculoCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ObstaculoCard;