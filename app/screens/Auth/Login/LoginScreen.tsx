import React, { useContext, useState } from "react";
import { View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YButton from "../../../components/YButton/YButton";
import YInput from "../../../components/YInput/YInput";
import styles from "./LoginScreen.Style";
import AuthContext from "../../../context/AuthContext";
import { LoginRequest } from "../../../models/auth/LoginRequest"; // LoginRequest tipini import et

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const Login = ({ navigation }: Props) => {
  const { login }: any = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Giriş için gerekli veriyi oluşturuyoruz
    const loginData: LoginRequest = {
      usernameOrEmail: usernameOrEmail, // email ya da kullanıcı adı
      password: password, // şifre
    };

    // login fonksiyonunu çağırıyoruz
    try {
      await login(loginData);
      // navigation.navigate("Home"); // Giriş başarılıysa anasayfaya yönlendir
    } catch (error: any) {
      // Giriş hatası durumunda kullanıcıya bildirim gösterebilirsiniz
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.backgroundLogo}
        resizeMode="contain"
      />

      {/* Email veya kullanıcı adı input */}
      <YInput
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
        placeholder="Email Address"
        style={styles.input}
      />

      {/* Şifre input */}
      <YInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Giriş butonu */}
      <YButton
        title="Login"
        onPress={handleLogin} // Yeni handleLogin fonksiyonunu çağırıyoruz
        style={styles.button}
      />

      {/* Diğer bağlantılar */}
      <View style={styles.linkContainer}>
        <Text style={styles.text}>Don't have an account?</Text>
        <YButton
          title="Create Account"
          onPress={() => navigation.navigate("Register")}
          style={styles.linkButton}
        />
      </View>

      <View>
        <YButton
          title="Forgot Password?"
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.linkButton}
        />
      </View>

      {/* Sosyal medya ile giriş butonları */}
      <View style={styles.socialButtonContainer}>
        <YButton
          title="Continue with Google"
          icon={<Ionicons name="logo-google" size={20} color="white" />}
          onPress={() => {}}
          style={styles.socialButton}
        />
        <YButton
          title="Continue with Apple"
          icon={<Ionicons name="logo-apple" size={20} color="white" />}
          onPress={() => {}}
          style={styles.socialButton}
        />
      </View>
    </View>
  );
};

export default Login;
