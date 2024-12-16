import React from "react";
import { Text, View, Image, Button } from "react-native";
import styles from "./Home.Style";
import { LinearGradient } from "expo-linear-gradient";

function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#F8F8FF", "#F8F8FF"]} style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.appName}>YUMMY</Text>
        <Text style={styles.appName}>APPLICATION</Text>
        <Text style={styles.tag}>Experience</Text>
        <Text style={styles.tagline}>me first</Text>
        <Button
          onPress={() => navigation.navigate("Login")}
          title="Giriş sayfasına git"
        />
      </View>
    </LinearGradient>
  );
}

export default HomeScreen;
