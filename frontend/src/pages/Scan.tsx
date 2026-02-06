import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, Zap, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { initModels, detectDisease } from "@/lib/ai/diseaseDetector";

interface DetectionResult {
  crop: string;
  disease: {
    label: string;
    confidence: number;
  } | null;
  source: string;
}

const Scan = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const imageRef = useRef<HTMLImageElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingModels, setLoadingModels] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize models on component mount
  // useEffect(() => {
  //   const loadModels = async () => {
  //     try {
  //       setLoadingModels(true);
  //       await initModels();
  //       setModelsLoaded(true);
  //       console.log("✅ AI models loaded successfully");
  //     } catch (err) {
  //       console.error("❌ Failed to load models:", err);
  //       setError("Failed to load AI models. Please refresh the page.");
  //     } finally {
  //       setLoadingModels(false);
  //     }
  //   };

  //   loadModels();
  // }, []);
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoadingModels(true);
        if (!modelsLoaded) {
          await initModels();
        }
        setModelsLoaded(true);
      } catch (err) {
        setError("Failed to load AI models.");
      } finally {
        setLoadingModels(false);
      }
    };

    loadModels();
  }, []);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clear any previous errors
      setError(null);

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Image too large. Please select an image smaller than 10MB.");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Invalid file type. Please select an image.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!modelsLoaded) {
      setError("AI models not ready yet. Please wait...");
      return;
    }

    if (!imageRef.current) {
      setError("Image not loaded properly. Please try again.");
      return;
    }

    try {
      setIsScanning(true);
      setError(null);

      console.log("🔍 Starting disease detection...");

      // Run AI detection
      await imageRef.current.decode();
      const result: DetectionResult = await detectDisease(imageRef.current);

      console.log("✅ Detection complete:", result);

      // Store result in sessionStorage to pass to result page
      sessionStorage.setItem('detectionResult', JSON.stringify(result));
      sessionStorage.setItem('detectionImage', selectedImage || '');

      // Navigate to result page after a short delay for UX
      setTimeout(() => {
        navigate("/result");
      }, 1000);

    } catch (err) {
      console.error("❌ Detection failed:", err);
      setError("Analysis failed. Please try again with a clearer image.");
      setIsScanning(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setIsScanning(false);
    setError(null);
  };

  const tipsText = "Tips for better results: Take clear, well-lit photos of affected leaves. Include both healthy and diseased parts if visible. Avoid blurry or shadowy images.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('scanYourCrop')}
            </h1>
            <div className="flex items-center gap-3">
              <TranslateButton />
              <ReadAloudButton text={tipsText} size="md" />
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Info className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Cards */}
            <div className="space-y-4">
              {/* Loading Models Status */}
              {loadingModels && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-3 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                    <div className="flex-1">
                      <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                        Loading AI Models...
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        This may take a few seconds on first load
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Models Loaded Success */}
              {modelsLoaded && !loadingModels && (
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        AI Ready
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Offline disease detection enabled
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-900 dark:text-red-100">
                        Error
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        {error}
                      </p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded transition-colors"
                    >
                      <X className="w-5 h-5 text-red-700 dark:text-red-300" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Main Scan Area */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {selectedImage ? (
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt="Selected crop"
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm">
                      <div className="absolute left-0 right-0 top-0 h-1 bg-green-500 animate-scan-line shadow-lg shadow-green-500/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 text-center shadow-2xl">
                          <Zap className="w-12 h-12 text-green-500 mx-auto animate-pulse" />
                          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-3">
                            Analyzing...
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            AI is detecting diseases
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {!isScanning && (
                    <button
                      onClick={clearImage}
                      className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="aspect-video border-2 border-dashed border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex flex-col items-center justify-center p-12">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 shadow-xl animate-float">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    Capture or Upload
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mt-3 max-w-md">
                    Take a photo of your crop leaf to detect diseases using our AI-powered analysis
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedImage ? (
                    <Button
                      onClick={handleScan}
                      disabled={isScanning || !modelsLoaded}
                      className="sm:col-span-2 h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isScanning ? (
                        <>
                          <Zap className="w-6 h-6 mr-2 animate-pulse" />
                          Analyzing...
                        </>
                      ) : !modelsLoaded ? (
                        <>
                          <div className="w-6 h-6 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Loading AI...
                        </>
                      ) : (
                        <>
                          <Zap className="w-6 h-6 mr-2" />
                          Analyze Disease
                        </>
                      )}
                    </Button>
                  ) : (
                    <>
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          disabled={!modelsLoaded}
                          className="hidden"
                        />
                        <div className={`h-14 text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${!modelsLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Camera className="w-5 h-5" />
                          {t('takePhoto')}
                        </div>
                      </label>
                      
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={!modelsLoaded}
                          className="hidden"
                        />
                        <div className={`h-14 text-base font-semibold bg-white dark:bg-gray-800 border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${!modelsLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload className="w-5 h-5" />
                          {t('uploadImage')}
                        </div>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tips & Info */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📸</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tips for Better Results
                  </h3>
                </div>
                <ReadAloudButton text={tipsText} size="sm" />
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </span>
                  <span>Take clear, well-lit photos of affected leaves</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </span>
                  <span>Include both healthy and diseased parts if visible</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </span>
                  <span>Avoid blurry or shadowy images</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </span>
                  <span>Fill the frame with the leaf for best accuracy</span>
                </li>
              </ul>
            </div>

            {/* Feature Highlights */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                🌱 Why Use Our AI Scanner?
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Instant Results:</strong> Get disease identification in seconds</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span><strong>High Accuracy:</strong> Advanced AI trained on thousands of crop images</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Info className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Offline Mode:</strong> Works without internet connection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Scan;