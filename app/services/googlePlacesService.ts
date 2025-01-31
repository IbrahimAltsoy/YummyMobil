import axios from "axios";
import API_URL from "../utils/baseUrl";
import { GoogleNearPlaces } from "../models/googlePlaces/googleNearPlaces";
import { PlaceDetailResult } from "../models/googlePlaces/PlaceDetailResult";

const GooglePlacesService = {
  async getNearbyPlaces(
    latitude: number,
    longitude: number
  ): Promise<GoogleNearPlaces[]> {
    try {
      const response = await axios.get(
        `${API_URL.API_BASE_URL}/test/get-nearby-places`,
        {
          params: { latitude, longitude },
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
  async getPlaceDetails(place_Id: string): Promise<PlaceDetailResult | null> {
    try {
      const response = await axios.get<PlaceDetailResult>(
        `${API_URL.API_BASE_URL}/test/get-business-detail/${place_Id}`
      );
      return response.data;
    } catch (error) {
      console.error("İşletme detayları alınırken hata oluştu:", error);
      return null;
    }
  },
};

export default GooglePlacesService;
