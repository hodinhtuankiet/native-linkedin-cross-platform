import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Feather } from "@expo/vector-icons";
const ChatBubble = ({ role, text, onSpeech }) => {
  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
          <Feather name="volume-2" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%", // Adjust based on your preference
    position: "relative", // Added for positioning the speaker icon
  },
  userChatItem: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: "#3498db",
  },
  chatText: {
    fontSize: 16,
    color: "white",
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default ChatBubble;
