'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/admin-login', { email, password });
      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'System error. Please try again or contact system administrator.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans selection:bg-indigo-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] bg-violet-600/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-6 border-b border-slate-800/50 text-center">
            <div className="flex justify-center mb-6">
               <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] border border-indigo-400/20">
                  <span className="text-white text-2xl font-black tracking-tighter">V</span>
               </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Vizhaa Admin Portal</h1>
            <p className="text-xs text-slate-400 leading-relaxed font-medium uppercase tracking-widest">
              Secure Control Gateway
            </p>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-3">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <p className="text-red-400 text-sm font-medium leading-snug">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Administrator Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm placeholder:text-slate-600 font-medium"
                    placeholder="admin@vizhaa.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2 items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Access Key
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔑</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm placeholder:text-slate-600 font-medium tracking-widest"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 pb-2">
                 <input type="checkbox" id="remember" className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500" />
                 <label htmlFor="remember" className="text-sm font-medium text-slate-400">Remember this device</label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-400/20"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     <span>Authenticating...</span>
                  </div>
                ) : (
                  <span>Secure Login</span>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-slate-950/50 p-4 border-t border-slate-800/50 flex justify-center items-center space-x-2 text-xs text-slate-500 font-medium">
             <span>🛡️</span>
             <span>Authorized Personnel Only. Actions are logged.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
