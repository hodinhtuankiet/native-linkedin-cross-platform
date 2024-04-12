import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwt_decode from "jwt-decode";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
// import { firebase } from "../../../firebase";
// import axios from "axios";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
const index = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  const pickImage = async () => {
    // let result = await Image
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Entypo name="circle-with-cross" size={24} color="black" />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://drive.google.com/uc?export=download&id=12cs5IdWLHuiWxBTghf8uorJ8cmYD2YBw",
              }}
            />
            <Text style={{ fontWeight: "500" }}>Anyone</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginRight: 8,
          }}
        >
          <Entypo name="back-in-time" size={24} color="black" />
          <Pressable
            // onPress={createPost}
            style={{
              padding: 10,
              backgroundColor: "#0072b1",
              borderRadius: 20,
              width: 80,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Post
            </Text>
          </Pressable>
        </View>
      </View>

      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="What do you want to talk about"
        placeholderTextColor={"black"}
        style={{
          marginHorizontal: 10,
          fontSize: 15,
          fontWeight: "500",
          marginTop: 10,
        }}
        multiline={true}
        numberOfLines={10}
        textAlignVertical={"top"}
      />

      <View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 240, marginVertical: 20 }}
          />
        )}
      </View>

      <Pressable
        style={{
          flexDirection: "coloumn",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Pressable
          onPress={pickImage}
          style={{
            widt: 40,
            height: 40,
            marginTop: 15,
            backgroundColor: "#E0E0E0",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="perm-media" size={24} color="black" />
        </Pressable>

        <Text>Media</Text>
      </Pressable>
    </ScrollView>
  );
};

export default index;
