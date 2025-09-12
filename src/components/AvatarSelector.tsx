import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Анимированные аватарки
const ANIMATED_AVATARS = [
  {
    id: 'robot',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg',
    name: 'Робот',
    animated: true
  },
  {
    id: 'rocket',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f680.svg',
    name: 'Ракета',
    animated: true
  },
  {
    id: 'alien',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f47d.svg',
    name: 'Инопланетянин',
    animated: true
  },
  {
    id: 'astronaut',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9d1-200d-1f680.svg',
    name: 'Астронавт',
    animated: true
  },
  {
    id: 'chef',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9d1-200d-1f373.svg',
    name: 'Повар',
    animated: true
  },
  {
    id: 'croissant',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f950.svg',
    name: 'Круассан',
    animated: true
  },
  {
    id: 'pizza',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f355.svg',
    name: 'Пицца',
    animated: true
  },
  {
    id: 'burger',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f354.svg',
    name: 'Бургер',
    animated: true
  },
  {
    id: 'coffee',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2615.svg',
    name: 'Кофе',
    animated: true
  },
  {
    id: 'cake',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f370.svg',
    name: 'Торт',
    animated: true
  },
  {
    id: 'star',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg',
    name: 'Звезда',
    animated: true
  },
  {
    id: 'heart',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2764.svg',
    name: 'Сердце',
    animated: true
  }
];

interface AvatarSelectorProps {
  selectedAvatar: string;
  onAvatarSelect: (avatarUrl: string) => void;
  userName?: string;
}

export default function AvatarSelector({ selectedAvatar, onAvatarSelect, userName }: AvatarSelectorProps) {
  const [activeTab, setActiveTab] = useState<'animated' | 'upload' | 'generated'>('animated');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Проверяем размер файла (макс 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 2MB');
        return;
      }

      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        alert('Выберите изображение');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        onAvatarSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateGravatarStyle = (style: string) => {
    const email = userName ? `${userName}@neobake.ru` : 'user@neobake.ru';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}&background=${style}&color=fff&size=128`;
  };

  const gravatarStyles = [
    { id: 'orange', color: 'f97316', name: 'Оранжевый' },
    { id: 'blue', color: '3b82f6', name: 'Синий' },
    { id: 'green', color: '10b981', name: 'Зелёный' },
    { id: 'purple', color: '8b5cf6', name: 'Фиолетовый' },
    { id: 'pink', color: 'ec4899', name: 'Розовый' },
    { id: 'red', color: 'ef4444', name: 'Красный' },
    { id: 'yellow', color: 'f59e0b', name: 'Жёлтый' },
    { id: 'indigo', color: '6366f1', name: 'Индиго' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Image" className="mr-2" size={20} />
          Выберите аватар
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'animated' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('animated')}
          >
            <Icon name="Sparkles" className="mr-2" size={16} />
            Эмодзи
          </Button>
          <Button
            variant={activeTab === 'generated' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('generated')}
          >
            <Icon name="Palette" className="mr-2" size={16} />
            Цветные
          </Button>
          <Button
            variant={activeTab === 'upload' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('upload')}
          >
            <Icon name="Upload" className="mr-2" size={16} />
            Загрузить
          </Button>
        </div>

        {/* Animated Avatars */}
        {activeTab === 'animated' && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {ANIMATED_AVATARS.map((avatar) => (
              <div
                key={avatar.id}
                className={`relative cursor-pointer rounded-lg p-2 transition-all hover:bg-muted/50 ${
                  selectedAvatar === avatar.url ? 'ring-2 ring-primary bg-primary/10' : ''
                }`}
                onClick={() => onAvatarSelect(avatar.url)}
                title={avatar.name}
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center">
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    className="w-10 h-10 hover:scale-110 transition-transform duration-200"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                      animation: selectedAvatar === avatar.url ? 'bounce 1s infinite' : undefined
                    }}
                  />
                </div>
                {selectedAvatar === avatar.url && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={10} className="text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Generated Avatars */}
        {activeTab === 'generated' && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {gravatarStyles.map((style) => {
              const avatarUrl = generateGravatarStyle(style.color);
              return (
                <div
                  key={style.id}
                  className={`relative cursor-pointer rounded-lg p-2 transition-all hover:bg-muted/50 ${
                    selectedAvatar === avatarUrl ? 'ring-2 ring-primary bg-primary/10' : ''
                  }`}
                  onClick={() => onAvatarSelect(avatarUrl)}
                  title={style.name}
                >
                  <Avatar className="w-12 h-12 mx-auto">
                    <AvatarImage src={avatarUrl} alt={style.name} />
                    <AvatarFallback style={{ backgroundColor: `#${style.color}` }}>
                      {userName?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {selectedAvatar === avatarUrl && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={10} className="text-primary-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="Upload" size={24} className="text-muted-foreground" />
                </div>
                
                <div>
                  <p className="text-sm text-foreground/70 mb-2">
                    Загрузите свое изображение
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    PNG, JPG до 2MB
                  </p>
                  
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-4"
                  >
                    <Icon name="Upload" className="mr-2" size={16} />
                    Выбрать файл
                  </Button>
                  
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            
            {uploadedImage && (
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={uploadedImage} alt="Загруженное изображение" />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        <div className="mt-6 pt-4 border-t">
          <Label className="text-sm font-medium mb-2 block">Предпросмотр:</Label>
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedAvatar} alt="Выбранный аватар" />
              <AvatarFallback>
                {userName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{userName || 'Пользователь'}</p>
              <p className="text-sm text-muted-foreground">
                {selectedAvatar ? 'Аватар выбран' : 'Выберите аватар'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}