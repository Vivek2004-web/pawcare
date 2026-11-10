import React from 'react';
import PetCard from './PetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';
import { PawPrint, SearchX } from 'lucide-react';
import { usePets } from '../../context/PetContext';

export default function PetGrid() {
  const { pets, loading, error, resetFilters } = usePets();

  if (loading) {
    return <LoadingSpinner message="Searching for adoptable pets..." />;
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center text-rose-800 space-y-3">
        <p className="font-bold text-base">{error}</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-stone-100 shadow-soft space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 mx-auto flex items-center justify-center">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-stone-800">No Pets Found</h3>
        <p className="text-sm text-stone-500">
          We couldn't find any pets matching your current filter criteria. Try expanding your search or clearing your filters.
        </p>
        <Button variant="primary" size="md" onClick={resetFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
          Showing <span className="text-orange-600 font-extrabold">{pets.length}</span> adoptable {pets.length === 1 ? 'pet' : 'pets'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

