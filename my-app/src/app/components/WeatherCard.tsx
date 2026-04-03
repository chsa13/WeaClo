import { Cloud, Wind, Droplets, MapPin } from "lucide-react";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
}

export function WeatherCard({ city, temperature, condition, windSpeed, humidity }: WeatherCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">{city}</span>
        </div>
        <div className="text-sm opacity-90">Сегодня</div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Cloud className="w-16 h-16" />
          <div>
            <div className="text-5xl font-light">{temperature}°</div>
            <div className="text-sm opacity-90">{condition}</div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <span>{windSpeed} м/с</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          <span>{humidity}%</span>
        </div>
      </div>
    </div>
  );
}
