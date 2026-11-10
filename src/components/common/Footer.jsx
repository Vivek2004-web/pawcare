import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart, Mail, Phone, MapPin, Shield, Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-orange-200 fill-orange-200" />
            <div>
              <p className="font-bold text-base">Over 2,400+ Rescued Pets Found Forever Homes</p>
              <p className="text-xs text-orange-100">Every adoption saves two lives: the pet you adopt and the one you make space for.</p>
            </div>
          </div>
          <Link
            to="/pets"
            className="px-6 py-2.5 rounded-full bg-white text-stone-900 font-bold text-sm shadow-md hover:bg-orange-50 transition-all hover:scale-105"
          >
            Adopt a Pet Today
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                <PawPrint className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Paw<span className="text-orange-500">Care</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              PawCare is an open, cloud-native pet rescue and adoption management platform dedicated to bridging the gap between compassionate shelters and loving forever homes.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <Cloud className="w-4 h-4 text-emerald-400" />
              <span>Hosted on <span className="text-white font-medium">Microsoft Azure Static Web Apps</span></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/pets" className="hover:text-orange-400 transition-colors">Browse Pets</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">About Us & Mission</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact Shelters</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-orange-400 transition-colors">Join as Adopter</Link>
              </li>
            </ul>
          </div>

          {/* Adoption Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Animals</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/pets?species=dog" className="hover:text-orange-400 transition-colors">Adopt a Dog</Link>
              </li>
              <li>
                <Link to="/pets?species=cat" className="hover:text-orange-400 transition-colors">Adopt a Cat</Link>
              </li>
              <li>
                <Link to="/pets?species=other" className="hover:text-orange-400 transition-colors">Rabbits & Small Pets</Link>
              </li>
              <li>
                <Link to="/pets?status=available" className="hover:text-orange-400 transition-colors">Urgent / Available</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>1204 Shelter Way, Cloud Valley, WA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>(800) 555-PAWS (7297)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@pawcare.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} PawCare Pet Adoption & Rescue. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Verified 501(c)(3) Animal Rescue Partner
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

