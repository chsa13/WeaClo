import { ExternalLink, ShoppingBag, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  marketplace: "TISHKA" | "ТЕЛОДВИЖЕНИЯ" | "NESS" | "Lamoda" | "Авито";
  image: string;
  rating: number;
  partnerLink: string;
}

export function ShoppingRecommendations() {
  const items: ShoppingItem[] = [
    {
      id: "1",
      name: "Ветровка унисекс весенняя",
      price: 1890,
      marketplace: "TISHKA",
      image: "🧥",
      rating: 4.7,
      partnerLink: "#",
    },
    {
      id: "2",
      name: "Джинсы прямого кроя",
      price: 2490,
      marketplace: "ТЕЛОДВИЖЕНИЯ",
      image: "👖",
      rating: 4.5,
      partnerLink: "#",
    },
    {
      id: "3",
      name: "Кроссовки для города",
      price: 3990,
      marketplace: "NESS",
      image: "👟",
      rating: 4.8,
      partnerLink: "#",
    },
  ];

  const marketplaceColors: Record<ShoppingItem["marketplace"], string> = {
    TISHKA: "bg-purple-100 text-purple-800",
    ТЕЛОДВИЖЕНИЯ: "bg-blue-100 text-blue-800",
    NESS: "bg-pink-100 text-pink-800",
    Lamoda: "bg-pink-100 text-pink-800",
    Авито: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">🛍️ Рекомендуем купить</h2>
        <Badge variant="secondary" className="text-xs">Партнеры</Badge>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-4xl">{item.image}</div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 text-sm mb-1">{item.name}</h3>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`text-xs ${marketplaceColors[item.marketplace]}`}>
                  {item.marketplace}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{item.rating}</span>
                </div>
              </div>
              <div className="font-bold text-blue-600">от {item.price}₽</div>
            </div>

            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 shrink-0"
              asChild
            >
              <a href={item.partnerLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        💰 При покупке по ссылке вы поддерживаете развитие приложения
      </div>
    </div>
  );
}