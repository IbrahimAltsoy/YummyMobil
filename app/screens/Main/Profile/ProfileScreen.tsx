import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./Profile.Style";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/350" }} // Profil fotoğrafı
        style={styles.profileImage}
      />
      <Text style={styles.name}>Bawer Akar</Text>
      <Text style={styles.bio}>
        Merhaba, ben John Doe. Bu benim profil sayfam.
      </Text>
    </View>
  );
};

export default ProfileScreen;
