import { useState } from 'react';
import { familyMembers } from '../data';

interface Props { onBack: () => void; }

const memberMeds: Record<string, { name: string; dose: string; frequency: string; stock: number }[]> = {
  '1': [
    { name: 'Amlodipine 5mg', dose: '1 tablet', frequency: 'Daily morning', stock: 12 },
    { name: 'Aspirin 75mg', dose: '1 tablet', frequency: 'Daily after meal', stock: 28 },
  ],
  '2': [
    { name: 'Metformin 500mg', dose: '1 tablet', frequency: 'Twice daily', stock: 5 },
    { name: 'Glimepiride 2mg', dose: '1 tablet', frequency: 'Before breakfast', stock: 20 },
  ],
  '3': [
    { name: 'Diclofenac 50mg', dose: '1 tablet', frequency: 'As needed', stock: 8 },
    { name: 'Calcium + Vit D3', dose: '1 tablet', frequency: 'Daily night', stock: 30 },
  ],
  '4': [
    { name: 'Thyronorm 50mcg', dose: '1 tablet', frequency: 'Daily empty stomach', stock: 28 },
    { name: 'Calcium Sandoz', dose: '1 tablet', frequency: 'Daily after meal', stock: 20 },
  ],
  '5': [],
};

const avatarColors = ['#16a34a', '#2563eb', '#7c3aed', '#dc2626', '#d97706'];

export default function FamilyPage({ onBack }: Props) {
  const [active, setActive] = useState('1');
  const [showAdd, setShowAdd] = useState(false);

  const member = familyMembers.find(m => m.id === active)!;
  const meds = memberMeds[active] ?? [];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="font-bold text-gray-800 font-display text-lg">Family Medicine</h1>
        <button onClick={() => setShowAdd(true)} className="ml-auto bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-green-700 transition-colors">
          + Add Member
        </button>
      </div>

      {/* Member selector */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex gap-3 overflow-x-auto hide-scroll pb-1">
          {familyMembers.map((m, i) => (
            <button key={m.id} onClick={() => setActive(m.id)} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm text-white transition-all ${active === m.id ? 'ring-2 ring-green-600 ring-offset-2' : ''}`}
                style={{ background: avatarColors[i % avatarColors.length] }}>
                {m.avatar}
              </div>
              <span className={`text-[11px] font-medium whitespace-nowrap ${active === m.id ? 'text-green-700' : 'text-gray-500'}`}>
                {m.relation}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Member profile card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg"
              style={{ background: avatarColors[familyMembers.findIndex(m => m.id === active) % avatarColors.length] }}>
              {member.avatar}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-800 font-display">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.relation} · Age {member.age}</p>
              {member.condition && (
                <span className="inline-block mt-1 bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium border border-amber-100">
                  {member.condition}
                </span>
              )}
            </div>
            <button className="text-xs text-green-600 font-semibold px-3 py-1.5 border border-green-200 rounded-xl hover:bg-green-50 transition-colors">Edit</button>
          </div>
        </div>

        {/* Medicines for this member */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Medicines ({meds.length})</p>
            <button className="text-xs text-green-600 font-semibold">+ Add Medicine</button>
          </div>

          {meds.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              <p className="text-4xl mb-2">💊</p>
              <p className="text-gray-500 text-sm">No medicines added yet</p>
              <button className="mt-3 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl">Add Medicine</button>
            </div>
          ) : (
            <div className="space-y-2">
              {meds.map((med, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg">💊</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{med.name}</p>
                    <p className="text-xs text-gray-500">{med.dose} · {med.frequency}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${med.stock <= 7 ? 'text-red-500' : 'text-gray-500'}`}>
                      {med.stock} left
                    </p>
                    {med.stock <= 7 && <p className="text-[10px] text-red-400">Low stock!</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Medical history */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="font-semibold text-gray-800 font-display mb-3">Health Summary</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Blood Group</p>
              <p className="font-semibold text-gray-700">B+</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Allergies</p>
              <p className="font-semibold text-gray-700">None known</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 col-span-2">
              <p className="text-xs text-gray-400 mb-1">Conditions</p>
              <p className="font-semibold text-gray-700">{member.condition ?? 'None recorded'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add member modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6">
            <h3 className="font-bold text-gray-800 font-display text-lg mb-4">Add Family Member</h3>
            <div className="space-y-3">
              <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400" placeholder="Full Name" />
              <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400" placeholder="Age" type="number" />
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400 text-gray-600">
                <option>Relation</option>
                <option>Spouse</option>
                <option>Parent</option>
                <option>Child</option>
                <option>Sibling</option>
              </select>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm">Cancel</button>
                <button onClick={() => setShowAdd(false)} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700">Add Member</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
