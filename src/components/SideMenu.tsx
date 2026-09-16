import type { Page } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onNav: (p: Page) => void;
  onLogout: () => void;
  lang: string;
  onLang: (l: string) => void;
}

const langs = ['English', 'हिन्दी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'ಕನ್ನಡ'];

export default function SideMenu({ open, onClose, onNav, onLogout, lang, onLang }: Props) {
  const nav = (p: Page) => { onNav(p); onClose(); };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-5 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg font-display">AK</div>
            <div>
              <p className="text-white font-semibold font-display">Arjun Kumar</p>
              <p className="text-green-100 text-xs">arjun.kumar@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Aadhaar Verified ✓</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto hide-scroll py-2">
          {[
            { icon: '🏠', label: 'Home', page: 'home' as Page },
            { icon: '👨‍👩‍👧', label: 'Family Medicine', page: 'family' as Page },
            { icon: '⏰', label: 'Reminders', page: 'reminders' as Page },
            { icon: '💊', label: 'Search Medicines', page: 'search' as Page },
            { icon: '🛒', label: 'Cart', page: 'cart' as Page },
            { icon: '📦', label: 'My Orders', page: 'orders' as Page },
            { icon: '🕐', label: 'History', page: 'history' as Page },
            { icon: '👜', label: 'Wallet', page: 'wallet' as Page },
            { icon: '📋', label: 'Prescription Vault', page: 'prescription' as Page },
            { icon: '🏥', label: 'Domain Dashboard', page: 'domain' as Page },
          ].map(item => (
            <button key={item.page} onClick={() => nav(item.page)} className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors text-left">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}

          <div className="mx-4 my-2 border-t border-gray-100" />

          <div className="px-5 py-2">
            <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Language</p>
            <div className="flex flex-wrap gap-1">
              {langs.map(l => (
                <button key={l} onClick={() => onLang(l)} className={`text-xs px-2 py-1 rounded-full border transition-colors ${lang === l ? 'bg-green-600 text-white border-green-600' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <span className="text-lg">🚪</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
