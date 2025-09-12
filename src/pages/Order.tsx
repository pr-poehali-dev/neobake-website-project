import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Order = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardContent className="p-12 text-center">
          {/* Animated Icons */}
          <div className="flex justify-center items-center mb-8 space-x-6">
            <div className="relative">
              <Icon name="Zap" className="text-primary animate-glow-pulse" size={48} />
              <div className="absolute inset-0 animate-ping">
                <Icon name="Zap" className="text-primary/30" size={48} />
              </div>
            </div>
            <div className="relative">
              <Icon name="Settings" className="text-primary animate-spin" size={48} />
            </div>
            <div className="relative">
              <Icon name="Wrench" className="text-primary animate-bounce" size={48} />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold font-montserrat mb-6 text-foreground">
            🚧 В разработке 🚧
          </h1>
          
          <div className="space-y-4 text-foreground/70 mb-8">
            <p className="text-xl">
              Пока здесь пусто, но мы работаем над этим!
            </p>
            
            <p className="text-lg">
              Наша команда разработчиков усердно трудится над созданием 
              потрясающей платформы для заказа еды. Совсем скоро здесь 
              появится что-то невероятное!
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-foreground/50 mb-2">
              <span>Прогресс разработки</span>
              <span>35%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full animate-pulse relative overflow-hidden" 
                style={{ width: '35%' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-text-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Team Signature */}
          <div className="border-t border-border pt-6">
            <p className="text-foreground/60 mb-2">С уважением,</p>
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" className="text-primary" size={20} />
                <Icon name="Settings" className="text-primary" size={16} />
              </div>
              <span className="text-lg font-semibold font-montserrat text-primary">
                Команда разработчиков NeoTex
              </span>
              <div className="flex items-center space-x-2">
                <Icon name="Settings" className="text-primary" size={16} />
                <Icon name="Zap" className="text-primary" size={20} />
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Button 
              onClick={() => window.history.back()}
              size="lg"
              className="px-8"
            >
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Вернуться назад
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Order;