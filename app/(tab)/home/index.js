import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Ionicons, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import "core-js/stable/atob";
import { WHITELIST_DOMAINS } from "../../../utils/constant";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const [showMenu, setShowMenu] = useState(false);

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedLikePostId, setSelectedLikePostId] = useState(null);

  const [description, setDescription] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  // const [editedDescription, setEditedDescription] = useState("");
  const navigation = useNavigation();

  //AsyncStorage fetch userid and set userid
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
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
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };
  // fetch all post of user
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${WHITELIST_DOMAINS}/all`);
      setPosts(response.data.posts);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };
  // const fetchAllComments = async () => {
  //   try {
  //     const response = await axios.get(`${WHITELIST_DOMAINS}/all`);
  //     setPosts(response.data.posts);
  //   } catch (error) {
  //     console.log("error fetching posts", error);
  //   }
  // };

  useEffect(() => {
    fetchAllPosts();
  }, [posts]);

  const MAX_LINES = 2;
  const [showfullText, setShowfullText] = useState(false);
  const toggleShowFullText = () => {
    setShowfullText(!showfullText);
  };
  const handleDescriptionChange = (text, id) => {
    setDescription(text);
  };
  const handleRemovePress = (idPost) => {
    Alert.alert(
      "Delete Post",
      "Do you wanna delete this Artical ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            handleDeletePost(idPost);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeletePost = async (idPost) => {
    try {
      const response = await axios.delete(
        `${WHITELIST_DOMAINS}/deletePost/${idPost}/${userId}`,
        {
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        }
      );
      if (response.status === 403) {
        Alert.alert("Error", "You just only delete your post");
      } else if (response.status === 200) {
        fetchAllPosts();
      }
    } catch (error) {
      console.log("Error deleting the post", error);
    }
  };
  const [isLiked, setIsLiked] = useState(false);
  // handle like/unlike post
  // get userId liked & postId
  const handleLikePost = async (postId) => {
    setSelectedLikePostId(postId);
    try {
      const response = await axios.post(
        `${WHITELIST_DOMAINS}/like/${postId}/${userId}`
      );
      if (response.status === 200) {
        const updatedPost = response.data.post;
        setIsLiked(updatedPost.likes.some((like) => like.user === userId));
      }
    } catch (error) {
      console.log("Error liking/unliking the post", error);
    }
  };
  const handleEditDescription = async (id) => {
    try {
      const response = await axios.put(
        `${WHITELIST_DOMAINS}/profile/${id}/${userId}`,
        { description }
      );
      if (response.status === 200 || response.status === 201) {
        fetchAllPosts();
        setEditingDescription(!editingDescription);
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.log("Error update on the post:", error);
      if (error.response && error.response.status === 404) {
        Alert.alert("Error", "You can only update your own post");
      } else {
        console.log("Server response:", error.response?.data);
      }
    }
  };
  const handleOpenTextDescription = async (id) => {
    setEditingDescription(!editingDescription);
    setSelectedPostId(id);
    setShowMenu(!showMenu);
  };
  const handleCommentPost = async (postId) => {
    try {
      const response = await axios.post(
        `${WHITELIST_DOMAINS}/createComment/${postId}/${userId}`,
        { description }
      );
      if (response.status === 200 || response.status === 201) {
        setDescription("");
        fetchAllPosts();
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.log("Error commenting on the post:", error);
      if (error.response) {
        console.log("Server response:", error.response.data);
      }
    }
  };
  const handleToggleComments = (postId) => {
    setShowComments(!showComments);
    setSelectedPostId(postId);
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };
  const toggleMenu = (id) => {
    setShowMenu(!showMenu);
    setSelectedPostId(id);
  };

  const handleEdit = () => {
    // Xử lý sự kiện khi người dùng chọn "Edit"
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    // Xử lý sự kiện khi người dùng chọn "Delete"
    console.log("Delete clicked");
  };
  const router = useRouter();
  // console.log(posts);
  return (
    <ScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Navigation to profile user  */}
        <Pressable onPress={() => router.push("/home/profile")}>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={{ uri: user?.profileImage }}
          />
        </Pressable>
        {/* TextInput  */}
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 16,
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
        {/* Navigation to chat  */}
        <Pressable onPress={() => router.push("/home/chat")}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
        </Pressable>
      </View>

      <View>
        {posts?.map((item, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
              key={index}
            >
              {/* View show profileName and Date */}
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("profileAnother", {
                      recepientId: item.user._id,
                    })
                  }
                >
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={{ uri: item?.user?.profileImage }}
                  />
                </Pressable>
                <View style={{ flexDirection: "column", gap: 2 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {item?.user?.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: 230,
                      color: "gray",
                      fontSize: 15,
                      fontWeight: "400",
                    }}
                  >
                    Engineer Graduate | LinkedIn Member
                  </Text>
                  <Text style={{ color: "gray" }}>
                    {moment(item.createdAt).format("MMMM Do YYYY")}
                  </Text>
                </View>
              </View>
              {/* View show 3 dots, edit, and delete */}
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <TouchableOpacity onPress={() => toggleMenu(item._id)}>
                  <Entypo name="dots-three-vertical" size={20} color="black" />
                </TouchableOpacity>
                {showMenu && selectedPostId === item._id && (
                  <View style={style.menu}>
                    <TouchableOpacity
                      onPress={() => handleOpenTextDescription(item._id)}
                    >
                      <Text style={style.menuItem}>
                        Update Description Post
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                      <Text style={style.menuItem}>Report</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity onPress={() => handleRemovePress(item._id)}>
                  <FontAwesome name="remove" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 12 }}
            >
              <View>
                {editingDescription && selectedPostId === item._id ? (
                  <>
                    <TextInput
                      placeholder="Enter new description"
                      value={description}
                      multiline
                      numberOfLines={3}
                      onChangeText={handleDescriptionChange}
                    />

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 7,
                      }}
                    >
                      <Button
                        onPress={() => handleEditDescription(item._id)}
                        title="Save"
                      />
                      <Button
                        onPress={() =>
                          setEditingDescription(!editingDescription)
                        }
                        title="No"
                      />
                    </View>
                  </>
                ) : (
                  <Text
                    style={{ fontSize: 15 }}
                    numberOfLines={showfullText ? undefined : MAX_LINES}
                  >
                    {item?.description}
                  </Text>
                )}
              </View>
              {/* Conditionally render editable text input or normal text */}
              {/* Render 'See more' option if not in edit mode */}
              {!showfullText &&
                editingDescription !== item._id &&
                !editingDescription && (
                  <Pressable onPress={() => toggleShowFullText()}>
                    <Text style={{ color: "#2690c9" }}>See more</Text>
                  </Pressable>
                )}
            </View>

            <Image
              style={{ width: "100%", height: 240 }}
              source={{ uri: item?.imageUrl }}
            />
            {/* Length Like */}
            {(item?.likes?.length > 0 || item?.comments?.length > 0) && (
              <View style={{ flexDirection: "row" }}>
                {item?.likes?.length > 0 && (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <SimpleLineIcons name="like" size={16} color="#0072b1" />
                    <Text style={{ color: "gray" }}>{item?.likes?.length}</Text>
                  </View>
                )}
                {item?.comments?.length > 0 && (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <FontAwesome5 name="comment" size={17} color="#0072b1" />
                    <Text style={{ color: "gray" }}>
                      {item?.comments?.length}
                    </Text>
                  </View>
                )}
              </View>
            )}

            <View
              style={{
                height: 2,
                borderColor: "#E0E0E0",
                borderWidth: 2,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
              }}
            >
              {/* Handle Like */}
              <Pressable onPress={() => handleLikePost(item?._id)}>
                <AntDesign
                  style={{ textAlign: "center" }}
                  name="like2"
                  size={24}
                  color={
                    isLiked && selectedLikePostId === item?._id
                      ? "#0072b1"
                      : "gray"
                  }
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color:
                      isLiked && selectedLikePostId === item?._id
                        ? "#0072b1"
                        : "gray",
                    marginTop: 2,
                  }}
                >
                  Like
                </Text>
              </Pressable>
              {/* Handle Comment */}
              <Pressable onPress={() => handleToggleComments(item._id)}>
                <FontAwesome
                  name="comment-o"
                  size={20}
                  color={
                    showComments && selectedPostId === item?._id
                      ? "#0072b1"
                      : "gray"
                  }
                  style={{ textAlign: "center" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 2,
                    fontSize: 12,
                    color:
                      showComments && selectedPostId === item?._id
                        ? "#0072b1"
                        : "gray",
                  }}
                >
                  Comment
                </Text>
              </Pressable>
              {/* Handle Repost */}
              <Pressable>
                <AntDesign
                  style={{ textAlign: "center" }}
                  name="sharealt"
                  size={20}
                  color="gray"
                />
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 12,
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  Repost
                </Text>
              </Pressable>
              {/* Handle Send */}
              <Pressable>
                <Feather name="send" size={20} color="gray" />
                <Text style={{ marginTop: 2, fontSize: 12, color: "gray" }}>
                  Send
                </Text>
              </Pressable>
            </View>
            {selectedPostId === item._id && showComments && (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {/* View Comment User */}
                {item.comments.map((comment, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#dfe6e9",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      padding: 7,
                      borderRadius: 30,
                    }}
                  >
                    <Image
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 30,
                        marginRight: 5,
                        marginLeft: 5,
                        paddingRight: 13,
                        marginTop: 9,
                      }}
                      source={{ uri: comment.profileImage }}
                    />
                    <View style={{ flexDirection: "column", gap: 2 }}>
                      <Text style={{ fontSize: 15, fontWeight: "600" }}>
                        {comment.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          width: 280,
                          color: "gray",
                          fontSize: 15,
                          fontWeight: "400",
                          borderRadius: 20,
                        }}
                      >
                        {comment.text}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 2 }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: "blue",
                            fontSize: 13,
                            fontWeight: "400",
                          }}
                        >
                          Like
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: "blue",
                            fontSize: 13,
                            fontWeight: "400",
                            marginLeft: 10,
                          }}
                        >
                          Reply
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Pressable>
                    <Feather
                      style={{ marginLeft: 5 }}
                      name="camera"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                  {/* TextInput */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 7,
                      gap: 10,
                      backgroundColor: "white",
                      borderRadius: 23,
                      height: 40,
                      width: 20,
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <TextInput
                      placeholder={
                        user?.name ? `Comment as ${user.name}` : "Comment as"
                      }
                      style={{ marginLeft: 9 }}
                      value={description}
                      onChangeText={(text) => setDescription(text)}
                    />
                    <MaterialIcons
                      onPress={handleEmojiPress}
                      style={{ marginRight: 10 }}
                      name="insert-emoticon"
                      size={24}
                      color="black"
                    />
                    {showEmojiSelector && (
                      <EmojiSelector
                        onEmojiSelected={(emoji) => {
                          setMessage((prevMessage) => prevMessage + emoji);
                        }}
                        style={{ height: 250 }}
                      />
                    )}
                  </Pressable>
                  {/* Navigation to chat */}
                  <Pressable onPress={() => handleCommentPost(item._id)}>
                    <Ionicons
                      style={{ marginRight: 9 }}
                      name="send"
                      size={24}
                      color="blue"
                    />
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
const style = StyleSheet.create({
  dropdownIcon: {
    marginRight: 35,
  },
  menu: {
    position: "absolute",
    top: 30,
    right: 45,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    zIndex: 99,
    elevation: 3,
    // maxWidth: 150, // Điều chỉnh chiều rộng tối đa của dropdown menu
  },
  menuItem: {
    padding: 10,
    zIndex: 999,
    fontSize: 16,
  },
});
