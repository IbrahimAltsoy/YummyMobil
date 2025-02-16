/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/App`; params?: Router.UnknownInputParams; } | { pathname: `/i18n`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/GetNearByPlaceDetailQueryRequest`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/SearchFilterSection/SearchFilterSection`; params?: Router.UnknownInputParams; } | { pathname: `/components/YButton`; params?: Router.UnknownInputParams; } | { pathname: `/components/YButton/YButton.Style`; params?: Router.UnknownInputParams; } | { pathname: `/components/YButton/YButton`; params?: Router.UnknownInputParams; } | { pathname: `/components/YCard/YCard`; params?: Router.UnknownInputParams; } | { pathname: `/components/YInput`; params?: Router.UnknownInputParams; } | { pathname: `/components/YInput/YInput.Style`; params?: Router.UnknownInputParams; } | { pathname: `/components/YInput/YInput`; params?: Router.UnknownInputParams; } | { pathname: `/context/AuthContext`; params?: Router.UnknownInputParams; } | { pathname: `/models/auth/AuthContextType`; params?: Router.UnknownInputParams; } | { pathname: `/models/auth/LoginRequest`; params?: Router.UnknownInputParams; } | { pathname: `/models/auth/UserLoginCommandResponse`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/GetNearbyPlacesQueryRequest`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/GoogleNearPlaces`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/PlaceDetailResult`; params?: Router.UnknownInputParams; } | { pathname: `/models/register/RegisterCommandRequest`; params?: Router.UnknownInputParams; } | { pathname: `/models/register/RegisterCommandResponse`; params?: Router.UnknownInputParams; } | { pathname: `/models/token/Token`; params?: Router.UnknownInputParams; } | { pathname: `/models/user/GetUserByIdQueryResponse`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/AuthStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/MainStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/Router`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/TabStack`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Login`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Login/LoginScreen.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Login/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Register`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Register/Register.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Register/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/BusinessDetail/BusinessDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Event/Event.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Event/EventScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Event`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Home/Home.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Home/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Home`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Profile/Profile.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Profile/ProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Service`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Service/Service.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Service/ServiceScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Welcome`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Welcome/Welcome.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Welcome/WelcomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/services/authService`; params?: Router.UnknownInputParams; } | { pathname: `/services/googlePlacesService`; params?: Router.UnknownInputParams; } | { pathname: `/services/userService`; params?: Router.UnknownInputParams; } | { pathname: `/testScreen/CategoryFilter`; params?: Router.UnknownInputParams; } | { pathname: `/testScreen/CommentCard`; params?: Router.UnknownInputParams; } | { pathname: `/testScreen/HeaderSection`; params?: Router.UnknownInputParams; } | { pathname: `/utils/baseUrl`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/App`; params?: Router.UnknownOutputParams; } | { pathname: `/i18n`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/models/googlePlaces/GetNearByPlaceDetailQueryRequest`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/components/SearchFilterSection/SearchFilterSection`; params?: Router.UnknownOutputParams; } | { pathname: `/components/YButton`; params?: Router.UnknownOutputParams; } | { pathname: `/components/YButton/YButton.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/components/YButton/YButton`; params?: Router.UnknownOutputParams; } | { pathname: `/components/YCard/YCard`; params?: Router.UnknownOutputParams; } | { pathname: `/components/YInput`; params?: Router.UnknownOutputParams; } | { pathname: `/components/YInput/YInput.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/components/YInput/YInput`; params?: Router.UnknownOutputParams; } | { pathname: `/context/AuthContext`; params?: Router.UnknownOutputParams; } | { pathname: `/models/auth/AuthContextType`; params?: Router.UnknownOutputParams; } | { pathname: `/models/auth/LoginRequest`; params?: Router.UnknownOutputParams; } | { pathname: `/models/auth/UserLoginCommandResponse`; params?: Router.UnknownOutputParams; } | { pathname: `/models/googlePlaces/GetNearbyPlacesQueryRequest`; params?: Router.UnknownOutputParams; } | { pathname: `/models/googlePlaces/GoogleNearPlaces`; params?: Router.UnknownOutputParams; } | { pathname: `/models/googlePlaces/PlaceDetailResult`; params?: Router.UnknownOutputParams; } | { pathname: `/models/register/RegisterCommandRequest`; params?: Router.UnknownOutputParams; } | { pathname: `/models/register/RegisterCommandResponse`; params?: Router.UnknownOutputParams; } | { pathname: `/models/token/Token`; params?: Router.UnknownOutputParams; } | { pathname: `/models/user/GetUserByIdQueryResponse`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/AuthStack`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/MainStack`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/Router`; params?: Router.UnknownOutputParams; } | { pathname: `/navigations/TabStack`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Auth/Login`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Auth/Login/LoginScreen.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Auth/Login/LoginScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Auth/Register`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Auth/Register/Register.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Auth/Register/RegisterScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/BusinessDetail/BusinessDetailScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Event/Event.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Event/EventScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Event`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Home/Home.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Home/HomeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Home`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Profile/Profile.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Profile/ProfileScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Service`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Service/Service.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Main/Service/ServiceScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Welcome`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Welcome/Welcome.Style`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/Welcome/WelcomeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/services/authService`; params?: Router.UnknownOutputParams; } | { pathname: `/services/googlePlacesService`; params?: Router.UnknownOutputParams; } | { pathname: `/services/userService`; params?: Router.UnknownOutputParams; } | { pathname: `/testScreen/CategoryFilter`; params?: Router.UnknownOutputParams; } | { pathname: `/testScreen/CommentCard`; params?: Router.UnknownOutputParams; } | { pathname: `/testScreen/HeaderSection`; params?: Router.UnknownOutputParams; } | { pathname: `/utils/baseUrl`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/App${`?${string}` | `#${string}` | ''}` | `/i18n${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/models/googlePlaces/GetNearByPlaceDetailQueryRequest${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/components/SearchFilterSection/SearchFilterSection${`?${string}` | `#${string}` | ''}` | `/components/YButton${`?${string}` | `#${string}` | ''}` | `/components/YButton/YButton.Style${`?${string}` | `#${string}` | ''}` | `/components/YButton/YButton${`?${string}` | `#${string}` | ''}` | `/components/YCard/YCard${`?${string}` | `#${string}` | ''}` | `/components/YInput${`?${string}` | `#${string}` | ''}` | `/components/YInput/YInput.Style${`?${string}` | `#${string}` | ''}` | `/components/YInput/YInput${`?${string}` | `#${string}` | ''}` | `/context/AuthContext${`?${string}` | `#${string}` | ''}` | `/models/auth/AuthContextType${`?${string}` | `#${string}` | ''}` | `/models/auth/LoginRequest${`?${string}` | `#${string}` | ''}` | `/models/auth/UserLoginCommandResponse${`?${string}` | `#${string}` | ''}` | `/models/googlePlaces/GetNearbyPlacesQueryRequest${`?${string}` | `#${string}` | ''}` | `/models/googlePlaces/GoogleNearPlaces${`?${string}` | `#${string}` | ''}` | `/models/googlePlaces/PlaceDetailResult${`?${string}` | `#${string}` | ''}` | `/models/register/RegisterCommandRequest${`?${string}` | `#${string}` | ''}` | `/models/register/RegisterCommandResponse${`?${string}` | `#${string}` | ''}` | `/models/token/Token${`?${string}` | `#${string}` | ''}` | `/models/user/GetUserByIdQueryResponse${`?${string}` | `#${string}` | ''}` | `/navigations/AuthStack${`?${string}` | `#${string}` | ''}` | `/navigations/MainStack${`?${string}` | `#${string}` | ''}` | `/navigations/Router${`?${string}` | `#${string}` | ''}` | `/navigations/TabStack${`?${string}` | `#${string}` | ''}` | `/screens/Auth/Login${`?${string}` | `#${string}` | ''}` | `/screens/Auth/Login/LoginScreen.Style${`?${string}` | `#${string}` | ''}` | `/screens/Auth/Login/LoginScreen${`?${string}` | `#${string}` | ''}` | `/screens/Auth/Register${`?${string}` | `#${string}` | ''}` | `/screens/Auth/Register/Register.Style${`?${string}` | `#${string}` | ''}` | `/screens/Auth/Register/RegisterScreen${`?${string}` | `#${string}` | ''}` | `/screens/Main/BusinessDetail/BusinessDetailScreen${`?${string}` | `#${string}` | ''}` | `/screens/Main/Event/Event.Style${`?${string}` | `#${string}` | ''}` | `/screens/Main/Event/EventScreen${`?${string}` | `#${string}` | ''}` | `/screens/Main/Event${`?${string}` | `#${string}` | ''}` | `/screens/Main/Home/Home.Style${`?${string}` | `#${string}` | ''}` | `/screens/Main/Home/HomeScreen${`?${string}` | `#${string}` | ''}` | `/screens/Main/Home${`?${string}` | `#${string}` | ''}` | `/screens/Main/Profile/Profile.Style${`?${string}` | `#${string}` | ''}` | `/screens/Main/Profile/ProfileScreen${`?${string}` | `#${string}` | ''}` | `/screens/Main/Service${`?${string}` | `#${string}` | ''}` | `/screens/Main/Service/Service.Style${`?${string}` | `#${string}` | ''}` | `/screens/Main/Service/ServiceScreen${`?${string}` | `#${string}` | ''}` | `/screens/Welcome${`?${string}` | `#${string}` | ''}` | `/screens/Welcome/Welcome.Style${`?${string}` | `#${string}` | ''}` | `/screens/Welcome/WelcomeScreen${`?${string}` | `#${string}` | ''}` | `/services/authService${`?${string}` | `#${string}` | ''}` | `/services/googlePlacesService${`?${string}` | `#${string}` | ''}` | `/services/userService${`?${string}` | `#${string}` | ''}` | `/testScreen/CategoryFilter${`?${string}` | `#${string}` | ''}` | `/testScreen/CommentCard${`?${string}` | `#${string}` | ''}` | `/testScreen/HeaderSection${`?${string}` | `#${string}` | ''}` | `/utils/baseUrl${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/App`; params?: Router.UnknownInputParams; } | { pathname: `/i18n`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/GetNearByPlaceDetailQueryRequest`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/SearchFilterSection/SearchFilterSection`; params?: Router.UnknownInputParams; } | { pathname: `/components/YButton`; params?: Router.UnknownInputParams; } | { pathname: `/components/YButton/YButton.Style`; params?: Router.UnknownInputParams; } | { pathname: `/components/YButton/YButton`; params?: Router.UnknownInputParams; } | { pathname: `/components/YCard/YCard`; params?: Router.UnknownInputParams; } | { pathname: `/components/YInput`; params?: Router.UnknownInputParams; } | { pathname: `/components/YInput/YInput.Style`; params?: Router.UnknownInputParams; } | { pathname: `/components/YInput/YInput`; params?: Router.UnknownInputParams; } | { pathname: `/context/AuthContext`; params?: Router.UnknownInputParams; } | { pathname: `/models/auth/AuthContextType`; params?: Router.UnknownInputParams; } | { pathname: `/models/auth/LoginRequest`; params?: Router.UnknownInputParams; } | { pathname: `/models/auth/UserLoginCommandResponse`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/GetNearbyPlacesQueryRequest`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/GoogleNearPlaces`; params?: Router.UnknownInputParams; } | { pathname: `/models/googlePlaces/PlaceDetailResult`; params?: Router.UnknownInputParams; } | { pathname: `/models/register/RegisterCommandRequest`; params?: Router.UnknownInputParams; } | { pathname: `/models/register/RegisterCommandResponse`; params?: Router.UnknownInputParams; } | { pathname: `/models/token/Token`; params?: Router.UnknownInputParams; } | { pathname: `/models/user/GetUserByIdQueryResponse`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/AuthStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/MainStack`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/Router`; params?: Router.UnknownInputParams; } | { pathname: `/navigations/TabStack`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Login`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Login/LoginScreen.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Login/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Register`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Register/Register.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Auth/Register/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/BusinessDetail/BusinessDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Event/Event.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Event/EventScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Event`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Home/Home.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Home/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Home`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Profile/Profile.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Profile/ProfileScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Service`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Service/Service.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Main/Service/ServiceScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Welcome`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Welcome/Welcome.Style`; params?: Router.UnknownInputParams; } | { pathname: `/screens/Welcome/WelcomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/services/authService`; params?: Router.UnknownInputParams; } | { pathname: `/services/googlePlacesService`; params?: Router.UnknownInputParams; } | { pathname: `/services/userService`; params?: Router.UnknownInputParams; } | { pathname: `/testScreen/CategoryFilter`; params?: Router.UnknownInputParams; } | { pathname: `/testScreen/CommentCard`; params?: Router.UnknownInputParams; } | { pathname: `/testScreen/HeaderSection`; params?: Router.UnknownInputParams; } | { pathname: `/utils/baseUrl`; params?: Router.UnknownInputParams; };
    }
  }
}
