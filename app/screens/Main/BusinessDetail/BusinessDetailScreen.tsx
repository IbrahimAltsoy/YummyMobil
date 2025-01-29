import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const fakeBusiness = {
  id: "123456",
  name: "Örnek İşletme",
  address: "123 Örnek Sokak, İstanbul",
  image: "https://picsum.photos/400/300",
  rating: 4.5,
  reviewCount: 120,
  isOpen: true,
  phone: "+905551234567",
  latitude: 41.0082,
  longitude: 28.9784,
  distance: "2.3 km",
  description: "Kahvaltı, Öğle Yemeği, Akşam Yemeği servisi yapılmaktadır.",
  workingHours: "08:00 - 22:00",
};

const fakeReviews = [
  { author_name: "Ali", rating: 5, text: "Harika bir deneyimdi!" },
  { author_name: "Ayşe", rating: 4, text: "Gayet iyiydi, tekrar gelirim." },
  { author_name: "Mehmet", rating: 3, text: "Ortalama bir yer." },
];

const BusinessDetailScreen = () => {
  const route = useRoute();
  const { business }: any = route.params || { business: fakeBusiness };
  const [reviews, setReviews] = useState(fakeReviews);

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${business?.id}&key=YOUR_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result?.reviews) {
          setReviews(data.result.reviews.slice(0, 10));
        }
      })
      .catch((error) => console.error(error));
  }, [business?.id]);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          {/* İşletme Kapak Fotoğrafı */}
          <Image
            source={{
              uri: business?.image,
            }}
            style={styles.image}
          />

          <View style={styles.detailContainer}>
            <Text style={styles.title}>{business?.name}</Text>
            <Text style={styles.address}>{business?.address}</Text>
            <Text style={styles.description}>{business?.description}</Text>
            <Text style={styles.workingHours}>
              🕒 Çalışma Saatleri: {business?.workingHours}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.rating}>
                ⭐ {business?.rating} / 5 ({business?.reviewCount} oy)
              </Text>
              <Text style={styles.distance}>📍 {business?.distance}</Text>
              <Text
                style={[
                  styles.status,
                  { color: business?.isOpen ? "green" : "red" },
                ]}
              >
                {business?.isOpen ? "Açık" : "Kapalı"}
              </Text>
            </View>

            {/* Telefon Numarası */}
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${business?.phone}`)}
              style={styles.phoneButton}
            >
              <Text style={styles.phoneButtonText}>📞 Telefonla Ara</Text>
            </TouchableOpacity>
          </View>

          {/* Harita */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: business?.latitude,
              longitude: business?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: business?.latitude,
                longitude: business?.longitude,
              }}
              title={business?.name}
            />
          </MapView>
        </>
      )}
      data={reviews}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>{item.author_name}</Text>
          <Text style={styles.reviewRating}>⭐ {item.rating} / 5</Text>
          <Text style={styles.reviewText}>{item.text}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  address: {
    color: "gray",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  workingHours: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
  },
  distance: {
    fontSize: 14,
    color: "#555",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneButton: {
    padding: 12,
    backgroundColor: "#FFA500",
    borderRadius: 8,
    alignItems: "center",
  },
  phoneButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  map: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  reviewCard: {
    padding: 10,
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  reviewAuthor: {
    fontWeight: "bold",
  },
  reviewRating: {
    fontSize: 16,
  },
  reviewText: {
    marginTop: 5,
  },
});

export default BusinessDetailScreen;
