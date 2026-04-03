import { useState, useEffect } from "react";
import { Plus, Trash2, ShirtIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { PhotoUpload } from "../components/PhotoUpload";

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
  emoji: string;
  image?: string;
}

export function Wardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>(() => {
    const saved = localStorage.getItem("wardrobeItems");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      // Верхняя одежда
      { id: "1", name: "пуховик длинный", category: "Верхняя одежда", color: "Не указан", season: "Зима", emoji: "🧥", image: "https://images.unsplash.com/photo-1581504912285-745af0d408f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "2", name: "пуховик короткий", category: "Верхняя одежда", color: "Не указан", season: "Зима", emoji: "🧥", image: "https://images.unsplash.com/photo-1770258723510-72a5e54ba7a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "3", name: "парка с мехом", category: "Верхняя одежда", color: "Не указан", season: "Зима", emoji: "🧥", image: "https://images.unsplash.com/photo-1611163475112-0946a7823bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "4", name: "кожаная куртка", category: "Верхняя одежда", color: "Не указан", season: "Осень", emoji: "🧥", image: "https://images.unsplash.com/photo-1727524366429-27de8607d5f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "5", name: "джинсовая куртка", category: "Верхняя одежда", color: "Синий", season: "Весна", emoji: "🧥", image: "https://images.unsplash.com/photo-1587155471946-9e8d4d1132fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "6", name: "плащ-дождевик", category: "Верхняя одежда", color: "Не указан", season: "Осень", emoji: "🧥", image: "https://images.unsplash.com/photo-1563671889-7bfa8c578a7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "7", name: "шерстяное пальто", category: "Верхняя одежда", color: "Не указан", season: "Зима", emoji: "🧥", image: "https://images.unsplash.com/photo-1637102146291-c408b298e22b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "8", name: "кашемировое пальто", category: "Верхняя одежда", color: "Не указан", season: "Зима", emoji: "🧥", image: "https://images.unsplash.com/photo-1637695417699-78d3ee9f3eb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "9", name: "ветровка утеплённая", category: "Верхняя одежда", color: "Не указан", season: "Осень", emoji: "🧥", image: "https://images.unsplash.com/photo-1539539744374-82d54ab01ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "10", name: "бомбер", category: "Верхняя одежда", color: "Не указан", season: "Весна", emoji: "🧥", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },

      // Свитера
      { id: "11", name: "свитер овечья шерсть", category: "Свитера", color: "Не указан", season: "Зима", emoji: "🧶", image: "https://images.unsplash.com/photo-1711097258176-c1a4bb511aa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "12", name: "водолазка чёрная", category: "Свитера", color: "Черный", season: "Зима", emoji: "👕", image: "https://images.unsplash.com/photo-1688685567139-70841b903f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "13", name: "худи серая", category: "Свитера", color: "Серый", season: "Осень", emoji: "👕", image: "https://images.unsplash.com/photo-1649006612249-6d32f5c2c429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "14", name: "флисовая кофта", category: "Свитера", color: "Не указан", season: "Осень", emoji: "👕", image: "https://images.unsplash.com/photo-1640746791140-4ab07eb35c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "15", name: "кардиган длинный", category: "Свитера", color: "Не указан", season: "Осень", emoji: "🧥", image: "https://images.unsplash.com/photo-1617669776234-fc5a89eb8f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "16", name: "лапша (свитер-реглан)", category: "Свитера", color: "Не указан", season: "Осень", emoji: "👕", image: "https://images.unsplash.com/photo-1734177647081-5bf078a15577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "17", name: "олимпийка", category: "Свитера", color: "Не указан", season: "Круглый год", emoji: "👕", image: "https://images.unsplash.com/photo-1771257807525-1a31ef3d4bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "18", name: "толстовка на молнии", category: "Свитера", color: "Не указан", season: "Осень", emoji: "👕", image: "https://images.unsplash.com/photo-1564858775545-e2d21c3ceee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "19", name: "жилет пуховый", category: "Свитера", color: "Не указан", season: "Зима", emoji: "🦺", image: "https://images.unsplash.com/photo-1758640920730-a4b27cd8aa21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "20", name: "жилет джинсовый", category: "Свитера", color: "Синий", season: "Лето", emoji: "🦺", image: "https://images.unsplash.com/photo-1741943355114-af217a001fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },

      // Верх
      { id: "21", name: "футболка белая хлопок", category: "Верх", color: "Белый", season: "Лето", emoji: "👕", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "22", name: "футболка чёрная", category: "Верх", color: "Черный", season: "Лето", emoji: "👕", image: "https://images.unsplash.com/photo-1711641066085-5236bf7afcd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "23", name: "поло", category: "Верх", color: "Не указан", season: "Лето", emoji: "👕", image: "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "24", name: "лонгслив", category: "Верх", color: "Не указан", season: "Осень", emoji: "👕", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "25", name: "рубашка джинсовая", category: "Верх", color: "Синий", season: "Круглый год", emoji: "👔", image: "https://images.unsplash.com/photo-1582261484646-a545de6d2382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "26", name: "рубашка льняная", category: "Верх", color: "Не указан", season: "Лето", emoji: "👔", image: "https://images.unsplash.com/photo-1766735324704-5f245cf0e9e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "27", name: "рубашка клетчатая", category: "Верх", color: "Не указан", season: "Круглый год", emoji: "👔", image: "https://images.unsplash.com/photo-1591560774328-fcb4b90c206e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "28", name: "топ майка", category: "Верх", color: "Не указан", season: "Лето", emoji: "👕", image: "https://images.unsplash.com/photo-1601838165307-6a5a08616f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "29", name: "бандана", category: "Верх", color: "Не указан", season: "Лето", emoji: "🧣", image: "https://images.unsplash.com/photo-1760540329469-9d3c559f85df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "30", name: "майка-алкоголичка", category: "Верх", color: "Не указан", season: "Лето", emoji: "👕", image: "https://images.unsplash.com/photo-1706007955231-a12850a9d028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "31", name: "платье", category: "Верх", color: "Не указан", season: "Круглый год", emoji: "👗", image: "https://images.unsplash.com/photo-1759992878772-e83a691a6d8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },

      // Низ
      { id: "32", name: "джинсы прямые синие", category: "Низ", color: "Синий", season: "Круглый год", emoji: "👖", image: "https://images.unsplash.com/photo-1754555009601-498e9873197e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "33", name: "джинсы чёрные скинни", category: "Низ", color: "Черный", season: "Круглый год", emoji: "👖", image: "https://images.unsplash.com/photo-1509706946595-9254a909cadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "34", name: "чиносы бежевые", category: "Низ", color: "Бежевый", season: "Круглый год", emoji: "👖", image: "https://images.unsplash.com/photo-1744535814653-f14e23a1aa37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "35", name: "брюки вельветовые", category: "Низ", color: "Не указан", season: "Осень", emoji: "👖", image: "https://images.unsplash.com/photo-1605204567609-09e4140bfbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "36", name: "спортивные штаны", category: "Низ", color: "Не указан", season: "Круглый год", emoji: "👖", image: "https://images.unsplash.com/photo-1767140482163-3e94d087bbfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "37", name: "шорты джинсовые", category: "Низ", color: "Синий", season: "Лето", emoji: "🩳", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "38", name: "шорты беговые", category: "Низ", color: "Не указан", season: "Лето", emoji: "🩳", image: "https://images.unsplash.com/photo-1771451835963-0f86579067b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "39", name: "лосины", category: "Низ", color: "Не указан", season: "Круглый год", emoji: "👖", image: "https://images.unsplash.com/photo-1618355281951-a174b87198e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "40", name: "термобельё кальсоны", category: "Низ", color: "Не указан", season: "Зима", emoji: "🩲", image: "https://images.unsplash.com/photo-1698328722626-e02b87c9dce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "41", name: "бриджи", category: "Низ", color: "Не указан", season: "Лето", emoji: "🩳", image: "https://images.unsplash.com/photo-1616680467008-a58b8ed7039c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },

      // Обувь
      { id: "42", name: "кроссовки белые", category: "Обувь", color: "Белый", season: "Круглый год", emoji: "👟", image: "https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "43", name: "кроссовки трекинговые", category: "Обувь", color: "Не указан", season: "Круглый год", emoji: "👟", image: "https://images.unsplash.com/photo-1531928719516-3609b35d6ea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "44", name: "кеды", category: "Обувь", color: "Не указан", season: "Лето", emoji: "👟", image: "https://images.unsplash.com/photo-1684351045483-b6c486fa979a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "45", name: "ботинки зимние", category: "Обувь", color: "Не указан", season: "Зима", emoji: "🥾", image: "https://images.unsplash.com/photo-1542336945-a4b0d29304c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "46", name: "резиновые сапоги", category: "Обувь", color: "Не указан", season: "Осень", emoji: "🥾", image: "https://images.unsplash.com/photo-1518319431989-3ed1fdb08c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "47", name: "туфли кожаные", category: "Обувь", color: "Не указан", season: "Круглый год", emoji: "👞", image: "https://images.unsplash.com/photo-1598934530235-afa2662917d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "48", name: "лоферы", category: "Обувь", color: "Не указан", season: "Круглый год", emoji: "👞", image: "https://images.unsplash.com/photo-1742392853164-93a8084fa402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "49", name: "сланцы", category: "Обувь", color: "Не указан", season: "Лето", emoji: "🩴", image: "https://images.unsplash.com/photo-1766818982317-bd34c2e9b60f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "50", name: "угги", category: "Обувь", color: "Не указан", season: "Зима", emoji: "🥾", image: "https://images.unsplash.com/photo-1586810679476-7e2e76421009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "51", name: "берцы армейские", category: "Обувь", color: "Не указан", season: "Круглый год", emoji: "🥾", image: "https://images.unsplash.com/photo-1763479168293-cf1e5d7e464d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },

      // Аксессуары
      { id: "52", name: "шапка вязаная", category: "Аксессуары", color: "Не указан", season: "Зима", emoji: "🧢", image: "https://images.unsplash.com/photo-1699347611474-5be693bee31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "53", name: "ушанка", category: "Аксессуары", color: "Не указан", season: "Зима", emoji: "🧢", image: "https://images.unsplash.com/photo-1639831503156-24855004af1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "54", name: "бейсболка", category: "Аксессуары", color: "Не указан", season: "Лето", emoji: "🧢", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "55", name: "панама", category: "Аксессуары", color: "Не указан", season: "Лето", emoji: "🧢", image: "https://images.unsplash.com/photo-1567300771519-a4c4be68b5fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "56", name: "шарф шерстяной", category: "Аксессуары", color: "Не указан", season: "Зима", emoji: "🧣", image: "https://images.unsplash.com/photo-1604843206973-fe1e58bf974e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "57", name: "варежки", category: "Аксессуары", color: "Не указан", season: "Зима", emoji: "🧤", image: "https://images.unsplash.com/photo-1638344435939-b2d44c8ea302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "58", name: "перчатки кожаные", category: "Аксессуары", color: "Не указан", season: "Зима", emoji: "🧤", image: "https://images.unsplash.com/photo-1643650374762-196c86358df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "59", name: "зонт-трость", category: "Аксессуары", color: "Не указан", season: "Круглый год", emoji: "☂️", image: "https://images.unsplash.com/photo-1748616574537-7a20c84e6d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "60", name: "ремень кожаный", category: "Аксессуары", color: "Не указан", season: "Круглый год", emoji: "👔", image: "https://images.unsplash.com/photo-1664286074176-5206ee5dc878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
      { id: "61", name: "подтяжки", category: "Аксессуары", color: "Не указан", season: "Круглый год", emoji: "👔", image: "https://images.unsplash.com/photo-1653309598865-a00180eb34c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    ];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    color: "",
    season: "",
  });

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) {
      alert("Заполните название и категорию");
      return;
    }

    const emojiMap: Record<string, string> = {
      "Верхняя одежда": "🧥",
      "Свитера": "🧶",
      "Верх": "👕",
      "Низ": "👖",
      "Обувь": "👟",
      "Аксессуары": "👜",
    };

    const newWardrobeItem: WardrobeItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      color: newItem.color || "Не указан",
      season: newItem.season || "Круглый год",
      emoji: emojiMap[newItem.category] || "👔",
    };

    setItems([newWardrobeItem, ...items]);
    setNewItem({ name: "", category: "", color: "", season: "" });
    setShowAddForm(false);
  };

  const categories = ["Верхняя одежда", "Свитера", "Верх", "Низ", "Обувь", "Аксессуары"];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("wardrobeItems", JSON.stringify(items));
  }, [items]);

  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Мой гардероб</h1>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить
        </Button>
      </div>

      <PhotoUpload />

      {showAddForm && (
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-blue-200">
          <h3 className="font-semibold mb-3">Добавить вещь</h3>
          <div className="space-y-3">
            <Input
              placeholder="Название вещи"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-lg"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              <option value="">Выберите категорию</option>
              <option value="Верхняя одежда">Верхняя одежда</option>
              <option value="Свитера">Свитера</option>
              <option value="Верх">Верх</option>
              <option value="Низ">Низ</option>
              <option value="Обувь">Обувь</option>
              <option value="Аксессуары">Аксессуары</option>
            </select>
            <Input
              placeholder="Цвет (необязательно)"
              value={newItem.color}
              onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-lg"
              value={newItem.season}
              onChange={(e) => setNewItem({ ...newItem, season: e.target.value })}
            >
              <option value="">Сезон (необязательно)</option>
              <option value="Лето">Лето</option>
              <option value="Осень">Осень</option>
              <option value="Зима">Зима</option>
              <option value="Весна">Весна</option>
              <option value="Круглый год">Круглый год</option>
            </select>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setNewItem({ name: "", category: "", color: "", season: "" });
                }}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleAddItem}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Все ({items.length})
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category} ({items.filter(i => i.category === category).length})
          </Button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <ShirtIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Гардероб пуст</h3>
          <p className="text-gray-500">Добавьте вашу первую вещь</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md relative group overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 z-10 bg-white/80"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              {item.image ? (
                <div className="relative w-full h-48 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-48 bg-gray-50">
                  <span className="text-6xl">{item.emoji}</span>
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  <div className="text-xs text-gray-600">
                    <div>Цвет: {item.color}</div>
                    <div>Сезон: {item.season}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-2">💡 Совет</h3>
        <p className="text-sm text-gray-600">
          Добавьте больше вещей в гардероб, чтобы AI мог создавать более точные рекомендации 
          на основе вашей одежды.
        </p>
      </div>
    </div>
  );
}