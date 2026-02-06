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