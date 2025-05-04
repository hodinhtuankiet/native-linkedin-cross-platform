import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../../../components/UserChat"; // Giả sử UserChat được import từ đây
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const IP_ADDRESS = "http://192.168.1.11:3000";
import { Ionicons } from "@expo/vector-icons";
import { WHITELIST_DOMAINS } from "../../../utils/constant";
import { AntDesign } from "@expo/vector-icons";
import Chatbot from "./Chatbot";

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();

  // fetch userid and set userid
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = "660ab96344045a6b2043e92d";
          setUserId(userId);
      
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      acceptedFriendsList();
    }
  }, [userId]);

  // fetch all friends accepted connections
  const acceptedFriendsList = async () => {
    try {
      const response = await axios.get(
        `${WHITELIST_DOMAINS}/connections/${userId}`
      );
      setAcceptedFriends(response.data.connections);
    } catch (error) {
      console.log("error showing the accepted friends", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            marginVertical: 14,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 16,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput placeholder="Search" />
        </Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </ScrollView>

      {/* Thẻ Pressable ở dưới cùng bên phải */}
      <Pressable
        onPress={() => navigation.navigate(Chatbot)}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          gap: 10,
          borderWidth: 0.7,
          borderColor: "#D0D0D0",
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          padding: 10,
          marginBottom: 20, // Điều chỉnh khoảng cách với bên dưới
          marginRight: 20, // Điều chỉnh khoảng cách với bên phải
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: "/assets/gemini.png" }}
        />
      </Pressable>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
