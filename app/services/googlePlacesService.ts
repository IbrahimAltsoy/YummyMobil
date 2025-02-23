import axios from "axios";
import API_URL from "../utils/baseUrl";
import { GoogleNearPlaces } from "../models/googlePlaces/googleNearPlaces";
import { PlaceDetailResult } from "../models/googlePlaces/PlaceDetailResult";
import { GetNearbyPlacesQueryRequest } from "../models/googlePlaces/GetNearbyPlacesQueryRequest";
import { GetNearByPlaceDetailQueryRequest } from "../models/googlePlaces/GetNearByPlaceDetailQueryRequest";
import apiClient from "../utils/apiClient";
const GooglePlacesService = {
  async getNearbyPlaces(
    request: GetNearbyPlacesQueryRequest
  ): Promise<GoogleNearPlaces[]> {
    try {
      const response = await axios.get(
        `${API_URL.API_BASE_URL}/api/get-nearby-places`,
        {
          params: request,
        }
      );

      // Backend'den gelen verileri modelle uyumlu hale getir
      const places: GoogleNearPlaces[] = response.data.map((place: any) => ({
        name: place.name,
        vicinity: place.vicinity,
        rating: place.rating || 0,
        place_id: place.place_Id, // Backend'den gelen place_Id, modelde place_id olarak dönüştürülüyor
        photoUrl: place.photoUrl,
        user_Ratings_Total: place.user_Ratings_Total,
        distance: place.distance,
      }));

      return places;
    } catch (error: any) {
      console.error("Google Places API Error:", error);
      throw new Error("Yakındaki mekanları alırken bir hata oluştu.");
    }
  },

  async getPlaceDetails(
    requst: GetNearByPlaceDetailQueryRequest
  ): Promise<PlaceDetailResult | null> {
    try {
      const response = await apiClient.get(
        `${API_URL.API_BASE_URL}/api/get-business-detail/${requst.placeId}`,
        {
          params: { latitude: requst.latitude, longitude: requst.longitude }, // Konum parametrelerini API'ye gönderiyoruz
        }
      );
      return response.data;
    } catch (error) {
      console.error("İşletme detayları alınırken hata oluştu:", error);
      return null;
    }
  },
};

export default GooglePlacesService;
