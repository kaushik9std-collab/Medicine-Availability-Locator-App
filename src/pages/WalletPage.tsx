import { useState } from 'react';
import { walletTransactions } from '../data';

interface Props { onBack: () => void; }

export default function WalletPage({ onBack }: Props) {
  const [balance] = useState(250);
  const [topUpAmt, setTopUpAmt] = useState('');
  const [showTopUp, setShowTopUp] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="font-bold text-gray-800 font-display text-lg">MediWallet</h1>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Balance card */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute bottom-0 right-8 w-16 h-16 bg-white/5 rounded-full" />
          <p className="text-green-100 text-xs font-medium uppercase tracking-wide">Available Balance</p>
          <p className="text-white text-4xl font-bold font-display mt-1">₹{balance}.00</p>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setShowTopUp(true)} className="bg-white text-green-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-50 transition-colors">
              Top Up
            </button>
            <button className="bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/30 transition-colors">
              Transfer
            </button>
          </div>
        </div>

        {/* Quick amounts */}
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Quick Add</p>
          <div className="flex gap-2">
            {[100, 250, 500, 1000].map(a => (
              <button key={a} onClick={() => setTopUpAmt(String(a))} className="flex-1 bg-white border border-gray-100 rounded-xl py-2 text-sm font-semibold text-gray-700 hover:border-green-300 hover:text-green-700 transition-colors shadow-sm">
                ₹{a}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Recent Transactions</p>
          <div className="space-y-2">
            {walletTransactions.map(tx => (
              <div key={tx.id} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tx.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                  {tx.type === 'credit' ? '⬇' : '⬆'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{tx.desc}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTopUp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6">
            <h3 className="font-bold text-gray-800 font-display text-lg mb-4">Top Up Wallet</h3>
            <input
              value={topUpAmt}
              onChange={e => setTopUpAmt(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400 mb-3"
              placeholder="Enter amount (₹)"
              type="number"
            />
            <div className="space-y-2 mb-4">
              {[{ id: 'phonepe', label: 'PhonePe', icon: '📱' }, { id: 'gpay', label: 'Google Pay', icon: '🟢' }, { id: 'paytm', label: 'Paytm', icon: '💙' }].map(pm => (
                <button key={pm.id} className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 text-left hover:border-green-300 transition-colors">
                  <span className="text-xl">{pm.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{pm.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowTopUp(false)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm">Cancel</button>
              <button onClick={() => setShowTopUp(false)} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm">Add ₹{topUpAmt || 0}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
