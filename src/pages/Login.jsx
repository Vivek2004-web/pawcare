import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PawPrint, Lock, Mail, ArrowRight, AlertCircle, KeyRound, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('Demo@1234');
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-stone-100 shadow-soft">
        
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white mx-auto shadow-md shadow-orange-500/20">
            <PawPrint className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Welcome to PawCare
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Sign in to manage your adoption applications and pet listings.
          </p>
        </div>

        {/* Demo Fast Login Helpers */}
        <div className="bg-cream-50/80 rounded-2xl p-4 border border-amber-200/60 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Instant Demo Accounts (Click to Fill)</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleFillDemo('admin@pawcare.com', 'admin')}
              className="py-2 px-3 rounded-xl bg-white border border-stone-200 hover:border-orange-500 font-semibold text-stone-700 hover:text-orange-600 transition-colors text-left"
            >
              <span className="block text-[10px] text-orange-600 font-bold">ADMIN ROLE</span>
              admin@pawcare.com
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('adopter@pawcare.com', 'adopter')}
              className="py-2 px-3 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 font-semibold text-stone-700 hover:text-emerald-600 transition-colors text-left"
            >
              <span className="block text-[10px] text-emerald-600 font-bold">ADOPTER ROLE</span>
              adopter@pawcare.com
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-stone-700">
                Password
              </label>
              <span className="text-[11px] text-stone-400">Min. 6 characters</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full py-3.5 font-bold shadow-md shadow-orange-500/20"
          >
            <span>Sign In to PawCare</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-stone-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-orange-600 hover:text-orange-700 underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}

