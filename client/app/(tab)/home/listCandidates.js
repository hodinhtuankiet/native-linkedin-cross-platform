import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import CandidateProfile from "../../../components/CandidateProfile";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import ConnectionRequest from "../../../components/ConnectionRequest";
import UserProfile from "../../../components/UserProfile";
import { WHITELIST_DOMAINS } from "../../../utils/constant";
import { useRoute } from "@react-navigation/native";

const Index = () => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [connectionRequests, setConnectionRequests] = useState([]);
  const route = useRoute();
  const { postId } = route.params;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (userId) {
      //  fetchUserProfile();
      fetchCandidates();
      //  fetchFriendRequests();
    }
  }, [userId]);
  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        `${WHITELIST_DOMAINS}/candidates/${postId}`
      );

      // Kiểm tra dữ liệu trả về
      if (response.data) {
        setUsers([response.data]); // Cập nhật dữ liệu vào state
        console.log("users", response.data);
      } else {
        console.log("No candidates found.");
      }
      console.log("postId", postId);
    } catch (error) {
      console.error(
        "Error fetching candidates:",
        error.response || error.message
      ); // Log chi tiết lỗi
    }
  };
  const callWebhook = async (postId) => {
    try {
      // Địa chỉ URL của Webhook
      const webhookUrl = "https://your-webhook-url.com/endpoint";

      // Dữ liệu gửi đi (nếu có)
      const data = {
        postId: postId,
      };

      // Gọi Webhook với POST request
      const response = await axios.post(webhookUrl, data);

      // Xử lý kết quả trả về từ Webhook
      console.log("Webhook Response:", response.data);
    } catch (error) {
      // Xử lý lỗi
      console.error("Error calling webhook:", error.response || error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        onPress={() => router.push("/network/connections")}
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Manage My Network
        </Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </Pressable>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          onPress={() => callWebhook(postId)}
          style={{ fontSize: 16, fontWeight: "600" }}
        >
          Duyệt ({connectionRequests?.length})
        </Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        {users.map((item) => {
          const isPending = item?.connectionRequests?.includes(userId);

          return (
            <View
              key={item._id}
              style={{
                width: (Dimensions.get("window").width - 64) / 2, // 2 cột, có khoảng cách
                borderRadius: 9,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                marginVertical: 8,
                paddingVertical: 15,
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("profileAnother", {
                    recepientId: item._id,
                  })
                }
              >
                {/* <Image
                  source={{ uri: item?.profileImage }}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    resizeMode: "cover",
                  }}
                /> */}
              </Pressable>

              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  {item?.full_name}
                </Text>
                <Text
                  style={{ marginTop: 2, fontSize: 12, textAlign: "center" }}
                >
                  {item?.email}
                </Text>
              </View>

              <Pressable
                // onPress={() => sendConnectionRequest(userId, item._id)}
                // disabled={isPending}
                style={{
                  marginTop: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  borderColor: isPending ? "gray" : "#0072b1",
                  borderWidth: 1,
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: isPending ? "gray" : "#0072b1",
                  }}
                >
                  {item?.rate_cv}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
