import type { Page } from '../types';

interface Props {
  current: Page;
  onNav: (p: Page) => void;
  cartCount: number;
}

const tabs = [
  { page: 'home' as Page, label: 'Home', icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#16a34a' : 'none'} stroke={active ? '#16a34a' : '#9ca3af'} strokeWidth="2">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" strokeLinejoin="round"/>
    </svg>
  )},
  { page: 'wallet' as Page, label: 'Wallet', icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#9ca3af'} strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill={active ? '#16a34a' : '#9ca3af'}/>
      <path d="M2 11h20M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2"/>
    </svg>
  )},
  { page: 'orders' as Page, label: 'Orders', icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#9ca3af'} strokeWidth="2">
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinejoin="round"/>
    </svg>
  )},
  { page: 'cart' as Page, label: 'Cart', icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#9ca3af'} strokeWidth="2">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
    </svg>
  )},
  { page: 'prescription' as Page, label: 'Rx', icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#9ca3af'} strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="12" y2="17"/>
    </svg>
  )},
];

export default function BottomBar({ current, onNav, cartCount }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 shadow-lg">
      <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
        {tabs.map(t => (
          <button key={t.page} onClick={() => onNav(t.page)} className="flex flex-col items-center gap-0.5 px-3 py-1.5 relative">
            {t.icon(current === t.page)}
            {t.page === 'cart' && cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            )}
            <span className={`text-[10px] font-medium ${current === t.page ? 'text-green-600' : 'text-gray-400'}`}>{t.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
