import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Header from '@/components/layout/Header';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isPopular?: boolean;
  allergens?: string[];
}

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'Все', icon: 'Grid3X3' },
    { id: 'bread', name: 'Хлеб и булочки', icon: 'Wheat' },
    { id: 'cakes', name: 'Торты', icon: 'Cake' },
    { id: 'croissants', name: 'Круассаны', icon: 'Coffee' },
    { id: 'pastries', name: 'Пирожные', icon: 'Cherry' },
    { id: 'cookies', name: 'Печенье', icon: 'Cookie' },
    { id: 'pies', name: 'Пироги', icon: 'PieChart' }
  ];

  const menuItems: MenuItem[] = [
    // Хлеб и булочки
    {
      id: '1',
      name: 'Багет французский',
      description: 'Хрустящий багет с золотистой корочкой',
      price: 80,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'bread',
      rating: 4.7,
      allergens: ['глютен']
    },
    {
      id: '2',
      name: 'Хлеб бородинский',
      description: 'Ржаной хлеб с кориандром по классическому рецепту',
      price: 65,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'bread',
      rating: 4.5,
      allergens: ['глютен']
    },
    {
      id: '3',
      name: 'Булочка с кунжутом',
      description: 'Мягкая булочка для бургеров с кунжутными семечками',
      price: 45,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'bread',
      rating: 4.3,
      allergens: ['глютен', 'кунжут']
    },

    // Торты
    {
      id: '4',
      name: 'Торт "Наполеон"',
      description: 'Классический торт со сливочным кремом',
      price: 1200,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'cakes',
      rating: 4.9,
      isPopular: true,
      allergens: ['глютен', 'яйца', 'молоко']
    },
    {
      id: '5',
      name: 'Торт "Медовик"',
      description: 'Многослойный медовый торт со сметанным кремом',
      price: 980,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'cakes',
      rating: 4.8,
      allergens: ['глютен', 'яйца', 'молоко', 'мед']
    },
    {
      id: '6',
      name: 'Торт "Красный бархат"',
      description: 'Нежный торт с кремом из сливочного сыра',
      price: 1400,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'cakes',
      rating: 4.6,
      isNew: true,
      allergens: ['глютен', 'яйца', 'молоко']
    },

    // Круассаны
    {
      id: '7',
      name: 'Круассан классический',
      description: 'Французский круассан со сливочным маслом',
      price: 90,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'croissants',
      rating: 4.4,
      allergens: ['глютен', 'молоко']
    },
    {
      id: '8',
      name: 'Круассан с шоколадом',
      description: 'Слоеный круассан с темным шоколадом',
      price: 120,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'croissants',
      rating: 4.8,
      isPopular: true,
      allergens: ['глютен', 'молоко']
    },
    {
      id: '9',
      name: 'Круассан с миндалем',
      description: 'Круассан с миндальной пастой и лепестками',
      price: 140,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'croissants',
      rating: 4.7,
      allergens: ['глютен', 'молоко', 'орехи']
    },

    // Пирожные
    {
      id: '10',
      name: 'Эклер с кремом',
      description: 'Классический эклер с заварным кремом',
      price: 95,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'pastries',
      rating: 4.6,
      allergens: ['глютен', 'яйца', 'молоко']
    },
    {
      id: '11',
      name: 'Профитроль',
      description: 'Воздушные заварные пирожные с кремом',
      price: 75,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'pastries',
      rating: 4.5,
      allergens: ['глютен', 'яйца', 'молоко']
    },
    {
      id: '12',
      name: 'Тирамису',
      description: 'Итальянский десерт с кофе и маскарпоне',
      price: 180,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'pastries',
      rating: 4.9,
      isNew: true,
      allergens: ['глютен', 'яйца', 'молоко']
    },

    // Печенье
    {
      id: '13',
      name: 'Печенье овсяное',
      description: 'Домашнее печенье с овсяными хлопьями и изюмом',
      price: 35,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'cookies',
      rating: 4.2,
      allergens: ['глютен', 'молоко']
    },
    {
      id: '14',
      name: 'Макарон ассорти',
      description: 'Набор разноцветных французских макарон',
      price: 250,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'cookies',
      rating: 4.8,
      isPopular: true,
      allergens: ['яйца', 'орехи']
    },
    {
      id: '15',
      name: 'Имбирное печенье',
      description: 'Ароматное печенье со специями и глазурью',
      price: 40,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'cookies',
      rating: 4.4,
      allergens: ['глютен', 'яйца', 'молоко']
    },

    // Пироги
    {
      id: '16',
      name: 'Пирог с яблоками',
      description: 'Домашний пирог с сочными яблоками и корицей',
      price: 350,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'pies',
      rating: 4.7,
      allergens: ['глютен', 'яйца', 'молоко']
    },
    {
      id: '17',
      name: 'Киш лорен',
      description: 'Французский открытый пирог с беконом и сыром',
      price: 420,
      image: '/img/2f587328-15b5-4c02-9abd-04a6cd4d0607.jpg',
      category: 'pies',
      rating: 4.6,
      allergens: ['глютен', 'яйца', 'молоко']
    }
  ];

  useEffect(() => {
    let filtered = menuItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
    
    toast({
      title: "Добавлено в корзину",
      description: `${item.name} добавлен в вашу корзину`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Наше меню</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Свежая выпечка каждый день. Все изделия изготавливаются из натуральных ингредиентов по традиционным рецептам.
          </p>
        </div>

        {/* Поиск */}
        <div className="relative max-w-md mx-auto mb-8">
          <Input
            type="text"
            placeholder="Поиск по меню..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        </div>

        {/* Категории */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon name={category.icon as any} size={16} />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Статистика */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Показано {filteredItems.length} из {menuItems.length} позиций
          </p>
        </div>

        {/* Товары */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  
                  {/* Бейджи */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.isNew && (
                      <Badge className="bg-green-500 hover:bg-green-600">Новинка</Badge>
                    )}
                    {item.isPopular && (
                      <Badge className="bg-orange-500 hover:bg-orange-600">Хит</Badge>
                    )}
                  </div>

                  {/* Рейтинг */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                    {item.rating}
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Аллергены */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {item.allergens.map((allergen) => (
                          <Badge key={allergen} variant="secondary" className="text-xs">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {item.price} ₽
                    </span>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Icon name="Plus" size={16} />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить поисковый запрос или выберите другую категорию
            </p>
          </div>
        )}

        {/* Информация о доставке */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
          <div className="text-center">
            <Icon name="Truck" size={48} className="mx-auto text-amber-600 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Бесплатная доставка</h3>
            <p className="text-muted-foreground mb-6">
              При заказе от 1000 рублей доставляем бесплатно в пределах города
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} />
                <span>30-60 минут</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} />
                <span>Гарантия свежести</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} />
                <span>Рейтинг 4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;