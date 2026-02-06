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
  quickUse: { en: 'Quick Use', hi: 'तुरंत शुरू करें', te: 'త్వరిత వాడకం', ta: 'விரைவு பயன்பாடு', kn: 'ತ್ವರಿತ ಬಳಕೆ', mr: 'लगेच सुरू करा' },
  continueWithGoogle: { en: 'Continue with Google', hi: 'Google से जारी रखें', te: 'Google తో కొనసాగించండి', ta: 'Google உடன் தொடரவும்', kn: 'Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ', mr: 'Google ने सुरू ठेवा' },
  orContinueWithout: { en: 'or continue without account', hi: 'या बिना खाते के आगे बढ़ें', te: 'లేదా ఖాతా లేకుండా కొనసాగించండి', ta: 'அல்லது கணக்கு இல்லாமல் தொடரவும்', kn: 'ಅಥವಾ ಖಾತೆಯಿಲ್ಲದೆ ಮುಂದುವರಿಸಿ', mr: 'किंवा खाते शिवाय सुरू ठेवा' },
  
  // Home
  welcomeBack: { en: 'Welcome back', hi: 'वापस स्वागत है', te: 'తిరిగి స్వాగతం', ta: 'மீண்டும் வரவேற்கிறோம்', kn: 'ಮತ್ತೆ ಸ್ವಾಗತ', mr: 'परत स्वागत आहे' },
  quickActions: { en: 'Quick Actions', hi: 'तुरंत काम', te: 'త్వరిత చర్యలు', ta: 'விரைவு செயல்கள்', kn: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು', mr: 'त्वरित कामे' },
  recentScans: { en: 'Recent Scans', hi: 'हाल की स्कैन', te: 'ఇటీవల స్కాన్లు', ta: 'சமீபத்திய ஸ்கேன்கள்', kn: 'ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್‌ಗಳು', mr: 'अलीकडील स्कॅन' },
  
  // Scan
  scanYourCrop: { en: 'Scan Your Crop', hi: 'अपनी फसल स्कैन करें', te: 'మీ పంటను స్కాన్ చేయండి', ta: 'உங்கள் பயிரை ஸ்கேன் செய்யுங்கள்', kn: 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ', mr: 'आपले पीक स्कॅन करा' },
  uploadImage: { en: 'Upload Image', hi: 'फोटो अपलोड करें', te: 'చిత్రం అప్‌లోడ్ చేయండి', ta: 'படத்தை பதிவேற்றவும்', kn: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', mr: 'फोटो अपलोड करा' },
  takePhoto: { en: 'Take Photo', hi: 'फोटो लें', te: 'ఫోటో తీయండి', ta: 'புகைப்படம் எடுக்கவும்', kn: 'ಫೋಟೋ ತೆಗೆಯಿರಿ', mr: 'फोटो घ्या' },
  
  aiReady: {
    en: "AI Ready",
    hi: "AI तैयार है",
    te: "AI సిద్ధం",
    ta: "AI தயார்",
    kn: "AI ಸಿದ್ಧ",
    mr: "AI तयार आहे"
  },

  loadingAIModels: {
    en: "Loading AI Models...",
    hi: "AI लोड हो रहा है...",
    te: "AI మోడళ్లను లోడ్ చేస్తున్నాము...",
    ta: "AI மாதிரிகள் ஏற்றப்படுகின்றன...",
    kn: "AI ಮಾದರಿಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    mr: "AI लोड होत आहे..."
  },

  offlineEnabled: {
    en: "Offline disease detection enabled",
    hi: "बिना इंटरनेट के काम करता है",
    te: "ఆఫ్‌లైన్ వ్యాధి గుర్తింపు ప్రారంభమైంది",
    ta: "ஆஃப்லைன் நோய் கண்டறிதல் செயல்படுத்தப்பட்டது",
    kn: "ಆಫ್‌ಲೈನ್ ರೋಗ ಪತ್ತೆ ಸಕ್ರಿಯ",
    mr: "इंटरनेट शिवाय काम करते"
  },

  analyzing: {
    en: "Analyzing...",
    hi: "जांच हो रही है...",
    te: "విశ్లేషణ జరుగుతోంది...",
    ta: "பகுப்பாய்வு நடைபெறுகிறது...",
    kn: "ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...",
    mr: "तपासणी सुरू आहे..."
  },

  analyzingSub: {
    en: "AI is detecting diseases",
    hi: "AI बीमारी खोज रहा है",
    te: "AI వ్యాధులను గుర్తిస్తోంది",
    ta: "AI நோய்களை கண்டறிகிறது",
    kn: "AI ರೋಗಗಳನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತಿದೆ",
    mr: "AI आजार शोधत आहे"
  },

  analyzeDisease: {
    en: "Analyze Disease",
    hi: "बीमारी की जांच करें",
    te: "వ్యాధిని విశ్లేషించండి",
    ta: "நோயை பகுப்பாய்வு செய்யவும்",
    kn: "ರೋಗವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    mr: "आजाराची तपासणी करा"
  },

  tipsTitle: {
    en: "Tips for Better Results",
    hi: "अच्छे परिणाम के लिए सुझाव",
    te: "మంచి ఫలితాల కోసం సూచనలు",
    ta: "சிறந்த முடிவுகளுக்கான குறிப்புகள்",
    kn: "ಉತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗೆ ಸಲಹೆಗಳು",
    mr: "चांगल्या निकालांसाठी सूचना"
  },
      // Add these after tipsText in your translations object:

tip1: {
  en: "Take clear, well-lit photos of affected leaves",
  hi: "साफ और रोशनी वाली फोटो लें",
  te: "స్పష్టమైన ఫోటోలు తీయండి",
  ta: "தெளிவான படங்களை எடுக்கவும்",
  kn: "ಸ್ಪಷ್ಟ ಚಿತ್ರಗಳನ್ನು ತೆಗೆಯಿರಿ",
  mr: "स्पष्ट फोटो घ्या"
},

tip2: {
  en: "Include both healthy and diseased parts if visible",
  hi: "स्वस्थ और बीमार दोनों हिस्से दिखाएं",
  te: "ఆరోగ్యకర మరియు రోగ భాగాలు చూపించండి",
  ta: "ஆரோக்கியமான மற்றும் நோய் பகுதிகளை காட்டவும்",
  kn: "ಆರೋಗ್ಯ ಮತ್ತು ರೋಗ ಭಾಗಗಳನ್ನು ತೋರಿಸಿ",
  mr: "निरोगी आणि आजारी दोन्ही भाग दाखवा"
},

tip3: {
  en: "Avoid blurry or shadowy images",
  hi: "धुंधली फोटो न लें",
  te: "అస్పష్ట ఫోటోలు తీయవద్దు",
  ta: "மங்கலான படங்களை தவிர்க்கவும்",
  kn: "ಅಸ್ಪಷ್ಟ ಚಿತ್ರಗಳನ್ನು ತಪ್ಪಿಸಿ",
  mr: "अस्पष्ट फोटो घेऊ नका"
},

tip4: {
  en: "Fill the frame with the leaf for best accuracy",
  hi: "पूरा फ्रेम पत्ते से भरें",
  te: "ఫ్రేమ్‌ను ఆకుతో నింపండి",
  ta: "இலையால் ஃப்ரேமை நிரப்பவும்",
  kn: "ಎಲೆಯಿಂದ ಚೌಕಟ್ಟನ್ನು ತುಂಬಿಸಿ",
  mr: "पूर्ण फ्रेम पानाने भरा"
},

  tipsText: {
    en: "Take clear, well-lit photos of affected leaves. Include both healthy and diseased parts if visible. Avoid blurry or shadowy images.",
    hi: "पत्तियों की साफ फोटो लें। रोशनी अच्छी होनी चाहिए। धुंधली फोटो न लें।",
    te: "బాధిత ఆకుల స్పష్టమైన ఫోటో తీయండి. ఆరోగ్యకరమైన భాగాలు కూడా ఉంటే చేర్చండి.",
    ta: "பாதிக்கப்பட்ட இலைகளை தெளிவாக படம் எடுக்கவும். ஆரோக்கியமான பகுதியையும் சேர்க்கவும்.",
    kn: "ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ. ಆರೋಗ್ಯಕರ ಭಾಗಗಳನ್ನೂ ಸೇರಿಸಿ.",
    mr: "पानांचा स्पष्ट फोटो घ्या. प्रकाश चांगला असावा. अस्पष्ट फोटो घेऊ नका."
  },

  captureOrUpload: {
    en: "Capture or Upload",
    hi: "फोटो लें या अपलोड करें",
    te: "ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి",
    ta: "படம் எடுக்கவும் அல்லது பதிவேற்றவும்",
    kn: "ಫೋಟೋ ತೆಗೆದು ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    mr: "फोटो घ्या किंवा अपलोड करा"
  },

  scanTips: {
    en: "Take a clear, well-lit photo of the affected leaf.",
    hi: "पत्ते की साफ फोटो लें। रोशनी अच्छी होनी चाहिए।",
    te: "బాధిత ఆకును స్పష్టంగా ఫోటో తీయండి.",
    ta: "பாதிக்கப்பட்ட இலைகளை தெளிவாக படம் எடுக்கவும்.",
    kn: "ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
    mr: "पानाचा स्पष्ट फोटो घ्या. प्रकाश चांगला असावा."
  },

  scanFailed: {
    en: "Analysis failed. Please try again.",
    hi: "जांच नहीं हो सकी। फिर से कोशिश करें।",
    te: "విశ్లేషణ విఫలమైంది. మళ్లీ ప్రయత్నించండి.",
    ta: "பகுப்பாய்வு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",
    kn: "ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    mr: "तपासणी झाली नाही. पुन्हा प्रयत्न करा."
  },
  // Add these after tip4 in your translations object:

whyUseScanner: {
  en: "Why Use Our AI Scanner?",
  hi: "हमारा AI स्कैनर क्यों इस्तेमाल करें?",
  te: "మా AI స్కానర్‌ను ఎందుకు ఉపయోగించాలి?",
  ta: "எங்கள் AI ஸ்கேனரை ஏன் பயன்படுத்த வேண்டும்?",
  kn: "ನಮ್ಮ AI ಸ್ಕ್ಯಾನರ್ ಅನ್ನು ಏಕೆ ಬಳಸಬೇಕು?",
  mr: "आमचा AI स्कॅनर का वापरावा?"
},

feature1Title: {
  en: "Instant Results:",
  hi: "तुरंत परिणाम:",
  te: "తక్షణ ఫలితాలు:",
  ta: "உடனடி முடிவுகள்:",
  kn: "ತತ್ಕ್ಷಣ ಫಲಿತಾಂಶಗಳು:",
  mr: "त्वरित निकाल:"
},

feature1Desc: {
  en: "Get disease identification in seconds",
  hi: "कुछ सेकंड में बीमारी की पहचान करें",
  te: "సెకన్లలో వ్యాధిని గుర్తించండి",
  ta: "வினாடிகளில் நோயை கண்டறியுங்கள்",
  kn: "ಸೆಕೆಂಡುಗಳಲ್ಲಿ ರೋಗವನ್ನು ಗುರುತಿಸಿ",
  mr: "काही सेकंदात आजार ओळखा"
},

feature2Title: {
  en: "High Accuracy:",
  hi: "सटीक जानकारी:",
  te: "అధిక ఖచ్చితత్వం:",
  ta: "உயர் துல்லியம்:",
  kn: "ಹೆಚ್ಚಿನ ನಿಖರತೆ:",
  mr: "अचूक माहिती:"
},

feature2Desc: {
  en: "Advanced AI trained on thousands of crop images",
  hi: "हजारों फोटो से सीखा हुआ AI",
  te: "వేలాది పంట చిత్రాలపై శిక్షణ పొందిన AI",
  ta: "ஆயிரக்கணக்கான படங்களில் பயிற்சி பெற்ற AI",
  kn: "ಸಾವಿರಾರು ಚಿತ್ರಗಳಲ್ಲಿ ತರಬೇತಿ ಪಡೆದ AI",
  mr: "हजारो फोटोंवरून शिकलेला AI"
},

feature3Title: {
  en: "Offline Mode:",
  hi: "बिना इंटरनेट:",
  te: "ఆఫ్‌లైన్ మోడ్:",
  ta: "ஆஃப்லைன் முறை:",
  kn: "ಆಫ್‌ಲೈನ್ ಮೋಡ್:",
  mr: "इंटरनेट शिवाय:"
},

feature3Desc: {
  en: "Works without internet connection",
  hi: "इंटरनेट के बिना काम करता है",
  te: "ఇంటర్నెట్ లేకుండా పనిచేస్తుంది",
  ta: "இணையம் இல்லாமல் செயல்படும்",
  kn: "ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
  mr: "इंटरनेट शिवाय काम करते"
},
  
  // Result
  diseaseDetected: { en: 'Disease Detected', hi: 'बीमारी मिली', te: 'వ్యాధి కనుగొనబడింది', ta: 'நோய் கண்டறியப்பட்டது', kn: 'ರೋಗ ಪತ್ತೆಯಾಗಿದೆ', mr: 'आजार आढळला' },
  confidence: { en: 'Confidence', hi: 'भरोसा', te: 'విశ్వాసం', ta: 'நம்பகத்தன்மை', kn: 'ವಿಶ್ವಾಸ', mr: 'विश्वास' },
  severity: { en: 'Severity', hi: 'गंभीरता', te: 'తీవ్రత', ta: 'தீவிரம்', kn: 'ತೀವ್ರತೆ', mr: 'तीव्रता' },
  stage: { en: 'Stage', hi: 'अवस्था', te: 'దశ', ta: 'நிலை', kn: 'ಹಂತ', mr: 'अवस्था' },
  spreadRisk: { en: 'Spread Risk', hi: 'फैलने का खतरा', te: 'వ్యాప్తి ప్రమాదం', ta: 'பரவும் ஆபத்து', kn: 'ಹರಡುವ ಅಪಾಯ', mr: 'पसरण्याचा धोका' },
  warningRadius: { en: 'Warning Radius', hi: 'चेतावनी दायरा', te: 'హెచ్చరిక వ్యాసార్థం', ta: 'எச்சரிக்கை ஆரம்', kn: 'ಎಚ್ಚರಿಕೆ ತ್ರಿಜ್ಯ', mr: 'सावधानतेचा दायरा' },
  timeline: { en: 'Timeline', hi: 'समय रेखा', te: 'కాలక్రమం', ta: 'காலவரிசை', kn: 'ಟೈಮ್‌ಲೈನ್', mr: 'वेळरेखा' },
  aboutDisease: { en: 'About this Disease', hi: 'इस बीमारी के बारे में', te: 'ఈ వ్యాధి గురించి', ta: 'இந்த நோயைப் பற்றி', kn: 'ಈ ರೋಗದ ಬಗ್ಗೆ', mr: 'या आजाराबद्दल' },
  viewRemedies: { en: 'View Remedies', hi: 'इलाज देखें', te: 'నివారణలు చూడండి', ta: 'தீர்வுகளைக் காண்க', kn: 'ಪರಿಹಾರಗಳನ್ನು ನೋಡಿ', mr: 'उपाय पहा' },
  saveReport: { en: 'Save Report', hi: 'रिपोर्ट सेव करें', te: 'నివేదికను సేవ్ చేయండి', ta: 'அறிக்கையை சேமிக்கவும்', kn: 'ವರದಿಯನ್ನು ಉಳಿಸಿ', mr: 'अहवाल जतन करा' },
  // Add these to your LanguageContext.tsx translations:

// Result Page - Missing translations
analysisResult: {
  en: "Analysis Result",
  hi: "जांच परिणाम",
  te: "విశ్లేషణ ఫలితం",
  ta: "பகுப்பாய்வு முடிவு",
  kn: "ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ",
  mr: "तपासणी निकाल"
},

analysis: {
  en: "Analysis",
  hi: "जांच",
  te: "విశ్లేషణ",
  ta: "பகுப்பாய்வு",
  kn: "ವಿಶ್ಲೇಷಣೆ",
  mr: "तपासणी"
},

history: {
  en: "History",
  hi: "इतिहास",
  te: "చరిత్ర",
  ta: "வரலாறு",
  kn: "ಇತಿಹಾಸ",
  mr: "इतिहास"
},

modelConfidence: {
  en: "Model Confidence",
  hi: "मॉडल का भरोसा",
  te: "మోడల్ విశ్వాసం",
  ta: "மாதிரி நம்பகத்தன்மை",
  kn: "ಮಾದರಿ ವಿಶ್ವಾಸ",
  mr: "मॉडेलचा विश्वास"
},

confidenceLow: {
  en: "Low",
  hi: "कम",
  te: "తక్కువ",
  ta: "குறைவு",
  kn: "ಕಡಿಮೆ",
  mr: "कमी"
},

confidenceMedium: {
  en: "Medium",
  hi: "मध्यम",
  te: "మధ్యస్థ",
  ta: "நடுத்தர",
  kn: "ಮಧ್ಯಮ",
  mr: "मध्यम"
},

confidenceHigh: {
  en: "High",
  hi: "ज्यादा",
  te: "అధిక",
  ta: "அதிக",
  kn: "ಹೆಚ್ಚು",
  mr: "जास्त"
},

scanNew: {
  en: "Scan New",
  hi: "नई स्कैन करें",
  te: "కొత్త స్కాన్ చేయండి",
  ta: "புதிய ஸ்கேன் செய்யவும்",
  kn: "ಹೊಸ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
  mr: "नवीन स्कॅन करा"
},
  severity_high: {
    en: "High",
    hi: "ज्यादा",
    te: "అధిక",
    ta: "அதிக",
    kn: "ಹೆಚ್ಚು",
    mr: "जास्त"
  },

  severity_medium: {
    en: "Moderate",
    hi: "मध्यम",
    te: "మధ్యస్థ",
    ta: "மிதமான",
    kn: "ಮಧ್ಯಮ",
    mr: "मध्यम"
  },

  severity_low: {
    en: "Low",
    hi: "कम",
    te: "తక్కువ",
    ta: "குறைந்த",
    kn: "ಕಡಿಮೆ",
    mr: "कमी"
  },

  stage_early: {
    en: "Early",
    hi: "शुरुआती",
    te: "ప్రారంభ దశ",
    ta: "ஆரம்ப",
    kn: "ಆರಂಭಿಕ",
    mr: "सुरुवातीची"
  },

  stage_early_mid: {
    en: "Early–Mid",
    hi: "शुरुआती–मध्य",
    te: "ప్రారంభ–మధ్య",
    ta: "ஆரம்ப–நடுத்தர",
    kn: "ಆರಂಭ–ಮಧ್ಯ",
    mr: "सुरुवात–मध्य"
  },

  stage_mid_late: {
    en: "Mid–Late",
    hi: "मध्य–अंतिम",
    te: "మధ్య–చివరి",
    ta: "நடுத்தர–முடிவு",
    kn: "ಮಧ್ಯ–ಕೊನೆ",
    mr: "मध्य–शेवट"
  },
  // Add these to your translations object in LanguageContext.tsx

// Crops
crop_apple: {
  en: 'Apple',
  hi: 'सेब',
  te: 'ఆపిల్',
  ta: 'ஆப்பிள்',
  kn: 'ಸೇಬು',
  mr: 'सफरचंद'
},

crop_corn: {
  en: 'Corn',
  hi: 'मक्का',
  te: 'మొక్కజొన్న',
  ta: 'சோளம்',
  kn: 'ಜೋಳ',
  mr: 'मका'
},

crop_grape: {
  en: 'Grape',
  hi: 'अंगूर',
  te: 'ద్రాక్ష',
  ta: 'திராட்சை',
  kn: 'ದ್ರಾಕ್ಷಿ',
  mr: 'द्राक्षे'
},

crop_potato: {
  en: 'Potato',
  hi: 'आलू',
  te: 'బంగాళాదుంప',
  ta: 'உருளைக்கிழங்கு',
  kn: 'ಆಲೂಗಡ್ಡೆ',
  mr: 'बटाटा'
},

crop_tomato: {
  en: 'Tomato',
  hi: 'टमाटर',
  te: 'టమాటా',
  ta: 'தக்காளி',
  kn: 'ಟೊಮೇಟೊ',
  mr: 'टोमॅटो'
},

// Apple Diseases
disease_apple_scab: {
  en: 'Apple Scab',
  hi: 'सेब का स्कैब रोग',
  te: 'ఆపిల్ స్కాబ్',
  ta: 'ஆப்பிள் ஸ்கேப்',
  kn: 'ಆಪಲ್ ಸ್ಕ್ಯಾಬ್',
  mr: 'सफरचंद स्कॅब'
},

disease_black_rot: {
  en: 'Black Rot',
  hi: 'काला सड़न रोग',
  te: 'నల్ల కుళ్ళు',
  ta: 'கருப்பு அழுகல்',
  kn: 'ಕಪ್ಪು ಕೊಳೆತ',
  mr: 'काळा कुजणे'
},

disease_cedar_apple_rust: {
  en: 'Cedar Apple Rust',
  hi: 'सीडर सेब जंग',
  te: 'సీడర్ ఆపిల్ రస్ట్',
  ta: 'சிடார் ஆப்பிள் துரு',
  kn: 'ಸೀಡರ್ ಆಪಲ್ ತುಕ್ಕು',
  mr: 'सीडर सफरचंद गंज'
},

// Corn Diseases
disease_cercospora_leaf_spot: {
  en: 'Cercospora Leaf Spot',
  hi: 'पत्ती धब्बा रोग',
  te: 'సర్కోస్పోరా ఆకు మచ్చ',
  ta: 'இலை புள்ளி நோய்',
  kn: 'ಎಲೆ ಚುಕ್ಕೆ ರೋಗ',
  mr: 'पानावर डाग'
},

disease_common_rust: {
  en: 'Common Rust',
  hi: 'साधारण जंग',
  te: 'సాధారణ రస్ట్',
  ta: 'பொதுவான துரு',
  kn: 'ಸಾಮಾನ್ಯ ತುಕ್ಕು',
  mr: 'सामान्य गंज'
},

disease_northern_leaf_blight: {
  en: 'Northern Leaf Blight',
  hi: 'उत्तरी पत्ती झुलसा',
  te: 'ఉత్తర ఆకు దహనం',
  ta: 'வடக்கு இலை தீய்ப்பு',
  kn: 'ಉತ್ತರ ಎಲೆ ಸುಟ್ಟು',
  mr: 'उत्तरी पाने कुजणे'
},

// Grape Diseases
disease_esca_black_measles: {
  en: 'Esca (Black Measles)',
  hi: 'एस्का रोग',
  te: 'ఎస్కా (నల్ల మీజిల్స్)',
  ta: 'எஸ்கா (கருப்பு தட்டம்)',
  kn: 'ಎಸ್ಕಾ (ಕಪ್ಪು ಮೀಸಲ್ಸ್)',
  mr: 'एस्का रोग'
},

disease_leaf_blight: {
  en: 'Leaf Blight',
  hi: 'पत्ती झुलसा',
  te: 'ఆకు దహనం',
  ta: 'இலை தீய்ப்பு',
  kn: 'ಎಲೆ ಸುಟ್ಟು',
  mr: 'पाने कुजणे'
},

// Potato Diseases
disease_early_blight: {
  en: 'Early Blight',
  hi: 'शुरुआती झुलसा',
  te: 'ప్రారంభ దహనం',
  ta: 'ஆரம்ப தீய்ப்பு',
  kn: 'ಆರಂಭಿಕ ಸುಟ್ಟು',
  mr: 'सुरुवातीचे कुजणे'
},

disease_late_blight: {
  en: 'Late Blight',
  hi: 'अंतिम झुलसा',
  te: 'చివరి దహనం',
  ta: 'பிந்திய தீய்ப்பு',
  kn: 'ಕೊನೆಯ ಸುಟ್ಟು',
  mr: 'शेवटचे कुजणे'
},

// Tomato Diseases
disease_bacterial_spot: {
  en: 'Bacterial Spot',
  hi: 'बैक्टीरिया धब्बा',
  te: 'బ్యాక్టీరియా మచ్చ',
  ta: 'பாக்டீரியா புள்ளி',
  kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಚುಕ್ಕೆ',
  mr: 'जीवाणू डाग'
},

// Healthy status
status_healthy: {
  en: 'Healthy',
  hi: 'स्वस्थ',
  te: 'ఆరోగ్యకరమైన',
  ta: 'ஆரோக்கியமான',
  kn: 'ಆರೋಗ್ಯಕರ',
  mr: 'निरोगी'
},
  
// Low Confidence Page - Additional translations
uploadProperImage: {
  en: "Please Upload a Proper Image",
  hi: "कृपया उचित फोटो अपलोड करें",
  te: "దయచేసి సరైన చిత్రాన్ని అప్‌లోడ్ చేయండి",
  ta: "தயவுசெய்து சரியான படத்தைப் பதிவேற்றவும்",
  kn: "ದಯವಿಟ್ಟು ಸರಿಯಾದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  mr: "कृपया योग्य फोटो अपलोड करा"
},

tipsForBetterImage: {
  en: "Tips for Better Image Quality",
  hi: "बेहतर फोटो क्वालिटी के लिए सुझाव",
  te: "మంచి చిత్ర నాణ్యత కోసం చిట్కాలు",
  ta: "சிறந்த படத் தரத்திற்கான குறிப்புகள்",
  kn: "ಉತ್ತಮ ಚಿತ್ರ ಗುಣಮಟ್ಟಕ್ಕಾಗಿ ಸಲಹೆಗಳು",
  mr: "चांगल्या फोटो गुणवत्तेसाठी टिपा"
},

tipGoodLightingTitle: {
  en: "Good Lighting:",
  hi: "अच्छी रोशनी:",
  te: "మంచి లైటింగ్:",
  ta: "நல்ல வெளிச்சம்:",
  kn: "ಉತ್ತಮ ಬೆಳಕು:",
  mr: "चांगला प्रकाश:"
},

tipGoodLightingDesc: {
  en: "Take photos in bright, natural light. Avoid shadows and dark areas.",
  hi: "तेज, प्राकृतिक रोशनी में फोटो लें। छाया और अंधेरे क्षेत्रों से बचें।",
  te: "ప్రకాశవంతమైన, సహజ కాంతిలో ఫోటోలు తీయండి. నీడలు మరియు చీకటి ప్రాంతాలను నివారించండి.",
  ta: "பிரகாசமான, இயற்கை ஒளியில் படங்களை எடுக்கவும். நிழல்கள் மற்றும் இருண்ட பகுதிகளை தவிர்க்கவும்.",
  kn: "ಪ್ರಕಾಶಮಾನವಾದ, ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋಗಳನ್ನು ತೆಗೆಯಿರಿ. ನೆರಳುಗಳು ಮತ್ತು ಕತ್ತಲೆ ಪ್ರದೇಶಗಳನ್ನು ತಪ್ಪಿಸಿ.",
  mr: "तेजस्वी, नैसर्गिक प्रकाशात फोटो घ्या. सावल्या आणि गडद भाग टाळा."
},

tipClearFocusTitle: {
  en: "Clear Focus:",
  hi: "स्पष्ट फोकस:",
  te: "స్పష్టమైన ఫోకస్:",
  ta: "தெளிவான கவனம்:",
  kn: "ಸ್ಪಷ್ಟ ಗಮನ:",
  mr: "स्पष्ट फोकस:"
},

tipClearFocusDesc: {
  en: "Ensure the leaf is in sharp focus. Avoid blurry or out-of-focus images.",
  hi: "सुनिश्चित करें कि पत्ती तेज फोकस में है। धुंधली या अस्पष्ट तस्वीरों से बचें।",
  te: "ఆకు పదునైన ఫోకస్‌లో ఉందని నిర్ధారించుకోండి. అస్పష్టమైన లేదా ఫోకస్ లేని చిత్రాలను నివారించండి.",
  ta: "இலை கூர்மையான கவனத்தில் இருப்பதை உறுதிசெய்க. மங்கலான அல்லது கவனம் இல்லாத படங்களைத் தவிர்க்கவும்.",
  kn: "ಎಲೆ ತೀಕ್ಷ್ಣವಾದ ಗಮನದಲ್ಲಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಅಸ್ಪಷ್ಟ ಅಥವಾ ಗಮನವಿಲ್ಲದ ಚಿತ್ರಗಳನ್ನು ತಪ್ಪಿಸಿ.",
  mr: "पान तीक्ष्ण फोकसमध्ये आहे याची खात्री करा. अस्पष्ट किंवा फोकस नसलेले फोटो टाळा."
},

tipFillFrameTitle: {
  en: "Fill the Frame:",
  hi: "फ्रेम भरें:",
  te: "ఫ్రేమ్ నింపండి:",
  ta: "சட்டத்தை நிரப்பவும்:",
  kn: "ಚೌಕಟ್ಟನ್ನು ತುಂಬಿಸಿ:",
  mr: "फ्रेम भरा:"
},

tipFillFrameDesc: {
  en: "Make sure the affected leaf fills most of the image frame.",
  hi: "सुनिश्चित करें कि प्रभावित पत्ती छवि फ्रेम का अधिकांश भाग भरती है।",
  te: "ప్రభావిత ఆకు చిత్ర ఫ్రేమ్‌లో ఎక్కువ భాగం నింపుతుందని నిర్ధారించుకోండి.",
  ta: "பாதிக்கப்பட்ட இலை படச் சட்டத்தின் பெரும்பகுதியை நிரப்புவதை உறுதிசெய்யவும்.",
  kn: "ಪರಿಣಾಮಿತ ಎಲೆ ಚಿತ್ರ ಚೌಕಟ್ಟಿನ ಹೆಚ್ಚಿನ ಭಾಗವನ್ನು ತುಂಬುತ್ತದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
  mr: "प्रभावित पान प्रतिमा फ्रेमचा बहुतेक भाग भरते याची खात्री करा."
},

tipShowSymptomsTitle: {
  en: "Show Disease Symptoms:",
  hi: "रोग के लक्षण दिखाएं:",
  te: "వ్యాధి లక్షణాలను చూపించండి:",
  ta: "நோய் அறிகுறிகளைக் காட்டவும்:",
  kn: "ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ತೋರಿಸಿ:",
  mr: "रोगाची लक्षणे दाखवा:"
},

tipShowSymptomsDesc: {
  en: "Capture visible disease signs clearly (spots, discoloration, damage).",
  hi: "रोग के दृश्य संकेतों को स्पष्ट रूप से कैप्चर करें (धब्बे, रंग बदलना, क्षति)।",
  te: "కనిపించే వ్యాధి సంకేతాలను స్పష్టంగా క్యాప్చర్ చేయండి (మచ్చలు, రంగు మార్పు, నష్టం).",
  ta: "தெரியும் நோய் அறிகுறிகளை தெளிவாக படம் பிடிக்கவும் (புள்ளிகள், நிறமாற்றம், சேதம்).",
  kn: "ಗೋಚರ ರೋಗದ ಚಿಹ್ನೆಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಸೆರೆಹಿಡಿಯಿರಿ (ಚುಕ್ಕೆಗಳು, ಬಣ್ಣ ಬದಲಾವಣೆ, ಹಾನಿ).",
  mr: "दृश्यमान रोगाची चिन्हे स्पष्टपणे कॅप्चर करा (डाग, रंगबदल, नुकसान)."
},

tipCleanBackgroundTitle: {
  en: "Clean Background:",
  hi: "साफ पृष्ठभूमि:",
  te: "శుభ్రమైన నేపథ్యం:",
  ta: "சுத்தமான பின்னணி:",
  kn: "ಸ್ವಚ್ಛ ಹಿನ್ನೆಲೆ:",
  mr: "स्वच्छ पार्श्वभूमी:"
},

tipCleanBackgroundDesc: {
  en: "Use a plain background if possible to help the AI focus on the leaf.",
  hi: "यदि संभव हो तो सादे पृष्ठभूमि का उपयोग करें ताकि AI पत्ती पर ध्यान केंद्रित कर सके।",
  te: "AI ఆకుపై దృష్టి పెట్టడానికి సాధ్యమైతే సాదా నేపథ్యాన్ని ఉపయోగించండి.",
  ta: "AI இலையில் கவனம் செலுத்த உதவ முடிந்தால் எளிய பின்னணியைப் பயன்படுத்தவும்.",
  kn: "AI ಎಲೆಯ ಮೇಲೆ ಗಮನ ಹರಿಸಲು ಸಾಧ್ಯವಾದರೆ ಸರಳ ಹಿನ್ನೆಲೆಯನ್ನು ಬಳಸಿ.",
  mr: "शक्य असल्यास साधी पार्श्वभूमी वापरा जेणेकरून AI पानावर लक्ष केंद्रित करू शकेल."
},

tipMultipleAnglesTitle: {
  en: "Multiple Angles:",
  hi: "कई कोण:",
  te: "బహుళ కోణాలు:",
  ta: "பல கோணங்கள்:",
  kn: "ಬಹು ಕೋನಗಳು:",
  mr: "अनेक कोन:"
},

tipMultipleAnglesDesc: {
  en: "If first attempt is unclear, try taking photos from different angles.",
  hi: "यदि पहला प्रयास अस्पष्ट है, तो विभिन्न कोणों से फोटो लेने का प्रयास करें।",
  te: "మొదటి ప్రయత్నం అస్పష్టంగా ఉంటే, వివిధ కోణాల నుండి ఫోటోలు తీయడానికి ప్రయత్నించండి.",
  ta: "முதல் முயற்சி தெளிவாக இல்லை என்றால், வெவ்வேறு கோணங்களில் படங்களை எடுக்க முயற்சிக்கவும்.",
  kn: "ಮೊದಲ ಪ್ರಯತ್ನ ಅಸ್ಪಷ್ಟವಾಗಿದ್ದರೆ, ವಿವಿಧ ಕೋನಗಳಿಂದ ಫೋಟೋಗಳನ್ನು ತೆಗೆಯಲು ಪ್ರಯತ್ನಿಸಿ.",
  mr: "पहिला प्रयत्न अस्पष्ट असल्यास, वेगवेगळ्या कोनातून फोटो घेण्याचा प्रयत्न करा."
},

scanNewImage: {
  en: "Scan New Image",
  hi: "नया फोटो स्कैन करें",
  te: "కొత్త చిత్రాన్ని స్కాన్ చేయండి",
  ta: "புதிய படத்தை ஸ்கேன் செய்யவும்",
  kn: "ಹೊಸ ಚಿತ್ರವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
  mr: "नवीन फोटो स्कॅन करा"
},

goBack: {
  en: "Go Back",
  hi: "वापस जाएं",
  te: "వెనక్కి వెళ్ళండి",
  ta: "திரும்பிச் செல்",
  kn: "ಹಿಂತಿರುಗಿ",
  mr: "परत जा"
},

note: {
  en: "Note",
  hi: "नोट",
  te: "గమనిక",
  ta: "குறிப்பு",
  kn: "ಸೂಚನೆ",
  mr: "टीप"
},

confidenceNote: {
  en: "For best results, we recommend confidence levels above 50%. Lower confidence may indicate image quality issues or uncertain detection.",
  hi: "सर्वोत्तम परिणामों के लिए, हम 50% से ऊपर विश्वास स्तर की सिफारिश करते हैं। कम विश्वास छवि गुणवत्ता समस्याओं या अनिश्चित पहचान का संकेत दे सकता है।",
  te: "ఉత్తమ ఫలితాల కోసం, మేము 50% కంటే ఎక్కువ విశ్వాస స్థాయిలను సిఫార్సు చేస్తున్నాము. తక్కువ విశ్వాసం చిత్ర నాణ్యత సమస్యలు లేదా అనిశ్చిత గుర్తింపును సూచించవచ్చు.",
  ta: "சிறந்த முடிவுகளுக்கு, நாங்கள் 50% க்கு மேல் நம்பிக்கை நிலைகளை பரிந்துரைக்கிறோம். குறைந்த நம்பிக்கை படத் தர சிக்கல்கள் அல்லது நிச்சயமற்ற கண்டறிதலைக் குறிக்கலாம்.",
  kn: "ಉತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ, ನಾವು 50% ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಿಶ್ವಾಸ ಮಟ್ಟಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ. ಕಡಿಮೆ ವಿಶ್ವಾಸವು ಚಿತ್ರ ಗುಣಮಟ್ಟದ ಸಮಸ್ಯೆಗಳು ಅಥವಾ ಅನಿಶ್ಚಿತ ಪತ್ತೆಯನ್ನು ಸೂಚಿಸಬಹುದು.",
  mr: "सर्वोत्तम परिणामांसाठी, आम्ही 50% पेक्षा जास्त विश्वास पातळींची शिफारस करतो. कमी विश्वास प्रतिमा गुणवत्ता समस्या किंवा अनिश्चित ओळख दर्शवू शकतो."
},

exampleGoodVsPoor: {
  en: "Example: Good vs Poor Images",
  hi: "उदाहरण: अच्छी बनाम खराब तस्वीरें",
  te: "ఉదాహరణ: మంచి vs పేద చిత్రాలు",
  ta: "உதாரணம்: நல்ல vs மோசமான படங்கள்",
  kn: "ಉದಾಹರಣೆ: ಉತ್ತಮ vs ಕಳಪೆ ಚಿತ್ರಗಳು",
  mr: "उदाहरण: चांगले vs खराब फोटो"
},

goodImage: {
  en: "Good Image",
  hi: "अच्छी तस्वीर",
  te: "మంచి చిత్రం",
  ta: "நல்ல படம்",
  kn: "ಉತ್ತಮ ಚಿತ್ರ",
  mr: "चांगला फोटो"
},

goodImageTip1: {
  en: "Clear and well-lit",
  hi: "साफ और रोशनी वाली",
  te: "స్పష్టమైన మరియు బాగా వెలుతురు",
  ta: "தெளிவான மற்றும் நன்கு வெளிச்சம்",
  kn: "ಸ್ಪಷ್ಟ ಮತ್ತು ಉತ್ತಮ ಬೆಳಕು",
  mr: "स्पष्ट आणि चांगला प्रकाश"
},

goodImageTip2: {
  en: "In focus, sharp details",
  hi: "फोकस में, तेज विवरण",
  te: "ఫోకస్‌లో, పదునైన వివరాలు",
  ta: "கவனத்தில், கூர்மையான விவரங்கள்",
  kn: "ಗಮನದಲ್ಲಿ, ತೀಕ್ಷ್ಣ ವಿವರಗಳು",
  mr: "फोकसमध्ये, तीक्ष्ण तपशील"
},

goodImageTip3: {
  en: "Disease symptoms visible",
  hi: "रोग के लक्षण दिखाई देते हैं",
  te: "వ్యాధి లక్షణాలు కనిపిస్తాయి",
  ta: "நோய் அறிகுறிகள் தெரியும்",
  kn: "ರೋಗದ ಲಕ್ಷಣಗಳು ಗೋಚರಿಸುತ್ತವೆ",
  mr: "रोगाची लक्षणे दिसतात"
},

goodImageTip4: {
  en: "Fills most of frame",
  hi: "अधिकांश फ्रेम भरता है",
  te: "ఎక్కువ ఫ్రేమ్ నింపుతుంది",
  ta: "பெரும்பாலான சட்டத்தை நிரப்புகிறது",
  kn: "ಹೆಚ್ಚಿನ ಚೌಕಟ್ಟನ್ನು ತುಂಬುತ್ತದೆ",
  mr: "बहुतेक फ्रेम भरते"
},

poorImage: {
  en: "Poor Image",
  hi: "खराब तस्वीर",
  te: "పేద చిత్రం",
  ta: "மோசமான படம்",
  kn: "ಕಳಪೆ ಚಿತ್ರ",
  mr: "खराब फोटो"
},

poorImageTip1: {
  en: "Too dark or shadowy",
  hi: "बहुत अंधेरा या छायादार",
  te: "చాలా చీకటి లేదా నీడగల",
  ta: "மிகவும் இருண்ட அல்லது நிழலான",
  kn: "ತುಂಬಾ ಕತ್ತಲೆ ಅಥವಾ ನೆರಳು",
  mr: "खूप गडद किंवा सावलीचे"
},

poorImageTip2: {
  en: "Blurry or out of focus",
  hi: "धुंधला या फोकस से बाहर",
  te: "అస్పష్టమైన లేదా ఫోకస్ లేనిది",
  ta: "மங்கலான அல்லது கவனம் இல்லாத",
  kn: "ಅಸ್ಪಷ್ಟ ಅಥವಾ ಗಮನದಿಂದ ಹೊರಗಿರುವ",
  mr: "अस्पष्ट किंवा फोकसच्या बाहेर"
},

poorImageTip3: {
  en: "Symptoms not clear",
  hi: "लक्षण स्पष्ट नहीं",
  te: "లక్షణాలు స్పష్టంగా లేవు",
  ta: "அறிகுறிகள் தெளிவாக இல்லை",
  kn: "ಲಕ್ಷಣಗಳು ಸ್ಪಷ್ಟವಾಗಿಲ್ಲ",
  mr: "लक्षणे स्पष्ट नाहीत"
},

poorImageTip4: {
  en: "Leaf too small in frame",
  hi: "फ्रेम में पत्ती बहुत छोटी",
  te: "ఫ్రేమ్‌లో ఆకు చాలా చిన్నది",
  ta: "சட்டத்தில் இலை மிகச் சிறியது",
  kn: "ಚೌಕಟ್ಟಿನಲ್ಲಿ ಎಲೆ ತುಂಬಾ ಚಿಕ್ಕದಾಗಿದೆ",
  mr: "फ्रेममध्ये पान खूप लहान"
},

  // Remedies
  homeRemedies: { en: 'Home Remedies', hi: 'घरेलू उपाय', te: 'ఇంట్లో చేయగలిగే నివారణలు', ta: 'வீட்டு வைத்தியம்', kn: 'ಮನೆ ಮದ್ದುಗಳು', mr: 'घरगुती उपाय' },
  fertilizers: { en: 'Fertilizers', hi: 'खाद और दवाई', te: 'ఎరువులు', ta: 'உரங்கள்', kn: 'ರಸಗೊಬ್ಬರಗಳು', mr: 'खत आणि औषधे' },
  plantDoctors: { en: 'Plant Doctors Near Me', hi: 'पास के डॉक्टर', te: 'నా సమీపంలోని మొక్కల వైద్యులు', ta: 'அருகிலுள்ள தாவர மருத்துவர்கள்', kn: 'ನನ್ನ ಹತ್ತಿರದ ಸಸ್ಯ ವೈದ್ಯರು', mr: 'जवळचे डॉक्टर' },
  wrongSprays: { en: 'Wrong Sprays to Avoid', hi: 'ये स्प्रे न करें', te: 'తప్పించాల్సిన తప్పుడు స్ప్రేలు', ta: 'தவிர்க்க வேண்டிய தவறான தெளிப்புகள்', kn: 'ತಪ್ಪಿಸಬೇಕಾದ ತಪ್ಪು ಸ್ಪ್ರೇಗಳು', mr: 'हे फवारे टाळा' },
  shopOnline: { en: 'Shop Online', hi: 'ऑनलाइन खरीदें', te: 'ఆన్‌లైన్‌లో షాపింగ్ చేయండి', ta: 'ஆன்லைனில் வாங்குங்கள்', kn: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಖರೀದಿಸಿ', mr: 'ऑनलाइन खरेदी करा' },
  watchVideo: { en: 'Watch Video', hi: 'वीडियो देखें', te: 'వీడియో చూడండి', ta: 'வீடியோவைப் பாருங்கள்', kn: 'ವೀಡಿಯೊ ನೋಡಿ', mr: 'व्हिडिओ पहा' },
  openMaps: { en: 'Open Maps', hi: 'मैप खोलें', te: 'మ్యాప్‌లు తెరవండి', ta: 'வரைபடத்தைத் திறக்கவும்', kn: 'ನಕ್ಷೆಗಳನ್ನು ತೆರೆಯಿರಿ', mr: 'नकाशा उघडा' },
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