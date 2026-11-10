import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, ArrowRight, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';
import { formatAge, getStatusStyle, getSpeciesEmoji, formatCurrency } from '../../utils/helpers';

export default function PetCard({ pet }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!pet) return null;

  const statusVariant = {
    Available: 'emerald',
    Pending: 'amber',
    Adopted: 'stone',
  }[pet.status] || 'stone';

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col group">
      
      {/* Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-stone-100">
        <img
          src={pet.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'}
          alt={pet.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge variant={statusVariant} size="sm">
            {pet.status || 'Available'}
          </Badge>
          {pet.featured && (
            <span className="inline-flex items-center gap-1 bg-amber-400 text-stone-900 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-xs">
              <Sparkles className="w-3 h-3 fill-stone-900" /> Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-rose-500 hover:bg-white transition-all shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>

        {/* Quick Info in bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1 drop-shadow-md">
            <span className="text-base">{getSpeciesEmoji(pet.species)}</span> {pet.breed}
          </span>
          <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
            {formatAge(pet)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
              {pet.name}
            </h3>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {pet.gender} &bull; {pet.size || 'Medium'}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
            <span className="truncate">{pet.location || 'Local Partner Shelter'}</span>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
            {pet.description}
          </p>

          {/* Personality tags */}
          {pet.personality && pet.personality.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {pet.personality.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-cream-100 text-stone-600 text-[11px] font-medium px-2 py-0.5 rounded-md border border-amber-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Adoption Fee</span>
            <span className="text-sm font-bold text-emerald-600">{formatCurrency(pet.adoptionFee)}</span>
          </div>

          <Link
            to={`/pets/${pet.id}`}
            className="inline-flex items-center gap-1.5 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-bold text-xs px-4 py-2 rounded-full transition-all group/btn"
          >
            <span>Meet {pet.name}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
}

