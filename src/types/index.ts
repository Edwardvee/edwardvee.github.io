export type Languages = "EN" | "ES";

export type LanguageContextType = {
  language: Languages;
  setLanguage: (lang: Languages) => void;
};
