import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Restaurant = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-2xl">
        <CardContent className="p-12">
          {/* Header with animated icons */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-8 space-x-8">
              <div className="relative">
                <Icon name="ChefHat" className="text-primary animate-glow-pulse" size={56} />
                <div className="absolute inset-0 animate-ping">
                  <Icon name="ChefHat" className="text-primary/20" size={56} />
                </div>
              </div>
              <div className="relative">
                <Icon name="Coffee" className="text-primary animate-bounce" size={52} />
              </div>
              <div className="text-4xl animate-wave">🥐</div>
              <div className="relative">
                <Icon name="Store" className="text-primary animate-pulse" size={52} />
              </div>
            </div>

            <h1 className="text-4xl font-bold font-montserrat mb-6 text-foreground">
              🏗️ Ресторанный бизнес в разработке 🏗️
            </h1>
            
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Мы планируем создать сеть уникальных заведений, объединяющих традиции и инновации
            </p>
          </div>

          {/* Planned venues grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Restaurants */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mb-6 relative">
                  <Icon name="Utensils" className="mx-auto text-primary animate-glow-pulse" size={48} />
                  <div className="absolute inset-0 animate-ping">
                    <Icon name="Utensils" className="mx-auto text-primary/20" size={48} />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-montserrat mb-3">Рестораны</h3>
                <p className="text-foreground/70 mb-4">
                  Высокая кухня с авторскими блюдами и уникальной атмосферой
                </p>
                <div className="space-y-2 text-sm text-foreground/60">
                  <div className="flex items-center justify-center">
                    <Icon name="Clock" className="mr-2 text-primary/60" size={14} />
                    Открытие пока не запланировано
                  </div>
                  <div className="flex items-center justify-center">
                    <Icon name="MapPin" className="mr-2 text-primary/60" size={14} />
                    3-5 локаций
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cafes */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mb-6 relative">
                  <Icon name="Coffee" className="mx-auto text-primary animate-bounce" size={48} />
                </div>
                <h3 className="text-xl font-bold font-montserrat mb-3">Кафе</h3>
                <p className="text-foreground/70 mb-4">
                  Уютные пространства для работы и отдыха с качественным кофе
                </p>
                <div className="space-y-2 text-sm text-foreground/60">
                  <div className="flex items-center justify-center">
                    <Icon name="Clock" className="mr-2 text-primary/60" size={14} />
                    Открытие пока не запланировано
                  </div>
                  <div className="flex items-center justify-center">
                    <Icon name="MapPin" className="mr-2 text-primary/60" size={14} />
                    7-10 локаций
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bakeries */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mb-6 relative">
                  <div className="text-5xl animate-wave">🥐</div>
                </div>
                <h3 className="text-xl font-bold font-montserrat mb-3">Пекарни</h3>
                <p className="text-foreground/70 mb-4">
                  Свежая выпечка и хлеб по традиционным и авторским рецептам
                </p>
                <div className="space-y-2 text-sm text-foreground/60">
                  <div className="flex items-center justify-center">
                    <Icon name="Clock" className="mr-2 text-primary/60" size={14} />
                    Открытие пока не запланировано
                  </div>
                  <div className="flex items-center justify-center">
                    <Icon name="MapPin" className="mr-2 text-primary/60" size={14} />
                    5-8 локаций
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold font-montserrat text-center mb-6">Этапы развития</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-foreground/60 mb-2">
                  <span>Концепция и планирование</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full animate-pulse relative overflow-hidden" 
                    style={{ width: '80%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-text-shimmer"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-foreground/60 mb-2">
                  <span>Поиск локаций</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full animate-pulse relative overflow-hidden" 
                    style={{ width: '45%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-text-shimmer"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-foreground/60 mb-2">
                  <span>Привлечение инвестиций</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full animate-pulse relative overflow-hidden" 
                    style={{ width: '20%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-text-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features we're planning */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold font-montserrat text-center mb-6">Планируемые особенности</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  'Интеграция с мобильным приложением',
                  'Бесконтактная оплата и заказы',
                  'Программа лояльности',
                  'Доставка и самовывоз'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <Icon name="Zap" className="mr-3 text-primary/60 animate-pulse" size={16} style={{ animationDelay: `${i * 0.2}s` }} />
                    <span className="text-foreground/70">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  'Экологичная упаковка',
                  'Локальные поставщики',
                  'Авторские рецепты',
                  'Кулинарные мастер-классы'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <Icon name="Settings" className="mr-3 text-primary/60 animate-spin" size={16} style={{ animationDelay: `${i * 0.3}s`, animationDuration: '3s' }} />
                    <span className="text-foreground/70">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Signature */}
          <div className="border-t border-border pt-8 text-center">
            <p className="text-foreground/60 mb-2">С уважением,</p>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="ChefHat" className="text-primary" size={20} />
                <Icon name="Coffee" className="text-primary" size={18} />
                <div className="text-xl">🥐</div>
              </div>
              <span className="text-lg font-semibold font-montserrat text-primary">
                Команда разработчиков NeoTex
              </span>
              <div className="flex items-center space-x-2">
                <div className="text-xl">🥐</div>
                <Icon name="Coffee" className="text-primary" size={18} />
                <Icon name="ChefHat" className="text-primary" size={20} />
              </div>
            </div>

            {/* Back Button */}
            <Button 
              onClick={() => window.history.back()}
              size="lg"
              className="px-8"
            >
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Вернуться на главную
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Restaurant;