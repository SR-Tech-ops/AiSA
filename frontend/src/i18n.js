import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                welcome: "Welcome to AiSA!",
                description: "This is the English version of the site.",
                // Add more keys as needed
            },
        },
        ms: {
            translation: {
                welcome: "Selamat datang ke AiSA!",
                description: "Ini adalah versi laman dalam Bahasa Melayu.",
                // Add more keys as needed
            },
        },
        ta: {
            translation: {
                welcome: "AiSA வரவேற்கிறது!",
                description: "இது தமிழ் மொழி பதிப்பு.",
                // Add more keys as needed
            },
        },
        zh: {
            translation: {
                welcome: "欢迎来到AiSA!",
                description: "这是网站的中文版本。",
                // Add more keys as needed
            },
        },
    },
    fallbackLng: "en", // Default language
    interpolation: {
        escapeValue: false, // React handles escaping
    },
});

export default i18n;
