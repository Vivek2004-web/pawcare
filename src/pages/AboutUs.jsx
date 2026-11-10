import React from 'react';
import { Link } from 'react-router-dom';
import {
  PawPrint,
  Heart,
  ShieldCheck,
  Users,
  Target,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button';

export default function AboutUs() {
  const pillars = [
    {
      title: 'Compassionate Rescue',
      desc: 'Every animal, regardless of age, breed, or medical condition, deserves dignity, warmth, and a second chance at happiness.',
      icon: Heart,
      bg: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Ethical & Transparent',
      desc: 'We partner strictly with verified 501(c)(3) rescue organizations and non-kill municipal shelters with full medical disclosure.',
      icon: ShieldCheck,
      bg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Lifelong Support',
      desc: 'Our commitment does not end at the shelter door. We provide adopters with behavioral coaching, vet voucher access, and 24/7 helplines.',
      icon: Users,
      bg: 'bg-amber-50 text-amber-600',
    },
  ];

  const guidelines = [
    {
      title: 'Commitment for Life',
      text: 'Dogs and cats can live 12 to 18+ years. Ensure your family is prepared for lifelong care, routine vet visits, and changes in life stages.'
    },
    {
      title: 'Financial Preparedness',
      text: 'Budget for high-quality food, annual wellness checkups, flea & tick prevention, microchip registration, and emergency medical care.'
    },
    {
      title: 'Enrichment & Exercise',
      text: 'Pets thrive when their physical and mental needs are met through daily walks, puzzle toys, positive reinforcement training, and socialization.'
    },
    {
      title: 'Patience & Transition Time (3-3-3 Rule)',
      text: 'Rescue pets need 3 days to decompress, 3 weeks to learn your routine, and 3 months to feel completely safe and bonded in your home.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-cream-100/80 via-white to-cream-50 py-16 sm:py-20 border-b border-amber-100/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
            Our Mission & Impact
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Building a World Where Every Pet Has a Loving Home.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            PawCare was founded on a simple belief: the bond between a human and an adopted pet can transform lives. We connect shelters directly with prospective adopters using modern cloud technology.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Why We Exist
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900">
              Transforming Animal Adoption Through Technology & Love
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Every year, over 6 million companion animals enter animal shelters across North America. While millions find homes, many face long shelter stays simply due to a lack of visibility and outdated adoption paperwork.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              PawCare solves this bottleneck by providing a seamless, cloud-native pet management platform. Shelters can easily list animals, upload medical records, and process adoption applications in real time, making the journey from kennel to living room smooth and joyful.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-soft">
                <p className="text-2xl font-black text-orange-500">2,400+</p>
                <p className="text-xs font-semibold text-stone-600 mt-1">Animals Rescued & Adopted</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-soft">
                <p className="text-2xl font-black text-emerald-500">180+</p>
                <p className="text-xs font-semibold text-stone-600 mt-1">Partner Rescue Organizations</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80"
                alt="Shelter staff with rescued dog"
                className="w-full h-96 sm:h-[460px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Pillars of PawCare */}
      <section className="bg-cream-100/70 py-16 border-y border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-stone-900">
              Our Core Welfare Principles
            </h2>
            <p className="text-stone-600 text-sm">
              How we ensure the highest standards of animal welfare across our shelter network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pil, i) => {
              const Icon = pil.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 border border-amber-100 shadow-soft space-y-4"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pil.bg}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">{pil.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{pil.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Responsible Pet Adoption Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
            Adopter Education
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900">
            Responsible Adoption Checklist
          </h2>
          <p className="text-stone-500 text-sm">
            Everything you need to consider before opening your heart and home to an animal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {guidelines.map((g, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-stone-100 shadow-soft flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-stone-900">{g.title}</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{g.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link to="/pets">
            <Button variant="primary" size="lg">
              <span>Ready to Adopt? Browse Available Pets</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

