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
      <Stack.Screen
        name="skatenotes"
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen name="hub" />
    </Stack>
  );
}
