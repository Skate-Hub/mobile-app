import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { coresDark } from "@/temas/cores";

interface TabHeaderProps {
  title?: string;
  onAdd?: () => void;
  onSettings?: () => void;
}

export default function TabHeader({ title, onAdd, onSettings }: TabHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        {onAdd && (
          <TouchableOpacity onPress={onAdd} style={styles.iconButton}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        )}
        {onSettings && (
          <TouchableOpacity onPress={onSettings} style={styles.iconButton}>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: coresDark.destaque,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
});
