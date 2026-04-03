import { useState, useEffect } from "react";
import { WeatherCard } from "../components/WeatherCard";
import { OutfitRecommendations } from "../components/OutfitRecommendations";
import { ShoppingRecommendations } from "../components/ShoppingRecommendations";
import { ActivitySuggestions } from "../components/ActivitySuggestions";
import { PremiumModal } from "../components/PremiumModal";
import { Sparkles, Shirt } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface ClothingItem {
  id: string;
  name: string;
  emoji: string;
  hasInWardrobe: boolean | null;
  optional?: boolean;
}

interface OutfitPreferences {
  gender: string;
  event: string;
  style: string;
}

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
  emoji: string;
  image?: string;
}

export function Home() {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    { id: "1", name: "Ветровка", emoji: "🧥", hasInWardrobe: null },
    { id: "2", name: "Джинсы или брюки", emoji: "👖", hasInWardrobe: null },
    { id: "3", name: "Кроссовки", emoji: "👟", hasInWardrobe: null },
    { id: "4", name: "Зонт", emoji: "☂️", hasInWardrobe: null, optional: true },
  ]);

  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [showOutfitForm, setShowOutfitForm] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [outfitPreferences, setOutfitPreferences] = useState<OutfitPreferences>(() => {
    const saved = localStorage.getItem("outfitPreferences");
    return saved ? JSON.parse(saved) : { gender: "", event: "", style: "" };
  });

  const [recommendedItems, setRecommendedItems] = useState<WardrobeItem[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // НОВЫЙ useEffect для асинхронной загрузки рекомендаций
  useEffect(() => {
    if (!showRecommendations || !outfitPreferences.gender) {
      setRecommendedItems([]);
      return;
    }

    const loadRecommendations = async () => {
      setIsLoadingRecommendations(true);
      try {
        const items = await getRecommendedItems();
        setRecommendedItems(items);
      } catch (error) {
        console.error('Ошибка загрузки рекомендаций:', error);
        setRecommendedItems([]);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    loadRecommendations();
  }, [wardrobeItems, outfitPreferences, showRecommendations]);


  useEffect(() => {
    const saved = localStorage.getItem("wardrobeItems");
    if (saved) {
      setWardrobeItems(JSON.parse(saved));
    }
  }, []);

  const [formData, setFormData] = useState<OutfitPreferences>({
    gender: outfitPreferences.gender,
    event: outfitPreferences.event,
    style: outfitPreferences.style,
  });

  useEffect(() => {
    localStorage.setItem("outfitPreferences", JSON.stringify(outfitPreferences));
    if (outfitPreferences.gender && outfitPreferences.event && outfitPreferences.style) {
      setShowRecommendations(true);
    }
  }, [outfitPreferences]);

  const handleToggleItem = (id: string, hasItem: boolean) => {
    setClothingItems(items =>
      items.map(item =>
        item.id === id ? { ...item, hasInWardrobe: hasItem } : item
      )
    );
  };

  const handleSubmitOutfitForm = () => {
    if (!formData.gender || !formData.event || !formData.style) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    setOutfitPreferences(formData);
    setShowOutfitForm(false);
    setShowRecommendations(true);
  };

  const getRecommendedItems = async () => {
    const { gender, style, event } = outfitPreferences;
  
    // Формируем wardrobe в нужном формате (как у вас и было)
    const result = {
      Outerwear: wardrobeItems.filter(item => item.category === "Верхняя одежда").map(item => item.name),
      Sweaters: wardrobeItems.filter(item => item.category === "Свитера").map(item => item.name),
      Tops: wardrobeItems.filter(item => item.category === "Верх").map(item => item.name),
      Bottoms: wardrobeItems.filter(item => item.category === "Низ").map(item => item.name),
      Footwear: wardrobeItems.filter(item => item.category === "Обувь").map(item => item.name),
      Accessories: wardrobeItems.filter(item => item.category === "Аксессуары").map(item => item.name),
    };
  
    try {
      console.log(event)
      const response = await fetch('http://hub.connexum.ru:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sex: gender,
          weather: "+12°C, облачно",
          style: style,
          event: event,
          wardrobe: result
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const recommendedNames = data["recommended_items"]; // массив названий, например ["Ветровка", "Джинсы"]
  
      // Сопоставляем названия с реальными предметами из гардероба
      const matchedItems = recommendedNames
        .map(name => wardrobeItems.find(item => item.name === name))
        .filter((item): item is WardrobeItem => item !== undefined);
  
      // Если каких‑то предметов нет в гардеробе, создаём заглушки, чтобы они всё равно отображались
      const finalItems = recommendedNames.map(name => {
        const existing = wardrobeItems.find(item => item.name === name);
        if (existing) return existing;
        // Временный объект для отображения названия
        return {
          id: `temp-${name}`,
          name: name,
          category: "Рекомендация",
          color: "",
          season: "",
          emoji: "👕",
        } as WardrobeItem;
      });
  
      setRecommendedItems(finalItems);
      return finalItems;
    } catch (error) {
      console.error('Ошибка запроса:', error);
      setRecommendedItems([]);
      return [];
    }
  };
  //@ts-nocheck
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-800">AI Стилист</h1>
        <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI</span>
        </div>
      </div>
      
      <WeatherCard
        city="Москва"
        temperature={12}
        condition="Облачно"
        windSpeed={5}
        humidity={65}
      />

      <Button
        onClick={() => setShowOutfitForm(!showOutfitForm)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg"
      >
        <Shirt className="w-6 h-6 mr-2" />
        Одень меня
      </Button>

      {showOutfitForm && (
        <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800">Подбор образа</h3>
            <button
              onClick={() => setShowOutfitForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пол
              </label>
              <select
                className="w-full p-3 border rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Выберите пол</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
                <option value="Унисекс">Унисекс</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Мероприятие
              </label>
              <Input
                placeholder="Например: Работа, Свидание, Прогулка"
                value={formData.event}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                className="border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Стиль одежды
              </label>
              <select
                className="w-full p-3 border rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              >
                <option value="">Выберите стиль</option>
                <option value="Кэжуал">Кэжуал</option>
                <option value="Деловой">Деловой</option>
                <option value="Спортивный">Спортивный</option>
                <option value="Элегантный">Элегантный</option>
                <option value="Уличный">Уличный</option>
                <option value="Романтичный">Романтичный</option>
              </select>
            </div>

            {outfitPreferences.gender && (
              <div className="bg-purple-50 rounded-lg p-3 text-sm">
                <div className="font-medium text-purple-800 mb-1">Текущие предпочтения:</div>
                <div className="text-purple-700">
                  {outfitPreferences.gender} • {outfitPreferences.event} • {outfitPreferences.style}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowOutfitForm(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={handleSubmitOutfitForm}
              >
                Применить
              </Button>
            </div>
          </div>
        </div>
      )}

      {showRecommendations && outfitPreferences.gender && (
        <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-800">Рекомендованный образ</h3>
            <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              {outfitPreferences.style}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-800">
                Для: {outfitPreferences.event}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Подобрано для {outfitPreferences.gender === "Мужской" ? "мужского" : "женского"} стиля с учетом погоды 12°C
            </p>
          </div>

          <div className="space-y-2">
          {showRecommendations && outfitPreferences.gender && (
        <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-800">Рекомендованный образ</h3>
            <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              {outfitPreferences.style}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-800">
                Для: {outfitPreferences.event}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Подобрано для {outfitPreferences.gender === "Мужской" ? "мужского" : "женского"} стиля с учетом погоды 12°C
            </p>
          </div>

          <div className="space-y-2">
            {isLoadingRecommendations ? (
              <div className="text-center py-4 text-gray-500">Загрузка рекомендаций...</div>
            ) : (
              recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-2xl">{item.emoji}</span>
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.season}
                    </div>
                  </div>
                  <div className="text-xs text-purple-600 font-medium">
                    Подходит
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => setShowRecommendations(false)}
            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Скрыть рекомендации
          </button>
        </div>
      )}
          </div>

          <button
            onClick={() => setShowRecommendations(false)}
            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Скрыть рекомендации
          </button>
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">AI-подсказка</h3>
            <p className="text-sm text-gray-600">
              Сегодня прохладно и ветрено. Рекомендуем многослойную одежду. 
              Ветровка защитит от ветра, а при потеплении её можно снять.
            </p>
          </div>
        </div>
      </div>

      <ShoppingRecommendations />
      
      <ActivitySuggestions />
      
      <PremiumModal />
    </div>
  );
}