import { Stack } from "expo-router";
import ChatMessage from "./ChatMessage"; // Import the ChatMessage screen component

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Other screens */}
      <Stack.Screen name="ChatMessage" component={ChatMessage} />
    </Stack>
  );
}
