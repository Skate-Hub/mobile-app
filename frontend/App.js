import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import ManobrasScreen from "./screens/ManobrasScreen";
import ObstaculoScreen from "./screens/ObstaculoScreen";
import ConfiguraçõesScreen from "./screens/ConfiguracoesScreen";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// stack navigator para as telas da Home
function HomeStack() {
  return (

      <Stack.Navigator>
        <Stack.Screen
          name="HomeStack"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Obstaculo"
          component={ObstaculoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

  );
}

// Componente principal
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Manobras") {
                iconName = "skateboard";
              } else if (route.name === "Configuracoes") {
                iconName = "cog";
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
          })}
          r
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Manobras"
            component={ManobrasScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Configuracoes"
            component={ConfiguraçõesScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
