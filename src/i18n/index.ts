import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "./resources/zh.json";
import en from "./resources/en.json";

const resources = {
  zh,
  en,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
  })
  .catch((err) => console.log("failed to set up i18n", err));

export default i18n;
