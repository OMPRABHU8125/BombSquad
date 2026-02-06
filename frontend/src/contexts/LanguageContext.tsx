import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'mr';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Common
  welcome: { en: 'Welcome', hi: 'स्वागत', te: 'స్వాగతం', ta: 'வரவேற்கிறோம்', kn: 'ಸ್ವಾಗತ', mr: 'स्वागत' },
  login: { en: 'Login', hi: 'लॉगिन', te: 'లాగిన్', ta: 'உள்நுழைவு', kn: 'ಲಾಗಿನ್', mr: 'लॉगिन' },
  quickUse: { en: 'Quick Use', hi: 'त्वरित उपयोग', te: 'త్వరిత వాడకం', ta: 'விரைவு பயன்பாடு', kn: 'ತ್ವರಿತ ಬಳಕೆ', mr: 'त्वरित वापर' },
  continueWithGoogle: { en: 'Continue with Google', hi: 'Google से जारी रखें', te: 'Google తో కొనసాగించండి', ta: 'Google உடன் தொடரவும்', kn: 'Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ', mr: 'Google सह सुरू ठेवा' },
  orContinueWithout: { en: 'or continue without account', hi: 'या बिना अकाउंट के जारी रखें', te: 'లేదా ఖాతా లేకుండా కొనసాగించండి', ta: 'அல்லது கணக்கு இல்லாமல் தொடரவும்', kn: 'ಅಥವಾ ಖಾತೆಯಿಲ್ಲದೆ ಮುಂದುವರಿಸಿ', mr: 'किंवा खात्याशिवाय सुरू ठेवा' },
  
  // Home
  welcomeBack: { en: 'Welcome back', hi: 'फिर से स्वागत', te: 'తిరిగి స్వాగతం', ta: 'மீண்டும் வரவேற்கிறோம்', kn: 'ಮತ್ತೆ ಸ್ವಾಗತ', mr: 'पुन्हा स्वागत' },
  quickActions: { en: 'Quick Actions', hi: 'त्वरित क्रियाएं', te: 'త్వరిత చర్యలు', ta: 'விரைவு செயல்கள்', kn: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು', mr: 'त्वरित क्रिया' },
  recentScans: { en: 'Recent Scans', hi: 'हाल की स्कैन', te: 'ఇటీవల స్కాన్లు', ta: 'சமீபத்திய ஸ்கேன்கள்', kn: 'ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್‌ಗಳು', mr: 'अलीकडील स्कॅन' },
  
  // Scan
  scanYourCrop: { en: 'Scan Your Crop', hi: 'अपनी फसल स्कैन करें', te: 'మీ పంటను స్కాన్ చేయండి', ta: 'உங்கள் பயிரை ஸ்கேன் செய்யுங்கள்', kn: 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ', mr: 'आपले पीक स्कॅन करा' },
  uploadImage: { en: 'Upload Image', hi: 'छवि अपलोड करें', te: 'చిత్రం అప్‌లోడ్ చేయండి', ta: 'படத்தை பதிவேற்றவும்', kn: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', mr: 'प्रतिमा अपलोड करा' },
  takePhoto: { en: 'Take Photo', hi: 'फोटो लें', te: 'ఫోటో తీయండి', ta: 'புகைப்படம் எடுக்கவும்', kn: 'ಫೋಟೋ ತೆಗೆಯಿರಿ', mr: 'फोटो घ्या' },
  
  // Result
  diseaseDetected: { en: 'Disease Detected', hi: 'रोग का पता चला', te: 'వ్యాధి కనుగొనబడింది', ta: 'நோய் கண்டறியப்பட்டது', kn: 'ರೋಗ ಪತ್ತೆಯಾಗಿದೆ', mr: 'रोग आढळला' },
  confidence: { en: 'Confidence', hi: 'विश्वास', te: 'విశ్వాసం', ta: 'நம்பகத்தன்மை', kn: 'ವಿಶ್ವಾಸ', mr: 'आत्मविश्वास' },
  severity: { en: 'Severity', hi: 'गंभीरता', te: 'తీవ్రత', ta: 'தீவிரம்', kn: 'ತೀವ್ರತೆ', mr: 'तीव्रता' },
  stage: { en: 'Stage', hi: 'चरण', te: 'దశ', ta: 'நிலை', kn: 'ಹಂತ', mr: 'टप्पा' },
  spreadRisk: { en: 'Spread Risk', hi: 'फैलने का खतरा', te: 'వ్యాప్తి ప్రమాదం', ta: 'பரவும் ஆபத்து', kn: 'ಹರಡುವ ಅಪಾಯ', mr: 'पसरण्याचा धोका' },
  warningRadius: { en: 'Warning Radius', hi: 'चेतावनी त्रिज्या', te: 'హెచ్చరిక వ్యాసార్థం', ta: 'எச்சரிக்கை ஆரம்', kn: 'ಎಚ್ಚರಿಕೆ ತ್ರಿಜ್ಯ', mr: 'चेतावणी त्रिज्या' },
  timeline: { en: 'Timeline', hi: 'समयरेखा', te: 'కాలక్రమం', ta: 'காலவரிசை', kn: 'ಟೈಮ್‌ಲೈನ್', mr: 'टाइमलाइन' },
  aboutDisease: { en: 'About this Disease', hi: 'इस रोग के बारे में', te: 'ఈ వ్యాధి గురించి', ta: 'இந்த நோயைப் பற்றி', kn: 'ಈ ರೋಗದ ಬಗ್ಗೆ', mr: 'या रोगाबद्दल' },
  viewRemedies: { en: 'View Remedies', hi: 'उपचार देखें', te: 'నివారణలు చూడండి', ta: 'தீர்வுகளைக் காண்க', kn: 'ಪರಿಹಾರಗಳನ್ನು ನೋಡಿ', mr: 'उपचार पहा' },
  saveReport: { en: 'Save Report', hi: 'रिपोर्ट सहेजें', te: 'నివేదికను సేవ్ చేయండి', ta: 'அறிக்கையை சேமிக்கவும்', kn: 'ವರದಿಯನ್ನು ಉಳಿಸಿ', mr: 'अहवाल जतन करा' },
  
  // Remedies
  homeRemedies: { en: 'Home Remedies', hi: 'घरेलू उपचार', te: 'ఇంట్లో చేయగలిగే నివారణలు', ta: 'வீட்டு வைத்தியம்', kn: 'ಮನೆ ಮದ್ದುಗಳು', mr: 'घरगुती उपाय' },
  fertilizers: { en: 'Fertilizers', hi: 'उर्वरक', te: 'ఎరువులు', ta: 'உரங்கள்', kn: 'ರಸಗೊಬ್ಬರಗಳು', mr: 'खते' },
  plantDoctors: { en: 'Plant Doctors Near Me', hi: 'मेरे पास पौधों के डॉक्टर', te: 'నా సమీపంలోని మొక్కల వైద్యులు', ta: 'அருகிலுள்ள தாவர மருத்துவர்கள்', kn: 'ನನ್ನ ಹತ್ತಿರದ ಸಸ್ಯ ವೈದ್ಯರು', mr: 'माझ्या जवळचे वनस्पती डॉक्टर' },
  wrongSprays: { en: 'Wrong Sprays to Avoid', hi: 'टालने योग्य गलत स्प्रे', te: 'తప్పించాల్సిన తప్పుడు స్ప్రేలు', ta: 'தவிர்க்க வேண்டிய தவறான தெளிப்புகள்', kn: 'ತಪ್ಪಿಸಬೇಕಾದ ತಪ್ಪು ಸ್ಪ್ರೇಗಳು', mr: 'टाळावयाचे चुकीचे फवारे' },
  shopOnline: { en: 'Shop Online', hi: 'ऑनलाइन खरीदें', te: 'ఆన్‌లైన్‌లో షాపింగ్ చేయండి', ta: 'ஆன்லைனில் வாங்குங்கள்', kn: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಖರೀದಿಸಿ', mr: 'ऑनलाइन खरेदी करा' },
  watchVideo: { en: 'Watch Video', hi: 'वीडियो देखें', te: 'వీడియో చూడండి', ta: 'வீடியோவைப் பாருங்கள்', kn: 'ವೀಡಿಯೊ ನೋಡಿ', mr: 'व्हिडिओ पहा' },
  openMaps: { en: 'Open Maps', hi: 'नक्शा खोलें', te: 'మ్యాప్‌లు తెరవండి', ta: 'வரைபடத்தைத் திறக்கவும்', kn: 'ನಕ್ಷೆಗಳನ್ನು ತೆರೆಯಿರಿ', mr: 'नकाशे उघडा' },
  readAloud: { en: 'Read Aloud', hi: 'जोर से पढ़ें', te: 'బిగ్గరగా చదవండి', ta: 'சத்தமாக படிக்கவும்', kn: 'ಜೋರಾಗಿ ಓದಿ', mr: 'मोठ्याने वाचा' },
  
  // Profile
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल', te: 'ప్రొఫైల్', ta: 'சுயவிவரம்', kn: 'ಪ್ರೊಫೈಲ್', mr: 'प्रोफाइल' },
  settings: { en: 'Settings', hi: 'सेटिंग्स', te: 'సెట్టింగ్‌లు', ta: 'அமைப்புகள்', kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', mr: 'सेटिंग्ज' },
  
  // Languages
  selectLanguage: { en: 'Select Language', hi: 'भाषा चुनें', te: 'భాషను ఎంచుకోండి', ta: 'மொழியைத் தேர்ந்தெடுக்கவும்', kn: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', mr: 'भाषा निवडा' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
];

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
