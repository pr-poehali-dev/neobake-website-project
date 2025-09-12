import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Стильные уникальные аватарки для NeoBake
const STYLISH_AVATARS = [
  {
    id: 'cosmic_chef',
    url: 'https://ui-avatars.com/api/?name=👨‍🍳&background=f97316&color=fff&size=128&font-size=0.5',
    name: 'Космический повар',
    category: 'cosmic',
    gradient: 'from-orange-400 to-orange-600'
  },
  {
    id: 'neon_baker',
    url: 'https://ui-avatars.com/api/?name=🥐&background=9933ff&color=fff&size=128&font-size=0.5',
    name: 'Неон пекарь',
    category: 'neon',
    gradient: 'from-purple-400 to-purple-600'
  },
  {
    id: 'cyber_rocket',
    url: 'https://ui-avatars.com/api/?name=🚀&background=00ffff&color=333&size=128&font-size=0.5',
    name: 'Кибер ракета',
    category: 'cyber',
    gradient: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'golden_star',
    url: 'https://ui-avatars.com/api/?name=🌟&background=ffd700&color=333&size=128&font-size=0.5',
    name: 'Золотая звезда',
    category: 'premium',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'rainbow_heart',
    url: 'https://ui-avatars.com/api/?name=❤️&background=ff0099&color=fff&size=128&font-size=0.5',
    name: 'Радужное сердце',
    category: 'vibrant',
    gradient: 'from-pink-400 to-red-500'
  },
  {
    id: 'emerald_alien',
    url: 'https://ui-avatars.com/api/?name=👽&background=10b981&color=fff&size=128&font-size=0.5',
    name: 'Изумрудный пришелец',
    category: 'cosmic',
    gradient: 'from-emerald-400 to-green-600'
  },
  {
    id: 'diamond_robot',
    url: 'https://ui-avatars.com/api/?name=🤖&background=94a3b8&color=fff&size=128&font-size=0.5',
    name: 'Алмазный робот',
    category: 'premium',
    gradient: 'from-slate-400 to-gray-600'
  },
  {
    id: 'sunset_coffee',
    url: 'https://ui-avatars.com/api/?name=☕&background=ff7325&color=fff&size=128&font-size=0.5',
    name: 'Закатный кофе',
    category: 'warm',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'crystal_cake',
    url: 'https://ui-avatars.com/api/?name=🎂&background=ec4899&color=fff&size=128&font-size=0.5',
    name: 'Кристальный торт',
    category: 'vibrant',
    gradient: 'from-pink-400 to-purple-600'
  },
  {
    id: 'galaxy_pizza',
    url: 'https://ui-avatars.com/api/?name=🍕&background=5855ff&color=fff&size=128&font-size=0.5',
    name: 'Галактическая пицца',
    category: 'cosmic',
    gradient: 'from-indigo-400 to-purple-600'
  },
  {
    id: 'electric_burger',
    url: 'https://ui-avatars.com/api/?name=🍔&background=ffef00&color=333&size=128&font-size=0.5',
    name: 'Электро бургер',
    category: 'neon',
    gradient: 'from-yellow-300 to-yellow-500'
  },
  {
    id: 'mystic_croissant',
    url: 'https://ui-avatars.com/api/?name=🥐&background=7777ff&color=fff&size=128&font-size=0.5',
    name: 'Мистический круассан',
    category: 'cyber',
    gradient: 'from-blue-400 to-indigo-600'
  }
];

interface AvatarSelectorProps {
  selectedAvatar: string;
  onAvatarSelect: (avatarUrl: string) => void;
  userName?: string;
}

export default function AvatarSelector({ selectedAvatar, onAvatarSelect, userName }: AvatarSelectorProps) {
  const [activeTab, setActiveTab] = useState<'stylish' | 'upload' | 'generated'>('stylish');
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
            variant={activeTab === 'stylish' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('stylish')}
          >
            <Icon name="Sparkles" className="mr-2" size={16} />
            Стильные
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

        {/* Stylish Avatars */}
        {activeTab === 'stylish' && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {STYLISH_AVATARS.map((avatar) => (
              <div
                key={avatar.id}
                className={`relative cursor-pointer rounded-xl p-3 transition-all hover:scale-105 hover:shadow-lg ${
                  selectedAvatar === avatar.url ? 'ring-2 ring-primary bg-primary/10 scale-105' : ''
                }`}
                onClick={() => onAvatarSelect(avatar.url)}
                title={avatar.name}
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center relative">
                  <div 
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${avatar.gradient} opacity-20`}
                  />
                  <Avatar className="w-14 h-14 relative z-10">
                    <AvatarImage 
                      src={avatar.url} 
                      alt={avatar.name}
                      className="hover:scale-110 transition-transform duration-200"
                    />
                    <AvatarFallback className={`bg-gradient-to-br ${avatar.gradient} text-white font-bold`}>
                      {avatar.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <p className="text-xs text-center mt-2 text-foreground/70 line-clamp-2">
                  {avatar.name}
                </p>
                
                {selectedAvatar === avatar.url && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="Check" size={12} className="text-primary-foreground" />
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