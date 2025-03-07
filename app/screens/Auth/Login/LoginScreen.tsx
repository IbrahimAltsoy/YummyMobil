import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YButton from "../../../components/YButton/YButton";
import YInput from "../../../components/YInput/YInput";
import styles from "./LoginScreen.Style";
import AuthContext from "../../../context/AuthContext";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import * as WebBrowser from "expo-web-browser";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { login }: any = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginData: LoginRequest = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };

    try {
      await login(loginData);
    } catch (error: any) {
      Alert.alert("Giriş hatası", error.message);
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
        placeholder={t("Sifre")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Giriş butonu */}
      <YButton
        title={t("Giriş Yap")}
        onPress={handleLogin}
        style={styles.button}
      />

      {/* Diğer bağlantılar */}
      <View style={styles.linkContainer}>
        <Text style={styles.text}>{t("Hesabınız yok mu?")}</Text>
      </View>

      <View></View>

      {/* Sosyal medya ile giriş butonları */}
      <View style={styles.socialButtonContainer}>
        <YButton
          title={t("Üye Ol")}
          icon={<Ionicons name="person-add-outline" size={20} color="white" />}
          onPress={() => navigation.navigate("Register")}
          style={styles.socialButton}
        />
        <YButton
          title={t("Şifremi Unuttum")}
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
