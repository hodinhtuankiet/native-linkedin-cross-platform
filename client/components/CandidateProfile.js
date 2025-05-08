import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { WHITELIST_DOMAINS } from "../utils/constant";

const CandidateProfile = ({ item, userId }) => {
  const [connectionSent, setConnectionSent] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  // Log để kiểm tra dữ liệu item
  useEffect(() => {
    console.log("Candidate item:", item);
  }, [item]);

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
      <Text style={{ textAlign: "center", marginLeft: 1, marginTop: 2 }}>
        {item?.full_name}
      </Text>
    </View>
  );
};

export default CandidateProfile;

const styles = StyleSheet.create({});
