import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import {
  Ionicons,
  Entypo,
  Feather,
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import moment from "moment";
import "core-js/stable/atob";
import { WHITELIST_DOMAINS } from "../../../utils/constant";
import { useRoute } from "@react-navigation/native";

import EmojiSelector from "react-native-emoji-selector";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";

const Index = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [userId, setUserId] = useState(null);

  const route = useRoute();
  const { ownerId, postId } = route.params;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (typeof token === "string") {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        }
      } catch (error) {
        console.error("Error fetching auth token:", error);
      }
    };
    fetchUser();
  }, []);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      console.log("Document picker result:", res);

      if (res.canceled || !res.assets || res.assets.length === 0) {
        alert("Vui lòng chọn tệp hợp lệ (PDF)");
        return;
      }

      const file = res.assets[0];

      if (Platform.OS === "web") {
        // Trên web, uri là base64 data URI
        const response = await fetch(file.uri);
        const blob = await response.blob();

        setCvFile({
          name: file.name,
          type: file.mimeType || "application/pdf",
          uri: file.uri,
          blob: blob, // lưu thêm blob để dùng FormData
        });
      } else {
        // Trên mobile (Expo Go)
        setCvFile({
          name: file.name,
          type: file.mimeType || "application/pdf",
          uri: file.uri,
        });
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const handleSubmitApplication = async () => {
    if (!fullName || !email || !phone || !cvFile) {
      alert("Vui lòng điền đầy đủ thông tin và chọn CV.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("userId", userId); // Thêm userId vào formData
    formData.append("postId", postId); // Thêm postId vào formData
    formData.append("ownerId", ownerId);
    // console.log("userId", userId);
    // console.log("postId", postId);
    // console.log("ownerId", ownerId);
    if (Platform.OS === "web") {
      formData.append(
        "cv",
        new File([cvFile.blob], cvFile.name, {
          type: cvFile.type,
        })
      );
    } else {
      formData.append("cv", {
        uri: cvFile.uri,
        name: cvFile.name,
        type: cvFile.type,
      });
    }

    try {
      // const response = await fetch(`${WHITELIST_DOMAINS}/messages/apply/${userId}/${postId}/${ownerId}`, {
      //   method: "POST",
      //   body: formData,
      // });
      const response = await fetch(`${WHITELIST_DOMAINS}/messages/apply`, {
        method: "POST",
        body: formData, // Gửi formData, bao gồm cả file và các tham số
      });
      if (response.ok) {
        alert("Nộp đơn thành công!");
        setFullName("");
        setEmail("");
        setPhone("");
        setCvFile(null);
      } else {
        const errText = await response.text();
        console.error("Upload thất bại:", errText);
        alert("Gửi đơn thất bại!");
      }
    } catch (error) {
      console.error("Lỗi gửi đơn ứng tuyển:", error);
      alert("Gửi đơn thất bại!");
    }
  };

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Ứng tuyển ngay
        </Text>
        <TextInput
          placeholder="Họ và tên"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Button title="Chọn CV (PDF)" onPress={pickDocument} />
        {cvFile && (
          <Text style={{ marginTop: 8, fontStyle: "italic", color: "green" }}>
            Đã chọn: {cvFile.name}
          </Text>
        )}
        <View style={{ marginTop: 15 }}>
          <Button
            title="Nộp đơn"
            onPress={handleSubmitApplication}
            color="#0072b1"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
