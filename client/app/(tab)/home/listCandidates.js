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
  const callWebhookAnalyze = async (postId) => {
    try {
      const data = { postId };
      const response = await axios.post(
        `${WHITELIST_DOMAINS}/candidates/analyze`,
        data
      );
      console.log("Webhook Response:", response.data);
    } catch (error) {
      console.error(
        "Error calling webhook:",
        error.response?.data || error.message
      );
    }
  };
  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        `${WHITELIST_DOMAINS}/candidates/${postId}`
      );

      // Kiểm tra dữ liệu trả về
      if (response.data) {
        setUsers(response.data); // Cập nhật dữ liệu vào state
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
      const webhookUrl =
        "https://n8n-hirenova.gdsc.dev/webhook-test/analys";

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
          Lọc Và Gữi Email Tự Động
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
          return (
            <View
              key={item._id}
              style={{
                width: (Dimensions.get("window").width - 64) / 2,
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
                {/* Nếu có ảnh hồ sơ, bạn có thể mở lại phần này */}
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

              {/* Hiển thị rate_cv */}
              <View
                style={{
                  marginTop: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  borderColor: "#0072b1",
                  borderWidth: 1,
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#0072b1",
                  }}
                >
                  CV Rating: {item?.rate_cv}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
