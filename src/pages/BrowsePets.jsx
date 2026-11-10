import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PetFilters from '../components/pets/PetFilters';
import PetGrid from '../components/pets/PetGrid';
import { usePets } from '../context/PetContext';
import { PawPrint, Sparkles } from 'lucide-react';

export default function BrowsePets() {
  const [searchParams] = useSearchParams();
  const { setFilters } = usePets();

  // Support direct URL query parameter linking like /pets?species=dog or /pets?status=available
  useEffect(() => {
    const speciesParam = searchParams.get('species');
    const statusParam = searchParams.get('status');
    const searchParam = searchParams.get('q');

    if (speciesParam || statusParam || searchParam) {
      setFilters((prev) => ({
        ...prev,
        ...(speciesParam ? { species: speciesParam } : {}),
        ...(statusParam ? { status: statusParam } : {}),
        ...(searchParam ? { search: searchParam } : {}),
      }));
    }
  }, [searchParams, setFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100/80 px-3 py-1 rounded-full">
          <PawPrint className="w-3.5 h-3.5" />
          <span>Available Animal Listings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Browse Adoptable Pets
        </h1>
        <p className="text-stone-500 text-sm sm:text-base max-w-2xl">
          Use the filters below to find animals matching your home, activity level, and lifestyle. Every profile includes full temperament notes and medical history.
        </p>
      </div>

      {/* Filter Toolbar */}
      <PetFilters />

      {/* Pet Listings Grid */}
      <PetGrid />

    </div>
  );
}

