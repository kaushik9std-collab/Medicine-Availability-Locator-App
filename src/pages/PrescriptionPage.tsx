import { useState, useRef } from 'react';

interface Props { onBack: () => void; }

const prescriptions = [
  { id: '1', doctor: 'Dr. Ramesh Sharma', hospital: 'Apollo Hospital, Bengaluru', date: '22 Jul 2026', medicines: ['Amlodipine 5mg', 'Aspirin 75mg'], valid: true, image: '📋' },
  { id: '2', doctor: 'Dr. Priya Menon', hospital: 'Manipal Hospital, Bengaluru', date: '10 Jun 2026', medicines: ['Metformin 500mg', 'Glimepiride 2mg'], valid: true, image: '📋' },
  { id: '3', doctor: 'Dr. Anil Gupta', hospital: 'Fortis Hospital, Bengaluru', date: '15 Jan 2026', medicines: ['Cetirizine 10mg'], valid: false, image: '📋' },
];

export default function PrescriptionPage({ onBack }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="font-bold text-gray-800 font-display text-lg">Prescription Vault</h1>
        <button onClick={() => fileRef.current?.click()} className="ml-auto bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl">+ Upload</button>
        <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" />
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Upload area */}
        <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-green-200 rounded-2xl p-6 text-center hover:border-green-400 hover:bg-green-50 transition-colors">
          <p className="text-3xl mb-2">📁</p>
          <p className="text-sm font-semibold text-green-700 font-display">Upload Prescription</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF · Max 10 MB</p>
        </button>

        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Saved Prescriptions ({prescriptions.length})</p>

        <div className="space-y-3">
          {prescriptions.map(rx => (
            <div key={rx.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${expanded === rx.id ? 'border-green-200' : 'border-gray-100'}`}>
              <button className="w-full p-4 text-left" onClick={() => setExpanded(expanded === rx.id ? null : rx.id)}>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${rx.valid ? 'bg-green-50' : 'bg-gray-50'}`}>
                    📋
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-800 text-sm">{rx.doctor}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${rx.valid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {rx.valid ? 'Valid' : 'Expired'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{rx.hospital}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📅 {rx.date}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" className={`transition-transform flex-shrink-0 ${expanded === rx.id ? 'rotate-180' : ''}`}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </button>

              {expanded === rx.id && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-3 mb-2">Medicines Prescribed</p>
                  <div className="space-y-1">
                    {rx.medicines.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 border border-gray-200 text-gray-600 text-xs font-semibold py-2 rounded-xl hover:bg-gray-50">Download</button>
                    <button className="flex-1 border border-gray-200 text-gray-600 text-xs font-semibold py-2 rounded-xl hover:bg-gray-50">Share</button>
                    {rx.valid && (
                      <button className="flex-1 bg-green-600 text-white text-xs font-semibold py-2 rounded-xl hover:bg-green-700">Order</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
