import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import AuthModal from '@/components/auth/AuthModal';

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Лого */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/img/f85efabd-7d93-4e4a-aaf2-b669994488b9.jpg" 
              alt="NeoBake" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              NeoBake
            </span>
          </Link>

          {/* Навигация десктоп */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Главная
            </Link>
            <Link to="/menu" className="text-foreground hover:text-primary transition-colors">
              Меню
            </Link>
            <Link to="/booking" className="text-foreground hover:text-primary transition-colors">
              Бронирование
            </Link>
            <Link to="/tracking" className="text-foreground hover:text-primary transition-colors">
              Отследить заказ
            </Link>
          </nav>

          {/* Действия */}
          <div className="flex items-center space-x-4">
            {/* Корзина */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <Icon name="ShoppingCart" size={20} />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Профиль */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              className="hidden sm:flex items-center space-x-2"
            >
              <Icon name="User" size={20} />
              <span>{isLoggedIn ? user?.name.split(' ')[0] : 'Войти'}</span>
            </Button>

            {/* Выход */}
            {isLoggedIn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex"
              >
                <Icon name="LogOut" size={20} />
              </Button>
            )}

            {/* Мобильное меню */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/menu" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Меню
              </Link>
              <Link 
                to="/booking" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Бронирование
              </Link>
              <Link 
                to="/tracking" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Отследить заказ
              </Link>
              
              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    handleProfileClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon name="User" size={20} className="mr-2" />
                  {isLoggedIn ? user?.name : 'Войти'}
                </Button>
                
                {isLoggedIn && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start mt-2"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon name="LogOut" size={20} className="mr-2" />
                    Выйти
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Модалка авторизации */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
};

export default Header;