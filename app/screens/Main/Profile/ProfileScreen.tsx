import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import { useTranslation } from "react-i18next";
import userService from "../../../services/userService";
import { GetUserByIdResponse } from "../../../models/user/GetUserByIdQueryResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "@/app/context/AuthContext";
import FeedbackForm from "@/app/components/Footer/Feedbackform";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { UpdateUserProfileImageCommandRequest } from "../../../models/user/UpdateUserProfileImageCommandRequest";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation(); // 📌 Navigation hook'u
  const [user, setUser] = useState<GetUserByIdResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState("tr");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  // AuthContext kullanımı
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { logout } = authContext;
  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        t("İzin Gerekli"),
        t("Fotoğraf eklemek için izni kabul etmelisiniz.")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      try {
        // Seçilen dosyayı al
        const selectedImage = result.assets[0];

        // Backend'e yükleme işlemi
        const response = await userService.uploadProfileImage(
          selectedImage.uri
        );
        Alert.alert(
          t("Başarılı"),
          t("Profil fotoğrafı başarıyla güncellendi.")
        );
      } catch (error) {
        console.error("Fotoğraf yüklenirken hata oluştu:", error);
        Alert.alert(t("Hata"), t("Fotoğraf yüklenirken bir hata oluştu."));
      }
    }
  };

  // Kullanıcı verisi ve dil ayarını çekme
  useEffect(() => {
    const fetchUserAndLanguage = async () => {
      setLoading(true);
      try {
        const userData = await userService.getUserById();
        if (userData) {
          setUser(userData);
        } else {
          Alert.alert(t("Hata"), t("Kullanıcı bilgileri getirilemedi."));
        }

        const storedLanguage = await AsyncStorage.getItem("appLanguage");
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        Alert.alert(t("Hata"), t("Veri yüklenirken bir hata oluştu."));
      }
      setLoading(false);
    };

    fetchUserAndLanguage();
  }, []);

  // Modal aç/kapa fonksiyonları
  const openFeedbackForm = () => setIsFeedbackVisible(true);
  const closeFeedbackForm = () => setIsFeedbackVisible(false);

  const changeLanguage = async (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem("appLanguage", lang);
    setModalVisible(false);
  };

  const handleDeleteAccount = async () => {
    try {
      //await userService.deleteUser();
      Alert.alert(t("Başarılı"), t("Hesabınız başarıyla silindi."));
      //navigation.navigate("Login");
    } catch (error) {
      Alert.alert(t("Hata"), t("Hesap silinirken bir hata oluştu."));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert(t("Başarılı"), t("Başarıyla çıkış yapıldı."));
    } catch (error) {
      Alert.alert(t("Hata"), t("Çıkış yapılırken bir hata oluştu."));
    }
  };

  // Yüklenme ekranı
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("Profil Bilgileri")}</Text>
      <TouchableOpacity onPress={selectImage}>
        <Image
          source={{ uri: user?.imageUrl || "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.userName}>
        {user?.name} {user?.surname}
      </Text>
      <Text style={styles.userEmail}>{user?.email}</Text>
      <Text style={styles.userPhone}>
        {user?.phoneNumber || t("Telefon Yok")}
      </Text>

      <View style={styles.languageWrapper}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.languageButton}
        >
          <Text style={styles.languageText}>
            {selectedLanguage === "tr" ? "🇹🇷  Türkçe" : "🇬🇧  English"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Butonların yer aldığı kapsayıcı */}
      <View style={styles.buttonContainer}>
        <View style={styles.feedbackPromptContainer}>
          <Icon name="chatbubbles-outline" size={24} color="#28a745" />
          <Text style={styles.feedbackPromptText}>
            {t("Fikriniz Bizim İçin Değerli")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={openFeedbackForm}
        >
          <Text style={styles.buttonText}>{t("Geri Bildirimde Bulun")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>{t("Çıkış Yap")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={styles.buttonText}>{t("Hesabımı Sil")}</Text>
        </TouchableOpacity>
      </View>

      {/* Geri Bildirim Modal */}
      <Modal visible={isFeedbackVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <FeedbackForm onClose={closeFeedbackForm} />
        </View>
      </Modal>

      {/* Dil Seçim Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Dil Seç")}</Text>

            <TouchableOpacity
              onPress={() => changeLanguage("tr")}
              style={styles.modalOption}
            >
              <Text>🇹🇷 Türkçe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeLanguage("en")}
              style={styles.modalOption}
            >
              <Text>🇬🇧 English</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Hesap Silme Modal */}
      <Modal visible={deleteModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Hesabını Sil")}</Text>
            <Text style={styles.modalText}>
              {t(
                "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
              )}
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.buttonText}>{t("Evet, Sil")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.buttonText}>{t("İptal")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Ekran genel kapsayıcı */
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "70%",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  feedbackPromptContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f9ee", // Hafif yeşil tonlu arka plan
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackPromptText: {
    fontSize: 16,
    color: "#28a745", // Yeşil ton, ikonla uyumlu
    fontWeight: "bold",
    marginLeft: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#007bff",
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  userPhone: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },

  /* Dil seçimi butonu */
  languageWrapper: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  languageButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderWidth: 1,
    borderColor: "#bbb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 15,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },

  /* Butonlar için ayrı bir kapsayıcı */
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20, // Buton grubuna üstten boşluk
  },

  /* Çıkış Yap Butonu */
  exitButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginBottom: 10, // Butonlar arasında boşluk
  },

  /* Hesabı Sil Butonu */
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginBottom: 10, // Butonlar arasında boşluk
  },

  /* Geri Bildirim Butonu */
  feedbackButton: {
    backgroundColor: "#17a2b8", // Mavi ton (Bootstrap Primary)
    paddingVertical: 15,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginBottom: 10, // Son butonun altına da boşluk
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  /* Buton metni */
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* Modal kapsayıcı */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  /* Onaylama / İptal Butonları */
  confirmButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },

  /* Yüklenme ekranı */
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
});

export default ProfileScreen;
