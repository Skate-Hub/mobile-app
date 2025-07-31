// App.js

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ManobrasScreen from "./screens/ManobrasScreen";
import ObstaculoScreen from "./screens/ObstaculoScreen";
import NotesScreen from "./components/modals/NotesModal";
import ConfiguracoesScreen from "./screens/ConfiguracoesScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator principal (com rodapé)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Obstaculos") iconName = "cube-outline";
          else if (route.name === "Manobras") iconName = "skateboard";
          else if (route.name === "Configuracoes") iconName = "cog";

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Obstaculos" component={HomeStack} />
      <Tab.Screen name="Manobras" component={ManobrasScreen} />
      <Tab.Screen name="Configuracoes" component={ConfiguracoesScreen} />
    </Tab.Navigator>
  );
}

// Stack das telas da Home
function HomeStack() {
  const HomeStackNav = createNativeStackNavigator();
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStackNav.Screen
        name="Obstaculo"
        component={ObstaculoScreen}
        options={{ headerShown: false }}
      />
      <HomeStackNav.Screen
        name="Notes"
        component={NotesScreen}
        options={{ headerShown: false }}
      />
    </HomeStackNav.Navigator>
  );
}

// Stack principal
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
