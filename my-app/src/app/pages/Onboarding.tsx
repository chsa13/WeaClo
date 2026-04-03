import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ChevronRight, Check } from "lucide-react";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    gender: "",
    style: [] as string[],
    sizes: {
      top: "",
      bottom: "",
      shoes: "",
    },
    colors: [] as string[],
    budget: "",
  });
  
  const navigate = useNavigate();

  const styles = [
    { id: "casual", label: "Casual", emoji: "👕" },
    { id: "business", label: "Деловой", emoji: "👔" },
    { id: "sport", label: "Спортивный", emoji: "🏃" },
    { id: "street", label: "Street", emoji: "🧢" },
    { id: "classic", label: "Классика", emoji: "🎩" },
    { id: "romantic", label: "Романтичный", emoji: "👗" },
  ];

  const colors = [
    { id: "black", label: "Черный", color: "bg-black" },
    { id: "white", label: "Белый", color: "bg-white border-2 border-gray-300" },
    { id: "blue", label: "Синий", color: "bg-blue-600" },
    { id: "red", label: "Красный", color: "bg-red-600" },
    { id: "green", label: "Зеленый", color: "bg-green-600" },
    { id: "beige", label: "Бежевый", color: "bg-amber-200" },
    { id: "gray", label: "Серый", color: "bg-gray-500" },
    { id: "pink", label: "Розовый", color: "bg-pink-400" },
  ];

  const toggleStyle = (styleId: string) => {
    setPreferences(prev => ({
      ...prev,
      style: prev.style.includes(styleId)
        ? prev.style.filter(s => s !== styleId)
        : [...prev.style, styleId],
    }));
  };

  const toggleColor = (colorId: string) => {
    setPreferences(prev => ({
      ...prev,
      colors: prev.colors.includes(colorId)
        ? prev.colors.filter(c => c !== colorId)
        : [...prev.colors, colorId],
    }));
  };

  const handleFinish = () => {
    // Save preferences
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Progress */}
        <div className="mb-8 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Шаг {step} из 4</span>
            <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Gender */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Кто вы?</h2>
            <p className="text-gray-600 mb-6">Это поможет подобрать подходящую одежду</p>
            
            <div className="space-y-3">
              {[
                { value: "male", label: "Мужчина", emoji: "👨" },
                { value: "female", label: "Женщина", emoji: "👩" },
                { value: "unisex", label: "Предпочитаю не указывать", emoji: "👤" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPreferences({ ...preferences, gender: option.value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    preferences.gender === option.value
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="font-medium text-gray-800">{option.label}</span>
                  {preferences.gender === option.value && (
                    <Check className="w-5 h-5 text-purple-600 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!preferences.gender}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
            >
              Далее
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Style */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Ваш стиль</h2>
            <p className="text-gray-600 mb-6">Выберите один или несколько</p>
            
            <div className="grid grid-cols-2 gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferences.style.includes(style.id)
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{style.emoji}</div>
                  <div className="font-medium text-gray-800 text-sm">{style.label}</div>
                  {preferences.style.includes(style.id) && (
                    <Check className="w-4 h-4 text-purple-600 mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                Назад
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={preferences.style.length === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Далее
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Colors */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Любимые цвета</h2>
            <p className="text-gray-600 mb-6">Какие цвета вы предпочитаете?</p>
            
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => toggleColor(color.id)}
                  className={`relative aspect-square rounded-xl border-2 transition-all ${
                    preferences.colors.includes(color.id)
                      ? "border-purple-600 scale-95"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className={`w-full h-full rounded-lg ${color.color}`} />
                  {preferences.colors.includes(color.id) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                  )}
                  <div className="text-xs text-gray-600 mt-1 text-center">{color.label}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1"
              >
                Назад
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={preferences.colors.length === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Далее
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Бюджет на одежду</h2>
            <p className="text-gray-600 mb-6">Средний чек на покупку</p>
            
            <div className="space-y-3">
              {[
                { value: "budget", label: "До 2000₽", emoji: "💰" },
                { value: "medium", label: "2000₽ - 5000₽", emoji: "💵" },
                { value: "premium", label: "5000₽ - 15000₽", emoji: "💎" },
                { value: "luxury", label: "15000₽+", emoji: "👑" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPreferences({ ...preferences, budget: option.value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    preferences.budget === option.value
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="font-medium text-gray-800">{option.label}</span>
                  {preferences.budget === option.value && (
                    <Check className="w-5 h-5 text-purple-600 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setStep(3)}
                variant="outline"
                className="flex-1"
              >
                Назад
              </Button>
              <Button
                onClick={handleFinish}
                disabled={!preferences.budget}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Готово! 🎉
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
