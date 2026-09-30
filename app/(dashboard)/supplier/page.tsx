'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SupplierDashboard() {
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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-white dark:bg-zinc-900 p-4 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
         <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
               <span className="text-white text-xs font-bold">V</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">Vizhaa Worker</span>
         </div>
         <div className="w-8 h-8 bg-slate-200 dark:bg-zinc-800 rounded-full"></div>
      </header>

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800">
           <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                 <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Vizhaa</span>
           </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon="🏠" label="My Feed" active />
          <NavItem icon="📅" label="Upcoming Events" />
          <NavItem icon="💳" label="Wallet & Earnings" />
          <NavItem icon="🛡️" label="KYC Documents" />
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
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* Wallet Preview Card */}
          <div className="bg-zinc-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10 flex justify-between items-center">
                <div>
                   <p className="text-zinc-400 text-sm font-medium mb-1">Available Balance</p>
                   <h2 className="text-4xl font-bold">₹2,450.00</h2>
                </div>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl font-bold transition-all border border-white/10">
                  Withdraw
                </button>
             </div>
             <div className="mt-8 flex space-x-8 relative z-10">
                <div>
                   <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Total Earned</p>
                   <p className="text-lg font-bold">₹15,200</p>
                </div>
                <div>
                   <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Events Done</p>
                   <p className="text-lg font-bold">24</p>
                </div>
             </div>
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
          </div>

          {/* Available Jobs Feed */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Events Near You</h2>
              <button className="text-indigo-600 font-bold text-sm">Filter</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <JobCard title="Catering Assistant" event="Grand Wedding Reception" location="T. Nagar, Chennai" date="Tomorrow, 06:00 PM" pay="₹800" roles="5 slots left" />
              <JobCard title="Serving Staff" event="Corporate Meetup" location="OMR, Chennai" date="May 15, 10:00 AM" pay="₹1,200" roles="2 slots left" />
              <JobCard title="Kitchen Helper" event="Birthday Party" location="Adyar, Chennai" date="May 16, 04:00 PM" pay="₹600" roles="8 slots left" />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 flex justify-around p-3 pb-6 z-50">
         <MobileNavItem icon="🏠" active />
         <MobileNavItem icon="📅" />
         <MobileNavItem icon="💳" />
         <MobileNavItem icon="⚙️" />
      </nav>
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

function MobileNavItem({ icon, active = false }: any) {
  return (
    <button className={`w-12 h-12 flex items-center justify-center rounded-2xl text-xl ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' : 'text-slate-400'}`}>
       {icon}
    </button>
  );
}

function JobCard({ title, event, location, date, pay, roles }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all cursor-pointer group">
       <div className="flex justify-between items-start mb-4">
          <div>
             <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{title}</h3>
             <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">{event}</p>
          </div>
          <span className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-xl font-bold text-sm">
             {pay}
          </span>
       </div>
       <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-slate-600 dark:text-zinc-400">
             <span className="mr-2">📍</span> {location}
          </div>
          <div className="flex items-center text-sm text-slate-600 dark:text-zinc-400">
             <span className="mr-2">⏰</span> {date}
          </div>
          <div className="flex items-center text-sm font-bold text-emerald-600">
             <span className="mr-2">🔥</span> {roles}
          </div>
       </div>
       <button className="w-full py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-zinc-300 rounded-2xl font-bold transition-all">
          View Details
       </button>
    </div>
  );
}
