import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "../components/estrutura/Header";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const NotesScreen = () => {
  const [manobra, setManobra] = useState([]);
  const [observacoes, setObservacoes] = useState([]);

  const route = useRoute();
  const idManobra = route.params.id;

  useEffect(() => {
    const carregarObservacoes = async () => {
      const data = await buscarObservacoes(idManobra);

      
    };

    carregarObservacoes();
  }, []);

  return (
    <View>
      <Header />

      
    </View>
  );
};

export default NotesScreen;
