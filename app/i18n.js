import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

const LANGUAGE_KEY = "appLanguage";

const loadLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  return savedLanguage || "tr"; // Varsayılan dil Türkçe olsun
};

loadLanguage().then((lang) => {
  i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, tr: { translation: tr } },
    lng: lang,
    fallbackLng: "tr",
    interpolation: { escapeValue: false },
  });
});

export const changeAppLanguage = async (lang) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  i18n.changeLanguage(lang);
};

export default i18n;
