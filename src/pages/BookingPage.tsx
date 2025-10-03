import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import Header from '@/components/layout/Header';
import { useToast } from '@/components/ui/use-toast';

const BookingPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Бронирование принято!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
    
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '2',
      comment: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Бронирование столика</h1>
          <p className="text-lg text-muted-foreground">
            Забронируйте столик в нашей уютной пекарне
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Забронировать столик</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Иван Иванов"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Дата *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="time">Время *</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="guests">Количество гостей *</Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="comment">Пожелания</Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Особые пожелания или комментарии..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Icon name="Check" size={16} className="mr-2" />
                  Забронировать
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Время работы</h4>
                    <p className="text-sm text-muted-foreground">
                      Пн-Пт: 08:00 - 22:00<br />
                      Сб-Вс: 09:00 - 23:00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Адрес</h4>
                    <p className="text-sm text-muted-foreground">
                      г. Москва, ул. Пекарная, д. 10
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <p className="text-sm text-muted-foreground">
                      +7 (495) 123-45-67
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Users" size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Вместимость</h4>
                    <p className="text-sm text-muted-foreground">
                      До 50 человек
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Преимущества</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span className="text-sm">Уютная атмосфера</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span className="text-sm">Свежая выпечка каждый день</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span className="text-sm">Бесплатный Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span className="text-sm">Детская зона</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span className="text-sm">Парковка рядом</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;