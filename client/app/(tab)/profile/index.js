import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Ionicons,
  Entypo,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { WHITELIST_DOMAINS } from "../../../utils/constant";
import { FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { Imagee } from "@rneui/themed";
import { Title, Caption } from "react-native-paper";
const Profile = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const router = useRouter();
  const [userDescription, setUserDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const BASE_URI = "https://source.unsplash.com/random?sig=";

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${WHITELIST_DOMAINS}/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
      setUserDescription(userData.userDescription); // Cập nhật userDescription từ user
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };

  const handleSaveDescription = async () => {
    try {
      const response = await axios.put(
        `${WHITELIST_DOMAINS}/profile/${userId}`,
        {
          userDescription,
        }
      );

      if (response.status === 200) {
        await fetchUserProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error saving user description", error);
    }
  };

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    router.replace("/(authenticate)/login");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Pressable>
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{ uri: user?.profileImage }}
            />
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "white",
              borderRadius: 3,
              height: 30,
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
          <Pressable onPress={() => router.push("/home/chat")}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          </Pressable>
        </View>

        <Image
          style={{ width: "100%", height: 130 }}
          source={{
            uri: "https://media.istockphoto.com/id/937025430/photo/abstract-defocused-blue-soft-background.jpg?b=1&s=612x612&w=0&k=20&c=FwJnRNxkX_lZKImOoJbo5VsgZPCMNiODdsRsggJqejA=",
          }}
        />

        <View style={{ position: "absolute", top: 130, left: 10 }}>
          <Image
            style={{ width: 120, height: 120, borderRadius: 60 }}
            source={{ uri: user?.profileImage }}
          />
        </View>

        <View style={{ marginTop: 80, marginHorizontal: 10 }}>
          <Text
            style={{ fontSize: 17, fontWeight: "bold", alignItems: "center" }}
          >
            {user?.name}
          </Text>

          <View style={{ textAlign: "center", marginTop: 5 }}>
            {isEditing ? (
              <>
                <TextInput
                  placeholder="Enter your description"
                  value={userDescription} // Đổi từ user?.userDescription sang userDescription
                  onChangeText={(text) => setUserDescription(text)}
                />

                <Button onPress={handleSaveDescription} title="Save" />
              </>
            ) : (
              <Text>{user?.userDescription}</Text>
            )}
          </View>

          <Text style={{ marginTop: 12, fontWeight: "500", fontSize: 15 }}>
            Youtube • Linkedin Member
          </Text>
          <Text style={{ fontSize: 15, color: "gray" }}>
            Bengaluru, Karnataka, India
          </Text>
        </View>
        {/* <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "blue",
                borderRightWidth: 2,
              },
            ]}
          >
            <Title>₹140.50</Title>
            <Caption>Connections</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Picture</Caption>
          </View>
        </View> */}

        <Pressable
          style={{
            position: "absolute",
            marginLeft: 100,
            marginTop: 220,
            marginHorizontal: 60,
          }}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text>
            {user?.userDescription ? (
              <AntDesign name="edit" size={24} color="blue" />
            ) : (
              <AntDesign name="pluscircleo" size={24} color="black" />
            )}
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
            marginHorizontal: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#0072b1",
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Open to</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#0072b1",
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Add Section
            </Text>
          </Pressable>
        </View>

        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Analytics</Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 2 }}>
            Private to you
          </Text>

          <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
            <Ionicons name="people" size={28} color="black" />
            <View style={{ marginLeft: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                350 profile views
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "gray",
                  marginTop: 1,
                }}
              >
                Discover who's viewed your profile
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
            <Entypo name="bar-graph" size={24} color="black" />
            <View style={{ marginLeft: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                1242 post Impressions
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "gray",
                  marginTop: 1,
                }}
              >
                Checkout who's engaing with your posts
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
            <Feather name="search" size={24} color="black" />
            <View style={{ marginLeft: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                45 post appearances
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "gray",
                  marginTop: 1,
                }}
              >
                see how often you appear in search results
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={logout}
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            paddingVertical: 10, // Thêm khoảng cách phía trên và dưới để nút có kích thước giống button
            paddingHorizontal: 20, // Thêm khoảng cách phía trái và phải để nút có kích thước giống button
            backgroundColor: "rgba(90, 154, 230, 1)", // Đặt màu nền cho nút
            borderWidth: 2, // Độ dày của viền
            borderColor: "rgba(90, 154, 230, 1)", // Màu viền
            borderRadius: 20, // Bo tròn viền
            justifyContent: "center", // Căn giữa theo chiều dọc
            alignItems: "center", // Căn giữa theo chiều ngang
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
            LOGOUT
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  infoBoxWrapper: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    borderTopColor: "blue",
    borderTopWidth: 2,
    flexDirection: "row",
    height: 90,
    marginTop: 10,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
