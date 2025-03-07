import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import YButton from "../../../components/YButton/YButton";
import YInput from "../../../components/YInput/YInput";
import authService from "../../../services/authService"; // authService'ı import ediyoruz
import styles from "./Register.Style";
import { RegisterCommandRequest } from "@/app/models/register/RegisterCommandRequest";
import { RegisterCommandResponse } from "@/app/models/register/RegisterCommandResponse";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const RegisterScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setError(t("Geçersiz e-posta formatı"));
      return;
    }

    if (password !== passwordConfirm) {
      setError(t("Şifreler eşleşmiyor"));
      return;
    }

    const registerData: RegisterCommandRequest = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    try {
      const response: RegisterCommandResponse = await authService.register(
        registerData
      );
      if (response.success) {
        navigation.navigate("Login");
      } else {
        setError(response.message || t("Kayıt işlemi başarısız oldu"));
      }
    } catch (err) {
      setError(t("Bir hata oluştu, lütfen tekrar deneyin"));
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
        placeholder={t("Adınız")}
        style={styles.input}
      />
      <YInput
        value={surname}
        onChangeText={(text: any) => setSurname(text)}
        placeholder={t("Soyadınız")}
        style={styles.input}
      />
      <YInput
        value={email}
        onChangeText={(text: any) => {
          setEmail(text);
          setError(""); // Hata mesajını temizle
        }}
        placeholder={t("E-posta")}
        style={[styles.input, error ? styles.errorInput : null]}
      />
      <YInput
        placeholder={"Şifreniz"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text: any) => setPassword(text)}
        style={styles.input}
      />
      <YInput
        placeholder={t("Şifre Tekrar")}
        secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={(text: any) => setPasswordConfirm(text)}
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <YButton
        title={t("Kayıt Ol")}
        onPress={handleRegister}
        style={styles.button}
        icon={<Ionicons name="person-add-outline" size={20} color="white" />}
      />
      <View style={styles.linkContainer}>
        <Text style={styles.text}>{t("Zaten hesabınız var mı?")}</Text>
        <YButton
          title={t("Giriş Yap")}
          onPress={() => navigation.navigate("Login")}
          icon={
            <Ionicons name="shield-checkmark-outline" size={20} color="white" />
          }
          style={styles.linkButton}
        />
      </View>
      <View style={styles.linkContainer}>
        <YButton
          title={t("Şifremi Unuttum")}
          onPress={() => navigation.navigate("ForgotPassword")}
          icon={<Ionicons name="lock-closed-outline" size={20} color="white" />}
          style={styles.linkButton}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;