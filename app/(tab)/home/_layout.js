import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen
        name="ChatMessage"
        options={{
          headerShown: true,
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          tabBarShowLabel: true,
          headerTitle: "Đoạn chat",
          // headerShown: true,
          tabBarStyle: { display: "none" },
          // tabBarButton: () => null,
        }}
      />
    </Stack>
  );
}
