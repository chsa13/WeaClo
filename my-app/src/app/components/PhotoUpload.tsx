import { Camera, Upload, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function PhotoUpload() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePhotoUpload = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("✨ AI распознал 5 вещей! Они добавлены в ваш гардероб.");
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-md border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">AI-сканирование гардероба</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Сфотографируйте свои вещи, и AI автоматически добавит их в гардероб, 
        определив цвет, тип и сезон.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handlePhotoUpload}
          disabled={isProcessing}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Camera className="w-4 h-4 mr-2" />
          {isProcessing ? "Обработка..." : "Сделать фото"}
        </Button>
        
        <Button
          variant="outline"
          disabled={isProcessing}
          className="border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Загрузить
        </Button>
      </div>

      <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
        <div className="flex items-start gap-2">
          <div className="text-lg">💡</div>
          <div className="text-xs text-gray-600">
            <strong>Совет:</strong> Делайте фото на светлом фоне для лучшего распознавания
          </div>
        </div>
      </div>
    </div>
  );
}
