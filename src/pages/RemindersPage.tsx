import { useState } from 'react';
import { reminders as initialReminders } from '../data';
import type { Reminder } from '../types';

interface Props { onBack: () => void; }

export default function RemindersPage({ onBack }: Props) {
  const [list, setList] = useState<Reminder[]>(initialReminders);
  const [showAdd, setShowAdd] = useState(false);

  function toggle(id: string) {
    setList(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="font-bold text-gray-800 font-display text-lg">Reminders</h1>
        <button onClick={() => setShowAdd(true)} className="ml-auto bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl">+ New</button>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Today's alert */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 flex items-center gap-3">
          <span className="text-2xl">⏰</span>
          <div>
            <p className="text-sm font-semibold text-orange-800 font-display">2 Reminders Today</p>
            <p className="text-xs text-orange-600">Next: Amlodipine 5mg at 8:00 AM</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Your Reminders</p>
        {list.map(r => (
          <div key={r.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${r.active ? 'border-gray-100' : 'border-gray-100 opacity-60'}`}>
            <div className="p-4 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${r.active ? 'bg-orange-50' : 'bg-gray-50'}`}>
                🔔
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">{r.medicine}</p>
                <p className="text-xs text-gray-500 mt-0.5">⏱ {r.time} · {r.frequency}</p>
                <div className={`inline-flex items-center gap-1 mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${r.stock <= 7 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                  💊 {r.stock} tablets remaining {r.stock <= 7 && '· Low!'}
                </div>
              </div>
              <button
                onClick={() => toggle(r.id)}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 relative ${r.active ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${r.active ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
            {r.stock <= 7 && (
              <div className="px-4 pb-3">
                <button className="w-full bg-red-50 text-red-600 text-xs font-semibold py-2 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                  🛒 Reorder Now — Only {r.stock} Left
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6">
            <h3 className="font-bold text-gray-800 font-display text-lg mb-4">Add Reminder</h3>
            <div className="space-y-3">
              <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400" placeholder="Medicine Name" />
              <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400" placeholder="Time (e.g. 8:00 AM)" type="time" />
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400 text-gray-600">
                <option>Daily</option>
                <option>Twice daily</option>
                <option>Weekly</option>
              </select>
              <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400" placeholder="Current stock (tablets)" type="number" />
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm">Cancel</button>
                <button onClick={() => setShowAdd(false)} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm">Save Reminder</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
