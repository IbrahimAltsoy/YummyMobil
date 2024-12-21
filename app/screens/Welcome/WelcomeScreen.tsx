import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Welcome.Style";

// Logou yukarı doğru uzanan yıldızlar ekle önce 3 ane sonra 2 tane sonra bir tane
interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}
const WelcomeScreen = ({ navigation }: Props) => {
  // const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate("Login"); // Login ekranına yönlendirme
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Hello Yummy!</Text>
      <Text style={styles.motto}>
        "The Power of the Service Grows with the User's Comment!"
      </Text>
      <Text style={styles.description}>
        Join us now and experience the best service ever!
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
