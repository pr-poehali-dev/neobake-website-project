import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'loyaltyPoints'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('neobake_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'user@neobake.ru' && password === 'password') {
      const userData: User = {
        id: '1',
        name: 'Анна Петрова',
        email: 'user@neobake.ru',
        phone: '+7 (999) 123-45-67',
        loyaltyPoints: 150
      };
      setUser(userData);
      localStorage.setItem('neobake_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'loyaltyPoints'> & { password: string }): Promise<boolean> => {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      loyaltyPoints: 0
    };
    
    setUser(newUser);
    localStorage.setItem('neobake_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('neobake_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('neobake_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};