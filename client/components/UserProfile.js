import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { WHITELIST_DOMAINS } from "../utils/constant";
import ChatWootView from "./ChatWootView";
const UserProfile = ({ item, userId }) => {
  const [connectionSent, setConnectionSent] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const sendConnectionRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(`${WHITELIST_DOMAINS}/connection-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      if (response.ok) {
        setConnectionSent(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 9,
        marginHorizontal: 16,
        borderColor: "#E0E0E0",
        borderWidth: 1,
        marginVertical: 15,
        justifyContent: "center",
        height: Dimensions.get("window").height / 3.8,
        width: (Dimensions.get("window").width - 80) / 2,
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("profileAnother", {
            recepientId: item._id,
          })
        }
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              resizeMode: "cover",
            }}
            source={{ uri: item?.profileImage }}
          />
        </View>
      </Pressable>

      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}>
          {item?.name}
        </Text>
        <Text style={{ textAlign: "center", marginLeft: 1, marginTop: 2 }}>
          Engineer Graduate Linkedin member
        </Text>
      </View>

      <Pressable
        onPress={() => sendConnectionRequest(userId, item._id)}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          borderColor:
            connectionSent || item?.connectionRequests?.includes(userId)
              ? "gray"
              : "#0072b1",
          borderWidth: 1,
          borderRadius: 25,
          marginTop: 7,
          paddingHorizontal: 15,
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            color:
              connectionSent || item?.connectionRequests?.includes(userId)
                ? "gray"
                : "#0072b1",
          }}
        >
          {connectionSent || item?.connectionRequests?.includes(userId)
            ? "Pending"
            : "Connect"}
        </Text>
      </Pressable>
   

    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
