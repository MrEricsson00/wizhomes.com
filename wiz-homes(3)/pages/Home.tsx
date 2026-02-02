
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons, getRooms } from '../constants';
import RoomCard from '../components/RoomCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const rooms = useMemo(() => getRooms(), []);
  const featuredRooms = rooms.slice(0, 4);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=2084" 
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
            alt="WIZ HOMES Luxury Building"
          />
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-zinc-950/80"></div>
          {/* Animated accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block px-5 py-2 mb-10 bg-red-600/20 border border-red-500/40 rounded-full backdrop-blur-sm hover:bg-red-600/30 transition-all">
            <span className="text-red-400 font-black uppercase tracking-[0.3em] text-[10px]">✨ Architectural Excellence</span>
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tighter drop-shadow-2xl">
            Your Premium <br/>
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">Home</span> Away.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-200 mb-14 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Experience unparalleled luxury living in our curated collection of architectural masterpieces. 
            Designed for the discerning, built for eternity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/rooms" 
              className="group relative w-full sm:w-auto px-14 py-7 bg-gradient-to-r from-red-600 to-red-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all hover:from-red-700 hover:to-red-800 active:scale-95 shadow-2xl shadow-red-600/50 hover:shadow-red-600/70"
            >
              <span className="relative z-10">Explore Inventory</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-14 py-7 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all hover:bg-white hover:text-zinc-950 hover:border-white active:scale-95 shadow-xl"
            >
              Reserve A Stay
            </Link>
          </div>

          {/* Auth Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <span className="text-white/70 font-medium">New here?</span>
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-white text-red-600 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-100 transition-all shadow-lg"
            >
              Sign Up
            </Link>
            <span className="text-white/50">or</span>
            <Link 
              to="/login" 
              className="px-8 py-3 bg-white/20 border border-white/40 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white/30 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40 group-hover:opacity-60 transition-opacity">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full">Premium Collection</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-zinc-950 dark:text-white uppercase tracking-tighter leading-none">
              Iconic <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Residences</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-lg">
              Our apartments are meticulously hand-selected for their architectural significance and uncompromising standards of luxury.
            </p>
          </div>
          <Link to="/rooms" className="group text-zinc-950 dark:text-white font-black uppercase tracking-widest text-[11px] border-b-2 border-red-600 pb-3 hover:text-red-600 dark:hover:text-red-500 transition-all duration-300 whitespace-nowrap">
            View All Units <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredRooms.map((room, index) => (
            <div key={room.id} className="animate-in fade-in duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </section>

      {/* Why WIZ HOMES Section */}
      <section className="bg-zinc-950 dark:bg-black py-40 border-t border-zinc-900 transition-colors duration-300 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">Why <span className="text-red-600">WIZ HOMES</span>?</h2>
            <p className="text-zinc-500 max-w-3xl mx-auto font-medium text-lg">We redefine modern habitation through a perfect synthesis of architectural brilliance and bespoke service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="p-12 bg-zinc-900/40 rounded-[3rem] border border-zinc-800 hover:border-red-600/40 transition-all group hover:-translate-y-2">
              <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-10 text-white transform group-hover:rotate-12 transition-transform shadow-2xl shadow-red-600/30">
                <Icons.Home />
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Curated Design</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">Each property in our portfolio undergoes a rigorous vetting process to ensure it meets our standards of luxury and design.</p>
            </div>
            <div className="p-12 bg-zinc-900/40 rounded-[3rem] border border-zinc-800 hover:border-red-600/40 transition-all group hover:-translate-y-2">
              <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-10 text-white transform group-hover:rotate-12 transition-transform shadow-2xl shadow-red-600/30">
                <Icons.Check />
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Smart Living</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">Experience true modern living with our integrated smart-home technologies, from automated entry to climate control.</p>
            </div>
            <div className="p-12 bg-zinc-900/40 rounded-[3rem] border border-zinc-800 hover:border-red-600/40 transition-all group hover:-translate-y-2">
              <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-10 text-white transform group-hover:rotate-12 transition-transform shadow-2xl shadow-red-600/30">
                <Icons.Star />
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Concierge Elite</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">Our world-class support team provides 24/7 dedicated service, managing everything from travel to private bookings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
