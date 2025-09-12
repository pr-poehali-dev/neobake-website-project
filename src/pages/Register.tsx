import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import AvatarSelector from '@/components/AvatarSelector';

export default function Register() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailData, setEmailData] = useState({ email: '', password: '', confirmPassword: '', name: '' });
  const [selectedAvatar, setSelectedAvatar] = useState('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOAuthLogin = async (provider: string) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      let userData;
      
      switch (provider) {
        case 'google':
          userData = await AuthService.loginWithGoogle();
          break;
        case 'vk':
          userData = await AuthService.loginWithVK();
          break;
        case 'telegram':
          userData = await AuthService.loginWithTelegram();
          break;
        default:
          throw new Error('Неподдерживаемый провайдер');
      }
      
      await login(provider, userData);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailData.password !== emailData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const userData = await AuthService.registerWithEmail(
        emailData.email,
        emailData.password,
        emailData.name
      );
      
      // Добавляем выбранный аватар
      userData.avatar = selectedAvatar;
      
      await login('email', userData);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-4xl">🥐</div>
            <span className="text-3xl font-bold font-montserrat text-primary">NEOBAKE</span>
          </div>
          <h1 className="text-2xl font-bold font-montserrat mb-2">Регистрация в NеoBake</h1>
          <p className="text-foreground/70">Выберите удобный способ входа</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Мгновенный вход</CardTitle>
            <CardDescription>
              Войдите через мессенджеры и социальные сети
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            {/* Social Login Buttons */}
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
              size="lg"
              disabled={isLoading}
              onClick={() => handleOAuthLogin('telegram')}
            >
              {isLoading ? (
                <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
              ) : (
                <Icon name="Send" className="mr-2" size={18} />
              )}
              Вход через Telegram
            </Button>

            <Button 
              className="w-full bg-red-500 hover:bg-red-600 text-white" 
              size="lg"
              disabled={isLoading}
              onClick={() => handleOAuthLogin('google')}
            >
              {isLoading ? (
                <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
              ) : (
                <Icon name="Mail" className="mr-2" size={18} />
              )}
              Вход через Google
            </Button>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              size="lg"
              disabled={isLoading}
              onClick={() => handleOAuthLogin('vk')}
            >
              {isLoading ? (
                <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
              ) : (
                <Icon name="MessageCircle" className="mr-2" size={18} />
              )}
              Вход через VK
            </Button>

            <Separator className="my-6" />

            {/* Email Registration Toggle */}
            {!showEmailForm && !showAvatarSelector ? (
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowEmailForm(true)}
                >
                  <Icon name="Mail" className="mr-2" size={18} />
                  Email-регистрация
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowAvatarSelector(true)}
                >
                  <Icon name="Image" className="mr-2" size={18} />
                  Выбрать аватар
                </Button>
              </div>
            ) : showAvatarSelector ? (
              <div className="space-y-4">
                <AvatarSelector
                  selectedAvatar={selectedAvatar}
                  onAvatarSelect={setSelectedAvatar}
                  userName={emailData.name || 'Пользователь'}
                />
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setShowAvatarSelector(false)}
                >
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Назад
                </Button>
              </div>
            ) : (
              <form onSubmit={handleEmailRegister} className="space-y-4">
                <h3 className="font-semibold">Регистрация по email</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email адрес</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={emailData.email}
                    onChange={(e) => setEmailData({...emailData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Ваше имя"
                    value={emailData.name}
                    onChange={(e) => setEmailData({...emailData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Создайте надёжный пароль"
                    value={emailData.password}
                    onChange={(e) => setEmailData({...emailData, password: e.target.value})}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Повторите пароль"
                    value={emailData.confirmPassword}
                    onChange={(e) => setEmailData({...emailData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                
                <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                  ) : (
                    <Icon name="UserPlus" className="mr-2" size={18} />
                  )}
                  Создать аккаунт
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setShowEmailForm(false)}
                >
                  Назад к быстрому входу
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Gift" className="mr-2 text-primary" size={20} />
              После регистрации вы получите
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon name="User" className="text-primary mt-1" size={16} />
                <div>
                  <h4 className="font-medium">Личный кабинет</h4>
                  <p className="text-sm text-foreground/70">Персональный профиль с настройками</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Clock" className="text-primary mt-1" size={16} />
                <div>
                  <h4 className="font-medium">История активности</h4>
                  <p className="text-sm text-foreground/70">Отслеживание заказов и активности</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Heart" className="text-primary mt-1" size={16} />
                <div>
                  <h4 className="font-medium">Избранное меню</h4>
                  <p className="text-sm text-foreground/70">Сохраняйте любимые блюда ресторанов</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Bell" className="text-primary mt-1" size={16} />
                <div>
                  <h4 className="font-medium">Уведомления</h4>
                  <p className="text-sm text-foreground/70">Специальные предложения и акции</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Shield" className="mr-2 text-primary" size={20} />
              Безопасность и удобство
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Icon name="ShieldCheck" className="mx-auto text-primary mb-2" size={24} />
                <p className="text-sm font-medium">Двухфакторная аутентификация</p>
              </div>
              
              <div className="text-center">
                <Icon name="CreditCard" className="mx-auto text-primary mb-2" size={24} />
                <p className="text-sm font-medium">Сохранение платёжных данных</p>
              </div>
              
              <div className="text-center">
                <Icon name="Lock" className="mx-auto text-primary mb-2" size={24} />
                <p className="text-sm font-medium">Настройки приватности</p>
              </div>
              
              <div className="text-center">
                <Icon name="Smartphone" className="mx-auto text-primary mb-2" size={24} />
                <p className="text-sm font-medium">Синхронизация устройств</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Process */}
        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Rocket" className="mr-2 text-primary" size={20} />
              Первый запуск
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-sm">Приветственное сообщение</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-sm">Краткое руководство по использованию</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-sm">Настройка основных параметров</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span className="text-sm">Доступ ко всем функциям платформы</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-foreground/70 mb-4">
            Начните пользоваться NеoBake прямо сейчас!
          </p>
          <p className="text-sm text-foreground/60">
            Откройте для себя новые возможности в мире общественного питания
          </p>
        </div>
      </div>
    </div>
  );
}