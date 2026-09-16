import type { CartItem, Page } from '../types';

interface Props {
  onBack: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNav: (p: Page) => void;
}

export default function CartPage({ onBack, cart, onUpdateQty, onRemove, onNav }: Props) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.cartQty, 0);
  const discount = Math.floor(subtotal * 0.05);
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="font-bold text-gray-800 font-display text-lg">Cart</h1>
        <span className="text-xs text-gray-400 ml-1">{cart.length} items</span>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <p className="text-6xl mb-4">🛒</p>
          <h3 className="font-bold text-gray-700 font-display text-xl mb-1">Cart is empty</h3>
          <p className="text-gray-400 text-sm text-center mb-5">Search for medicines and add them to your cart</p>
          <button onClick={() => onNav('search')} className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
            Search Medicines
          </button>
        </div>
      ) : (
        <>
          <div className="px-4 mt-4 space-y-3">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💊</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.generic}</p>
                        {item.prescribed && <span className="inline-block mt-1 bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-medium">Rx Required</span>}
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-400 text-xl leading-none flex-shrink-0">×</button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-green-700 font-bold text-sm">₹{item.price * item.cartQty}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 bg-gray-100 rounded-full text-gray-600 font-bold text-lg flex items-center justify-center hover:bg-gray-200 transition-colors leading-none">-</button>
                        <span className="text-sm font-semibold text-gray-800 w-5 text-center">{item.cartQty}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 bg-green-100 rounded-full text-green-700 font-bold text-lg flex items-center justify-center hover:bg-green-200 transition-colors leading-none">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Price summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2">
              <p className="font-semibold text-gray-800 font-display mb-3">Price Summary</p>
              <div className="flex justify-between text-sm text-gray-600"><span>Subtotal ({cart.length} items)</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-sm text-green-600"><span>Discount (5%)</span><span>-₹{discount}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Delivery</span><span className="text-green-600">Free</span></div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800">
                <span>Total</span><span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Checkout button */}
          <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bg-white border-t border-gray-100 z-30">
            <button onClick={() => onNav('orders')} className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl text-base hover:bg-green-700 active:scale-98 transition-all shadow-lg">
              Proceed to Pay · ₹{total}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
