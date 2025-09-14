import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: 'Круассан с миндалем',
      price: 220,
      image: '/img/ceb7dce3-214c-4e54-8416-7d13701d38b7.jpg',
      category: 'Выпечка',
      rating: 4.9,
      isNew: true
    },
    {
      id: 2,
      name: 'Авторский хлеб на закваске',
      price: 450,
      image: '/img/de9fd127-4472-4f92-a045-3d04fc8d09cd.jpg',
      category: 'Хлеб',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 3,
      name: 'Торт "Медовик"',
      price: 890,
      image: '/api/placeholder/300/200',
      category: 'Торты',
      rating: 4.9,
      isNew: true
    },
    {
      id: 4,
      name: 'Эклеры с ванильным кремом',
      price: 180,
      image: '/api/placeholder/300/200',
      category: 'Пирожные',
      rating: 4.7,
      isPopular: true
    }
  ];

  const categories = [
    { name: 'Хлеб', icon: 'Wheat', count: 15 },
    { name: 'Выпечка', icon: 'Cookie', count: 28 },
    { name: 'Торты', icon: 'Cake', count: 12 },
    { name: 'Пирожные', icon: 'Cherry', count: 24 },
    { name: 'Кофе', icon: 'Coffee', count: 8 },
    { name: 'Напитки', icon: 'GlassWater', count: 16 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Icon name="Wheat" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NeoBake</h1>
                <p className="text-sm text-gray-600">Пекарня будущего</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => navigate('/menu')}>
                <Icon name="ChefHat" size={16} className="mr-2" />
                Меню
              </Button>
              <Button variant="ghost" onClick={() => navigate('/booking')}>
                <Icon name="Calendar" size={16} className="mr-2" />
                Бронирование
              </Button>
              <Button variant="ghost" onClick={() => navigate('/track-order')}>
                <Icon name="Truck" size={16} className="mr-2" />
                Доставка
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              
              {isLoggedIn ? (
                <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </Button>
              ) : (
                <Button onClick={() => navigate('/login')}>Войти</Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Добро пожаловать в NeoBake
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Современная пекарня с традиционными рецептами и инновационными технологиями. 
              Свежая выпечка каждый день, доставка по городу и онлайн-заказы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => navigate('/menu')}>
                <Icon name="ChefHat" size={20} className="mr-2" />
                Посмотреть меню
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => navigate('/booking')}>
                <Icon name="Calendar" size={20} className="mr-2" />
                Забронировать столик
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Категории продукции</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-orange-200 group-hover:to-amber-200 transition-colors">
                    <Icon name={category.icon} className="text-orange-600" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.count} товаров</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold">Рекомендуемые товары</h3>
            <Button variant="outline" onClick={() => navigate('/menu')}>
              Показать все
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.isNew && <Badge variant="secondary">Новинка</Badge>}
                    {product.isPopular && <Badge>Популярное</Badge>}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="text-yellow-500" size={14} />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-3">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">{product.price} ₽</span>
                    <Button size="sm">
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Почему выбирают NeoBake</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Свежесть каждый день</h4>
              <p className="text-gray-600">Выпечка производится ежедневно из свежих ингредиентов</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Быстрая доставка</h4>
              <p className="text-gray-600">Доставка по городу за 30-60 минут</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Гарантия качества</h4>
              <p className="text-gray-600">Используем только натуральные ингредиенты</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" className="text-rose-600" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Программа лояльности</h4>
              <p className="text-gray-600">Накапливайте бонусы и получайте скидки</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <Icon name="Wheat" className="text-white" size={20} />
                </div>
                <h4 className="text-xl font-bold">NeoBake</h4>
              </div>
              <p className="text-gray-400 mb-4">Современная пекарня с традиционными рецептами</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Icon name="Phone" size={16} />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Icon name="Mail" size={16} />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Icon name="MapPin" size={16} />
                </Button>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Меню</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Хлеб</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Выпечка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Торты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Напитки</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Сервисы</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Самовывоз</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Бронирование</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Корпоративные заказы</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>ул. Пекарная, 42</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Пн-Вс: 7:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NeoBake. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;