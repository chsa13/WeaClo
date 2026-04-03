import { useState, useEffect } from "react";
import { Plus, Calendar as CalendarIcon, MapPin, Clock, Sparkles, Link as LinkIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useNavigate } from "react-router";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "work" | "casual" | "sport" | "formal";
  location: string;
  outfit?: string;
  source?: "manual" | "google" | "yandex";
}

const eventTypeLabels: Record<Event["type"], string> = {
  work: "Работа",
  casual: "Повседневное",
  sport: "Спорт",
  formal: "Официальное",
};

const eventTypeColors: Record<Event["type"], string> = {
  work: "bg-blue-100 text-blue-800",
  casual: "bg-green-100 text-green-800",
  sport: "bg-orange-100 text-orange-800",
  formal: "bg-purple-100 text-purple-800",
};

export function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Встреча с клиентом",
      date: "2026-04-03",
      time: "14:00",
      type: "work",
      location: "БЦ Москва-Сити",
      outfit: "Деловой костюм, туфли",
      source: "manual",
    },
    {
      id: "2",
      title: "Прогулка в парке",
      date: "2026-04-04",
      time: "16:00",
      type: "casual",
      location: "Парк Горького",
      source: "manual",
    },
    {
      id: "3",
      title: "Тренировка",
      date: "2026-04-05",
      time: "19:00",
      type: "sport",
      location: "Фитнес-центр",
      outfit: "Спортивный костюм, кроссовки",
      source: "manual",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [hasCalendarSync, setHasCalendarSync] = useState(false);

  useEffect(() => {
    // Check if calendars are connected
    const googleConnected = localStorage.getItem('calendar_google_connected') === 'true';
    const yandexConnected = localStorage.getItem('calendar_yandex_connected') === 'true';
    
    setHasCalendarSync(googleConnected || yandexConnected);

    // Load calendar events if connected
    if (googleConnected || yandexConnected) {
      const calendarEvents: Event[] = [];
      
      if (googleConnected) {
        calendarEvents.push({
          id: "google-1",
          title: "Корпоративная встреча",
          date: "2026-04-06",
          time: "11:00",
          type: "work",
          location: "Офис",
          outfit: "Деловой casual: рубашка, брюки",
          source: "google",
        });
      }

      if (yandexConnected) {
        calendarEvents.push({
          id: "yandex-1",
          title: "День рождения друга",
          date: "2026-04-07",
          time: "19:00",
          type: "casual",
          location: "Ресторан",
          outfit: "Стильный образ: джинсы, свитер, ботинки",
          source: "yandex",
        });
      }

      // Add calendar events to the list
      setEvents(prev => {
        const manualEvents = prev.filter(e => e.source === "manual");
        return [...manualEvents, ...calendarEvents];
      });
    }
  }, []);

  const getSourceBadge = (source?: string) => {
    if (source === "google") return { label: "Google", color: "bg-blue-100 text-blue-800" };
    if (source === "yandex") return { label: "Яндекс", color: "bg-red-100 text-red-800" };
    return null;
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">События</h1>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить
        </Button>
      </div>

      {!hasCalendarSync && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3 mb-3">
            <CalendarIcon className="w-5 h-5 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">
                Подключите календарь
              </h3>
              <p className="text-sm text-gray-600">
                События автоматически загрузятся с AI-рекомендациями одежды
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/settings')}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Перейти в настройки
          </Button>
        </div>
      )}

      {showAddForm && (
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-blue-200">
          <h3 className="font-semibold mb-3">Новое событие</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Название события"
              className="w-full p-2 border rounded-lg"
            />
            <select className="w-full p-2 border rounded-lg">
              <option>Тип события</option>
              <option>Работа</option>
              <option>Повседневное</option>
              <option>Спорт</option>
              <option>Официальное</option>
            </select>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Место"
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline" onClick={() => setShowAddForm(false)}>
                Отмена
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {events.map(event => {
          const sourceBadge = getSourceBadge(event.source);
          return (
            <div key={event.id} className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    {sourceBadge && (
                      <Badge className={`text-xs ${sourceBadge.color}`}>
                        {sourceBadge.label}
                      </Badge>
                    )}
                  </div>
                  <Badge className={eventTypeColors[event.type]}>
                    {eventTypeLabels[event.type]}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {event.outfit && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-100">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-purple-900 mb-1">
                        AI-рекомендация
                      </div>
                      <div className="text-sm text-gray-700">{event.outfit}</div>
                    </div>
                  </div>
                </div>
              )}

              {!event.outfit && (
                <Button variant="outline" className="w-full" size="sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Получить AI-рекомендацию
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-2">📅 Планируйте заранее</h3>
        <p className="text-sm text-gray-600">
          Добавляйте предстоящие события, и AI заранее подберет идеальный образ 
          с учетом погоды и дресс-кода.
        </p>
      </div>
    </div>
  );
}