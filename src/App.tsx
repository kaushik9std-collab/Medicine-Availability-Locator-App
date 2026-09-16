import { useState } from 'react';
import type { Page, CartItem } from './types';
import { defaultCart } from './data';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FamilyPage from './pages/FamilyPage';
import RemindersPage from './pages/RemindersPage';
import OrdersPage from './pages/OrdersPage';
import WalletPage from './pages/WalletPage';
import CartPage from './pages/CartPage';
import PrescriptionPage from './pages/PrescriptionPage';
import DomainDashboard from './pages/DomainDashboard';

import SideMenu from './components/SideMenu';
import BottomBar from './components/BottomBar';
import AIBot from './components/AIBot';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(defaultCart);
  const [lang, setLang] = useState('English');

  function addToCart(item: CartItem) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, cartQty: i.cartQty + 1 } : i);
      return [...prev, item];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, cartQty: Math.max(1, i.cartQty + delta) } : i));
  }

  function removeItem(id: string) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const noBottomBar: Page[] = ['login'];
  const noAIBot: Page[] = ['login'];

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNav={setPage} onMenuOpen={() => setMenuOpen(true)} onSearch={() => {}} />;
      case 'search':
        return <SearchPage onBack={() => setPage('home')} onAddToCart={addToCart} />;
      case 'family':
        return <FamilyPage onBack={() => setPage('home')} />;
      case 'reminders':
        return <RemindersPage onBack={() => setPage('home')} />;
      case 'orders':
        return <OrdersPage onBack={() => setPage('home')} cart={cart} onClearCart={() => setCart([])} />;
      case 'history':
        return <OrdersPage onBack={() => setPage('home')} cart={[]} onClearCart={() => {}} isHistory />;
      case 'wallet':
        return <WalletPage onBack={() => setPage('home')} />;
      case 'cart':
        return <CartPage onBack={() => setPage('home')} cart={cart} onUpdateQty={updateQty} onRemove={removeItem} onNav={setPage} />;
      case 'prescription':
        return <PrescriptionPage onBack={() => setPage('home')} />;
      case 'domain':
        return <DomainDashboard onBack={() => setPage('home')} />;
      default:
        return <HomePage onNav={setPage} onMenuOpen={() => setMenuOpen(true)} onSearch={() => {}} />;
    }
  };

  return (
    <div className="max-w-lg mx-auto relative min-h-screen bg-gray-50 shadow-2xl overflow-hidden">
      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNav={setPage}
        onLogout={() => { setLoggedIn(false); setPage('home'); }}
        lang={lang}
        onLang={setLang}
      />

      <main className="min-h-screen">
        {renderPage()}
      </main>

      {!noBottomBar.includes(page) && (
        <BottomBar current={page} onNav={setPage} cartCount={cart.length} />
      )}

      {!noAIBot.includes(page) && <AIBot />}
    </div>
  );
}
