import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { FeedbackService } from "../../services/feedbackService";
import {
  CreateUserFeedbackCommandRequest,
  UserFeedbackEnum,
} from "../../models/UserFeedback/CreateUserFeedbackCommandRequest ";

const FeedbackForm = ({ onClose }: any) => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState<CreateUserFeedbackCommandRequest>({
    title: "",
    message: "",
    userFeedbackEnum: UserFeedbackEnum.Suggestion, // Varsayılan değer
  });

  const feedbackService = new FeedbackService();

  const handleSubmit = async () => {
    if (!feedback.title || !feedback.message) {
      Alert.alert(t("Hata"), t("Başlık ve mesaj alanları zorunludur."));
      return;
    }

    try {
      await feedbackService.createUserFeedback(feedback);
      Alert.alert(t("Başarılı"), t("Geri bildiriminiz gönderildi."));
      onClose();
    } catch (error) {
      Alert.alert(t("Hata"), t("Geri bildirim gönderilirken bir hata oluştu."));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("Geri Bildirim Bulun")}</Text>
      <Picker
        selectedValue={feedback.userFeedbackEnum}
        style={styles.picker}
        onValueChange={(itemValue) =>
          setFeedback((prev) => ({ ...prev, userFeedbackEnum: itemValue }))
        }
      >
        <Picker.Item label="Öneri" value={UserFeedbackEnum.Suggestion} />
        <Picker.Item label="Eleştiri" value={UserFeedbackEnum.Criticism} />
        <Picker.Item
          label="Hata Bildirimi"
          value={UserFeedbackEnum.BugReport}
        />
        <Picker.Item
          label="Özellik Talebi"
          value={UserFeedbackEnum.FeatureRequest}
        />
        <Picker.Item label="Diğer" value={UserFeedbackEnum.Other} />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder={t("Başlık")}
        value={feedback.title}
        onChangeText={(text) =>
          setFeedback((prev) => ({ ...prev, title: text }))
        }
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder={t("Mesaj")}
        value={feedback.message}
        onChangeText={(text) =>
          setFeedback((prev) => ({ ...prev, message: text }))
        }
        multiline
      />

      {/* Enum seçimi için açılır menü */}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("Gönder")}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.buttonText}>{t("İptal")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#1abc9c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackForm;
