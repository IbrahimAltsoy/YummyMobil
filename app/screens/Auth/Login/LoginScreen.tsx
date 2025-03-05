import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YButton from "../../../components/YButton/YButton";
import YInput from "../../../components/YInput/YInput";
import styles from "./LoginScreen.Style";
import AuthContext from "../../../context/AuthContext";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
interface GoogleIdTokenPayload {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  name: string;
  picture: string;
}
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
      Alert.alert("Giriş hatası", error.message);
      // console.error(error.message);
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
        placeholder="Email"
        style={styles.input}
      />

      {/* Şifre input */}
      <YInput
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Giriş butonu */}
      <YButton
        title="Giriş Yap"
        onPress={handleLogin} // Yeni handleLogin fonksiyonunu çağırıyoruz
        style={styles.button}
      />

      {/* Diğer bağlantılar */}
      <View style={styles.linkContainer}>
        <Text style={styles.text}>Hesabınız yok mu?</Text>
      </View>

      <View></View>

      {/* Sosyal medya ile giriş butonları */}
      <View style={styles.socialButtonContainer}>
        <YButton
          title="Üye Ol"
          icon={<Ionicons name="person-add-outline" size={20} color="white" />}
          onPress={() => navigation.navigate("Register")}
          style={styles.socialButton}
        />
        <YButton
          title="Şifremi Unuttum"
          icon={<Ionicons name="lock-closed-outline" size={20} color="white" />}
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.socialButton}
        />
      </View>
    </View>
  );
};

export default Login;
function decodeJWT(idToken: string): GoogleIdTokenPayload {
  throw new Error("Function not implemented.");
}
