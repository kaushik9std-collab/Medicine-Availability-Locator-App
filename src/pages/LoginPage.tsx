interface Props { onLogin: () => void; }

export default function LoginPage({ onLogin }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        {/* Logo */}
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-4">
          <span className="text-green-600 text-3xl font-bold font-display">M+</span>
        </div>
        <h1 className="text-white font-bold text-3xl font-display mb-1">MediFind</h1>
        <p className="text-green-200 text-sm text-center">Your complete medicine companion</p>

        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=180&fit=crop&auto=format"
          alt="Healthcare"
          className="w-full max-w-xs rounded-2xl mt-8 opacity-80 object-cover"
          style={{ height: 160 }}
        />
      </div>

      <div className="bg-white rounded-t-3xl px-6 pt-8 pb-12">
        <h2 className="font-bold text-gray-800 font-display text-xl mb-1">Welcome!</h2>
        <p className="text-gray-400 text-sm mb-6">Sign in with your Aadhaar for secure access</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-3">
            <span className="text-xl">🪪</span>
            <input className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400" placeholder="Enter Aadhaar Number" maxLength={12} />
          </div>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-3">
            <span className="text-xl">📱</span>
            <input className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400" placeholder="Mobile Number" />
          </div>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-3">
            <span className="text-xl">🔢</span>
            <input className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400" placeholder="Enter OTP" maxLength={6} />
            <button className="text-green-600 text-xs font-semibold whitespace-nowrap">Get OTP</button>
          </div>
        </div>

        <button onClick={onLogin} className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl text-base hover:bg-green-700 active:scale-98 transition-all shadow-lg">
          Sign In Securely
        </button>

        <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
          By signing in you agree to our <span className="text-green-600">Terms of Service</span> and <span className="text-green-600">Privacy Policy</span>.<br/>Your Aadhaar data is never stored.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <button onClick={onLogin} className="w-full mt-4 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-2xl text-sm hover:border-green-300 transition-colors">
          🏥 Continue as Domain / Pharmacy
        </button>
      </div>
    </div>
  );
}
