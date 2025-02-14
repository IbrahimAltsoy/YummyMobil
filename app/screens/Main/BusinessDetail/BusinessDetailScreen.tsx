import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { PlaceDetailResult } from "@/app/models/googlePlaces/PlaceDetailResult";
import PlaceService from "../../../services/googlePlacesService";
import * as Location from "expo-location";
import { useTranslation } from "react-i18next";

const renderReviewItem = ({ item }: any) => (
  <View style={styles.reviewItem}>
    <Text style={styles.reviewAuthor}>
      {item.author_Name} - ⭐{item.rating}
    </Text>
    <Text>{item.text}</Text>
    <Text style={styles.reviewTime}>{item.relative_Time_Description}</Text>
  </View>
);
const PlaceDetailScreen = () => {
  const route = useRoute();
  const [placeDetail, setPlaceDetail] = useState<PlaceDetailResult | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { place_id } = route.params as { place_id: string };
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      //

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Konum izni reddedildi.");
        setLoading(false);
        return;
      }

      let location: any = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,

          timeInterval: 1000,
        }),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Konum zaman aşımına uğradı")),
            8000
          )
        ),
      ]);

      //
      const data = await PlaceService.getPlaceDetails(
        place_id,
        location.coords.latitude,
        location.coords.longitude
      );
      setPlaceDetail(data);
      setLoading(false);
    };
    fetchData();
  }, [place_id]);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="blue" style={styles.loader} />
    );
  }
  const renderImageItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  const handleClaimBusiness = () => {
    console.log("Claim Business");
  };
  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${placeDetail?.result.geometry.location.lat},${placeDetail?.result.geometry.location.lng}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Carousel
        data={placeDetail?.result.photoUrls || []}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.carouselImage} />
        )}
        sliderWidth={400}
        itemWidth={300}
        layout="default"
        loop
        vertical={false}
      />

      <Text style={styles.title}>{placeDetail?.result.name}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.address}>
          {placeDetail?.result.vicinity
            ? placeDetail?.result.vicinity
            : t("Yok")}
        </Text>

        <View style={styles.rowContainer}>
          <Text
            style={
              placeDetail?.result.opening_Hours?.open_Now
                ? styles.openStatus
                : styles.closedStatus
            }
          >
            {placeDetail?.result.opening_Hours?.open_Now
              ? t("🟢 (Açık)")
              : t("🔴 (Kapalı)")}
          </Text>
          {placeDetail?.result.rating ? (
            <Text style={styles.rating}>
              ⭐ {placeDetail?.result.rating} / 5 (
              {placeDetail?.result.user_Ratings_Total} {t("oy")})
            </Text>
          ) : (
            <Text style={styles.rating}>⭐ {t("Puanlama Yok")}</Text>
          )}
        </View>
      </View>

      <View style={styles.contactContainer}>
        <TouchableOpacity
          onPress={() =>
            placeDetail?.result?.formatted_Phone_Number
              ? Linking.openURL(
                  `tel:${placeDetail?.result.formatted_Phone_Number}`
                )
              : null
          }
          style={styles.phoneButton}
          disabled={!placeDetail?.result?.formatted_Phone_Number} // Eğer numara yoksa buton devre dışı kalır
        >
          <Text style={styles.phoneButtonText}>
            📞 {placeDetail?.result?.formatted_Phone_Number || t("Yok")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            placeDetail?.result?.website
              ? Linking.openURL(placeDetail?.result.website)
              : null
          }
          style={styles.websiteButton}
          disabled={!placeDetail?.result?.website} // Eğer site bilgisi yoksa buton devre dışı kalır
        >
          <Text style={styles.websiteButtonText}>
            🌍{" "}
            {placeDetail?.result?.website
              ? t("Siteyi Gör")
              : t("Site Bilgisi Yok")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialMediaContainer}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              placeDetail?.result?.social_Media?.instagram
                ? ""
                : t("Instagram bilgisi bulunmamaktadır.")
            )
          }
        >
          <FontAwesome name="instagram" size={24} color="#E4405F" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              placeDetail?.result.social_Media?.facebook
                ? ""
                : t("Facebook bilgisi bulunmamaktadır.")
            )
          }
        >
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              placeDetail?.result.social_Media?.twitter
                ? ""
                : t("Twitter bilgisi bulunmamaktadır.")
            )
          }
        >
          <FontAwesome name="twitter" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: placeDetail?.result.geometry.location.lat || 0,
          longitude: placeDetail?.result.geometry.location.lng || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: placeDetail?.result.geometry.location.lat || 0,
            longitude: placeDetail?.result.geometry.location.lng || 0,
          }}
          title={placeDetail?.result?.name}
        />
      </MapView>

      <TouchableOpacity onPress={openInMaps} style={styles.button}>
        <Text style={styles.buttonText}>
          📍 {t("İşletmeye Git")} ({placeDetail?.result.distance.toFixed(2)}{" "}
          {t("km")})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.claimButton]}>
        <Text style={styles.buttonText}>🎉 {t("İşletmeyi Sahiplen")}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>
          {t("Yorumlar")} ({placeDetail?.result.reviews?.length})
        </Text>
        <FlatList
          data={placeDetail?.result.reviews || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderReviewItem}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    color: "#FFB800",
  },
  subtitle: {
    color: "gray",
    marginBottom: 16,
  },
  openStatus: {
    color: "green",
    fontSize: 18,
  },
  closedStatus: {
    color: "red",
    fontSize: 18,
  },

  detailContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  address: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA500",
  },
  reviewCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  // openStatus: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "#28A745",
  // },
  distance: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6C757D",
    marginTop: 5,
  },

  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  phoneButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  phoneButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  websiteButton: {
    backgroundColor: "#FFB800",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  websiteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  link: {
    color: "#FFB800",
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  map: {
    height: 200,
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  claimButton: {
    backgroundColor: "#FFB800",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  reviewItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  reviewAuthor: {
    fontWeight: "bold",
  },
  reviewTime: {
    color: "gray",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PlaceDetailScreen;
