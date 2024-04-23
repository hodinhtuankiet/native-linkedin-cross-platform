import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
// import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import EmojiSelector from "react-native-emoji-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { WHITELIST_DOMAINS } from "../../../utils/constant";

const ChatMessage = () => {
  const IP_ADDRESS = "http://192.168.1.11:3000";
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  // Message này nằm trong textInput
  const [message, setMessage] = useState("");
  const route = useRoute();
  const { recepientId } = route.params;
  const [userId, setUserId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  // các message của 2 user chat together
  const [messages, setMessages] = useState([]);
  // fetch userId & setUserId
  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await axios.get(
          `${WHITELIST_DOMAINS}/profile/${recepientId}`
        );
        const userData = response.data.user;
        setRecepientData(userData);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };
    fetchRecepientData();
  }, [recepientId]);
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
        `${WHITELIST_DOMAINS}/messages/${userId}/${recepientId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };
  // handle send image & text
  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        // messageType & messageText matches data Model Message
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }
      const response = await fetch(`${WHITELIST_DOMAINS}/messages`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // sau khi post text or image thì set lại rỗng
        setMessage("");
        setSelectedImage("");
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };
  console.log("all message", messages);
  // UI Header Chat And Icon Navigation Back
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
          {recepientData && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: recepientData.profileImage }}
              />
              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {recepientData.name}
              </Text>
            </View>
          )}
        </View>
      ),
    });
    //  Mỗi khi một trong các giá trị
    // trong mảng này thay đổi, hàm trong useLayoutEffect sẽ được thực thi lại
  }, [navigation, recepientData]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView></ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 7,
          }}
          placeholder="Type Your message..."
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo
            // onPress={pickImage}
            name="camera"
            size={24}
            color="gray"
          />
          <Feather name="mic" size={24} color="gray" />
        </View>
        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
      </View>
      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
