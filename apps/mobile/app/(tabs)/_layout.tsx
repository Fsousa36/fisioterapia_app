import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#0f766e"
      }}
    >
      <Tabs.Screen name="library" options={{ title: "Biblioteca" }} />
      <Tabs.Screen name="atlas" options={{ title: "Atlas" }} />
      <Tabs.Screen name="tracks" options={{ title: "Trilhas" }} />
      <Tabs.Screen name="progress" options={{ title: "Progresso" }} />
      <Tabs.Screen name="premium" options={{ title: "Premium" }} />
    </Tabs>
  );
}
