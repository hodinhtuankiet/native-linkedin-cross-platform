import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "./screens/ChatMessagesScreen"; // Import your Messages screen component

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}
