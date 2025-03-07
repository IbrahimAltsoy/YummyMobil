import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Welcome.Style";
import { useTranslation } from "react-i18next";
// Logou yukarı doğru uzanan yıldızlar ekle önce 3 ane sonra 2 tane sonra bir tane
interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}
const WelcomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

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

      <Text style={styles.title}>{t("Merhaba")} Yummy</Text>
      <Text style={styles.motto}>
        {t("Hizmetin Gücü Kullanıcının Yorumuyla Artıyor!")}
      </Text>
      <Text style={styles.description}>
        {t(
          " Hemen aramıza katılın ve bugüne kadarki en iyi hizmeti deneyimleyin!"
        )}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>{t("Başla")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
