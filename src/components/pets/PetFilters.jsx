import React from 'react';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';
import { usePets } from '../../context/PetContext';

export default function PetFilters() {
  const { filters, setFilters, resetFilters } = usePets();

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const speciesOptions = [
    { id: 'all', label: 'All Pets', emoji: '🐾' },
    { id: 'dog', label: 'Dogs', emoji: '🐕' },
    { id: 'cat', label: 'Cats', emoji: '🐈' },
    { id: 'other', label: 'Other', emoji: '🐇' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-soft space-y-6">
      
      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
          placeholder="Search by pet name, breed, location..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-cream-50/60 border border-stone-200 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-sm text-stone-800 placeholder:text-stone-400"
        />
        {filters.search && (
          <button
            onClick={() => handleInputChange('search', '')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-600 bg-stone-200/60 px-2 py-0.5 rounded-md"
          >
            Clear
          </button>
        )}
      </div>

      {/* Species Pill Tabs */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 block">
          Species
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {speciesOptions.map((opt) => {
            const isActive = filters.species === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleInputChange('species', opt.id)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]'
                    : 'bg-cream-50 text-stone-700 hover:bg-orange-50 hover:text-orange-600 border border-stone-100'
                }`}
              >
                <span className="text-sm">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Dropdown Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-stone-100">
        
        {/* Age Category */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">
            Age Group
          </label>
          <select
            value={filters.ageCategory}
            onChange={(e) => handleInputChange('ageCategory', e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-cream-50/50 border border-stone-200 focus:border-orange-500 focus:outline-none text-xs font-medium text-stone-700"
          >
            <option value="all">All Ages</option>
            <option value="baby">Puppies / Kittens (&lt; 1 yr)</option>
            <option value="young">Young (1 - 3 yrs)</option>
            <option value="adult">Adult (3 - 7 yrs)</option>
            <option value="senior">Senior (7+ yrs)</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">
            Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-cream-50/50 border border-stone-200 focus:border-orange-500 focus:outline-none text-xs font-medium text-stone-700"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Availability Status */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-cream-50/50 border border-stone-200 focus:border-orange-500 focus:outline-none text-xs font-medium text-stone-700"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available for Adoption</option>
            <option value="pending">Application Pending</option>
            <option value="adopted">Adopted (Happy Tails)</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-cream-50/50 border border-stone-200 focus:border-orange-500 focus:outline-none text-xs font-medium text-stone-700"
          >
            <option value="newest">Recently Added</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
            <option value="age_asc">Age: Youngest First</option>
            <option value="age_desc">Age: Oldest First</option>
          </select>
        </div>

      </div>

      {/* Reset Filter Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

    </div>
  );
}

