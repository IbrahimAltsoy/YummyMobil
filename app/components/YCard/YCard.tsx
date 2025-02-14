import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

interface YCardProps {
  name: string;
  vicinity: string;
  rating: number;
  photoUrl?: string;
  user_Ratings_Total: number;
  place_id: string;
  distance: number;
  onPlacePress: (place_id: string) => void;
}

const YCard: React.FC<YCardProps> = ({
  name,
  vicinity,
  rating,
  photoUrl,
  user_Ratings_Total,
  place_id,
  distance,
  onPlacePress,
}) => {
  const { t } = useTranslation(); // 📌 Çeviri fonksiyonunu çağırdık

  return (
    <View style={styles.card}>
      {/* 📌 Görsel Sola Alındı */}
      <Image source={{ uri: photoUrl }} style={styles.image} />

      {/* 📌 Sağ Tarafta İşletme Bilgileri */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.vicinity}>{vicinity}</Text>

        {/* 📌 Puanlama ve Mesafe */}
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="gold" />
            <Text style={styles.rating}>
              {rating > 0 ? `${rating.toFixed(1)} / 5` : "Not Rated"}
            </Text>
            <Text style={styles.ratingCount}>
              ({user_Ratings_Total} {t("oy")})
            </Text>
          </View>

          {/* 📌 Mesafe */}
          <View style={styles.distanceContainer}>
            <Icon name="location" size={14} color="red" />
            <Text style={styles.distance}>{distance.toFixed(2)} km</Text>
          </View>
        </View>

        {/* 📌 Detayları Gör Butonu */}
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => onPlacePress(place_id)}
        >
          <Text style={styles.detailButtonText}>{t("Detayları Gör")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Yatay hizalama
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 8,
    padding: 10,
    width: "95%",
    alignSelf: "center",
    alignItems: "center", // Dikey hizalama
  },
  image: {
    width: 100, // Küçük ve solda
    height: 100,
    borderRadius: 10,
    marginRight: 10, // Sağ tarafa boşluk bırak
  },
  infoContainer: {
    flex: 1, // Sağ tarafın tüm alanı kaplamasını sağla
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  vicinity: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
  },
  ratingCount: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
  },
  detailButton: {
    marginTop: 6,
    backgroundColor: "#FFA726", // Daha yumuşak turuncu tonu
    paddingVertical: 6, // Yüksekliği küçülttük
    borderRadius: 20, // Daha zarif ve yuvarlak
    alignItems: "center",
    width: "80%", // Butonu biraz daralttık
    alignSelf: "center",
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 13, // Yazıyı biraz küçülttük
    fontWeight: "bold",
  },
});

export default YCard;
