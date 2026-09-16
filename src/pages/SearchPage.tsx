import { useState, useRef } from 'react';
import { pharmacies } from '../data';
import type { CartItem } from '../types';

interface Props {
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

const medicines = [
  { id: 'm1', name: 'Paracetamol 500mg', generic: 'Acetaminophen', price: 32, qty: 10, prescribed: false },
  { id: 'm2', name: 'Amlodipine 5mg', generic: 'Amlodipine Besylate', price: 85, qty: 30, prescribed: true },
  { id: 'm3', name: 'Metformin 500mg', generic: 'Metformin HCl', price: 48, qty: 60, prescribed: true },
  { id: 'm4', name: 'Vitamin D3 1000IU', generic: 'Cholecalciferol', price: 180, qty: 30, prescribed: false },
  { id: 'm5', name: 'Cetirizine 10mg', generic: 'Cetirizine HCl', price: 25, qty: 10, prescribed: false },
];

export default function SearchPage({ onBack, onAddToCart }: Props) {
  const [query, setQuery] = useState('Paracetamol');
  const [searched, setSearched] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [warning, setWarning] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function doSearch() {
    if (query.trim()) setSearched(true);
  }

  function handleAdd(med: typeof medicines[0]) {
    if (!med.prescribed) {
      setWarning(true);
      setTimeout(() => setWarning(false), 3000);
    }
    onAddToCart({ ...med, cartQty: 1 });
    setAddedId(med.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            placeholder="Search medicines..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
          />
          <button onClick={() => fileRef.current?.click()} className="bg-green-100 rounded-lg p-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>
        <button onClick={doSearch} className="bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded-xl">Go</button>
      </div>

      {/* Non-prescription warning */}
      {warning && (
        <div className="mx-4 mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
          <span className="text-amber-500 text-lg">⚠️</span>
          <div>
            <p className="text-amber-800 text-xs font-semibold">Prescription Recommended</p>
            <p className="text-amber-700 text-xs">This medicine is typically prescribed by a doctor. Please consult before purchase.</p>
          </div>
        </div>
      )}

      {searched && (
        <div className="px-4 mt-3 space-y-4">
          {/* Medicine Results */}
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Search Results for "{query}"</p>
            <div className="space-y-2">
              {medicines.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || query === 'Paracetamol').slice(0, query === 'Paracetamol' ? 2 : 5).map(med => (
                <div key={med.id} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg">💊</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{med.name}</p>
                    <p className="text-xs text-gray-400">{med.generic}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-green-700 text-xs font-semibold">₹{med.price}</span>
                      <span className="text-gray-300 text-xs">|</span>
                      <span className="text-gray-400 text-xs">Strip of {med.qty}</span>
                      {med.prescribed && <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-medium">Rx</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(med)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${addedId === med.id ? 'bg-green-100 text-green-700' : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'}`}
                  >
                    {addedId === med.id ? '✓ Added' : '+ Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Pharmacies */}
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Nearby Pharmacies</p>

            {/* Map placeholder */}
            <div className="relative rounded-2xl overflow-hidden mb-3 border border-gray-200" style={{ height: 160 }}>
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=200&fit=crop&auto=format"
                alt="Map view"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-2 left-3 flex gap-1">
                {pharmacies.filter(p => p.available).map(p => (
                  <div key={p.id} className="bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
                    📍 {p.name.split(' ')[0]}
                  </div>
                ))}
              </div>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-lg px-2 py-1">
                <p className="text-[10px] text-gray-600 font-medium">📍 Bengaluru, KA</p>
              </div>
            </div>

            {/* Pharmacy cards */}
            <div className="space-y-3">
              {pharmacies.map(ph => (
                <button
                  key={ph.id}
                  onClick={() => setSelected(selected === ph.id ? null : ph.id)}
                  className={`w-full text-left rounded-2xl border transition-all shadow-sm ${
                    !ph.available ? 'bg-gray-100 border-gray-200 opacity-60' :
                    selected === ph.id ? 'bg-white border-green-300 ring-1 ring-green-200' :
                    'bg-white border-gray-100 hover:border-green-200'
                  }`}
                >
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${ph.available ? 'bg-green-50' : 'bg-gray-100'}`}>
                          🏥
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-semibold text-gray-800 text-sm">{ph.name}</p>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${ph.open ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
                              {ph.open ? 'Open' : 'Closed'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="text-xs text-gray-600 font-medium">{ph.rating}</span>
                            <span className="text-gray-300 text-xs">({ph.reviews})</span>
                            <span className="text-gray-400 text-xs">·</span>
                            <span className="text-xs text-gray-500">{ph.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-[10px] font-semibold px-2 py-1 rounded-lg flex-shrink-0 ${ph.available ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {ph.available ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>

                    {selected === ph.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <div>⏰ {ph.hours}</div>
                        <div>📞 {ph.phone}</div>
                        <div className="col-span-2">📍 {ph.address}</div>
                        <div className="col-span-2 flex gap-2 mt-1">
                          <button className="flex-1 bg-green-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors">
                            🗺 Directions
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors">
                            📞 Call Store
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
