import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserChat = ({ item }) => {
  return (
    <View>
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item?.image }}
      />
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
