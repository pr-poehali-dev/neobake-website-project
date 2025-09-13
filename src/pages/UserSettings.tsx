import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function UserSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  const [paymentMethods, setPaymentMethods] = useState({
    mir: true,
    sbp: true,
    yumoney: true,
    cash: false,
  });

  useEffect(() => {
    if (user) {
      const nameParts = user.name.split(' ');
      setProfileData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
      }));

      // Загружаем сохраненные настройки
      const savedSettings = localStorage.getItem('user_settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.notifications) {
          setProfileData(prev => ({ ...prev, notifications: settings.notifications }));
        }
        if (settings.paymentMethods) {
          setPaymentMethods(settings.paymentMethods);
        }
      }
    }
  }, [user]);

  const handleSaveProfile = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name: `${profileData.firstName} ${profileData.lastName}`.trim(),
      phone: profileData.phone,
    };

    localStorage.setItem('neobake_user', JSON.stringify(updatedUser));
    
    // Сохраняем настройки
    const settings = {
      notifications: profileData.notifications,
      paymentMethods: paymentMethods,
    };
    localStorage.setItem('user_settings', JSON.stringify(settings));
    
    alert('Настройки сохранены!');
    window.location.reload();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/profile')} 
              className="mb-4 flex items-center gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Назад к профилю
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Настройки
            </h1>
            <p className="text-foreground/70">
              Управляйте своими личными данными и предпочтениями
            </p>
          </div>

          <div className="space-y-6">
            {/* Личные данные */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Личные данные
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Имя</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Введите имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Введите фамилию"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email нельзя изменить
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Способы оплаты */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" size={20} />
                  Способы оплаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Выберите удобные для вас способы оплаты заказов
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">МИР</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Карта МИР</h4>
                        <p className="text-sm text-muted-foreground">Российская платежная система</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentMethods.mir}
                      onCheckedChange={(checked) => 
                        setPaymentMethods(prev => ({ ...prev, mir: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">СБП</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Система быстрых платежей</h4>
                        <p className="text-sm text-muted-foreground">Мгновенные переводы по номеру телефона</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentMethods.sbp}
                      onCheckedChange={(checked) => 
                        setPaymentMethods(prev => ({ ...prev, sbp: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">ЮM</span>
                      </div>
                      <div>
                        <h4 className="font-medium">ЮMoney</h4>
                        <p className="text-sm text-muted-foreground">Электронные деньги и карты</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentMethods.yumoney}
                      onCheckedChange={(checked) => 
                        setPaymentMethods(prev => ({ ...prev, yumoney: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="Banknote" className="text-green-600" size={24} />
                      <div>
                        <h4 className="font-medium">Наличные</h4>
                        <p className="text-sm text-muted-foreground">Оплата курьеру при получении</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentMethods.cash}
                      onCheckedChange={(checked) => 
                        setPaymentMethods(prev => ({ ...prev, cash: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Уведомления */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={20} />
                  Уведомления
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email уведомления</h4>
                    <p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
                  </div>
                  <Switch
                    checked={profileData.notifications.email}
                    onCheckedChange={(checked) => 
                      setProfileData(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, email: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS уведомления</h4>
                    <p className="text-sm text-muted-foreground">Получать SMS о статусе заказа</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Скоро</Badge>
                    <Switch
                      disabled
                      checked={profileData.notifications.sms}
                      onCheckedChange={(checked) => 
                        setProfileData(prev => ({ 
                          ...prev, 
                          notifications: { ...prev.notifications, sms: checked }
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push уведомления</h4>
                    <p className="text-sm text-muted-foreground">Уведомления в браузере</p>
                  </div>
                  <Switch
                    checked={profileData.notifications.push}
                    onCheckedChange={(checked) => 
                      setProfileData(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, push: checked }
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Смена пароля */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Key" size={20} />
                  Смена пароля
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Icon name="Construction" className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">Функция в разработке</h3>
                  <p className="text-muted-foreground mb-4">
                    Смена пароля будет доступна в следующем обновлении
                  </p>
                  <Button variant="outline" asChild>
                    <a href="https://t.me/+3mTySr48LoI4ODFi" target="_blank" rel="noopener noreferrer">
                      <Icon name="MessageCircle" className="mr-2" size={16} />
                      Следить за обновлениями
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Кнопки действий */}
            <div className="flex flex-wrap gap-3 pt-6">
              <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                <Icon name="Save" size={16} />
                Сохранить изменения
              </Button>
              <Button variant="outline" onClick={() => navigate('/profile')} className="flex items-center gap-2">
                <Icon name="ArrowLeft" size={16} />
                Вернуться к профилю
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}