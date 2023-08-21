import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import commonEn from 'assets/locales/en/en.json';

const resources = {
  en: {
    translation: commonEn,
  },
};

type TranslationKeys = `${keyof typeof commonEn}`;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    keySeparator: '.',
    resources,
  });

export type ITranslationKeys = TranslationKeys | `${TranslationKeys}.${string}`;
export default i18n;
