import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface YCardProps {
  name: string; // İşletme adı
  vicinity: string; // İşletme adresi
  rating: number; // İşletme puanı
  photoUrl?: string; // İşletme fotoğrafı (opsiyonel)
  user_Ratings_Total: number; // Toplam kullanıcı oyu
  place_id: string;
}

const YCard: React.FC<YCardProps> = ({
  name,
  vicinity,
  rating,
  photoUrl,
  user_Ratings_Total,
}) => {
  return (
    <View style={styles.card}>
      {/* İşletme Fotoğrafı */}
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={styles.image} />
      ) : (
        <Text>No Image Available</Text>
      )}

      {/* İşletme Adı */}
      <Text style={styles.name}>{name}</Text>

      {/* İşletme Adresi */}
      <Text style={styles.vicinity}>{vicinity}</Text>

      {/* Derecelendirme ve Kullanıcı Oy Sayısı */}
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="gold" />
        <Text style={styles.rating}>
          {rating > 0 ? `${rating.toFixed(1)} / 5` : "Not Rated"}
        </Text>
        <Text style={styles.ratingCount}>({user_Ratings_Total} reviews)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 10,
    padding: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImageContainer: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  noImageText: {
    color: "#666",
    fontSize: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  vicinity: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  ratingCount: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default YCard;
