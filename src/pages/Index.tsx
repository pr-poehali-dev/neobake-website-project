import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const AnimatedLogo = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="text-6xl animate-wave origin-bottom-right" style={{ transformOrigin: '70% 70%' }}>🥐</div>
      <div className="ml-6 relative">
        <div className="text-5xl font-bold font-montserrat tracking-tight relative">
          <span className="inline-block text-primary animate-glow-pulse">
            {"NEO".split("").map((letter, i) => (
              <span 
                key={i} 
                className="inline-block animate-letter-bounce" 
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
                }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="inline-block text-primary ml-2 animate-glow-pulse">
            {"BAKE".split("").map((letter, i) => (
              <span 
                key={i} 
                className="inline-block animate-letter-bounce" 
                style={{ 
                  animationDelay: `${(i + 3) * 0.2}s`,
                  textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 animate-text-shimmer"></div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🥐</div>
              <span className="text-xl font-bold font-montserrat text-primary">NEOBAKE</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">О нас</a>
              <a href="#restaurants" className="text-foreground/70 hover:text-primary transition-colors">Рестораны</a>
              <a href="#it-services" className="text-foreground/70 hover:text-primary transition-colors">IT-услуги</a>
              <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button>Личный кабинет</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-scale-in">
            <AnimatedLogo />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-6 animate-fade-in">
            Инновации в каждом <span className="text-primary">решении</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto animate-fade-in">
            NeoBake — новая компания, которая планирует объединить лучшие ресторанные традиции 
            с передовыми IT-технологиями для создания уникального опыта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="text-lg px-8" onClick={() => window.location.href = '/order'}>
              <Icon name="ShoppingCart" className="mr-2" size={20} />
              Заказать еду
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Icon name="Code" className="mr-2" size={20} />
              IT-решения
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="about" className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-montserrat mb-4">Наши направления</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Наши планы по развитию двух перспективных направлений бизнеса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Restaurant Services */}
            <Card className="group hover:shadow-2xl transition-all duration-300 animate-scale-in">
              <CardHeader className="pb-4">
                <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="/img/c77c53fe-85b3-40b6-9275-2c3aba21ad41.jpg" 
                    alt="Restaurant Services" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-2xl font-montserrat flex items-center">
                  <Icon name="ChefHat" className="mr-3 text-primary" size={28} />
                  Ресторанный бизнес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  Премиальные кулинарные решения с использованием современных технологий приготовления и обслуживания
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-center">
                    <Icon name="Check" className="mr-2 text-green-500" size={16} />
                    Онлайн-заказ и доставка
                  </li>
                  <li className="flex items-center">
                    <Icon name="Check" className="mr-2 text-green-500" size={16} />
                    Авторские блюда от шеф-поваров
                  </li>
                  <li className="flex items-center">
                    <Icon name="Check" className="mr-2 text-green-500" size={16} />
                    Кейтеринговые услуги
                  </li>
                </ul>
                <Button className="mt-4 w-full">
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                  Подробнее
                </Button>
              </CardContent>
            </Card>

            {/* IT Services */}
            <Card className="group hover:shadow-2xl transition-all duration-300 animate-scale-in">
              <CardHeader className="pb-4">
                <div className="w-full h-48 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="/img/7efc26aa-4e73-4ae2-8046-0164e59df13f.jpg" 
                    alt="IT Services" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-2xl font-montserrat flex items-center">
                  <Icon name="Laptop" className="mr-3 text-secondary" size={28} />
                  IT-услуги <span className="ml-2 text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">в разработке</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  Планируемые технологические решения для бизнеса - находятся на стадии разработки и концепции
                </p>
                <ul className="space-y-2 text-sm text-foreground/50">
                  <li className="flex items-center">
                    <Icon name="Clock" className="mr-2 text-primary/60" size={16} />
                    Разработка веб-приложений
                  </li>
                  <li className="flex items-center">
                    <Icon name="Clock" className="mr-2 text-primary/60" size={16} />
                    Системы автоматизации
                  </li>
                  <li className="flex items-center">
                    <Icon name="Clock" className="mr-2 text-primary/60" size={16} />
                    Цифровая трансформация
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full" disabled>
                  <Icon name="Wrench" className="mr-2" size={16} />
                  В разработке
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-montserrat mb-4">Наши планы</h2>
            <p className="text-xl text-foreground/70">Концепции будущих проектов</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-primary/30 to-primary/10 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={`/img/${item === 1 ? 'a39e51f5-e762-4a32-940f-0d349ea0e63f' : item === 2 ? 'c77c53fe-85b3-40b6-9275-2c3aba21ad41' : '7efc26aa-4e73-4ae2-8046-0164e59df13f'}.jpg`}
                    alt={`Project ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold font-montserrat mb-2">
                    {item === 1 ? 'Концепция ресторана' : item === 2 ? 'Планируемая система заказов' : 'Идея мобильного приложения'}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {item === 1 ? 'Будущая автоматизация ресторана' : item === 2 ? 'Планируемая платформа для заказов' : 'Концепция приложения доставки'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-montserrat mb-4">О компании NeoBake</h2>
            <p className="text-xl opacity-90">Новая компания с амбициозными планами</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card backdrop-blur-sm border-border text-white">
              <CardContent className="p-6 text-center">
                <Icon name="Rocket" className="mx-auto text-primary mb-4" size={40} />
                <h3 className="font-bold font-montserrat text-xl mb-3">Только начинаем</h3>
                <p className="opacity-90">
                  NeoBake — молодая компания, которая недавно открылась и готова покорять рынок инновационными решениями
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card backdrop-blur-sm border-border text-white">
              <CardContent className="p-6 text-center">
                <Icon name="Target" className="mx-auto text-primary mb-4" size={40} />
                <h3 className="font-bold font-montserrat text-xl mb-3">Наша миссия</h3>
                <p className="opacity-90">
                  Объединить традиции высокой кухни с передовыми IT-технологиями для создания уникального пользовательского опыта
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card backdrop-blur-sm border-border text-white">
              <CardContent className="p-6 text-center">
                <Icon name="TrendingUp" className="mx-auto text-primary mb-4" size={40} />
                <h3 className="font-bold font-montserrat text-xl mb-3">Планы развития</h3>
                <p className="opacity-90">
                  Планируем стать лидером в области технологических ресторанных решений и IT-услуг для бизнеса
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-montserrat mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-foreground/70">Готовы обсудить ваш проект</p>
          </div>
          
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold font-montserrat mb-6">Оставьте заявку</h3>
                  <form className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input type="email" placeholder="Email" />
                    <Input placeholder="Телефон" />
                    <Textarea placeholder="Опишите ваш проект" rows={4} />
                    <Button className="w-full">
                      <Icon name="Send" className="mr-2" size={16} />
                      Отправить заявку
                    </Button>
                  </form>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-montserrat">Контактная информация</h3>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" className="text-primary" size={20} />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" className="text-primary" size={20} />
                    <span>hello@neobake.ru</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" className="text-primary" size={20} />
                    <span>Москва, ул. Инновационная, 1</span>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-foreground/70 mb-4">Социальные сети:</p>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm">
                        <Icon name="Instagram" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Facebook" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Linkedin" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🥐</div>
                <span className="text-xl font-bold font-montserrat">NEOBAKE</span>
              </div>
              <p className="text-gray-400">
                Инновационная компания, объединяющая ресторанный бизнес и IT-технологии
              </p>
            </div>
            
            <div>
              <h4 className="font-bold font-montserrat mb-4">Рестораны</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Меню</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Кейтеринг</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold font-montserrat mb-4">IT-услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Разработка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Автоматизация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Консалтинг</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold font-montserrat mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
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

export default Index;