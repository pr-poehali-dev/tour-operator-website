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
    title: 'Райские пляжи Бали',
    destination: 'Индонезия',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/6f454991-cb01-43c9-a3b4-691551ac8d43.jpg',
    price: 89000,
    duration: '10 дней',
    rating: 4.9,
    reviews: 234,
    description: 'Незабываемый отдых на белоснежных пляжах Бали с посещением древних храмов',
    included: ['Перелет', 'Отель 5*', 'Экскурсии', 'Страховка']
  },
  {
    id: 2,
    title: 'Альпийские вершины',
    destination: 'Швейцария',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/5638a031-4ccd-49c2-bf8d-b91572e36599.jpg',
    price: 125000,
    duration: '7 дней',
    rating: 5.0,
    reviews: 189,
    description: 'Горнолыжный курорт с захватывающими видами на Альпы',
    included: ['Перелет', 'Отель 4*', 'Ski-pass', 'Трансфер']
  },
  {
    id: 3,
    title: 'Исторический Рим',
    destination: 'Италия',
    image: 'https://cdn.poehali.dev/projects/6f3fe8b0-bb5f-4fad-8f61-1495704d91c9/files/d88b1533-8328-4f63-a3f3-8d9900cfb2e6.jpg',
    price: 67000,
    duration: '6 дней',
    rating: 4.8,
    reviews: 312,
    description: 'Путешествие по древним улицам Рима с профессиональным гидом',
    included: ['Перелет', 'Отель 4*', 'Экскурсии', 'Завтраки']
  }
];

const destinations = [
  { name: 'Европа', count: 45, icon: 'Castle' },
  { name: 'Азия', count: 62, icon: 'Palmtree' },
  { name: 'Америка', count: 28, icon: 'Mountain' },
  { name: 'Океания', count: 15, icon: 'Waves' },
  { name: 'Африка', count: 19, icon: 'Sun' }
];

const reviews = [
  {
    name: 'Екатерина Смирнова',
    avatar: 'ЕС',
    rating: 5,
    text: 'Потрясающий отдых на Бали! Все организовано идеально, отель превзошел ожидания',
    tour: 'Райские пляжи Бали',
    date: '15 марта 2024'
  },
  {
    name: 'Дмитрий Петров',
    avatar: 'ДП',
    rating: 5,
    text: 'Альпы - это нечто невероятное! Спасибо за незабываемые впечатления',
    tour: 'Альпийские вершины',
    date: '8 февраля 2024'
  },
  {
    name: 'Анна Иванова',
    avatar: 'АИ',
    rating: 5,
    text: 'Рим покорил наши сердца. Экскурсии были познавательными и интересными',
    tour: 'Исторический Рим',
    date: '22 января 2024'
  }
];

export default function Index() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeSection, setActiveSection] = useState('home');

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
              TravelPro
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
              Откройте мир с TravelPro
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Более 150 направлений по всему миру. Профессиональная организация туров с 2010 года
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
                <Icon name="Award" className="h-5 w-5 text-accent" />
                <span className="font-semibold">14 лет опыта</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
                <Icon name="Users" className="h-5 w-5 text-primary" />
                <span className="font-semibold">50 000+ туристов</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
                <Icon name="Star" className="h-5 w-5 text-secondary" />
                <span className="font-semibold">4.9 рейтинг</span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Популярные туры</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tours.map((tour, idx) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании TravelPro</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Мы - команда профессионалов с 14-летним опытом организации туров по всему миру. 
              Наша миссия - делать путешествия доступными, безопасными и незабываемыми.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Shield" className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Безопасность</h3>
                  <p className="text-sm text-muted-foreground">Страхование и поддержка 24/7</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="ThumbsUp" className="h-12 w-12 mx-auto mb-4 text-secondary" />
                  <h3 className="font-semibold mb-2">Качество</h3>
                  <p className="text-sm text-muted-foreground">Проверенные отели и маршруты</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Sparkles" className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Индивидуальность</h3>
                  <p className="text-sm text-muted-foreground">Туры под ваши пожелания</p>
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
                      <p className="text-white/80">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-white/80">info@travelpro.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-white/80">Москва, ул. Тверская, 15</p>
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
                    <Input placeholder="Интересует тур на Бали..." />
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
              <span className="font-bold">TravelPro</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 TravelPro. Все права защищены.</p>
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
