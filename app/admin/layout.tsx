'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.replace('/admin/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'ADMIN') {
      router.replace('/admin/login?error=unauthorized');
      return;
    }
    
    setUser(parsedUser);
    setIsAuthorized(true);
  }, [pathname, router]);

  if (!isAuthorized) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  }

  // If it's the login page, just render the content without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar - Strictly for Admin */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col text-slate-300">
        <div className="p-6 border-b border-slate-800">
           <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                 <span className="text-white font-bold">V</span>
              </div>
              <div>
                <h2 className="text-sm font-black text-white tracking-wider uppercase">Vizhaa</h2>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Admin Control</p>
              </div>
           </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-3">Overview</div>
          <NavItem href="/admin/dashboard" icon="🧭" label="Dashboard" active={pathname === '/admin/dashboard'} />
          <NavItem href="/admin/reports" icon="📊" label="Reports & Analytics" active={pathname === '/admin/reports'} />
          
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-3">Operations</div>
          <NavItem href="/admin/events" icon="📅" label="Event Management" active={pathname === '/admin/events'} />
          <NavItem href="/admin/workers" icon="👷" label="Workforce Management" active={pathname === '/admin/workers'} />
          <NavItem href="/admin/kyc" icon="🛡️" label="KYC Approvals" active={pathname === '/admin/kyc'} />
          
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-3">Finance</div>
          <NavItem href="/admin/wallet" icon="💰" label="Wallet & Payments" active={pathname === '/admin/wallet'} />
          
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-3">System</div>
          <NavItem href="/admin/attendance" icon="🚨" label="Issues & Attendance" active={pathname === '/admin/attendance'} />
          <NavItem href="/admin/settings" icon="⚙️" label="System Settings" active={pathname === '/admin/settings'} />
        </nav>
        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center justify-between px-3 py-2 mb-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                 <span className="text-xs font-medium text-slate-300">System Online</span>
              </div>
           </div>
           <button 
             onClick={() => {
               localStorage.clear();
               router.push('/admin/login');
             }}
             className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-400 font-semibold hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
           >
             <span>🚪</span>
             <span>Secure Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
             <span className="text-slate-400">/</span>
             <h1 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
               {pathname.split('/').pop() || 'Dashboard'}
             </h1>
          </div>
          <div className="flex items-center space-x-6">
             <button className="text-slate-400 hover:text-white transition-colors relative">
                <span>🔔</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-6">
                <div className="text-right">
                   <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                   <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Authorized</p>
                </div>
                <div className="w-9 h-9 bg-slate-800 rounded flex items-center justify-center text-white font-bold border border-slate-700">
                  {user?.name?.charAt(0)}
                </div>
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, href = "#" }: any) {
  return (
    <a href={href} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.05)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'}`}>
      <span className="text-base opacity-80">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
