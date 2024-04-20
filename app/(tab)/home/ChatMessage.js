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
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ChatMessage = () => {
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
          // marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          // onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />
        <TextInput
          // value={message}
          // onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />
      </View>
      {/* <Entypo name="camera" size={24} color="gray" />

      <Feather name="mic" size={24} color="gray" /> */}
    </KeyboardAvoidingView>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
