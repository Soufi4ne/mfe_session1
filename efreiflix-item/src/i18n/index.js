import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initI18n } from "shell/i18nConfig";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        item: {
          watchNow: "Regarder maintenant",
          moreInfo: "Plus d'informations",
          rating: "Note: {{rating}}/10",
          duration: "{{minutes}} minutes",
          genres: "Genres",
          cast: "Distribution",
          director: "Réalisateur",
          releaseYear: "Année de sortie",
          episodes: "Épisodes",
          season: "Saison {{number}}",
        },
        genres: {
          action: "Action",
          adventure: "Aventure",
          comedy: "Comédie",
          drama: "Drame",
          fantasy: "Fantaisie",
          horror: "Horreur",
          mystery: "Mystère",
          romance: "Romance",
          sciFi: "Science-fiction",
          thriller: "Thriller",
        },
      },
    },
    en: {
      translation: {
        item: {
          watchNow: "Watch Now",
          moreInfo: "More Info",
          rating: "Rating: {{rating}}/10",
          duration: "{{minutes}} minutes",
          genres: "Genres",
          cast: "Cast",
          director: "Director",
          releaseYear: "Release Year",
          episodes: "Episodes",
          season: "Season {{number}}",
        },
        genres: {
          action: "Action",
          adventure: "Adventure",
          comedy: "Comedy",
          drama: "Drama",
          fantasy: "Fantasy",
          horror: "Horror",
          mystery: "Mystery",
          romance: "Romance",
          sciFi: "Sci-Fi",
          thriller: "Thriller",
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
