'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { initials } from '@/lib/admin-ui';

type AdminUser = { id: string; name?: string; email?: string; role: string };

const subscribeStorage = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
};

const NAV = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    href: '/admin/events',
    label: 'Events',
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
  },
  {
    href: '/admin/organizers',
    label: 'Organizers',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    href: '/admin/suppliers',
    label: 'Suppliers',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';
  const [menuOpen, setMenuOpen] = useState(false);

  // undefined during server render / hydration, then the stored JSON (or null)
  const storedUser = useSyncExternalStore(subscribeStorage, () => localStorage.getItem('user'), () => undefined);
  const parsedUser = useMemo(() => {
    try {
      return storedUser ? (JSON.parse(storedUser) as AdminUser) : null;
    } catch {
      return null;
    }
  }, [storedUser]);
  const user = parsedUser?.role === 'ADMIN' ? parsedUser : null;

  useEffect(() => {
    if (isLogin || storedUser === undefined) return;
    if (!parsedUser || !localStorage.getItem('accessToken')) router.replace('/admin/login');
    else if (parsedUser.role !== 'ADMIN') router.replace('/admin/login?error=unauthorized');
  }, [isLogin, storedUser, parsedUser, router]);

  if (isLogin) return <>{children}</>;

  if (!user) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-400">Loading…</div>;
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    await apiClient.post('/auth/logout', { refreshToken }).catch(() => {});
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.replace('/admin/login');
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-200">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <span className="text-white text-sm font-bold">V</span>
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-slate-900">Vizhaa</p>
          <p className="text-xs text-slate-500">Admin</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-semibold">
            {initials(user.name || user.email)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">{user.name || 'Admin'}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-rose-600 transition"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-60 md:flex-col bg-white border-r border-slate-200">{sidebar}</aside>

      {/* Mobile sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-slate-900/30" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">{sidebar}</aside>
        </div>
      )}

      <div className="md:pl-60">
        <header className="md:hidden sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4">
          <button onClick={() => setMenuOpen(true)} className="-ml-1 p-1.5 text-slate-600" aria-label="Open menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-sm font-semibold">Vizhaa Admin</span>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
