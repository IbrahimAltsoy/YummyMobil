import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import YButton from "../../../components/YButton/YButton";
import YInput from "../../../components/YInput/YInput";
import authService from "../../../services/authService"; // authService'ı import ediyoruz
import styles from "./Register.Style";
import { RegisterCommandRequest } from "@/app/models/register/RegisterCommandRequest";
import { RegisterCommandResponse } from "@/app/models/register/RegisterCommandResponse";

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleRegister = async () => {
    const registerData: RegisterCommandRequest = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    const response: RegisterCommandResponse = await authService.register(
      registerData
    );
    if (response.success) {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo.png")} // Burada logo yolunu kendi projenize göre değiştirin
        style={styles.backgroundLogo}
        resizeMode="contain"
      />

      <YInput
        value={name}
        onChangeText={(text: any) => setName(text)}
        placeholder="Your Name"
        style={styles.input}
      />
      <YInput
        value={surname}
        onChangeText={(text: any) => setSurname(text)}
        placeholder="Your Surname"
        style={styles.input}
      />
      <YInput
        value={email}
        onChangeText={(text: any) => setEmail(text)}
        placeholder="Your Email"
        style={styles.input}
      />

      {/* Password Input */}
      <YInput
        placeholder="Chose Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text: any) => setPassword(text)}
        style={styles.input}
      />
      <YInput
        placeholder="Repeat Password"
        secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={(text: any) => setPasswordConfirm(text)}
        style={styles.input}
      />

      {/* Login Button */}
      <YButton
        title="Register"
        onPress={handleRegister}
        style={styles.button}
      />
      <View style={styles.linkContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <YButton
          title="Login here"
          onPress={() => navigation.navigate("Login")}
          style={styles.linkButton}
        />
      </View>
      <View style={styles.linkContainer}>
        <YButton
          title="Forgot Password?"
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.linkButton}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
