import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'telegram' | 'vk' | 'email';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (provider: string, userData?: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохраненные данные пользователя
    const savedUser = localStorage.getItem('neobake_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('neobake_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (provider: string, userData?: any) => {
    setIsLoading(true);
    try {
      // Mock-данные для демонстрации
      const mockUser: User = {
        id: `${provider}_${Date.now()}`,
        name: userData?.name || `Пользователь ${provider}`,
        email: userData?.email || `user@${provider}.com`,
        avatar: userData?.avatar || `https://ui-avatars.com/api/?name=${provider}&background=f97316&color=fff`,
        provider: provider as any
      };

      // В реальном приложении здесь будет API-запрос
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      localStorage.setItem('neobake_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('neobake_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};