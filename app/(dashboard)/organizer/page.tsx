'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VizhaaMark } from '@/lib/brand';

export default function OrganizerDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800">
           <div className="flex items-center space-x-3">
              <VizhaaMark height={32} />
              <span className="text-xl font-bold text-slate-900 dark:text-white">Vizhaa</span>
           </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon="🏠" label="Overview" active />
          <NavItem icon="➕" label="Post New Event" />
          <NavItem icon="📋" label="My Events" />
          <NavItem icon="👷" label="Staffing Status" />
          <NavItem icon="🧾" label="Invoices" />
          <NavItem icon="⚙️" label="Profile" />
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
           <button 
             onClick={() => {
               localStorage.clear();
               router.push('/login');
             }}
             className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
           >
             <span>🚪</span>
             <span>Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Welcome, {user.name}</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all">
            + Post Event
          </button>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Quick Action / Highlight */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-2xl font-bold mb-2">Need staff for an upcoming event?</h2>
               <p className="text-indigo-100 mb-6 max-w-md">Our smart enrollment system ensures you get verified, reliable catering workers in minutes.</p>
               <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all">
                 Create Event Request
               </button>
             </div>
             {/* Decorative element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          </div>

          {/* Active Bookings Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard label="Live Events" value="2" icon="🚀" color="bg-blue-500" />
            <StatCard label="Workers Hired" value="48" icon="👷" color="bg-emerald-500" />
            <StatCard label="Next Event" value="In 2 Days" icon="⏰" color="bg-amber-500" />
          </div>

          {/* Current Event Fulfillment */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Staffing Fulfillment</h2>
            <div className="space-y-6">
              <FulfillmentItem name="Wedding Reception - Le Meridien" filled={18} total={20} status="Almost Filled" />
              <FulfillmentItem name="Corporate Gala Dinner" filled={5} total={15} status="Fulfilling..." />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <a href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800'}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-xl mb-4 text-white`}>
        {icon}
      </div>
      <h3 className="text-slate-500 dark:text-zinc-400 text-sm font-semibold">{label}</h3>
      <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}

function FulfillmentItem({ name, filled, total, status }: any) {
  const percentage = (filled / total) * 100;
  return (
    <div className="p-4 border border-slate-100 dark:border-zinc-800 rounded-2xl">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400">{status}</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-indigo-600">{filled}/{total}</span>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Workers</p>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
