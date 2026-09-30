'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/lib/api-client';

export default function LoginPage() {
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
      const response = await apiClient.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      const role = user?.role || 'ORGANIZER'; // Fallback for now
      if (role === 'ADMIN') router.push('/admin');
      else if (role === 'SUPPLIER') router.push('/supplier');
      else router.push('/organizer');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-zinc-800">
          <div className="p-8 sm:p-12">
            <div className="flex justify-center mb-8">
               <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
                  <span className="text-white text-3xl font-bold">V</span>
               </div>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">Welcome Back</h2>
            <p className="text-slate-500 dark:text-zinc-400 text-center mb-8">Sign in to manage your events and workforce</p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Password</label>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-zinc-800 text-center">
              <p className="text-slate-500 dark:text-zinc-400">
                Don't have an account?{' '}
                <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-500">
                  Join Vizhaa
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
