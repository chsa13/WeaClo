import { useState } from "react";
import { 
  Bell, 
  Calendar, 
  ShoppingBag, 
  MapPin, 
  User, 
  Crown,
  Check,
  ChevronRight,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [connectedCalendars, setConnectedCalendars] = useState({
    google: false,
    yandex: false,
  });
  const [connectedMarketplaces, setConnectedMarketplaces] = useState({
    wildberries: false,
    ozon: false,
    lamoda: false,
    yandexMarket: false,
  });

  const handleConnectCalendar = (calendar: 'google' | 'yandex') => {
    // Simulate OAuth flow
    setConnectedCalendars(prev => ({ ...prev, [calendar]: true }));
    // Save to localStorage to persist connection
    localStorage.setItem(`calendar_${calendar}_connected`, 'true');
  };

  const handleDisconnectCalendar = (calendar: 'google' | 'yandex') => {
    setConnectedCalendars(prev => ({ ...prev, [calendar]: false }));
    localStorage.removeItem(`calendar_${calendar}_connected`);
  };

  const handleConnectMarketplace = (marketplace: string) => {
    // Simulate OAuth flow
    setConnectedMarketplaces(prev => ({ ...prev, [marketplace]: true }));
    localStorage.setItem(`marketplace_${marketplace}_connected`, 'true');
  };

  const handleDisconnectMarketplace = (marketplace: string) => {
    setConnectedMarketplaces(prev => ({ ...prev, [marketplace]: false }));
    localStorage.removeItem(`marketplace_${marketplace}_connected`);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Настройки</h1>

      {/* Premium Section */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-8 h-8" />
          <div>
            <h2 className="text-xl font-bold">Premium</h2>
            <p className="text-sm opacity-90">Разблокируйте все функции</p>
          </div>
        </div>
        <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
          Оформить подписку - 299₽/мес
        </Button>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Профиль</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">Мои предпочтения</div>
              <div className="text-sm text-gray-600">Стиль, размеры, бренды</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">Город</div>
              <div className="text-sm text-gray-600">Москва</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Уведомления
          <Badge variant="secondary" className="ml-auto">Premium</Badge>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">Ежедневные напоминания</div>
              <div className="text-sm text-gray-600">Что надеть сегодня (8:00)</div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="flex items-center justify-between opacity-50">
            <div>
              <div className="font-medium text-gray-800">Предупреждения о погоде</div>
              <div className="text-sm text-gray-600">Дождь, снег, холод</div>
            </div>
            <Switch disabled />
          </div>

          <div className="flex items-center justify-between opacity-50">
            <div>
              <div className="font-medium text-gray-800">Напоминания о событиях</div>
              <div className="text-sm text-gray-600">За 2 часа до события</div>
            </div>
            <Switch disabled />
          </div>
        </div>
      </div>

      {/* Calendar Sync */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Синхронизация календаря
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          События автоматически загрузятся во вкладку "События" с AI-рекомендациями одежды
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📅
              </div>
              <div>
                <div className="font-medium text-gray-800">Google Calendar</div>
                <div className="text-sm text-gray-600">
                  {connectedCalendars.google ? "✓ Подключен" : "Не подключен"}
                </div>
              </div>
            </div>
            {connectedCalendars.google ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDisconnectCalendar('google')}
              >
                Отключить
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnectCalendar('google')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Подключить
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                📆
              </div>
              <div>
                <div className="font-medium text-gray-800">Яндекс.Календарь</div>
                <div className="text-sm text-gray-600">
                  {connectedCalendars.yandex ? "✓ Подключен" : "Не подключен"}
                </div>
              </div>
            </div>
            {connectedCalendars.yandex ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDisconnectCalendar('yandex')}
              >
                Отключить
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnectCalendar('yandex')}
                className="bg-red-600 hover:bg-red-700"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Подключить
              </Button>
            )}
          </div>

          {(connectedCalendars.google || connectedCalendars.yandex) && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-sm text-green-800">
                AI будет автоматически создавать рекомендации одежды для событий из календаря
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Marketplace Sync */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Синхронизация покупок
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Автоматически добавляйте купленную одежду в гардероб
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center font-bold text-purple-600">
                WB
              </div>
              <div>
                <div className="font-medium text-gray-800">Wildberries</div>
                <div className="text-sm text-gray-600">
                  {connectedMarketplaces.wildberries ? "✓ Подключен" : "Не подключен"}
                </div>
              </div>
            </div>
            {connectedMarketplaces.wildberries ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDisconnectMarketplace('wildberries')}
              >
                Отключить
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnectMarketplace('wildberries')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Подключить
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                OZ
              </div>
              <div>
                <div className="font-medium text-gray-800">Ozon</div>
                <div className="text-sm text-gray-600">
                  {connectedMarketplaces.ozon ? "✓ Подключен" : "Не подключен"}
                </div>
              </div>
            </div>
            {connectedMarketplaces.ozon ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDisconnectMarketplace('ozon')}
              >
                Отключить
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnectMarketplace('ozon')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Подключить
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center font-bold text-pink-600">
                LA
              </div>
              <div>
                <div className="font-medium text-gray-800">Lamoda</div>
                <div className="text-sm text-gray-600">
                  {connectedMarketplaces.lamoda ? "✓ Подключен" : "Не подключен"}
                </div>
              </div>
            </div>
            {connectedMarketplaces.lamoda ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDisconnectMarketplace('lamoda')}
              >
                Отключить
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnectMarketplace('lamoda')}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Подключить
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center font-bold text-yellow-600">
                ЯМ
              </div>
              <div>
                <div className="font-medium text-gray-800">Яндекс.Маркет</div>
                <div className="text-sm text-gray-600">
                  {connectedMarketplaces.yandexMarket ? "✓ Подключен" : "Не подключен"}
                </div>
              </div>
            </div>
            {connectedMarketplaces.yandexMarket ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDisconnectMarketplace('yandexMarket')}
              >
                Отключить
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnectMarketplace('yandexMarket')}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Подключить
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="pb-4">
        <Button variant="outline" className="w-full text-gray-600">
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}