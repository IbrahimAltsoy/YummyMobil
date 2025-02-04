export interface PlaceDetailResult {
  result: Place; // Backend'deki "Result" ile eşleşmeli
}

export interface Place {
  name: string;
  vicinity: string;
  rating: number;
  user_Ratings_Total: number;
  place_id: string;
  photos?: Photo[]; // Opsiyonel, çünkü bazen gelmeyebilir
  photoUrls?: string[];
  opening_Hours?: OpeningHours;
  geometry: Geometry;
  distance: number;

  // Yeni Eklenen Alanlar
  formatted_Phone_Number?: string;
  website?: string;
  weekday_text?: string[];
  reviews?: Review[];
  services?: string[];
  menu?: string[];
  social_Media?: SocialMedia;
}

export interface Photo {
  photo_reference: string;
  width: number;
  height: number;
  html_Attributions: string[];
}

export interface Geometry {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface OpeningHours {
  open_Now: boolean;
  weekday_Text: string[];
}

export interface Review {
  author_Name: string;
  rating: number;
  text: string;
  relative_Time_Description: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}
