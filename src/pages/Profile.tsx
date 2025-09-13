import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AvatarSelector from '@/components/AvatarSelector';

export default function Profile() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    birthDate: ''
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/register');
    }
    if (user) {
      setCurrentAvatar(user.avatar || '');
      // Разделяем полное имя на имя и фамилию
      const nameParts = user.name.split(' ');
      setEditData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        birthDate: user.birthDate || ''
      });
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Icon name="Loader2" className="animate-spin" size={24} />
          <span>Загрузка...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getProviderInfo = (provider: string) => {
    switch (provider) {
      case 'google':
        return { name: 'Google', color: 'bg-red-500', icon: 'Mail' };
      case 'vk':
        return { name: 'VKontakte', color: 'bg-blue-600', icon: 'MessageCircle' };
      case 'telegram':
        return { name: 'Telegram', color: 'bg-blue-500', icon: 'Send' };
      case 'email':
        return { name: 'Email', color: 'bg-gray-500', icon: 'Mail' };
      default:
        return { name: provider, color: 'bg-gray-500', icon: 'User' };
    }
  };

  const providerInfo = getProviderInfo(user.provider);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            На главную
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🥐</div>
            <span className="text-2xl font-bold font-montserrat text-primary">NEOBAKE</span>
          </div>
          
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" className="mr-2" size={16} />
            Выйти
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Icon name="CheckCircle" className="mr-2" size={16} />
            Добро пожаловать в NеoBake!
          </div>
          <h1 className="text-3xl font-bold font-montserrat mb-2">
            Личный кабинет
          </h1>
          <p className="text-foreground/70">
            Управляйте своим профилем и настройками
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="User" className="mr-2" size={20} />
                  Профиль пользователя
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="relative group">
                    <Avatar className="w-16 h-16 cursor-pointer" onClick={() => setShowAvatarSelector(true)}>
                      <AvatarImage src={currentAvatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => setShowAvatarSelector(true)}
                    >
                      <Icon name="Plus" className="text-white" size={20} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {!isEditing ? (
                          <>
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setIsEditing(true)}
                              className="h-8 w-8 p-0"
                            >
                              <Icon name="Pencil" size={14} />
                            </Button>
                          </>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <div>
                              <Label htmlFor="firstName" className="text-xs">Имя</Label>
                              <Input
                                id="firstName"
                                value={editData.firstName}
                                onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                                placeholder="Имя"
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lastName" className="text-xs">Фамилия</Label>
                              <Input
                                id="lastName"
                                value={editData.lastName}
                                onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                                placeholder="Фамилия"
                                className="h-8"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <Badge className={`${providerInfo.color} text-white`}>
                        <Icon name={providerInfo.icon as any} className="mr-1" size={12} />
                        {providerInfo.name}
                      </Badge>
                    </div>
                    
                    <p className="text-foreground/70 mb-2">{user.email}</p>
                    
                    {/* Дата рождения */}
                    <div className="mb-4">
                      {!isEditing ? (
                        <p className="text-sm text-foreground/60">
                          {editData.birthDate ? (
                            <>
                              <Icon name="Calendar" className="inline mr-1" size={14} />
                              Дата рождения: {new Date(editData.birthDate).toLocaleDateString('ru-RU')}
                            </>
                          ) : (
                            <span className="text-foreground/40">Дата рождения не указана</span>
                          )}
                        </p>
                      ) : (
                        <div className="max-w-xs">
                          <Label htmlFor="birthDate" className="text-xs">Дата рождения</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={editData.birthDate}
                            onChange={(e) => setEditData(prev => ({ ...prev, birthDate: e.target.value }))}
                            className="h-8"
                          />
                        </div>
                      )}
                    </div>

                    {/* Кнопки сохранения/отмены в режиме редактирования */}
                    {isEditing && (
                      <div className="flex space-x-2 mb-4">
                        <Button 
                          size="sm" 
                          onClick={() => {
                            // Сохраняем данные
                            const updatedUser = {
                              ...user,
                              name: `${editData.firstName} ${editData.lastName}`.trim(),
                              birthDate: editData.birthDate
                            };
                            
                            localStorage.setItem('neobake_user', JSON.stringify(updatedUser));
                            setIsEditing(false);
                            
                            // Обновляем локальное состояние
                            window.location.reload(); // Простое обновление для демонстрации
                          }}
                        >
                          <Icon name="Check" className="mr-1" size={14} />
                          Сохранить
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setIsEditing(false);
                            // Возвращаем исходные данные
                            const nameParts = user.name.split(' ');
                            setEditData({
                              firstName: nameParts[0] || '',
                              lastName: nameParts.slice(1).join(' ') || '',
                              birthDate: user.birthDate || ''
                            });
                          }}
                        >
                          <Icon name="X" className="mr-1" size={14} />
                          Отмена
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        <Icon name="Shield" className="mr-1" size={12} />
                        Аккаунт активен
                      </Badge>
                      <Badge variant="outline">
                        <Icon name="Calendar" className="mr-1" size={12} />
                        Дата регистрации: {new Date().toLocaleDateString('ru-RU')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Star" className="mr-2" size={20} />
                  Доступные функции
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Icon name="ShoppingCart" className="text-green-600" size={20} />
                    <div>
                      <h4 className="font-medium text-green-900">Заказ еды</h4>
                      <p className="text-sm text-green-700">Доставка из ресторанов</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Icon name="Heart" className="text-blue-600" size={20} />
                    <div>
                      <h4 className="font-medium text-blue-900">Избранное</h4>
                      <p className="text-sm text-blue-700">Любимые блюда и рестораны</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Icon name="Clock" className="text-purple-600" size={20} />
                    <div>
                      <h4 className="font-medium text-purple-900">История</h4>
                      <p className="text-sm text-purple-700">Ваши заказы и активность</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <Icon name="Bell" className="text-orange-600" size={20} />
                    <div>
                      <h4 className="font-medium text-orange-900">Уведомления</h4>
                      <p className="text-sm text-orange-700">Акции и спецпредложения</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Zap" className="mr-2" size={20} />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/order')}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={16} />
                  Заказать еду
                </Button>
                
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/restaurant')}
                >
                  <Icon name="UtensilsCrossed" className="mr-2" size={16} />
                  Рестораны
                </Button>
                
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/settings')}
                >
                  <Icon name="Settings" className="mr-2" size={16} />
                  Настройки
                </Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Shield" className="mr-2" size={20} />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Двухфакторная аутентификация</span>
                  <Badge variant="secondary">Скоро</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS-уведомления</span>
                  <Badge variant="secondary">Скоро</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">История входов</span>
                  <Badge variant="secondary">Скоро</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="HelpCircle" className="mr-2" size={20} />
                  Поддержка
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  asChild
                >
                  <a href="https://t.me/+3mTySr48LoI4ODFi" target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageCircle" className="mr-2" size={16} />
                    Telegram-сообщество
                  </a>
                </Button>
                
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  asChild
                >
                  <a href="mailto:danamilo636@gmail.com">
                    <Icon name="Mail" className="mr-2" size={16} />
                    Написать нам
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Avatar Selector Modal */}
        {showAvatarSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Смена аватара</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAvatarSelector(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <div className="p-4">
                <AvatarSelector
                  selectedAvatar={currentAvatar}
                  onAvatarSelect={(newAvatar) => {
                    setCurrentAvatar(newAvatar);
                    // Обновляем аватар в локальном хранилище
                    const userData = localStorage.getItem('neobake_user');
                    if (userData) {
                      const user = JSON.parse(userData);
                      user.avatar = newAvatar;
                      localStorage.setItem('neobake_user', JSON.stringify(user));
                    }
                  }}
                  userName={user.name}
                />
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAvatarSelector(false)}
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowAvatarSelector(false);
                      // Можно добавить уведомление об успешном сохранении
                      console.log('Аватар обновлен!');
                    }}
                  >
                    Сохранить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}