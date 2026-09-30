import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-slate-900 dark:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">VIZHAA</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-semibold text-sm">
          <a href="#" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">For Organizers</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">For Workers</a>
          <Link href="/login" className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all">
            Sign In
          </Link>
          <Link href="/register" className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all">
            Join Vizhaa
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold border border-indigo-100 dark:border-indigo-900/50">
             <span>✨</span>
             <span>The Smart Event Workforce Platform</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            Never worry about <span className="text-indigo-600">event staffing</span> again.
          </h1>
          <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-lg leading-relaxed">
            Vizhaa connects event organizers with verified, reliable catering workers. Real-time enrollment, automatic penalties for no-shows, and zero staffing failures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/register" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all text-center">
              Get Started Now
            </Link>
            <Link href="/login" className="px-10 py-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all text-center">
              Organizer Login
            </Link>
          </div>
          
          <div className="pt-8 flex items-center space-x-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-zinc-950 bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                  </div>
                ))}
             </div>
             <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
               Trusted by <span className="text-slate-900 dark:text-white font-bold">500+</span> event managers
             </p>
          </div>
        </div>

        <div className="relative">
           {/* Mockup / Image Placeholder */}
           <div className="relative z-10 bg-gradient-to-tr from-indigo-100 to-indigo-50 dark:from-indigo-900/20 dark:to-zinc-900 rounded-[3rem] p-4 shadow-2xl border border-indigo-200/50 dark:border-indigo-900/30">
              <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-inner">
                 <img 
                   src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" 
                   alt="Event Management" 
                   className="w-full h-[500px] object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                 />
              </div>
           </div>
           {/* Decorative blobs */}
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl"></div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-zinc-900 py-12 text-center text-slate-400 text-sm">
        <p>&copy; 2024 Vizhaa. All rights reserved.</p>
      </footer>
    </div>
  );
}
