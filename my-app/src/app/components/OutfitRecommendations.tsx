import { useState } from "react";
import { ShoppingBag, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ClothingItem {
  id: string;
  name: string;
  emoji: string;
  hasInWardrobe: boolean | null;
  optional?: boolean;
}

interface OutfitRecommendationsProps {
  items: ClothingItem[];
  onToggleItem: (id: string, hasItem: boolean) => void;
}

export function OutfitRecommendations({ items, onToggleItem }: OutfitRecommendationsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🧥 Рекомендуем надеть:</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <div className="font-medium text-gray-800">
                  {item.name}
                  {item.optional && <span className="text-gray-500 text-sm ml-2">(по желанию)</span>}
                </div>
                <div className="text-sm text-gray-600">
                  {item.hasInWardrobe === null ? (
                    "У вас есть?"
                  ) : item.hasInWardrobe ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Есть в гардеробе
                    </span>
                  ) : (
                    <span className="text-orange-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Нужно купить
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {item.hasInWardrobe === null && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onToggleItem(item.id, true)}
                  className="text-green-600 hover:text-green-700"
                >
                  Да
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onToggleItem(item.id, false)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Нет
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 space-y-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Купить недостающее от 1500₽
        </Button>
        <Button variant="outline" className="w-full">
          👕 Загрузить свой гардероб
        </Button>
      </div>
    </div>
  );
}
