import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Header from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoggedIn, user } = useAuth();

  const heroSlides = [
    {
      image: '/img/d57940ae-c112-41e2-9e2a-235cac7f2818.jpg',
      title: 'Свежие круассаны каждое утро',
      subtitle: 'Приготовлено с любовью французскими пекарями'
    },
    {
      image: '/img/d57940ae-c112-41e2-9e2a-235cac7f2818.jpg',
      title: 'Торты на заказ',
      subtitle: 'Создаем уникальные десерты для ваших праздников'
    },
    {
      image: '/img/d57940ae-c112-41e2-9e2a-235cac7f2818.jpg',
      title: 'Хлеб на закваске',
      subtitle: 'Традиционные рецепты и натуральные ингредиенты'
    }
  ];

  const categories = [
    { id: 1, name: 'Хлеб и булочки', icon: 'Wheat', count: 15 },
    { id: 2, name: 'Торты', icon: 'Cake', count: 8 },
    { id: 3, name: 'Круассаны', icon: 'Coffee', count: 6 },
    { id: 4, name: 'Пирожные', icon: 'Cherry', count: 12 },
    { id: 5, name: 'Печенье', icon: 'Cookie', count: 10 },
    { id: 6, name: 'Пироги', icon: 'PieChart', count: 7 }
  ];

  const popularItems = [
    { id: 1, name: 'Круассан с шоколадом', price: 120, rating: 4.8, image: '/img/d57940ae-c112-41e2-9e2a-235cac7f2818.jpg' },
    { id: 2, name: 'Наполеон', price: 180, rating: 4.9, image: '/img/d57940ae-c112-41e2-9e2a-235cac7f2818.jpg' },
    { id: 3, name: 'Багет французский', price: 80, rating: 4.7, image: '/img/d57940ae-c112-41e2-9e2a-235cac7f2818.jpg' },
    { id: 4, name: 'Эклер с кремом', price: 95, rating: 4.6, image: '/img/d57940ae-c112-41e2-9e2a-235cac7f2818.jpg' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero секция */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroSlides[currentSlide].image}
            alt="NeoBake" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/menu">
                  <Icon name="ShoppingBag" className="mr-2" />
                  Смотреть меню
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg bg-white/10 border-white text-white hover:bg-white hover:text-black">
                <Link to="/booking">
                  <Icon name="Calendar" className="mr-2" />
                  Забронировать столик
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Индикаторы слайдов */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Приветствие для авторизованных пользователей */}
      {isLoggedIn && (
        <section className="py-8 bg-gradient-to-r from-blue-950 to-slate-900 border-y border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-100">
                  Добро пожаловать, {user?.name}! 👋
                </h2>
                <p className="text-blue-200/70 mt-1">
                  У вас {user?.loyaltyPoints} баллов лояльности
                </p>
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
                VIP клиент
              </Badge>
            </div>
          </div>
        </section>
      )}

      {/* Категории */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши категории</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to="/menu">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-blue-500/30">
                      <Icon name={category.icon as any} size={24} className="text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} позиций</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Популярные товары</h2>
            <Button asChild variant="outline">
              <Link to="/menu">
                Все товары
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">{item.price} ₽</span>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground">{item.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                <Icon name="Clock" size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Быстрая доставка</h3>
              <p className="text-muted-foreground">Доставляем свежую выпечку за 30-60 минут по всему городу</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                <Icon name="Award" size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Высокое качество</h3>
              <p className="text-muted-foreground">Используем только натуральные ингредиенты и проверенные рецепты</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                <Icon name="Heart" size={32} className="text-cyan-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Сделано с любовью</h3>
              <p className="text-muted-foreground">Каждое изделие создается вручную нашими мастерами-кондитерами</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Готовы попробовать?</h2>
          <p className="text-xl mb-8 opacity-90">
            Закажите свежую выпечку прямо сейчас и получите скидку 15% на первый заказ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg bg-white text-blue-600 hover:bg-blue-50">
              <Link to="/menu">
                <Icon name="ShoppingBag" className="mr-2" />
                Заказать сейчас
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/booking">
                <Icon name="Phone" className="mr-2" />
                Связаться с нами
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-slate-950 text-white py-12 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/img/00b11ba1-4b44-487d-8a9e-3a3532952077.jpg" 
                  alt="NeoBake" 
                  className="w-8 h-8 rounded-lg"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">NeoBake</span>
              </div>
              <p className="text-blue-200/50 text-sm">
                Современная пекарня с традиционными рецептами и инновационным подходом к качеству.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-300">Меню</h4>
              <ul className="space-y-2 text-sm text-blue-200/50">
                <li><Link to="/menu" className="hover:text-blue-300 transition-colors">Хлеб и булочки</Link></li>
                <li><Link to="/menu" className="hover:text-blue-300 transition-colors">Торты</Link></li>
                <li><Link to="/menu" className="hover:text-blue-300 transition-colors">Круассаны</Link></li>
                <li><Link to="/menu" className="hover:text-blue-300 transition-colors">Пирожные</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-300">Сервисы</h4>
              <ul className="space-y-2 text-sm text-blue-200/50">
                <li><Link to="/booking" className="hover:text-blue-300 transition-colors">Бронирование столиков</Link></li>
                <li><Link to="/tracking" className="hover:text-blue-300 transition-colors">Отследить заказ</Link></li>
                <li><Link to="/profile" className="hover:text-blue-300 transition-colors">Личный кабинет</Link></li>
                <li><Link to="/" className="hover:text-blue-300 transition-colors">Программа лояльности</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-300">Контакты</h4>
              <div className="space-y-2 text-sm text-blue-200/50">
                <p>📞 +7 (999) 123-45-67</p>
                <p>📧 info@neobake.ru</p>
                <p>📍 ул. Пекарская, 15</p>
                <p>🕒 Ежедневно 7:00 - 22:00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-500/20 mt-8 pt-8 text-center text-sm text-blue-200/50">
            <p>© 2024 NeoBake. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;