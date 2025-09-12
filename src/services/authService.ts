// Mock OAuth Service для демонстрации
// В реальном приложении здесь будут настоящие OAuth провайдеры

interface OAuthProvider {
  name: string;
  clientId: string;
  redirectUri: string;
  scope: string[];
}

// Mock конфигурация OAuth провайдеров
const OAUTH_CONFIG: Record<string, OAuthProvider> = {
  google: {
    name: 'Google',
    clientId: 'GOOGLE_CLIENT_ID', // В реальном приложении из .env
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: ['email', 'profile']
  },
  vk: {
    name: 'VKontakte',
    clientId: 'VK_CLIENT_ID', // В реальном приложении из .env
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: ['email']
  },
  telegram: {
    name: 'Telegram',
    clientId: 'TELEGRAM_BOT_TOKEN', // В реальном приложении из .env
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: ['identify']
  }
};

export class AuthService {
  // Mock Google OAuth
  static async loginWithGoogle(): Promise<any> {
    console.log('🔄 Инициализация входа через Google...');
    
    // Имитация редиректа на Google OAuth
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'google_' + Date.now(),
          name: 'Google Пользователь',
          email: 'user@gmail.com',
          avatar: 'https://ui-avatars.com/api/?name=Google&background=ea4335&color=fff',
          provider: 'google'
        });
      }, 1500);
    });
  }

  // Mock VK OAuth
  static async loginWithVK(): Promise<any> {
    console.log('🔄 Инициализация входа через VK...');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'vk_' + Date.now(),
          name: 'VK Пользователь',
          email: 'user@vk.ru',
          avatar: 'https://ui-avatars.com/api/?name=VK&background=0077ff&color=fff',
          provider: 'vk'
        });
      }, 1500);
    });
  }

  // Telegram OAuth с редиректом на канал
  static async loginWithTelegram(): Promise<any> {
    console.log('🔄 Перенаправление на Telegram канал для подписки...');
    
    // Сохраняем попытку входа через Telegram
    localStorage.setItem('telegram_auth_attempt', 'true');
    localStorage.setItem('telegram_auth_timestamp', Date.now().toString());
    
    // Перенаправляем на Telegram канал для подписки
    window.open('https://t.me/+Rb3TTlbFs0kwYzky', '_blank');
    
    // Показываем инструкцию пользователю
    const shouldProceed = confirm(
      '🔔 Для завершения регистрации:\n\n' +
      '1️⃣ Подпишитесь на Telegram канал\n' +
      '2️⃣ Нажмите "ОК" после подписки\n\n' +
      'Готовы продолжить?'
    );
    
    if (shouldProceed) {
      // Имитируем успешную регистрацию после подписки
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 'telegram_' + Date.now(),
            name: 'Telegram Пользователь',
            email: 'user@telegram.org',
            avatar: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f680.svg',
            provider: 'telegram',
            subscribed: true
          });
        }, 1000);
      });
    } else {
      throw new Error('Необходимо подписаться на канал для завершения регистрации');
    }
  }

  // Email регистрация
  static async registerWithEmail(email: string, password: string, name: string): Promise<any> {
    console.log('🔄 Регистрация через email...');
    
    // Mock валидация
    if (!email || !password || !name) {
      throw new Error('Все поля обязательны для заполнения');
    }

    if (password.length < 6) {
      throw new Error('Пароль должен содержать минимум 6 символов');
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock проверка на существование пользователя
        const existingUser = localStorage.getItem(`user_${email}`);
        if (existingUser) {
          reject(new Error('Пользователь с таким email уже существует'));
          return;
        }

        const newUser = {
          id: 'email_' + Date.now(),
          name,
          email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff`,
          provider: 'email'
        };

        // Сохраняем пользователя (mock база данных)
        localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
        
        resolve(newUser);
      }, 2000);
    });
  }

  // Email вход
  static async loginWithEmail(email: string, password: string): Promise<any> {
    console.log('🔄 Вход через email...');
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userData = localStorage.getItem(`user_${email}`);
        if (!userData) {
          reject(new Error('Пользователь не найден'));
          return;
        }

        resolve(JSON.parse(userData));
      }, 1500);
    });
  }

  // Получение конфигурации OAuth для реального приложения
  static getOAuthUrl(provider: string): string {
    const config = OAUTH_CONFIG[provider];
    if (!config) {
      throw new Error(`Неподдерживаемый провайдер: ${provider}`);
    }

    // Это mock URL - в реальном приложении будет настоящий OAuth URL
    return `https://mock-oauth.example.com/${provider}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope.join(',')}`;
  }
}

// Утилиты для работы с токенами (mock)
export class TokenService {
  private static readonly TOKEN_KEY = 'neobake_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'neobake_refresh_token';

  static saveTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static clearTokens() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}