import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Tour {
  id: number;
  title: string;
  destination: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  description: string;
  included: string[];
}

const tours: Tour[] = [
  {
    id: 1,
    title: 'Остров Ольхон',
    destination: 'Озеро Байкал',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/8e3f4ead-5bae-4714-9853-20edcf974f7e.jpg',
    price: 15000,
    duration: '3 дня',
    rating: 5.0,
    reviews: 342,
    description: 'Сердце Байкала - шаманские скалы, чистейшая вода и невероятные пейзажи',
    included: ['Трансфер', 'Проживание', 'Питание', 'Экскурсии']
  },
  {
    id: 2,
    title: 'Листвянка',
    destination: 'Озеро Байкал',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/5be6e3e7-cef3-4ba6-9baa-741c6744e639.jpg',
    price: 8000,
    duration: '2 дня',
    rating: 4.9,
    reviews: 567,
    description: 'Ближайший курорт от Иркутска - нерпинарий, музей Байкала, прогулки на катере',
    included: ['Трансфер', 'Гостиница', 'Экскурсии', 'Питание']
  },
  {
    id: 3,
    title: 'Большое Голоустное',
    destination: 'Озеро Байкал',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/c0e1d969-f947-4b0d-b579-ced3a86c8fc6.jpg',
    price: 12000,
    duration: '3 дня',
    rating: 4.8,
    reviews: 189,
    description: 'Уединённое место с песчаными пляжами - идеально для отдыха от цивилизации',
    included: ['Трансфер', 'Палаточный лагерь', 'Питание', 'Рыбалка']
  },
  {
    id: 4,
    title: 'Аршан',
    destination: 'Бурятия',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/f37e986f-674d-4f1d-9ac7-fac38a025ef2.jpg',
    price: 18000,
    duration: '4 дня',
    rating: 5.0,
    reviews: 423,
    description: 'Целебные минеральные источники в горах Саян - здоровье и красота природы',
    included: ['Трансфер', 'Санаторий', 'Питание', 'Лечение']
  },
  {
    id: 5,
    title: 'Посёлок Вышка',
    destination: 'Бурятия',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/94044f12-49d6-4c34-876b-87e58b3f2c9d.jpg',
    price: 10000,
    duration: '2 дня',
    rating: 4.7,
    reviews: 156,
    description: 'Уютный горный курорт с термальными источниками и живописными видами',
    included: ['Трансфер', 'Проживание', 'Питание', 'Экскурсии']
  },
  {
    id: 6,
    title: 'Пик Любви',
    destination: 'Походы',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/4787af63-99db-42e6-8cb0-6a711f397aae.jpg',
    price: 6500,
    duration: '1 день',
    rating: 4.9,
    reviews: 278,
    description: 'Популярный пик с панорамным видом на Байкал - идеально для однодневного похода',
    included: ['Гид', 'Снаряжение', 'Перекус', 'Страховка']
  },
  {
    id: 7,
    title: 'Пик Галина',
    destination: 'Походы',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/4787af63-99db-42e6-8cb0-6a711f397aae.jpg',
    price: 7500,
    duration: '2 дня',
    rating: 5.0,
    reviews: 145,
    description: 'Живописный пик с ночёвкой у подножия - звёздное небо и восход солнца',
    included: ['Гид', 'Палатки', 'Питание', 'Страховка']
  },
  {
    id: 8,
    title: 'Пик Улябор',
    destination: 'Походы',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/4787af63-99db-42e6-8cb0-6a711f397aae.jpg',
    price: 9000,
    duration: '2 дня',
    rating: 4.8,
    reviews: 98,
    description: 'Сложный маршрут для опытных туристов с незабываемыми видами',
    included: ['Гид', 'Снаряжение', 'Питание', 'Страховка']
  },
  {
    id: 9,
    title: 'Пик Хулугайша (3000м)',
    destination: 'Походы',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/4787af63-99db-42e6-8cb0-6a711f397aae.jpg',
    price: 14000,
    duration: '4 дня',
    rating: 5.0,
    reviews: 234,
    description: 'Самый доступный трехтысячник в регионе - покорите свою первую высоту!',
    included: ['Гид', 'Палатки', 'Питание', 'Снаряжение']
  },
  {
    id: 10,
    title: 'ББТ - Большая Байкальская Тропа',
    destination: 'Походы',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/fc3491af-0554-4fa5-a889-296e2ad034d5.jpg',
    price: 16000,
    duration: '5 дней',
    rating: 5.0,
    reviews: 412,
    description: 'Легендарный маршрут вдоль берега Байкала - леса, пляжи, бухты',
    included: ['Гид', 'Палатки', 'Питание', 'Трансфер']
  },
  {
    id: 11,
    title: 'КБЖД - Кругобайкальская ЖД',
    destination: 'Прогулки',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/79b193b4-281c-4c3b-baa5-633f44791376.jpg',
    price: 5500,
    duration: '1 день',
    rating: 4.9,
    reviews: 789,
    description: 'Историческая железная дорога с туннелями и виадуками вдоль Байкала',
    included: ['ЖД билет', 'Гид', 'Обед', 'Трансфер']
  },
  {
    id: 12,
    title: 'Шумак - целебные источники',
    destination: 'Походы',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/454fb19b-bc44-4908-aa14-af89ae750f6c.jpg',
    price: 35000,
    duration: '10-14 дней',
    rating: 5.0,
    reviews: 167,
    description: 'Легендарные целебные источники в горах Саян - 100+ источников с разными свойствами. Настоящее приключение!',
    included: ['Гид', 'Палатки', 'Питание', 'Трансфер', 'Баня']
  },
  {
    id: 13,
    title: 'Соболинные озёра',
    destination: 'Походы',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/65fc05c9-7de8-4b11-8942-61d9232d4a1b.jpg',
    price: 22000,
    duration: '7 дней',
    rating: 5.0,
    reviews: 93,
    description: 'Горные озёра с кристально чистой водой - отличная рыбалка на хариуса и ленка в окружении дикой природы',
    included: ['Гид', 'Палатки', 'Питание', 'Снаряжение для рыбалки']
  },
  {
    id: 14,
    title: 'Осенняя рыбалка на горной реке',
    destination: 'Рыбалка',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/1b2b4640-886b-4239-86a7-372e76f8f8b7.jpg',
    price: 18000,
    duration: '5 дней',
    rating: 4.9,
    reviews: 234,
    description: 'Спиннинговая рыбалка на хариуса, ленка и тайменя в золотую осень - лучшее время для трофеев!',
    included: ['Гид-рыбак', 'Палатки', 'Питание', 'Лодка', 'Снасти']
  }
];

const destinations = [
  { name: 'Походы', count: 8, icon: 'Mountain' },
  { name: 'Рыбалка', count: 3, icon: 'Fish' },
  { name: 'Озеро Байкал', count: 8, icon: 'Waves' },
  { name: 'Бурятия', count: 5, icon: 'Tent' },
  { name: 'Активный отдых', count: 14, icon: 'Footprints' }
];

const reviews = [
  {
    name: 'Алексей Соколов',
    avatar: 'АС',
    rating: 5,
    text: 'Шумак - невероятное место! 12 дней в горах, целебные источники реально работают. Гид профессионал!',
    tour: 'Шумак',
    date: '15 августа 2024'
  },
  {
    name: 'Дмитрий Иванов',
    avatar: 'ДИ',
    rating: 5,
    text: 'Осенняя рыбалка на хариуса - лучший отдых! Поймал трофейного ленка. Природа осенью волшебная',
    tour: 'Осенняя рыбалка',
    date: '25 сентября 2024'
  },
  {
    name: 'Мария Петрова',
    avatar: 'МП',
    rating: 5,
    text: 'Пик Хулугайша - мой первый трехтысячник! Виды на Саяны потрясающие. Спасибо за поддержку!',
    tour: 'Пик Хулугайша',
    date: '10 июля 2024'
  }
];

export default function Index() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [tourType, setTourType] = useState<'all' | 'group' | 'individual'>('all');

  const filteredTours = tourType === 'all' ? tours : 
    tourType === 'group' ? tours.filter(t => ['Походы', 'Прогулки', 'Рыбалка'].includes(t.destination)) :
    tours.filter(t => !['Походы', 'Прогулки', 'Рыбалка'].includes(t.destination));

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateTotal = (basePrice: number) => {
    return basePrice * adults + (basePrice * 0.7 * children);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Plane" className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              БайкалТур
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'tours', label: 'Туры' },
              { id: 'destinations', label: 'Направления' },
              { id: 'about', label: 'О нас' },
              { id: 'reviews', label: 'Отзывы' },
              { id: 'contacts', label: 'Контакты' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Icon name="Phone" className="mr-2 h-4 w-4" />
            Связаться
          </Button>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Откройте красоту Байкала
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Туры по Байкалу и Бурятии из Иркутска. Профессиональные гиды и незабываемые впечатления
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
                <Icon name="MapPin" className="h-5 w-5 text-accent" />
                <span className="font-semibold">Иркутск</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
                <Icon name="Waves" className="h-5 w-5 text-primary" />
                <span className="font-semibold">Байкал</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
                <Icon name="Mountain" className="h-5 w-5 text-secondary" />
                <span className="font-semibold">Бурятия</span>
              </div>
            </div>

            <Card className="bg-white/80 backdrop-blur shadow-xl animate-scale-in">
              <CardHeader>
                <CardTitle>Найдите свой идеальный тур</CardTitle>
                <CardDescription>Выберите даты и количество туристов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Дата начала</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Icon name="Calendar" className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Дата окончания</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Icon name="Calendar" className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Взрослые</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                      >
                        <Icon name="Minus" className="h-4 w-4" />
                      </Button>
                      <Input type="number" value={adults} readOnly className="text-center" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setAdults(adults + 1)}
                      >
                        <Icon name="Plus" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Дети</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                      >
                        <Icon name="Minus" className="h-4 w-4" />
                      </Button>
                      <Input type="number" value={children} readOnly className="text-center" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setChildren(children + 1)}
                      >
                        <Icon name="Plus" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6"
                  onClick={() => scrollToSection('tours')}
                >
                  <Icon name="Search" className="mr-2 h-5 w-5" />
                  Найти туры
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="destinations" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Популярные направления</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {destinations.map((dest, idx) => (
              <Card 
                key={dest.name} 
                className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <Icon name={dest.icon as any} className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">{dest.name}</h3>
                  <p className="text-sm text-muted-foreground">{dest.count} туров</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="tours" className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Популярные туры</h2>
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant={tourType === 'all' ? 'default' : 'outline'}
              onClick={() => setTourType('all')}
              className={tourType === 'all' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              Все туры
            </Button>
            <Button 
              variant={tourType === 'group' ? 'default' : 'outline'}
              onClick={() => setTourType('group')}
              className={tourType === 'group' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Групповые походы
            </Button>
            <Button 
              variant={tourType === 'individual' ? 'default' : 'outline'}
              onClick={() => setTourType('individual')}
              className={tourType === 'individual' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              <Icon name="User" className="mr-2 h-4 w-4" />
              Индивидуальные
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTours.map((tour, idx) => (
              <Card 
                key={tour.id} 
                className="overflow-hidden hover:shadow-xl transition-all animate-slide-up"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent">
                    {tour.duration}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{tour.destination}</Badge>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{tour.rating}</span>
                      <span className="text-xs text-muted-foreground">({tour.reviews})</span>
                    </div>
                  </div>
                  <CardTitle>{tour.title}</CardTitle>
                  <CardDescription>{tour.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.included.map(item => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        <Icon name="Check" className="h-3 w-3 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">от</p>
                      <p className="text-2xl font-bold text-primary">
                        {tour.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          onClick={() => setSelectedTour(tour)}
                        >
                          Забронировать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Бронирование тура: {selectedTour?.title}</DialogTitle>
                          <DialogDescription>
                            Заполните детали бронирования
                          </DialogDescription>
                        </DialogHeader>
                        {selectedTour && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Дата начала</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">
                                      <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                      {dateFrom ? format(dateFrom, 'dd.MM.yyyy', { locale: ru }) : 'Выберите'}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="space-y-2">
                                <Label>Дата окончания</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">
                                      <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                      {dateTo ? format(dateTo, 'dd.MM.yyyy', { locale: ru }) : 'Выберите'}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Взрослые</Label>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="icon" onClick={() => setAdults(Math.max(1, adults - 1))}>
                                    <Icon name="Minus" className="h-4 w-4" />
                                  </Button>
                                  <Input type="number" value={adults} readOnly className="text-center" />
                                  <Button variant="outline" size="icon" onClick={() => setAdults(adults + 1)}>
                                    <Icon name="Plus" className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Дети</Label>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="icon" onClick={() => setChildren(Math.max(0, children - 1))}>
                                    <Icon name="Minus" className="h-4 w-4" />
                                  </Button>
                                  <Input type="number" value={children} readOnly className="text-center" />
                                  <Button variant="outline" size="icon" onClick={() => setChildren(children + 1)}>
                                    <Icon name="Plus" className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center mb-2">
                                <span>Взрослые ({adults} чел.)</span>
                                <span>{(selectedTour.price * adults).toLocaleString('ru-RU')} ₽</span>
                              </div>
                              {children > 0 && (
                                <div className="flex justify-between items-center mb-2">
                                  <span>Дети ({children} чел.)</span>
                                  <span>{(selectedTour.price * 0.7 * children).toLocaleString('ru-RU')} ₽</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                                <span>Итого:</span>
                                <span className="text-primary">{calculateTotal(selectedTour.price).toLocaleString('ru-RU')} ₽</span>
                              </div>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                              Подтвердить бронирование
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании БайкалТур</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Мы находимся в Иркутске и специализируемся на турах по озеру Байкал и Бурятии. 
              Познакомим вас с жемчужиной Сибири - Листвянкой, Ольхоном, Большим Голоустным, Аршаном и посёлком Вышка.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Waves" className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Озеро Байкал</h3>
                  <p className="text-sm text-muted-foreground">Самое глубокое озеро планеты</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Mountain" className="h-12 w-12 mx-auto mb-4 text-secondary" />
                  <h3 className="font-semibold mb-2">Бурятия</h3>
                  <p className="text-sm text-muted-foreground">Целебные источники и горные пейзажи</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Users" className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Местные гиды</h3>
                  <p className="text-sm text-muted-foreground">Профессионалы из Иркутска</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{review.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{review.name}</CardTitle>
                      <CardDescription className="text-xs">{review.date}</CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{review.text}</p>
                  <Badge variant="outline" className="text-xs">{review.tour}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Свяжитесь с нами</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-white/80">+7 (3952) 500-100</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-white/80">info@baikal-tour.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-white/80">Иркутск, ул. Ленина, 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-white/80">Пн-Пт: 9:00 - 20:00</p>
                      <p className="text-white/80">Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-foreground">Напишите нам</CardTitle>
                  <CardDescription>Мы ответим в течение 1 часа</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Имя</Label>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Сообщение</Label>
                    <Input placeholder="Интересует тур на Ольхон..." />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Отправить
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-slate-50 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Plane" className="h-6 w-6 text-primary" />
              <span className="font-bold">БайкалТур</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 БайкалТур. Туры по Байкалу из Иркутска</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Youtube" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}