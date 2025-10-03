import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import Header from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Icon name="UserX" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Необходима авторизация</h2>
          <p className="text-muted-foreground mb-6">
            Войдите в аккаунт, чтобы просмотреть профиль
          </p>
          <Button onClick={() => navigate('/')}>
            На главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Профиль</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Личная информация</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Icon name={isEditing ? 'X' : 'Edit'} size={16} className="mr-2" />
                  {isEditing ? 'Отмена' : 'Редактировать'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Адрес доставки</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Улица, дом, квартира"
                />
              </div>
              
              {isEditing && (
                <Button className="w-full" onClick={handleSave}>
                  Сохранить изменения
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>История заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Package" size={48} className="mx-auto mb-4" />
                <p>У вас пока нет заказов</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Способы оплаты
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти из аккаунта
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;