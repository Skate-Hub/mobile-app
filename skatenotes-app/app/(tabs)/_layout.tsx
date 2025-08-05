import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="obstaculos"
        options={{
          title: "Obstáculos",
        }}
      />
      <Tabs.Screen
        name="manobras"
        options={{
          title: "Manobras",
        }}
      />
    </Tabs>
  );
}
