import type { Page } from '../types';

interface Props {
  onNav: (p: Page) => void;
  onMenuOpen: () => void;
  onSearch: (q: string) => void;
}

export default function HomePage({ onNav, onMenuOpen, onSearch }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top bar */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-3">
          <button onClick={onMenuOpen} className="flex flex-col gap-1 p-1">
            <span className="block w-5 h-0.5 bg-gray-700 rounded" />
            <span className="block w-4 h-0.5 bg-gray-700 rounded" />
            <span className="block w-5 h-0.5 bg-gray-700 rounded" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-1.5 mr-1">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold font-display">M+</span>
            </div>
            <span className="text-green-700 font-bold text-base font-display hidden sm:block">MediFind</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
              placeholder="Search medicines, brands..."
              onKeyDown={e => { if (e.key === 'Enter') { onSearch((e.target as HTMLInputElement).value); onNav('search'); }}}
            />
            <button onClick={() => onNav('search')} className="bg-green-100 rounded-lg p-1" title="Upload image">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </button>
          </div>

          <button className="relative p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-3">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-20 h-20 bg-white rounded-full" />
            <div className="absolute bottom-0 right-8 w-12 h-12 bg-white rounded-full" />
          </div>
          <div className="flex items-center p-4">
            <div className="flex-1">
              <p className="text-green-100 text-xs font-medium uppercase tracking-wide mb-0.5">Welcome back,</p>
              <h2 className="text-white font-bold text-xl font-display leading-tight">Arjun Kumar! 👋</h2>
              <p className="text-green-100 text-xs mt-1 leading-relaxed">Find your medicines easily and take care of<br/>your health with <span className="text-white font-semibold">MediFind.</span></p>

              {/* Stats row */}
              <div className="flex gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm">💊</span>
                  <span className="text-green-100 text-[10px] leading-tight">1 Lakh+<br/>Medicines</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">📍</span>
                  <span className="text-green-100 text-[10px] leading-tight">10,000+<br/>Pharmacies</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">🚚</span>
                  <span className="text-green-100 text-[10px] leading-tight">Fast<br/>Delivery</span>
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&h=120&fit=crop&auto=format"
              alt="Medicine tablets"
              className="w-28 h-28 object-cover rounded-xl opacity-90 flex-shrink-0"
            />
          </div>
        </div>

        {/* Quick action — Family Medicine */}
        <button onClick={() => onNav('family')} className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 active:scale-98 transition-transform">
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">👨‍👩‍👧</div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-800 font-display">Family Medicine</p>
            <p className="text-xs text-gray-500">Manage medicines for all family members</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Status cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Reminder */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-lg mb-2">🔔</div>
            <p className="font-semibold text-gray-800 text-sm font-display">Reminders</p>
            <p className="text-xs text-gray-500 mt-0.5">2 Reminders Today</p>
            <button onClick={() => onNav('reminders')} className="mt-3 w-full bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold py-1.5 rounded-lg transition-colors">
              View All
            </button>
          </div>

          {/* Wallet */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-lg mb-2">👜</div>
            <p className="font-semibold text-gray-800 text-sm font-display">Wallet</p>
            <p className="text-xs text-gray-500 mt-0.5">₹ 250.00 Available</p>
            <button onClick={() => onNav('wallet')} className="mt-3 w-full bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold py-1.5 rounded-lg transition-colors">
              Top Up
            </button>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg mb-2">📦</div>
            <p className="font-semibold text-gray-800 text-sm font-display">Orders</p>
            <p className="text-xs text-gray-500 mt-0.5">3 Active Orders</p>
            <button onClick={() => onNav('orders')} className="mt-3 w-full bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold py-1.5 rounded-lg transition-colors">
              View Orders
            </button>
          </div>

          {/* History */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg mb-2">🕐</div>
            <p className="font-semibold text-gray-800 text-sm font-display">History</p>
            <p className="text-xs text-gray-500 mt-0.5">24 Past Orders</p>
            <button onClick={() => onNav('history')} className="mt-3 w-full bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold py-1.5 rounded-lg transition-colors">
              View History
            </button>
          </div>
        </div>

        {/* Bottom banners */}
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🎧</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 font-display">Need Help?</p>
              <p className="text-xs text-gray-500 leading-relaxed">Our AI Assistant is here to help you 24/7.</p>
            </div>
            <button className="bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap hover:bg-green-700 transition-colors flex-shrink-0">
              Chat Now
            </button>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🔔</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 font-display">Stay Updated</p>
              <p className="text-xs text-gray-500 leading-relaxed">Enable notifications for orders, reminders & offers.</p>
            </div>
            <button className="bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap hover:bg-green-700 transition-colors flex-shrink-0">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
