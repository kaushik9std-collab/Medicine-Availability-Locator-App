import { useState } from 'react';
import { orders } from '../data';
import type { CartItem } from '../types';

interface Props {
  onBack: () => void;
  cart: CartItem[];
  onClearCart: () => void;
  isHistory?: boolean;
}

const paymentMethods = [
  { id: 'phonepe', label: 'PhonePe', icon: '📱' },
  { id: 'gpay', label: 'Google Pay', icon: '🟢' },
  { id: 'paytm', label: 'Paytm', icon: '💙' },
  { id: 'wallet', label: 'MediWallet (₹250)', icon: '👜' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

export default function OrdersPage({ onBack, cart, onClearCart, isHistory }: Props) {
  const [checkout, setCheckout] = useState(false);
  const [age, setAge] = useState('');
  const [payMethod, setPayMethod] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.cartQty, 0);
  const discount = Math.floor(total * 0.05);
  const displayOrders = isHistory
    ? orders.filter(o => o.status !== 'active')
    : orders.filter(o => o.status === 'active');

  function placeOrder() {
    if (!age || !payMethod) return;
    setConfirmed(true);
    onClearCart();
    setTimeout(() => setCheckout(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <h1 className="font-bold text-gray-800 font-display text-lg">{isHistory ? 'Order History' : 'My Orders'}</h1>
      </div>

      {/* Place new order from cart */}
      {!isHistory && cart.length > 0 && (
        <div className="mx-4 mt-4 bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="font-semibold text-green-800 font-display text-sm mb-2">Ready to Order ({cart.length} items)</p>
          <div className="space-y-1 mb-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs text-gray-600">
                <span>{item.name} × {item.cartQty}</span>
                <span className="font-medium">₹{item.price * item.cartQty}</span>
              </div>
            ))}
            {discount > 0 && <div className="flex items-center justify-between text-xs text-green-600"><span>Discount (5%)</span><span>-₹{discount}</span></div>}
            <div className="flex items-center justify-between text-sm font-bold text-gray-800 border-t border-green-100 pt-1 mt-1">
              <span>Total</span><span>₹{total - discount}</span>
            </div>
          </div>
          <button onClick={() => { setCheckout(true); setConfirmed(false); }} className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-green-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      )}

      <div className="px-4 mt-4 space-y-3">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{isHistory ? 'Completed Orders' : 'Active Orders'}</p>
        {displayOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">📦</p>
            <p className="text-gray-500 text-sm">No orders found</p>
          </div>
        )}
        {displayOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm font-display">{order.id}</p>
                  <p className="text-xs text-gray-400">{order.date} · {order.pharmacy}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  order.status === 'active' ? 'bg-blue-50 text-blue-600' :
                  order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                  'bg-red-50 text-red-500'
                }`}>
                  {order.status === 'active' ? '🚚 Active' : order.status === 'delivered' ? '✓ Delivered' : '✗ Cancelled'}
                </span>
              </div>
              <div className="space-y-0.5">
                {order.items.map((item, i) => (
                  <p key={i} className="text-xs text-gray-500">• {item}</p>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                <span className="text-sm font-bold text-gray-800">₹{order.total}</span>
                {order.status === 'delivered' && (
                  <button className="text-xs text-green-600 font-semibold px-3 py-1.5 border border-green-200 rounded-xl hover:bg-green-50">Rate & Review</button>
                )}
                {order.status === 'active' && (
                  <button className="text-xs text-blue-600 font-semibold px-3 py-1.5 border border-blue-200 rounded-xl hover:bg-blue-50">Track Order</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {checkout && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6 max-h-[85vh] overflow-y-auto hide-scroll">
            {confirmed ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
                <h3 className="font-bold text-green-700 font-display text-xl">Order Placed!</h3>
                <p className="text-gray-500 text-sm mt-1">Your order has been confirmed. Estimated delivery in 2–4 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-gray-800 font-display text-lg mb-4">Checkout</h3>

                <div className="mb-4">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Age Verification</p>
                  <input
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400"
                    placeholder="Enter your age"
                    type="number"
                    min="18"
                  />
                  {parseInt(age) < 18 && age.length > 0 && <p className="text-xs text-red-500 mt-1">⚠ You must be 18+ to order prescription medicines.</p>}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Payment Method</p>
                  <div className="space-y-2">
                    {paymentMethods.map(pm => (
                      <button key={pm.id} onClick={() => setPayMethod(pm.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${payMethod === pm.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <span className="text-xl">{pm.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{pm.label}</span>
                        {payMethod === pm.id && <span className="ml-auto text-green-600">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setCheckout(false)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm">Cancel</button>
                  <button
                    onClick={placeOrder}
                    disabled={!age || !payMethod || parseInt(age) < 18}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-green-700 transition-colors"
                  >
                    Pay ₹{total - discount}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
