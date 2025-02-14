import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initI18n } from "shell/i18nConfig";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        navigation: {
          home: "Accueil",
          series: "Séries",
          movies: "Films",
          newReleases: "Nouveautés",
        },
        logo: {
          title: "EFREIFlix",
        },
      },
    },
    en: {
      translation: {
        navigation: {
          home: "Home",
          series: "Series",
          movies: "Movies",
          newReleases: "New Releases",
        },
        logo: {
          title: "EFREIFlix",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

initI18n(i18n);
export default i18n;
