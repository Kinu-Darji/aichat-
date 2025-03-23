import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translation:{
                greeting:"How can I help you?",
                ask:"Ask any question",
                chat:"New Chat",
                resent:"Recent Chats",
                user:"User",
                setting:"Settings",
                themes:"Themes",
                languages:"Languages",
                english:"English",
                hindi:"Hindi",
                gujarati:"ગુજરાતી",
            }
        },
        hi:{
            translation:{
                greeting:"मैं आपकी क्या सहायता कर सकता हूँ ?",
                ask:"कोई भी प्रश्न पूछें",
                chat:"नई चैट",
                resent:"हाल ही की चैट",
                user:"उपयोगकर्ता",
                setting:"सेटिंग्स",
                themes:"विषय",
                languages:"भाषाएँ",
                english:"English",
                hindi:"हिंदी",
                gujarati:"Gujarati",
            }
        },
        gj:{
            translation:{
                greeting:"હું તમને કેવી રીતે મદદ કરી શકું?",
                ask:"કોઈ પ્રશ્",
                chat:"નવી ચેટ",
                resent:"તાજેતરની ચેટ્સ",
                user:"વપરાશકર્તા",
                setting:"સેટિંગ્સ",
                themes:"વિષય",
                languages:"ભાષાઓ",
                english:"English",
                hindi:"Hindi",
                gujarati: "ગુજરાતી",
            }
        }
    },
    lng:"en",
    debug:false,
    fallbackLng:"en",
    interpolation:{escapeValue:false},
})


export default i18n;