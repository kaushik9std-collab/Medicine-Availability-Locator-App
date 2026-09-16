import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const BOT_REPLIES: Record<string, string> = {
  default: "I'm MediBot, your 24/7 health assistant! Ask me about medicines, nearby pharmacies, or your prescriptions.",
  paracetamol: "Paracetamol (Acetaminophen) is used to relieve pain and reduce fever. Standard adult dose: 500mg–1g every 4–6 hours. Do not exceed 4g/day. ⚠️ Consult a doctor before use if you have liver issues.",
  pharmacy: "I found 3 pharmacies near you with your medicine in stock. Apollo Pharmacy (0.3 km) has the best rating! Tap Search to see the map.",
  reminder: "Your next reminder is Amlodipine 5mg at 8:00 AM tomorrow. Your Metformin stock is running low — only 5 tablets left! Would you like to reorder?",
  prescription: "You have 3 prescriptions in your vault. Your most recent one from Dr. Sharma (dated 22 Jul 2026) includes Amlodipine 5mg and Metformin 500mg.",
  order: "You have 2 active orders. ORD-2024-001 is out for delivery and should arrive by 6 PM today!",
  wallet: "Your wallet balance is ₹250.00. You earned ₹42 cashback from your last order. Add money via PhonePe, GPay, or Paytm.",
};

function getBotReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('paracetamol') || m.includes('medicine') || m.includes('tablet')) return BOT_REPLIES.paracetamol;
  if (m.includes('pharmacy') || m.includes('shop') || m.includes('store')) return BOT_REPLIES.pharmacy;
  if (m.includes('reminder') || m.includes('stock') || m.includes('refill')) return BOT_REPLIES.reminder;
  if (m.includes('prescription') || m.includes('doctor')) return BOT_REPLIES.prescription;
  if (m.includes('order') || m.includes('delivery')) return BOT_REPLIES.order;
  if (m.includes('wallet') || m.includes('balance') || m.includes('money')) return BOT_REPLIES.wallet;
  return BOT_REPLIES.default;
}

export default function AIBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm MediBot 🤖 Your personal health assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: getBotReply(userMsg) }]);
    }, 700);
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-80 flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-green-100 bg-white">
          <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">M</div>
              <div>
                <p className="text-white font-semibold text-sm font-display">MediBot</p>
                <p className="text-green-100 text-xs">Online · 24/7</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-xl leading-none">×</button>
          </div>
          <div className="flex-1 overflow-y-auto hide-scroll p-3 space-y-2 bg-gray-50 max-h-72">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="p-2 bg-white border-t border-gray-100 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about medicines..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-green-400 bg-gray-50"
            />
            <button onClick={send} className="bg-green-600 text-white px-3 py-2 rounded-xl text-sm hover:bg-green-700 active:scale-95 transition-all">
              ↑
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-20 right-4 z-50 w-13 h-13 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 active:scale-95 transition-all"
        style={{ width: 52, height: 52 }}
      >
        {open ? (
          <span className="text-xl">×</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.02 2 11c0 2.74 1.27 5.2 3.28 6.87L4 22l4.46-1.49A10.08 10.08 0 0012 21c5.52 0 10-4.02 10-9S17.52 2 12 2z" fill="currentColor"/>
            <path d="M8 10h8M8 13h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </>
  );
}
