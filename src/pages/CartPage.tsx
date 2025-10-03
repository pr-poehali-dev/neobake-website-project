import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/layout/Header';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/tracking');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Корзина пуста</h2>
            <p className="text-muted-foreground mb-6">
              Добавьте товары из меню, чтобы оформить заказ
            </p>
            <Button onClick={() => navigate('/menu')}>
              Перейти в меню
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Корзина</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.category}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        
                        <span className="font-bold text-lg">
                          {item.price * item.quantity} ₽
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Итого</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт)</span>
                    <span>{getTotalPrice()} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Доставка</span>
                    <span>{getTotalPrice() >= 1000 ? 'Бесплатно' : '200 ₽'}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Всего</span>
                      <span>{getTotalPrice() >= 1000 ? getTotalPrice() : getTotalPrice() + 200} ₽</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleCheckout}>
                  Оформить заказ
                </Button>
                
                <div className="mt-4 pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Truck" size={16} />
                    <span>Доставка 30-60 минут</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={16} />
                    <span>Гарантия свежести</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;