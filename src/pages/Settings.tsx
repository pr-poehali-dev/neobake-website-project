import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SettingsData {
  theme: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  workingHours: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  security: {
    twoFactor: boolean;
    sslEnabled: boolean;
    antiSpam: boolean;
  };
  analytics: {
    googleAnalytics: string;
    yandexMetrica: string;
    tracking: boolean;
  };
}

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SettingsData>({
    theme: 'light',
    logoUrl: '',
    faviconUrl: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    address: '',
    workingHours: '9:00 - 18:00',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    },
    security: {
      twoFactor: false,
      sslEnabled: true,
      antiSpam: true,
    },
    analytics: {
      googleAnalytics: '',
      yandexMetrica: '',
      tracking: false,
    },
  });

  const handleSave = () => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
    // Показать уведомление о сохранении
    console.log('Настройки сохранены!');
  };

  const handleReset = () => {
    if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
      localStorage.removeItem('site_settings');
      window.location.reload();
    }
  };

  const SettingsActions = () => (
    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
      <Button onClick={handleSave} className="flex items-center gap-2">
        <Icon name="Save" size={16} />
        Сохранить изменения
      </Button>
      <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
        <Icon name="RotateCcw" size={16} />
        Сбросить настройки
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Icon name="Eye" size={16} />
        Предварительный просмотр
      </Button>
      <Button variant="ghost" className="flex items-center gap-2">
        <Icon name="HelpCircle" size={16} />
        Помощь
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
              Настройки сайта
            </h1>
            <p className="text-foreground/70">
              Управляйте всеми аспектами вашего сайта
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
              <TabsTrigger value="general" className="text-xs">Общие</TabsTrigger>
              <TabsTrigger value="profile" className="text-xs">Профиль</TabsTrigger>
              <TabsTrigger value="menu" className="text-xs">Меню</TabsTrigger>
              <TabsTrigger value="content" className="text-xs">Контент</TabsTrigger>
              <TabsTrigger value="payments" className="text-xs">Платежи</TabsTrigger>
              <TabsTrigger value="security" className="text-xs">Безопасность</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">Аналитика</TabsTrigger>
              <TabsTrigger value="integrations" className="text-xs">Интеграции</TabsTrigger>
            </TabsList>

            {/* 1. Общие настройки */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" size={20} />
                    Общие настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="theme">Тема оформления</Label>
                        <Select value={settings.theme} onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Светлая</SelectItem>
                            <SelectItem value="dark">Темная</SelectItem>
                            <SelectItem value="auto">Автоматическая</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="logo">URL логотипа</Label>
                        <Input
                          id="logo"
                          value={settings.logoUrl}
                          onChange={(e) => setSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                          placeholder="https://example.com/logo.png"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="favicon">URL фавикона</Label>
                        <Input
                          id="favicon"
                          value={settings.faviconUrl}
                          onChange={(e) => setSettings(prev => ({ ...prev, faviconUrl: e.target.value }))}
                          placeholder="https://example.com/favicon.ico"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Контактный email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                          placeholder="contact@example.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Контактный телефон</Label>
                        <Input
                          id="phone"
                          value={settings.contactPhone}
                          onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Адрес</Label>
                        <Textarea
                          id="address"
                          value={settings.address}
                          onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Укажите полный адрес"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="hours">Рабочие часы</Label>
                        <Input
                          id="hours"
                          value={settings.workingHours}
                          onChange={(e) => setSettings(prev => ({ ...prev, workingHours: e.target.value }))}
                          placeholder="9:00 - 18:00"
                        />
                      </div>
                    </div>
                  </div>
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>

            {/* 2. Настройки профиля */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={20} />
                    Настройки профиля
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Icon name="Bell" size={16} />
                        Уведомления
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notif">Email уведомления</Label>
                          <Switch
                            id="email-notif"
                            checked={settings.notifications.email}
                            onCheckedChange={(checked) => 
                              setSettings(prev => ({ 
                                ...prev, 
                                notifications: { ...prev.notifications, email: checked }
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-notif">SMS уведомления</Label>
                          <Switch
                            id="sms-notif"
                            checked={settings.notifications.sms}
                            onCheckedChange={(checked) => 
                              setSettings(prev => ({ 
                                ...prev, 
                                notifications: { ...prev.notifications, sms: checked }
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notif">Push уведомления</Label>
                          <Switch
                            id="push-notif"
                            checked={settings.notifications.push}
                            onCheckedChange={(checked) => 
                              setSettings(prev => ({ 
                                ...prev, 
                                notifications: { ...prev.notifications, push: checked }
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Icon name="Lock" size={16} />
                        Приватность
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="profile-visible">Профиль виден всем</Label>
                          <Switch
                            id="profile-visible"
                            checked={settings.privacy.profileVisible}
                            onCheckedChange={(checked) => 
                              setSettings(prev => ({ 
                                ...prev, 
                                privacy: { ...prev.privacy, profileVisible: checked }
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-email">Показывать email</Label>
                          <Switch
                            id="show-email"
                            checked={settings.privacy.showEmail}
                            onCheckedChange={(checked) => 
                              setSettings(prev => ({ 
                                ...prev, 
                                privacy: { ...prev.privacy, showEmail: checked }
                              }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-phone">Показывать телефон</Label>
                          <Switch
                            id="show-phone"
                            checked={settings.privacy.showPhone}
                            onCheckedChange={(checked) => 
                              setSettings(prev => ({ 
                                ...prev, 
                                privacy: { ...prev.privacy, showPhone: checked }
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Icon name="Key" size={16} />
                      Смена пароля
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="current-password">Текущий пароль</Label>
                        <Input id="current-password" type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">Новый пароль</Label>
                        <Input id="new-password" type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Подтверждение</Label>
                        <Input id="confirm-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                  
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>

            {/* 3. Настройки меню */}
            <TabsContent value="menu">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Menu" size={20} />
                    Настройки меню
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Структура меню</h3>
                    <Button size="sm" className="flex items-center gap-2">
                      <Icon name="Plus" size={16} />
                      Добавить пункт
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {['Главная', 'О нас', 'Услуги', 'Контакты'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="GripVertical" className="text-muted-foreground cursor-move" size={16} />
                          <span>{item}</span>
                          <Badge variant="outline">Видимый</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>

            {/* 4. Настройки контента */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" size={20} />
                    Настройки контента
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Icon name="Search" size={16} />
                        SEO-настройки
                      </h3>
                      <div>
                        <Label htmlFor="meta-title">Мета-заголовок</Label>
                        <Input
                          id="meta-title"
                          value={settings.seo.metaTitle}
                          onChange={(e) => setSettings(prev => ({ 
                            ...prev, 
                            seo: { ...prev.seo, metaTitle: e.target.value }
                          }))}
                          placeholder="Заголовок для поисковых систем"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta-description">Мета-описание</Label>
                        <Textarea
                          id="meta-description"
                          value={settings.seo.metaDescription}
                          onChange={(e) => setSettings(prev => ({ 
                            ...prev, 
                            seo: { ...prev.seo, metaDescription: e.target.value }
                          }))}
                          placeholder="Описание для поисковых систем"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="keywords">Ключевые слова</Label>
                        <Input
                          id="keywords"
                          value={settings.seo.keywords}
                          onChange={(e) => setSettings(prev => ({ 
                            ...prev, 
                            seo: { ...prev.seo, keywords: e.target.value }
                          }))}
                          placeholder="ключ1, ключ2, ключ3"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Icon name="Grid" size={16} />
                        Категории и виджеты
                      </h3>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Plus" className="mr-2" size={16} />
                        Добавить категорию
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Puzzle" className="mr-2" size={16} />
                        Управление виджетами
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Filter" className="mr-2" size={16} />
                        Настройка фильтров
                      </Button>
                    </div>
                  </div>
                  
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>

            {/* 5. Платежные настройки */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    Платежные настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Способы оплаты</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Банковские карты', enabled: true, icon: 'CreditCard' },
                          { name: 'Яндекс.Деньги', enabled: false, icon: 'Wallet' },
                          { name: 'PayPal', enabled: false, icon: 'DollarSign' },
                          { name: 'Наличные', enabled: true, icon: 'Banknote' }
                        ].map((payment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon name={payment.icon as any} size={16} />
                              <span>{payment.name}</span>
                            </div>
                            <Switch defaultChecked={payment.enabled} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Валюты и налоги</h3>
                      <div>
                        <Label htmlFor="currency">Основная валюта</Label>
                        <Select defaultValue="rub">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rub">Российский рубль (₽)</SelectItem>
                            <SelectItem value="usd">Доллар США ($)</SelectItem>
                            <SelectItem value="eur">Евро (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tax">НДС (%)</Label>
                        <Input id="tax" type="number" placeholder="20" />
                      </div>
                    </div>
                  </div>
                  
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>

            {/* 6. Настройки безопасности */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Shield" size={20} />
                    Настройки безопасности
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Двухфакторная аутентификация</h4>
                        <p className="text-sm text-muted-foreground">Дополнительная защита аккаунта</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={settings.security.twoFactor ? "default" : "secondary"}>
                          {settings.security.twoFactor ? "Включено" : "Выключено"}
                        </Badge>
                        <Switch
                          checked={settings.security.twoFactor}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              security: { ...prev.security, twoFactor: checked }
                            }))
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">SSL-сертификат</h4>
                        <p className="text-sm text-muted-foreground">Шифрование данных</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={settings.security.sslEnabled ? "default" : "destructive"}>
                          {settings.security.sslEnabled ? "Активен" : "Не активен"}
                        </Badge>
                        <Switch
                          checked={settings.security.sslEnabled}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              security: { ...prev.security, sslEnabled: checked }
                            }))
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Защита от спама</h4>
                        <p className="text-sm text-muted-foreground">Фильтрация нежелательных сообщений</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={settings.security.antiSpam ? "default" : "secondary"}>
                          {settings.security.antiSpam ? "Включена" : "Выключена"}
                        </Badge>
                        <Switch
                          checked={settings.security.antiSpam}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              security: { ...prev.security, antiSpam: checked }
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>

            {/* 7. Аналитика и статистика */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={20} />
                    Аналитика и статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Счетчики</h3>
                      <div>
                        <Label htmlFor="google-analytics">Google Analytics ID</Label>
                        <Input
                          id="google-analytics"
                          value={settings.analytics.googleAnalytics}
                          onChange={(e) => setSettings(prev => ({ 
                            ...prev, 
                            analytics: { ...prev.analytics, googleAnalytics: e.target.value }
                          }))}
                          placeholder="G-XXXXXXXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="yandex-metrica">Яндекс.Метрика ID</Label>
                        <Input
                          id="yandex-metrica"
                          value={settings.analytics.yandexMetrica}
                          onChange={(e) => setSettings(prev => ({ 
                            ...prev, 
                            analytics: { ...prev.analytics, yandexMetrica: e.target.value }
                          }))}
                          placeholder="12345678"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Настройки отслеживания</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="tracking">Отслеживание поведения</Label>
                          <p className="text-sm text-muted-foreground">Сбор данных о действиях пользователей</p>
                        </div>
                        <Switch
                          id="tracking"
                          checked={settings.analytics.tracking}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              analytics: { ...prev.analytics, tracking: checked }
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Icon name="Target" className="mr-2" size={16} />
                      Настроить цели
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="FileBarChart" className="mr-2" size={16} />
                      Создать отчет
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="Download" className="mr-2" size={16} />
                      Экспорт данных
                    </Button>
                  </div>
                  
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>

            {/* 8. Интеграции */}
            <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plug" size={20} />
                    Интеграции
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Icon name="Share2" size={16} />
                        Социальные сети
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Telegram', connected: true, icon: 'MessageCircle' },
                          { name: 'VKontakte', connected: false, icon: 'Users' },
                          { name: 'Instagram', connected: false, icon: 'Camera' },
                          { name: 'Facebook', connected: false, icon: 'Facebook' }
                        ].map((social, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon name={social.icon as any} size={16} />
                              <span>{social.name}</span>
                              <Badge variant={social.connected ? "default" : "secondary"}>
                                {social.connected ? "Подключено" : "Не подключено"}
                              </Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              {social.connected ? "Настроить" : "Подключить"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Icon name="Database" size={16} />
                        CRM и доставка
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'amoCRM', available: true },
                          { name: 'Bitrix24', available: true },
                          { name: 'Яндекс.Доставка', available: false },
                          { name: 'СДЭК', available: false }
                        ].map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon name="Package" size={16} />
                              <span>{service.name}</span>
                              {!service.available && <Badge variant="secondary">Скоро</Badge>}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              disabled={!service.available}
                            >
                              Подключить
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <SettingsActions />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}