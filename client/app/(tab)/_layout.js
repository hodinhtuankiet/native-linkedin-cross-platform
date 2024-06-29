import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import "react-native-reanimated";
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(routeName);
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
          tabBarStyle: { display: getTabBarVisibility(route), height: 66 }, // Adjust the height as per your requirement
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={26} color="black" />
            ) : (
              <AntDesign name="home" size={26} color="black" />
            ),
        })}
      />
      <Tabs.Screen
        name="network"
        options={({ route }) => ({
          tabBarLabelStyle: { color: "#0984e3" },
          headerShown: false,
          tabBarStyle: { display: getTabBarVisibility(route), height: 66 },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="people" size={26} color="black" />
            ) : (
              <Ionicons name="people-outline" size={26} color="black" />
            ),
        })}
      />
      <Tabs.Screen
        name="post"
        options={({ route }) => ({
          tabBarLabelStyle: { color: "#0984e3" },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="plussquare" size={26} color="black" />
            ) : (
              <AntDesign name="plussquareo" size={26} color="black" />
            ),
        })}
      />
      <Tabs.Screen
        name="chat"
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route), height: 66 }, // Adjust the height as per your requirement
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarLabelStyle: { color: "#0984e3" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbox" size={26} color="black" />
            ) : (
              <Ionicons name="chatbox-outline" size={26} color="black" />
            ),
        })}
      />
      <Tabs.Screen
        name="profile/index"
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route), height: 66 }, // Adjust the height as per your requirement
          tabBarShowLabel: false,
          // tabBarStyle: { display: "none" },
          tabBarLabelStyle: { color: "#0984e3" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={26} color="black" />
            ) : (
              <AntDesign name="user" size={26} color="black" />
            ),
        })}
      />
    </Tabs>
  );
}
