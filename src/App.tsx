import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import CartPage from '@/pages/CartPage';
import ProfilePage from '@/pages/ProfilePage';
import BookingPage from '@/pages/BookingPage';
import OrderTrackingPage from '@/pages/OrderTrackingPage';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/tracking" element={<OrderTrackingPage />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;