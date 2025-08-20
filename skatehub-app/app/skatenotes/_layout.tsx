import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="configuracoes" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="manobras_obstaculo/[obstaculoId]"
        options={{
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="detalhes_manobra/[manobraId]"
        options={{
          animation: "slide_from_left",
        }}
      />
    </Stack>
  );
}
