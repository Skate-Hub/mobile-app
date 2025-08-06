import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="cadastro"
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen name="manobras_obstaculo"/>
      <Stack.Screen name="observacoes" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
