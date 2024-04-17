import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import UserProfile from "../../../components/UserProfile";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import ConnectionRequest from "../../../components/ConnectionRequest";
const Index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [connectionRequests, setConnectionRequests] = useState([]);

  const IP_ADDRESS = "http://192.168.1.11:3000";

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

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      fetchUsers();
      fetchFriendRequests();
    }
  }, [userId]);
  // lấy profile của người đang sử dụng
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/profile/${userId}`);
      const userData = response.data.user;
      // set data vào
      setUser(userData);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/users/${userId}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // fetch all friends send request for me
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `${IP_ADDRESS}/connection-request/${userId}`
      );
      if (response.status === 200) {
        const connectionRequestsData = response.data?.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.profileImage,
        }));

        setConnectionRequests(connectionRequestsData);
      }
    } catch (error) {
      console.log("error", error);
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
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Invitations (0)</Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View>
        {connectionRequests?.map((item, index) => (
          <ConnectionRequest
            item={item}
            key={index}
            connectionRequests={connectionRequests}
            setConnectionRequests={setConnectionRequests}
            userId={userId}
          />
        ))}
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Grow your network faster</Text>
          <Entypo name="cross" size={24} color="black" />
        </View>

        <Text>
          Find and contact the right people. Plus see who's viewed your profile
        </Text>
        <View
          style={{
            backgroundColor: "#FFC72C",
            width: 140,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 25,
            marginTop: 8,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Try Premium
          </Text>
        </View>
      </View>

      {/* FlatList moved outside of the View */}
      <FlatList
        data={users}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserProfile userId={userId} item={item} />}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
