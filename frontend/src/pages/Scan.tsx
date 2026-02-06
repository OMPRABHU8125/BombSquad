import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, Zap, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
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
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoadingModels(true);
        await initModels();
        setModelsLoaded(true);
        console.log("✅ AI models loaded successfully");
      } catch (err) {
        console.error("❌ Failed to load models:", err);
        setError("Failed to load AI models. Please refresh the page.");
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
      const result: DetectionResult = await detectDisease(imageRef.current);

      console.log("✅ Detection complete:", result);

      // Store result in sessionStorage to pass to result page
      sessionStorage.setItem('detectionResult', JSON.stringify(result));
      sessionStorage.setItem('detectionImage', selectedImage || '');

      // Navigate to result page after a short delay for UX
      setTimeout(() => {
        navigate("/result/detection");
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
    <MobileLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="flex items-center justify-between p-5 pt-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">{t('scanYourCrop')}</h1>
          <div className="flex items-center gap-2">
            <TranslateButton />
            <ReadAloudButton text={tipsText} size="md" />
            <button className="p-2 bg-secondary rounded-xl hover:bg-muted transition-colors">
              <Info className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        <div className="p-5 space-y-6">
          {/* Loading Models Status */}
          {loadingModels && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">
                    Loading AI Models...
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This may take a few seconds on first load
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Models Loaded Success */}
          {modelsLoaded && !loadingModels && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    AI Ready
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Offline disease detection enabled
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚠️</div>
                <div className="flex-1">
                  <p className="font-medium text-red-900 dark:text-red-100">
                    Error
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {error}
                  </p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded"
                >
                  <X className="w-4 h-4 text-red-700 dark:text-red-300" />
                </button>
              </div>
            </div>
          )}

          {/* Scan Area */}
          <div className="relative">
            {selectedImage ? (
              <div className="relative rounded-3xl overflow-hidden bg-secondary aspect-[4/3]">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Selected crop"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                {isScanning && (
                  <div className="absolute inset-0 bg-primary/20">
                    <div className="absolute left-0 right-0 h-1 bg-primary animate-scan-line shadow-krishi-primary" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                        <Zap className="w-8 h-8 text-primary mx-auto animate-pulse" />
                        <p className="text-sm font-medium text-foreground mt-2">Analyzing...</p>
                        <p className="text-xs text-muted-foreground">AI is detecting diseases</p>
                      </div>
                    </div>
                  </div>
                )}
                {!isScanning && (
                  <button
                    onClick={clearImage}
                    className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-krishi-sm"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-krishi-green-light/30 aspect-[4/3] flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-krishi-primary animate-float">
                  <Camera className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground text-center">
                  Capture or Upload
                </h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Take a photo of your crop leaf to detect diseases
                </p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-secondary rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">📸 Tips for better results</h3>
              <ReadAloudButton text={tipsText} size="sm" />
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Take clear, well-lit photos of affected leaves
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Include both healthy and diseased parts if visible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Avoid blurry or shadowy images
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Fill the frame with the leaf for best accuracy
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {selectedImage ? (
              <Button
                onClick={handleScan}
                disabled={isScanning || !modelsLoaded}
                className="w-full h-14 text-lg font-semibold gradient-primary text-primary-foreground rounded-2xl shadow-krishi-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : !modelsLoaded ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading AI...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
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
                  <div className={`w-full h-14 text-lg font-semibold gradient-primary text-primary-foreground rounded-2xl shadow-krishi-primary flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity ${!modelsLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                  <div className={`w-full h-14 text-lg font-semibold bg-card border-2 border-primary text-primary rounded-2xl flex items-center justify-center gap-2 cursor-pointer hover:bg-krishi-green-light transition-colors ${!modelsLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Upload className="w-5 h-5" />
                    {t('uploadImage')}
                  </div>
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Scan;