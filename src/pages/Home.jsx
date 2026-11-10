import React from 'react';
import { Link } from 'react-router-dom';
import {
  PawPrint,
  Heart,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  Home as HomeIcon,
  Smile,
  ChevronRight
} from 'lucide-react';
import { usePets } from '../context/PetContext';
import PetCard from '../components/pets/PetCard';
import { SUCCESS_STORIES } from '../utils/mockData';

export default function Home() {
  const { pets, loading } = usePets();

  const featuredPets = pets.filter((p) => p.featured || p.status === 'Available').slice(0, 3);

  const stats = [
    { label: 'Pets Rescued & Adopted', value: '2,400+', icon: Heart, color: 'text-orange-500' },
    { label: 'Verified Shelter Partners', value: '180+', icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'Happy Pet Parents', value: '1,950+', icon: Users, color: 'text-amber-500' },
    { label: 'Adoption Success Rate', value: '98.5%', icon: Award, color: 'text-rose-500' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Find Your Match',
      desc: 'Browse hundreds of rescued pets with detailed medical records, personalities, and behavioral notes.',
      icon: Search,
      bg: 'bg-orange-50 text-orange-600',
    },
    {
      num: '02',
      title: 'Submit Application',
      desc: 'Fill out our secure online adoption application detailing your living environment and pet care plan.',
      icon: PawPrint,
      bg: 'bg-amber-50 text-amber-600',
    },
    {
      num: '03',
      title: 'Meet & Greet',
      desc: 'Connect with shelter coordinators for a virtual or in-person session to bond with your potential pet.',
      icon: Smile,
      bg: 'bg-emerald-50 text-emerald-600',
    },
    {
      num: '04',
      title: 'Bring Them Home',
      desc: 'Finalize the adoption paperwork, receive health certificates, and welcome your new best friend forever!',
      icon: HomeIcon,
      bg: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-24 bg-gradient-to-b from-cream-100/80 via-white to-cream-50">
        
        {/* Decorative background paw prints */}
        <div className="absolute top-10 left-10 text-orange-200/40 pointer-events-none transform -rotate-12">
          <PawPrint className="w-32 h-32" />
        </div>
        <div className="absolute bottom-5 right-10 text-emerald-100/50 pointer-events-none transform rotate-12">
          <PawPrint className="w-48 h-48" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
                <span>Non-Profit Animal Welfare & Adoption Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
                Find Your New <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">
                  Best Friend.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-600 max-w-2xl font-normal leading-relaxed">
                Give a loving pet a forever home. Connect with verified rescue shelters, explore healthy adoptable dogs, cats, and rabbits, and start your lifelong companionship today.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/pets"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5"
                >
                  <PawPrint className="w-5 h-5" />
                  <span>Browse Pets</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-700 font-bold text-base border border-stone-200 shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <span>How Adoption Works</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Health Checked & Vaccinated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Transparent Adoption Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified 501(c)(3) Shelters</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"
                    alt="Happy adopted dogs playing outdoors"
                    className="w-full h-96 sm:h-[460px] object-cover"
                  />
                  <div className="p-5 bg-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Adopted This Week</p>
                      <h4 className="text-base font-extrabold text-stone-900">Daisy & Buster</h4>
                      <p className="text-xs text-stone-400">Adopted together by the Miller Family</p>
                    </div>
                    <span className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <Heart className="w-5 h-5 fill-emerald-500" />
                    </span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xl">
                    🐾
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-stone-900">Over 50+ Shelters</p>
                    <p className="text-xs text-stone-500">Listing pets every single day</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-100 shadow-soft">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className={`text-center space-y-2 ${i > 0 ? 'pt-6 lg:pt-0 lg:px-6' : 'lg:pr-6'}`}>
                  <div className={`w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto ${st.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                    {st.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-stone-500">
                    {st.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
              Ready For Adoption
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Meet Our Featured Friends
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl">
              These wonderful companions are currently in foster care or shelters, ready to bring warmth into your home.
            </p>
          </div>
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-5 py-2.5 rounded-full transition-colors w-fit"
          >
            <span>View All Pets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pet Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>

      {/* 4. ADOPTION PROCESS (HOW IT WORKS) */}
      <section className="bg-cream-100/70 py-20 border-y border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              Simple & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              How Adoption Works
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Four straightforward steps to connect you with your future family member.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-amber-100 shadow-soft relative flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${st.bg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-black text-stone-200">{st.num}</span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">{st.title}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/pets"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <span>Start Your Adoption Application</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. SUCCESS STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
            Heartwarming Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Happy Tails & Success Stories
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            Real stories from families whose lives were changed by opening their doors to a shelter animal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-6 border border-stone-100 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-soft-lg transition-shadow"
            >
              <div className="space-y-4">
                {/* Images */}
                <div className="relative h-48 rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src={story.petImage}
                    alt={story.petName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {story.date}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                  "{story.story}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img
                  src={story.image}
                  alt={story.adopter}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-400"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{story.adopter}</h4>
                  <p className="text-[11px] text-stone-500">
                    Adopted <span className="font-semibold text-orange-600">{story.petName}</span> &bull; {story.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 text-white p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Change a Life Today?
            </h2>
            <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
              Hundreds of rescued pets are waiting right now for someone like you. Browse our database or reach out directly to our partner shelters.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/pets"
                className="px-8 py-3.5 rounded-full bg-white text-stone-900 font-extrabold text-sm shadow-lg hover:bg-orange-50 transition-all hover:scale-105"
              >
                Browse Adoptable Pets
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full bg-black/20 hover:bg-black/30 text-white font-bold text-sm border border-white/20 transition-all"
              >
                Contact Shelter Team
              </Link>
            </div>
          </div>

          <div className="absolute -right-10 -bottom-10 text-white/10 pointer-events-none transform rotate-12">
            <PawPrint className="w-80 h-80" />
          </div>
        </div>
      </section>

    </div>
  );
}

