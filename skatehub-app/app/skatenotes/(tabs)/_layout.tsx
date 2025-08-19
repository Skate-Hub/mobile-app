import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { coresDark } from '@/temas/cores';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: coresDark.primario,
        tabBarInactiveTintColor: coresDark.textoSecundario,
        tabBarStyle: {
          backgroundColor: coresDark.fundoElevado,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: coresDark.sombra,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.8,
          shadowRadius: 8,
          height: 60 + insets.bottom, // adiciona espaço extra
          paddingBottom: insets.bottom, // evita sobreposição
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="obstaculos"
        options={{
          title: "Obstáculos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="cube-outline" 
              size={size} 
              color={color} 
            />
          ),
          tabBarActiveBackgroundColor: coresDark.destaque,
          tabBarInactiveBackgroundColor: coresDark.fundoElevado,
        }}
      />
      <Tabs.Screen
        name="manobras"
        options={{
          title: "Manobras",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="skateboard" 
              size={size} 
              color={color} 
            />
          ),
          tabBarActiveBackgroundColor: coresDark.destaque,
          tabBarInactiveBackgroundColor: coresDark.fundoElevado,
        }}
      />
    </Tabs>
  );
}
