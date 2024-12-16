import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Buraya login işlemini gerçekleştirecek kodları yazabilirsin
    console.log("Email:", email);
    console.log("Password:", password);
    navigation.navigation("Home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Giriş</Text>
      <TextInput
        style={{
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Şifre"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Anasayfaya git"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default Login;
