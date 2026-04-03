import { Coffee, TreePine, Bike, Building2, UtensilsCrossed } from "lucide-react";
import { Button } from "./ui/button";

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  weatherSuitability: string;
}

export function ActivitySuggestions() {
  const activities: Activity[] = [
    {
      id: "1",
      title: "Прогулка в парке",
      description: "Отличная погода для прогулки на свежем воздухе",
      icon: TreePine,
      weatherSuitability: "Подходит для +12°C",
    },
    {
      id: "2",
      title: "Кафе с террасой",
      description: "Не слишком жарко для кофе на улице",
      icon: Coffee,
      weatherSuitability: "Комфортная температура",
    },
    {
      id: "3",
      title: "Велопрогулка",
      description: "Легкий ветер – идеально для велосипеда",
      icon: Bike,
      weatherSuitability: "Ветер 5 м/с",
    },
    {
      id: "4",
      title: "Музей или выставка",
      description: "Возможен дождь – время для помещений",
      icon: Building2,
      weatherSuitability: "На случай дождя",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🌤️ Куда пойти сегодня?</h2>
      <p className="text-sm text-gray-600 mb-4">
        AI подобрал активности на основе прогноза погоды
      </p>

      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
            >
              <div className="bg-white rounded-lg p-2">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                <div className="text-xs text-blue-600">{activity.weatherSuitability}</div>
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full mt-4">
        Посмотреть все рекомендации
      </Button>
    </div>
  );
}
