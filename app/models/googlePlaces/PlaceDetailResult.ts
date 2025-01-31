export interface PlaceDetailResult {
  result: Place; // Backend'deki "Result" ile eşleşmeli
}

export interface Place {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  place_id: string;
  photos?: Photo[]; // Opsiyonel, çünkü bazen gelmeyebilir
  photoUrls?: string[];
  opening_hours?: OpeningHours;
  geometry: Geometry;
  distance: number;

  // Yeni Eklenen Alanlar
  formatted_phone_number?: string;
  website?: string;
  weekday_text?: string[];
  reviews?: Review[];
  services?: string[];
  menu?: string[];
  social_media?: SocialMedia;
}

export interface Photo {
  photo_reference: string;
  width: number;
  height: number;
  html_attributions: string[];
}

export interface Geometry {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface OpeningHours {
  open_now: boolean;
  weekday_text: string[];
}

export interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}
