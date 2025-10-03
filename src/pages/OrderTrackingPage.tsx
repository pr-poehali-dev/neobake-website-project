import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Header from '@/components/layout/Header';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const OrderTrackingPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'form' | 'tracking'>('form');
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    email: user?.email || '',
    address: '',
    comment: '',
    paymentMethod: 'card'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrderId = `NB-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setStep('tracking');
    
    toast({
      title: "Заказ оформлен!",
      description: `Номер заказа: ${newOrderId}`,
    });
    
    clearCart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const orderSteps = [
    { id: 1, title: 'Заказ принят', status: 'completed', time: '14:23', icon: 'Check' },
    { id: 2, title: 'Готовим', status: 'active', time: '14:30', icon: 'ChefHat' },
    { id: 3, title: 'Передан курьеру', status: 'pending', time: '15:00', icon: 'Truck' },
    { id: 4, title: 'Доставлен', status: 'pending', time: '15:30', icon: 'Package' }
  ];

  if (step === 'tracking') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <Icon name="Check" size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Заказ принят!</h1>
            <p className="text-lg text-muted-foreground">
              Номер заказа: <span className="font-semibold">{orderId}</span>
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Статус заказа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {orderSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className="flex items-start gap-4">
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-full
                        ${step.status === 'completed' ? 'bg-green-500 text-white' : ''}
                        ${step.status === 'active' ? 'bg-primary text-primary-foreground animate-pulse' : ''}
                        ${step.status === 'pending' ? 'bg-muted text-muted-foreground' : ''}
                      `}>
                        <Icon name={step.icon as any} size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{step.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {step.status === 'pending' ? `~${step.time}` : step.time}
                          </span>
                        </div>
                        <Badge variant={
                          step.status === 'completed' ? 'default' :
                          step.status === 'active' ? 'secondary' : 'outline'
                        }>
                          {step.status === 'completed' ? 'Выполнено' :
                           step.status === 'active' ? 'В процессе' : 'Ожидание'}
                        </Badge>
                      </div>
                    </div>
                    
                    {index < orderSteps.length - 1 && (
                      <div className={`
                        absolute left-6 top-12 w-0.5 h-8
                        ${step.status === 'completed' ? 'bg-green-500' : 'bg-muted'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Детали заказа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Адрес доставки</span>
                <span className="font-semibold">{formData.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Телефон</span>
                <span className="font-semibold">{formData.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Оплата</span>
                <span className="font-semibold">
                  {formData.paymentMethod === 'card' ? 'Картой онлайн' : 'Наличными'}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Сумма заказа</span>
                  <span>{getTotalPrice() >= 1000 ? getTotalPrice() : getTotalPrice() + 200} ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              На главную
            </Button>
            <Button onClick={() => navigate('/menu')}>
              Сделать новый заказ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Данные получателя</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Имя *</Label>
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
                  
                  <div className="grid gap-2">
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Улица, дом, квартира"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Пожелания, время доставки..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Способ оплаты</Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleChange}
                        />
                        <Icon name="CreditCard" size={16} />
                        <span>Картой онлайн</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleChange}
                        />
                        <Icon name="Wallet" size={16} />
                        <span>Наличными при получении</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Icon name="Check" size={16} className="mr-2" />
                    Оформить заказ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {item.price * item.quantity} ₽
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Товары</span>
                    <span>{getTotalPrice()} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Доставка</span>
                    <span>{getTotalPrice() >= 1000 ? 'Бесплатно' : '200 ₽'}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого</span>
                      <span>{getTotalPrice() >= 1000 ? getTotalPrice() : getTotalPrice() + 200} ₽</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    <span>Доставка 30-60 минут</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={16} />
                    <span>Гарантия свежести</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;