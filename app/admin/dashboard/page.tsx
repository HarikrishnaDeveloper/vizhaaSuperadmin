'use client';

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Events" 
          value="1,248" 
          trend="+12% from last month" 
          icon="📅" 
          color="indigo" 
        />
        <StatCard 
          label="Active Workers" 
          value="8,492" 
          trend="+5% from last month" 
          icon="👷" 
          color="emerald" 
        />
        <StatCard 
          label="Total Revenue" 
          value="₹42.5L" 
          trend="+18% from last month" 
          icon="💰" 
          color="violet" 
        />
        <StatCard 
          label="Pending KYCs" 
          value="142" 
          trend="Requires action" 
          icon="🛡️" 
          color="amber" 
          alert
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart / Graph Area Placeholder */}
         <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-900 dark:text-white">Revenue & Events Overview</h3>
               <select className="bg-slate-100 dark:bg-slate-800 border-none text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 py-1.5 px-3 outline-none">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
               </select>
            </div>
            <div className="h-64 w-full flex items-end justify-between px-2 gap-2">
               {/* Mock bars */}
               {[40, 60, 30, 80, 50, 90, 70, 85, 45, 65, 55, 75].map((h, i) => (
                 <div key={i} className="w-full bg-indigo-100 dark:bg-indigo-900/20 rounded-t-sm relative group cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-all" style={{ height: `${h}%` }}>
                    <div className="absolute top-0 left-0 w-full bg-indigo-500 rounded-t-sm transition-all" style={{ height: `${h/2}%` }}></div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-medium text-slate-400">
               <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
         </div>

         {/* Alerts & Notifications */}
         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">System Alerts</h3>
            <div className="space-y-4 flex-1 overflow-y-auto">
               <AlertCard icon="🚨" title="No-show Reported" time="10 mins ago" desc="3 workers failed to check-in for 'Royal Wedding' event." type="danger" />
               <AlertCard icon="🛡️" title="KYC Backlog" time="1 hour ago" desc="More than 50 KYC applications pending approval." type="warning" />
               <AlertCard icon="💰" title="Large Payout" time="3 hours ago" desc="Payout of ₹50,000 processed for 'Elite Events'." type="info" />
               <AlertCard icon="✅" title="Backup Assigned" time="5 hours ago" desc="System auto-assigned 2 backups for 'Tech Meetup'." type="success" />
            </div>
            <button className="w-full mt-4 py-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors">
               View All Alerts &rarr;
            </button>
         </div>
      </div>

      {/* Recent Event Requests Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white">Recent Event Approvals</h3>
          <button className="text-indigo-500 font-bold text-sm hover:underline">View All Events</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Organizer</th>
                <th className="px-6 py-4">Required Staff</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <EventRow name="Grand Corporate Gala" id="#EVT-829" organizer="Innovate Tech" staff="45" value="₹45,000" status="PENDING" />
              <EventRow name="Summer Music Festival" id="#EVT-830" organizer="Vibe Events" staff="120" value="₹1,20,000" status="APPROVED" />
              <EventRow name="Private Birthday Bash" id="#EVT-831" organizer="Rahul Kumar" staff="8" value="₹8,000" status="PENDING" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon, color, alert }: any) {
  const colorMap: any = {
    indigo: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    violet: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  };

  return (
    <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border ${alert ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-slate-200 dark:border-slate-800'} shadow-sm relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${colorMap[color]}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${alert ? 'bg-amber-500/10 text-amber-500' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
          {trend}
        </span>
      </div>
      <div className="relative z-10">
         <h4 className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">{label}</h4>
         <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
      </div>
      {/* Soft background glow */}
      <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${color === 'indigo' ? 'bg-indigo-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'violet' ? 'bg-violet-500' : 'bg-amber-500'}`}></div>
    </div>
  );
}

function AlertCard({ icon, title, desc, time, type }: any) {
   const bgMap: any = {
      danger: 'bg-red-500/5 border-red-500/10',
      warning: 'bg-amber-500/5 border-amber-500/10',
      info: 'bg-blue-500/5 border-blue-500/10',
      success: 'bg-emerald-500/5 border-emerald-500/10',
   };
   
   return (
      <div className={`p-4 rounded-xl border ${bgMap[type]} flex items-start space-x-3`}>
         <div className="text-lg mt-0.5">{icon}</div>
         <div>
            <div className="flex justify-between items-center mb-1">
               <h5 className="font-bold text-sm text-slate-900 dark:text-white">{title}</h5>
               <span className="text-[10px] font-medium text-slate-400">{time}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
         </div>
      </div>
   );
}

function EventRow({ name, id, organizer, staff, value, status }: any) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
         <p className="font-bold text-slate-900 dark:text-white">{name}</p>
         <p className="text-xs text-slate-500 dark:text-slate-400">{id}</p>
      </td>
      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">{organizer}</td>
      <td className="px-6 py-4">
         <span className="font-bold text-slate-900 dark:text-white">{staff}</span>
         <span className="text-xs text-slate-500 ml-1">workers</span>
      </td>
      <td className="px-6 py-4 font-bold text-indigo-500">{value}</td>
      <td className="px-6 py-4">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="px-4 py-2 text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-lg transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400">
           Review
        </button>
      </td>
    </tr>
  );
}
