import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons/";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;
const cardHeight = 100;

const EventScreen = () => {
  const { t } = useTranslation(); // 📌 Çeviri fonksiyonunu çağırdık
  const events: any = [
    {
      id: 1,
      name: t("Şehrinizde Yaklaşan Etkinlikler"),
      icon: "musical-notes-outline",
      color: "#FF5733",
    },
    {
      id: 2,
      name: t("Nöbetçi Eczaneler"),
      icon: "medkit-outline",
      color: "#4CAF50",
    },
    {
      id: 3,
      name: t("Bugün ve Önümüzdeki Günlerin Tahmini"),
      icon: "cloudy-outline",
      color: "#2196F3",
    },
    {
      id: 4,
      name: t("Şehrinizde Yaklaşan Özel Günler"),
      icon: "calendar-outline",
      color: "#9C27B0",
    },
    {
      id: 5,
      name: t("Şehir Verileri ve Analizler"),
      icon: "stats-chart-outline",
      color: "#FFC107",
    },
    {
      id: 6,
      name: t("Afet ve Güvenlik Uyarıları"),
      icon: "alert-circle-outline",
      color: "#F44336",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f4f4f4" }}>
      {/* 📌 Üst Kısma Başlık ve Açıklama */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          color: "#333",
        }}
      >
        📍 {t("Şehrinizde Neler Oluyor?")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#d32f2f",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        🌟{" "}
        {t("Hava durumu, nöbetçi eczaneler ve önemli etkinlikleri kaçırmayın!")}
      </Text>

      {/* 📌 2 Sütunlu Kartlar */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 15,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: cardWidth,
              height: cardHeight,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: item.color,
              padding: 15,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Ionicons
              name={item.icon}
              size={28}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "bold",
                flex: 1,
              }}
            >
              {t(item.name)}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* 📌 Alt Kısma Açıklama */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#1976d2",
            textAlign: "center",
          }}
        >
          📌 {t("Etkinlik detaylarını görmek için bir kategoriye dokunun.")}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#388e3c",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          🔄 {t("Şehir etkinliklerini güncellemek için yukarı kaydırın!")}
        </Text>
      </View>
    </View>
  );
};

export default EventScreen;
