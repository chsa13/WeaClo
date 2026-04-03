import { Crown, Check, Bell, Calendar, Sparkles, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";

export function PremiumModal() {
  const features = [
    { icon: Bell, text: "Умные push-уведомления о погоде и образах" },
    { icon: Calendar, text: "Автосинхронизация с календарем" },
    { icon: Sparkles, text: "Безлимитные AI-рекомендации" },
    { icon: Star, text: "Эксклюзивные подборки от стилистов" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          <Crown className="w-4 h-4 mr-2" />
          Попробовать Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-full">
              <Crown className="w-12 h-12 text-purple-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            AI Стилист Premium
          </DialogTitle>
          <DialogDescription className="text-center">
            Получите максимум от приложения
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">{feature.text}</span>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 mb-4">
          <div className="text-center mb-2">
            <div className="text-3xl font-bold text-gray-800">149₽</div>
            <div className="text-sm text-gray-600">в месяц</div>
          </div>
          <Badge className="w-full justify-center bg-purple-600">
            Первые 7 дней бесплатно
          </Badge>
        </div>

        <div className="space-y-2">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Начать бесплатный период
          </Button>
          <Button variant="ghost" className="w-full text-gray-600">
            Может быть позже
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Подписка продлевается автоматически. Отменить можно в любой момент.
        </p>
      </DialogContent>
    </Dialog>
  );
}
