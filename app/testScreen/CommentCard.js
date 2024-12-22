import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CommentCard = ({ comment }) => {
  return (
    <View style={styles.card}>
      <View style={styles.user}>
        <Image
          source={{ uri: comment.user.avatar }}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.name}>{comment.user.name}</Text>
          <Text style={styles.business}>{comment.business}</Text>
          <Text style={styles.rating}>Rating: {comment.rating}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{comment.content}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton}>
          <Text>{comment.likes} beğeni</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{comment.date}</Text>
        {comment.replies > 0 && (
          <View style={styles.replies}>
            {comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  business: {
    color: "gray",
  },
  rating: {
    color: "orange",
  },
  comment: {
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  likeButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  replies: {
    marginLeft: 20,
  },
});

export default CommentCard;
