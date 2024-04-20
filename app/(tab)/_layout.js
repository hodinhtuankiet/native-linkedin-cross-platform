import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "./home/index";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);
  if (routeName?.includes("chat") || routeName?.includes("ChatMessage")) {
    return "none";
  }
};

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#0984e3" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        })}
      />
      <Tabs.Screen
        name="network"
        options={{
          tabBarLabel: "Network",
          tabBarLabelStyle: { color: "#0984e3" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="people" size={24} color="black" />
            ) : (
              <Ionicons name="people-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          tabBarLabel: "Post",
          tabBarLabelStyle: { color: "#0984e3" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="plussquare" size={24} color="black" />
            ) : (
              <AntDesign name="plussquareo" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: "Profile",
          tabBarStyle: { display: "none" },
          tabBarLabelStyle: { color: "#0984e3" },
          // headerShown: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="profile" size={24} color="black" />
            ) : (
              <AntDesign name="profile" size={24} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}
