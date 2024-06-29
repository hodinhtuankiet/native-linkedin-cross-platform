import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import { WHITELIST_DOMAINS } from "../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ChatMessage from "./ChatMessage";
import Chatbot from "../app/(tab)/home/Chatbot";
const UserChat = ({ item }) => {
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // get userId & setUserId through AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${WHITELIST_DOMAINS}/messages/${userId}/${item._id}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messages", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const getLastMessage = () => {
    // get messageType is Text
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );

    const n = userMessages.length;
    // return messages cuối cùng
    return userMessages[n - 1];
  };

  const lastMessage = getLastMessage();

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const router = useRouter();

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate("ChatMessage", {
            recepientId: item._id,
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderWidth: 0.7,
          borderColor: "#D0D0D0",
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item?.profileImage }}
        />

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
          {lastMessage && (
            <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
              {lastMessage?.message}
            </Text>
          )}
        </View>

        <View>
          <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
            {lastMessage && formatTime(lastMessage?.timeStamp)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
