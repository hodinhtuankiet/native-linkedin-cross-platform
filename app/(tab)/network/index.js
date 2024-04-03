import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from 'axios';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
const Index = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the token from AsyncStorage based on the key 'authToken' set during login
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // Decode the JWT token to extract information
          const decodedToken = jwtDecode(token); // Corrected usage
          const userId = decodedToken.userId;
          setUserId(userId);
        } else {
          // Handle the case when token is not available
          console.log('No token found');
        }
      } catch (error) {
        // Handle any errors that might occur during decoding or AsyncStorage access
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);


  useEffect(()=> {
    if(userId){
      fetchUserProfile(userId);
    }
  },[userId])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.110.243:3000/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUsers();
    }
  }, [userId]);
  // all of users except my user
  const fetchUsers = async () => {
    axios
      .get(`http://192.168.110.243:3000/users/${userId}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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

      {/* <View>
        {connectionRequests?.map((item, index) => (
          <ConnectionRequest
            item={item}
            key={index}
            connectionRequests={connectionRequests}
            setConnectionRequests={setConnectionRequests}
            userId={userId}
          />
        ))}
      </View> */}

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
      {/* <FlatList
        data={users}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item, key }) => (
          <UserProfile userId={userId} item={item} key={index} />
        )}
      /> */}
    </ScrollView>
  );
};

export default Index;
