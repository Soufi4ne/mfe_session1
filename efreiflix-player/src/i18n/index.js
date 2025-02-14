import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initI18n } from "shell/i18nConfig";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        player: {
          back: "Retour",
          episodes: "Épisodes",
          season: "Saison {{number}}",
          nextEpisode: "Prochain épisode",
          previousEpisode: "Épisode précédent",
          skipIntro: "Passer l'intro",
          nextUp: "À suivre",
          watchCredits: "Regarder le générique",
        },
        controls: {
          play: "Lecture",
          pause: "Pause",
          rewind: "Reculer de 10s",
          forward: "Avancer de 10s",
          nextEpisode: "Épisode suivant",
          volume: "Volume",
          mute: "Muet",
          unmute: "Activer le son",
          speed: "Vitesse",
          fullscreen: "Plein écran",
          exitFullscreen: "Quitter le plein écran",
          settings: "Paramètres",
          quality: "Qualité",
          subtitles: "Sous-titres",
          audioTracks: "Pistes audio",
        },
        quality: {
          auto: "Automatique",
          high: "Haute (1080p)",
          medium: "Moyenne (720p)",
          low: "Basse (480p)",
        },
        subtitles: {
          off: "Désactivés",
          french: "Français",
          english: "Anglais",
        },
      },
    },
    en: {
      translation: {
        player: {
          back: "Back",
          episodes: "Episodes",
          season: "Season {{number}}",
          nextEpisode: "Next Episode",
          previousEpisode: "Previous Episode",
          skipIntro: "Skip Intro",
          nextUp: "Next Up",
          watchCredits: "Watch Credits",
        },
        controls: {
          play: "Play",
          pause: "Pause",
          rewind: "Rewind 10s",
          forward: "Forward 10s",
          nextEpisode: "Next Episode",
          volume: "Volume",
          mute: "Mute",
          unmute: "Unmute",
          speed: "Speed",
          fullscreen: "Fullscreen",
          exitFullscreen: "Exit Fullscreen",
          settings: "Settings",
          quality: "Quality",
          subtitles: "Subtitles",
          audioTracks: "Audio Tracks",
        },
        quality: {
          auto: "Auto",
          high: "High (1080p)",
          medium: "Medium (720p)",
          low: "Low (480p)",
        },
        subtitles: {
          off: "Off",
          french: "French",
          english: "English",
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
