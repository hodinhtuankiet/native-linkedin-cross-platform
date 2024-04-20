import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatMessage"
        options={{
          headerShown: true,
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </Stack>
  );
}
