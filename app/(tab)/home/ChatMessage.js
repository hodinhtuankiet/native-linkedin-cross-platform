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
import EmojiSelector from "react-native-emoji-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { WHITELIST_DOMAINS } from "../../../utils/constant";
import * as ImagePicker from "expo-image-picker";

const ChatMessage = () => {
  const IP_ADDRESS = "http://192.168.1.11:3000";
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [showInputText, setShowInputText] = useState(false);
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
  // fetch profile of recepient (name , email)
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
  // fetch all message between 2 users

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

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };
  handleTextInputPress;
  const handleTextInputPress = () => {
    setShowInputText(!showInputText);
  };
  const fetchMessages = async () => {
    if (userId && recepientId) {
      try {
        const response = await fetch(
          `${WHITELIST_DOMAINS}/messages/${userId}/${recepientId}`
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
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [userId, recepientId]);

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
        // hàm post text or image
        fetchMessages();
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };
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
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#ffbe76" }}>
      <ScrollView>
        {messages.map((item, index) => {
          if (item?.messageType === "text") {
            return (
              // xử lí nếu tin nhắn là của người nhận thì nằm bên trái và ngược lại
              // css màu và font của text
              <Pressable
                key={index}
                style={[
                  // nếu data của messages.senderId === userId là mình thì tin nhắn hiển thị bên phải
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <Text style={{ fontSize: 13 }}> {item?.message} </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 9,
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  {formatTime(item?.timeStamp)}
                </Text>
              </Pressable>
            );
          }
          if (item?.messageType === "image") {
            const baseUrl = "/native/api/files/";
            // ex: "https://example.com/images/photo.jpg"
            const imageUrl = item.imageUrl;
            // sau khi split('/'), mảng kết quả sẽ là ["https:", "", "example.com", "images", "photo.jpg"],
            // pop() xóa phần tử cuối cùng của mảng và trả về giá trị của phần tử đó
            // --> photo.jpg
            const filename = imageUrl.split("/").pop();
            console.log("filename", filename);
            const source = { url: baseUrl + filename };
            // Image
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                ]}
              >
                <View>
                  <Image
                    source={source}
                    style={{ width: 200, height: 200, borderRadius: 7 }}
                  />
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      position: "absolute",
                      right: 10,
                      bottom: 7,
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView>
      {/* UI Bottom Text  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
          // height: showInputText ? 250 : 50,
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
          onPress={handleTextInputPress}
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
          <Entypo onPress={pickImage} name="camera" size={24} color="gray" />
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
