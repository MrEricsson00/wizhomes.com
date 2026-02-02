
import React, { useState, useMemo } from 'react';
import { Icons, getRooms } from '../constants';
import RoomCard from '../components/RoomCard';
import { RoomStatus } from '../types';

const Rooms: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Recommended');
  const [showFilters, setShowFilters] = useState(false);

  const rooms = useMemo(() => getRooms(), []);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      if (filter === 'All' || filter === 'All Apartments') return true;
      if (filter === 'Available') return room.status === RoomStatus.AVAILABLE;
      if (filter === 'Luxe') return room.price > 300;
      return true;
    });
  }, [rooms, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900/50 transition-colors duration-300 animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Premium Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full">Curated Luxury</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-zinc-950 dark:text-white uppercase tracking-tighter leading-none">
                Iconic <span className="text-red-600">Residences</span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl">
                Explore our handpicked collection of architectural masterpieces. {filteredRooms.length} premium spaces available.
              </p>
            </div>
          </div>

          {/* Filter Controls with Premium Styling */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 px-6 py-3 pr-12 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 dark:text-white cursor-pointer transition-all"
              >
                <option>All Apartments</option>
                <option>Available</option>
                <option>Luxe</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className="relative">
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 px-6 py-3 pr-12 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 dark:text-white cursor-pointer transition-all"
              >
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 ${
                showFilters 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <Icons.Search />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters with Premium Design */}
        {showFilters && (
          <div className="mb-16 p-10 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-800/30 rounded-3xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm animate-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <h4 className="font-black uppercase text-zinc-950 dark:text-white tracking-widest text-xs">Price Range</h4>
                <input type="range" className="w-full accent-red-600 h-2" min="0" max="1000" />
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-black uppercase text-zinc-950 dark:text-white tracking-widest text-xs">Amenities</h4>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2 text-sm cursor-pointer hover:text-red-600 transition-colors">
                    <input type="checkbox" className="accent-red-600 w-4 h-4 rounded" />
                    <span className="font-medium">Wifi</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm cursor-pointer hover:text-red-600 transition-colors">
                    <input type="checkbox" className="accent-red-600 w-4 h-4 rounded" />
                    <span className="font-medium">Pool</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm cursor-pointer hover:text-red-600 transition-colors">
                    <input type="checkbox" className="accent-red-600 w-4 h-4 rounded" />
                    <span className="font-medium">Gym</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm cursor-pointer hover:text-red-600 transition-colors">
                    <input type="checkbox" className="accent-red-600 w-4 h-4 rounded" />
                    <span className="font-medium">Kitchen</span>
                  </label>
                </div>
              </div>
              <div className="flex items-end">
                <button onClick={() => setShowFilters(false)} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-black rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 uppercase text-xs tracking-widest">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Premium Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRooms.map((room, index) => (
            <div key={room.id} className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600/10 to-red-600/5 rounded-3xl flex items-center justify-center mx-auto mb-8 text-red-600 shadow-lg">
              <Icons.Search />
            </div>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">No Matching Properties</h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8 font-medium">
              Try adjusting your filters or search criteria to find your perfect luxury residence.
            </p>
            <button 
              onClick={() => setFilter('All')}
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-black rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 uppercase text-xs tracking-widest"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
