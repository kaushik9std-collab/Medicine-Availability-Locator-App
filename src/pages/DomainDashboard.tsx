import { useState } from 'react';

interface Props { onBack: () => void; }

const inventory = [
  { id: '1', name: 'Paracetamol 500mg', brand: 'Calpol', stock: 250, expiry: '12/2026', threshold: 50, category: 'Analgesic' },
  { id: '2', name: 'Amlodipine 5mg', brand: 'Amlodac', stock: 80, expiry: '06/2026', threshold: 30, category: 'Cardiac' },
  { id: '3', name: 'Metformin 500mg', brand: 'Glycomet', stock: 12, expiry: '03/2027', threshold: 50, category: 'Diabetes' },
  { id: '4', name: 'Cetirizine 10mg', brand: 'Cetzine', stock: 150, expiry: '09/2026', threshold: 30, category: 'Allergy' },
  { id: '5', name: 'Vitamin D3 1000IU', brand: 'Calcirol', stock: 5, expiry: '02/2025', threshold: 20, category: 'Supplement' },
];

const analytics = [
  { label: "Today's Sales", value: '₹12,450', icon: '💰', color: 'bg-green-50 text-green-700' },
  { label: 'Orders', value: '38', icon: '📦', color: 'bg-blue-50 text-blue-700' },
  { label: 'Low Stock', value: '3 items', icon: '⚠️', color: 'bg-amber-50 text-amber-700' },
  { label: 'Expiring Soon', value: '2 items', icon: '📅', color: 'bg-red-50 text-red-600' },
];

export default function DomainDashboard({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'billing' | 'reminders'>('overview');
  const [editId, setEditId] = useState<string | null>(null);

  const tabs = ['overview', 'inventory', 'billing', 'reminders'] as const;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-gray-800 font-display text-base">Apollo Pharmacy</h1>
          <p className="text-xs text-gray-400">12 MG Road, Bengaluru · Domain Dashboard</p>
        </div>
        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full" />
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-100 px-4 flex gap-1 overflow-x-auto hide-scroll">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`capitalize text-sm font-medium px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4 space-y-4">
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {analytics.map(a => (
                <div key={a.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-2 ${a.color}`}>{a.icon}</div>
                  <p className="font-bold text-gray-800 font-display text-lg">{a.value}</p>
                  <p className="text-xs text-gray-400">{a.label}</p>
                </div>
              ))}
            </div>

            {/* Data export */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="font-semibold text-gray-800 font-display mb-3">Export Data</p>
              <div className="grid grid-cols-2 gap-2">
                {['All Data (Excel)', 'Inventory (PDF)', 'Billing (Excel)', 'Expiry Report (PDF)'].map(e => (
                  <button key={e} className="flex items-center gap-2 border border-gray-200 rounded-xl p-2.5 text-xs font-medium text-gray-700 hover:border-green-300 hover:text-green-700 transition-colors">
                    <span>{e.includes('Excel') ? '📊' : '📄'}</span>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Top demand chart placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="font-semibold text-gray-800 font-display mb-3">Medicine Demand (This Week)</p>
              {[
                { name: 'Paracetamol 500mg', pct: 85 },
                { name: 'Vitamin D3', pct: 62 },
                { name: 'Metformin 500mg', pct: 48 },
                { name: 'Cetirizine 10mg', pct: 35 },
              ].map(m => (
                <div key={m.name} className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{m.name}</span><span>{m.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'inventory' && (
          <>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-white rounded-xl border border-gray-200 px-3 py-2 gap-2 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400" placeholder="Search inventory..." />
              </div>
              <button className="bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl">+ Add</button>
            </div>

            <div className="space-y-2">
              {inventory.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.category}</span>
                        </div>
                        <p className="text-xs text-gray-400">{item.brand}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs font-semibold ${item.stock <= item.threshold ? 'text-red-500' : 'text-gray-600'}`}>
                            Stock: {item.stock}
                          </span>
                          <span className="text-xs text-gray-400">Exp: {item.expiry}</span>
                        </div>
                        {item.stock <= item.threshold && (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            <span className="text-[10px] text-red-500 font-medium">Low stock — reorder needed</span>
                          </div>
                        )}
                        {/* Check expiry warning */}
                        {item.expiry === '02/2025' && (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span className="text-[10px] text-amber-600 font-medium">⚠ Expired — remove from stock</span>
                          </div>
                        )}
                      </div>
                      <button onClick={() => setEditId(editId === item.id ? null : item.id)} className="text-xs text-green-600 border border-green-200 px-2 py-1 rounded-lg hover:bg-green-50 flex-shrink-0">Edit</button>
                    </div>

                    {editId === item.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                        <div className="flex gap-2">
                          <input defaultValue={item.stock} className="flex-1 border border-gray-200 rounded-xl px-2 py-1.5 text-xs outline-none focus:border-green-400" placeholder="Update stock" type="number" />
                          <input defaultValue={item.expiry} className="flex-1 border border-gray-200 rounded-xl px-2 py-1.5 text-xs outline-none focus:border-green-400" placeholder="Expiry MM/YYYY" />
                        </div>
                        <button onClick={() => setEditId(null)} className="w-full bg-green-600 text-white text-xs font-semibold py-2 rounded-xl hover:bg-green-700">Update</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="font-semibold text-gray-800 font-display mb-3">Today's Billing Summary</p>
              <div className="space-y-2">
                {[
                  { time: '09:23 AM', customer: 'Arjun Kumar', items: 'Paracetamol ×2, Vit D3 ×1', amount: 142 },
                  { time: '10:45 AM', customer: 'Priya Sharma', items: 'Metformin ×60', amount: 285 },
                  { time: '11:30 AM', customer: 'Rajan Mehta', items: 'Amlodipine ×30, Aspirin ×30', amount: 198 },
                  { time: '02:15 PM', customer: 'Sunita Rao', items: 'Cetirizine ×10', amount: 48 },
                ].map((bill, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="text-[11px] text-gray-400 font-mono w-16 flex-shrink-0">{bill.time}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{bill.customer}</p>
                      <p className="text-xs text-gray-400 truncate">{bill.items}</p>
                    </div>
                    <span className="text-sm font-bold text-green-700">₹{bill.amount}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between">
                <span className="font-bold text-gray-800">Day Total</span>
                <span className="font-bold text-green-700">₹12,450</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3">
              <p className="font-semibold text-amber-800 text-sm font-display">⚠ 2 items expiring soon</p>
              <p className="text-xs text-amber-600 mt-0.5">Review and remove expired stock immediately</p>
            </div>
            {inventory.filter(i => i.stock <= i.threshold || i.expiry === '02/2025').map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${item.expiry === '02/2025' ? 'bg-red-50' : 'bg-amber-50'}`}>
                    {item.expiry === '02/2025' ? '🚫' : '⚡'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">Stock: {item.stock} · Exp: {item.expiry}</p>
                    <p className={`text-xs font-medium mt-0.5 ${item.expiry === '02/2025' ? 'text-red-500' : 'text-amber-600'}`}>
                      {item.expiry === '02/2025' ? 'EXPIRED — Remove immediately' : 'Low stock — Reorder now'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
