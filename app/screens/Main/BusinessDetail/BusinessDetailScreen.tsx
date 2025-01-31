import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import PlaceService from "../../../services/googlePlacesService";
import { PlaceDetailResult } from "../../../models/googlePlaces/PlaceDetailResult";
import Carousel from "react-native-snap-carousel";
import { Pagination } from "react-native-snap-carousel";

const BusinessDetailScreen = () => {
  const route = useRoute();
  const activeSlideRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const { place_id } = route.params as { place_id: string };
  const [placeDetail, setPlaceDetail] = useState<PlaceDetailResult | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await PlaceService.getPlaceDetails(place_id);
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
    console.log("İşletme Sahiplenildi: ", placeDetail?.result.name);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.carouselContainer}>
              {placeDetail?.result.photoUrls &&
              placeDetail?.result.photoUrls.length > 0 ? (
                <>
                  <Carousel
                    data={placeDetail?.result.photoUrls || []}
                    renderItem={renderImageItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={Dimensions.get("window").width - 40}
                    vertical={false}
                    layout="default"
                    loop={false} // Loop KAPATILDI
                    onSnapToItem={(index) => {
                      if (activeSlideRef.current !== index) {
                        activeSlideRef.current = index;
                        console.log("Güncellenen Slide:", index);
                        setActiveSlide(index);
                      }
                    }}
                  />

                  <Pagination
                    dotsLength={placeDetail?.result.photoUrls.length || 0}
                    activeDotIndex={activeSlide}
                    containerStyle={{ paddingVertical: 10 }}
                    dotStyle={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      marginHorizontal: 8,
                      backgroundColor: "#FFA500",
                    }}
                    inactiveDotStyle={{
                      backgroundColor: "#C4C4C4",
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.8}
                  />
                </>
              ) : (
                <Image
                  source={{ uri: "https://via.placeholder.com/400" }}
                  style={styles.carouselImage}
                />
              )}
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.title}>{placeDetail?.result.name}</Text>
              <Text style={styles.address}>{placeDetail?.result.vicinity}</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.rating}>
                  ⭐ {placeDetail?.result.rating} / 5 (
                  {placeDetail?.result.user_ratings_total} oy)
                </Text>
              </View>
              {placeDetail?.result.formatted_phone_number && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `tel:${placeDetail?.result.formatted_phone_number}`
                    )
                  }
                  style={styles.callButton}
                >
                  <Text style={styles.callButtonText}>📞 Ara</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${placeDetail?.result.geometry.location.lat},${placeDetail?.result.geometry.location.lng}`
                  )
                }
                style={styles.mapButton}
              >
                <Text style={styles.mapButtonText}>📍 Google Maps'te Aç</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClaimBusiness}
                style={styles.claimButton}
              >
                <Text style={styles.claimButtonText}>
                  🏢 İşletmeye Sahiplen
                </Text>
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
                title={placeDetail?.result.name}
              />
            </MapView>
          </>
        )}
        data={placeDetail?.result.reviews || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Text style={styles.reviewAuthor}>{item.author_name}</Text>
            <Text style={styles.reviewRating}>⭐ {item.rating} / 5</Text>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  carouselContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  carouselImage: {
    width: Dimensions.get("window").width - 40,
    height: 300,
    borderRadius: 10,
    alignSelf: "center",
    resizeMode: "cover",
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
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    paddingHorizontal: 10,
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
    fontSize: 16,
  },
  reviewRating: {
    fontSize: 16,
    color: "#FFA500",
  },
  reviewText: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA500",
  },
  callButton: {
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  callButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  mapButton: {
    padding: 12,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  mapButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  claimButton: {
    padding: 12,
    backgroundColor: "#FF9800",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  claimButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 15,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BusinessDetailScreen;
