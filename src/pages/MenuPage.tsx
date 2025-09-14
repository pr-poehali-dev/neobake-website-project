import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const MenuPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

  const categories = [
    { id: 'all', name: 'Все категории', count: 95 },
    { id: 'bread', name: 'Хлеб', count: 15 },
    { id: 'pastry', name: 'Выпечка', count: 28 },
    { id: 'cakes', name: 'Торты', count: 12 },
    { id: 'desserts', name: 'Пирожные', count: 24 },
    { id: 'coffee', name: 'Кофе', count: 8 },
    { id: 'drinks', name: 'Напитки', count: 16 }
  ];

  const products = [
    // Хлеб
    {
      id: 1,
      name: 'Авторский хлеб на закваске',
      price: 450,
      image: '/img/de9fd127-4472-4f92-a045-3d04fc8d09cd.jpg',
      category: 'bread',
      description: 'Хлеб на собственной закваске с хрустящей корочкой',
      rating: 4.8,
      isPopular: true,
      ingredients: 'Мука пшеничная, закваска, соль, вода'
    },
    {
      id: 2,
      name: 'Ржаной хлеб',
      price: 320,
      image: '/img/de9fd127-4472-4f92-a045-3d04fc8d09cd.jpg',
      category: 'bread',
      description: 'Традиционный ржаной хлеб с семенами',
      rating: 4.6,
      ingredients: 'Мука ржаная, семена подсолнуха, соль'
    },
    {
      id: 3,
      name: 'Багет французский',
      price: 180,
      image: '/img/de9fd127-4472-4f92-a045-3d04fc8d09cd.jpg',
      category: 'bread',
      description: 'Классический французский багет',
      rating: 4.7,
      ingredients: 'Мука пшеничная, дрожжи, соль, вода'
    },
    
    // Выпечка
    {
      id: 4,
      name: 'Круассан с миндалем',
      price: 220,
      image: '/img/ceb7dce3-214c-4e54-8416-7d13701d38b7.jpg',
      category: 'pastry',
      description: 'Слоеный круассан с миндальной начинкой',
      rating: 4.9,
      isNew: true,
      ingredients: 'Мука, масло сливочное, миндаль, сахар'
    },
    {
      id: 5,
      name: 'Круассан шоколадный',
      price: 200,
      image: '/img/ceb7dce3-214c-4e54-8416-7d13701d38b7.jpg',
      category: 'pastry',
      description: 'Классический круассан с шоколадом',
      rating: 4.8,
      isPopular: true,
      ingredients: 'Мука, масло, шоколад темный'
    },
    {
      id: 6,
      name: 'Булочка с корицей',
      price: 160,
      image: '/img/ceb7dce3-214c-4e54-8416-7d13701d38b7.jpg',
      category: 'pastry',
      description: 'Ароматная булочка с корицей и сахаром',
      rating: 4.5,
      ingredients: 'Мука, корица, сахар, масло'
    },

    // Торты
    {
      id: 7,
      name: 'Торт "Медовик"',
      price: 890,
      image: '/img/04f5d70d-4cf5-4b1b-8663-ab5224ff25da.jpg',
      category: 'cakes',
      description: 'Классический медовик с нежным кремом',
      rating: 4.9,
      isNew: true,
      ingredients: 'Мед, мука, сметана, сахар'
    },
    {
      id: 8,
      name: 'Торт "Наполеон"',
      price: 750,
      image: '/img/04f5d70d-4cf5-4b1b-8663-ab5224ff25da.jpg',
      category: 'cakes',
      description: 'Слоеный торт с заварным кремом',
      rating: 4.7,
      isPopular: true,
      ingredients: 'Слоеное тесто, крем заварной'
    },

    // Пирожные
    {
      id: 9,
      name: 'Эклеры с ванильным кремом',
      price: 180,
      image: '/img/04f5d70d-4cf5-4b1b-8663-ab5224ff25da.jpg',
      category: 'desserts',
      description: 'Нежные эклеры с ванильным кремом',
      rating: 4.7,
      isPopular: true,
      ingredients: 'Заварное тесто, ванильный крем'
    },
    {
      id: 10,
      name: 'Макарон ассорти',
      price: 450,
      image: '/img/04f5d70d-4cf5-4b1b-8663-ab5224ff25da.jpg',
      category: 'desserts',
      description: 'Набор из 6 макарон разных вкусов',
      rating: 4.8,
      isNew: true,
      ingredients: 'Миндальная мука, различные начинки'
    },

    // Кофе и напитки
    {
      id: 11,
      name: 'Капучино',
      price: 180,
      image: '/img/04f5d70d-4cf5-4b1b-8663-ab5224ff25da.jpg',
      category: 'coffee',
      description: 'Классический капучино из зерен арабики',
      rating: 4.6,
      ingredients: 'Кофе арабика, молоко'
    },
    {
      id: 12,
      name: 'Американо',
      price: 120,
      image: '/img/04f5d70d-4cf5-4b1b-8663-ab5224ff25da.jpg',
      category: 'coffee',
      description: 'Крепкий американо',
      rating: 4.4,
      ingredients: 'Кофе арабика'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <Icon name="Wheat" className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">NeoBake</h1>
                  <p className="text-sm text-gray-600">Меню</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate('/cart')}>
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
                {getCartItemsCount() > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Поиск по меню..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                  <Button variant="outline" size="sm" className="rounded-full w-8 h-8 p-0">
                    <Icon name="Heart" size={14} />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" className="text-yellow-500" size={14} />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <p className="text-xs text-gray-500 mb-4">{product.ingredients}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">{product.price} ₽</span>
                  <Button size="sm" onClick={() => addToCart(product)}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Товары не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;