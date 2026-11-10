import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Heart,
  MapPin,
  Calendar,
  CheckCircle2,
  Shield,
  ArrowLeft,
  Share2,
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import { petService } from '../services/petService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { formatAge, getStatusStyle, getSpeciesEmoji, formatCurrency } from '../utils/helpers';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadPet() {
      setLoading(true);
      try {
        const data = await petService.getPetById(id);
        if (data) {
          setPet(data);
          setSelectedImage(data.image || (data.gallery && data.gallery[0]) || '');
        }
      } catch (err) {
        console.error('Failed to load pet details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPet();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading pet profile..." />;
  }

  if (!pet) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-stone-100 shadow-soft space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-stone-900">Pet Not Found</h2>
        <p className="text-sm text-stone-500">
          The pet listing you are looking for may have already found their forever home or been removed.
        </p>
        <Link to="/pets">
          <Button variant="primary">Return to Browse Pets</Button>
        </Link>
      </div>
    );
  }

  const galleryImages = pet.gallery && pet.gallery.length > 0 ? pet.gallery : [pet.image];
  const isAvailable = (pet.status || 'Available').toLowerCase() === 'available';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/pets"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pet Listings</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Hero Photo */}
          <div className="relative rounded-3xl overflow-hidden bg-stone-100 h-96 sm:h-[480px] shadow-soft border border-stone-100">
            <img
              src={selectedImage || pet.image}
              alt={pet.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge variant={isAvailable ? 'emerald' : 'amber'} size="lg">
                {pet.status}
              </Badge>
              {pet.featured && (
                <span className="bg-amber-400 text-stone-900 font-bold px-3 py-1 rounded-full text-xs shadow-sm">
                  Featured Pet
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === imgUrl
                      ? 'border-orange-500 scale-95 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${pet.name} thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Health & Medical Information Box */}
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>Veterinary & Medical Record</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-stone-700 bg-cream-50 p-3 rounded-xl border border-stone-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Up to date on vaccinations</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 bg-cream-50 p-3 rounded-xl border border-stone-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Spayed / Neutered & Microchipped</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 bg-cream-50 p-3 rounded-xl border border-stone-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Good with kids: {pet.goodWithKids !== false ? 'Yes' : 'Requires adult home'}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 bg-cream-50 p-3 rounded-xl border border-stone-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Good with other pets: {pet.goodWithPets !== false ? 'Yes' : 'Prefers single pet'}</span>
              </div>
            </div>

            {pet.healthStatus && (
              <p className="text-xs text-stone-500 bg-stone-50 p-3.5 rounded-xl border border-stone-100 leading-relaxed">
                <strong>Medical Summary:</strong> {pet.healthStatus}
              </p>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Pet Overview & Adoption Action */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-7 border border-stone-100 shadow-soft space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  {getSpeciesEmoji(pet.species)} {pet.species} &bull; {pet.breed}
                </span>
                <span className="text-xl font-black text-emerald-600">
                  {formatCurrency(pet.adoptionFee)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                {pet.name}
              </h1>
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>{pet.location || 'Local Foster Network'}</span>
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-cream-50 p-3 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-400">Age</p>
                <p className="text-sm font-bold text-stone-800 mt-0.5">{formatAge(pet)}</p>
              </div>
              <div className="bg-cream-50 p-3 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-400">Gender</p>
                <p className="text-sm font-bold text-stone-800 mt-0.5">{pet.gender || 'Unknown'}</p>
              </div>
              <div className="bg-cream-50 p-3 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase font-bold text-stone-400">Size</p>
                <p className="text-sm font-bold text-stone-800 mt-0.5">{pet.size || 'Medium'}</p>
              </div>
            </div>

            {/* Personality Tags */}
            {pet.personality && pet.personality.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Personality & Traits
                </p>
                <div className="flex flex-wrap gap-2">
                  {pet.personality.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-amber-50 text-amber-900 border border-amber-200/60 font-semibold text-xs px-3 py-1 rounded-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                About {pet.name}
              </p>
              <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {pet.description}
              </p>
            </div>

            {/* Adoption CTA Card */}
            <div className="p-5 bg-gradient-to-tr from-cream-100 via-orange-50 to-white rounded-2xl border border-orange-200/80 space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  <PawPrint className="w-4 h-4 text-orange-500" />
                  <span>Interested in giving {pet.name} a home?</span>
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Submitting an application is non-binding and holds your place in line to meet {pet.name}.
                </p>
              </div>

              {isAvailable ? (
                <Link to={`/pets/${pet.id}/apply`} className="block">
                  <Button variant="primary" size="lg" className="w-full text-base py-3.5 shadow-lg shadow-orange-500/25">
                    Apply to Adopt {pet.name}
                  </Button>
                </Link>
              ) : (
                <div className="bg-stone-100 text-stone-600 p-3 rounded-xl text-center text-xs font-semibold">
                  This pet currently has an application pending or has found their forever family.
                </div>
              )}
            </div>

          </div>

          {/* Shelter Guarantee info */}
          <div className="bg-cream-50/60 p-5 rounded-3xl border border-stone-200/70 text-xs text-stone-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-800">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>PawCare Adoption Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Every pet adopted through PawCare comes with a 30-day health wellness policy, free initial veterinary checkup voucher, and access to our certified pet behavior training helpline.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
