import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  PawPrint,
  Heart,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Home,
  Shield,
  FileText
} from 'lucide-react';
import { petService } from '../services/petService';
import { applicationService } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { validateEmail, validatePhone } from '../utils/helpers';

export default function AdoptionApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    address: '',
    livingSituation: 'House with fenced yard',
    hasYard: true,
    landlordApproval: true,
    previousExperience: '',
    reasonForAdoption: '',
    agreementConfirmed: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchPet() {
      setLoading(true);
      try {
        const data = await petService.getPetById(id);
        if (data) setPet(data);
      } catch (err) {
        console.error('Failed to load pet:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPet();
  }, [id]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        applicantName: prev.applicantName || user.displayName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.applicantName.trim()) errs.applicantName = 'Applicant name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    }
    if (!formData.address.trim()) errs.address = 'Home address is required.';
    if (!formData.previousExperience.trim()) {
      errs.previousExperience = 'Please describe your past pet experience or preparation.';
    }
    if (!formData.reasonForAdoption.trim()) {
      errs.reasonForAdoption = 'Please tell us why you wish to adopt this pet.';
    }
    if (!formData.agreementConfirmed) {
      errs.agreementConfirmed = 'You must confirm the adoption terms & care commitment.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        petId: pet.id,
        petName: pet.name,
        petBreed: pet.breed,
        petImage: pet.image,
        userId: user ? user.uid : 'guest-' + Date.now(),
        ...formData
      };

      await applicationService.submitApplication(payload);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage(err.message || 'Failed to submit application. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading application form..." />;
  }

  if (!pet) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 text-center bg-white rounded-3xl border border-stone-100 shadow-soft">
        <p className="font-bold text-stone-800">Pet not found</p>
        <Link to="/pets" className="text-orange-500 font-bold text-sm block mt-4">
          Return to Browse Pets
        </Link>
      </div>
    );
  }

  // Success Confirmation Screen
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto my-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-soft text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Application Submitted Successfully
            </span>
            <h1 className="text-3xl font-extrabold text-stone-900">
              Thank You, {formData.applicantName}!
            </h1>
            <p className="text-sm text-stone-600 max-w-lg mx-auto">
              Your adoption application for <strong>{pet.name}</strong> has been received by our shelter team. We review each application carefully to ensure a happy, lifelong match.
            </p>
          </div>

          <div className="bg-cream-50 p-4 rounded-2xl border border-stone-200/60 text-left text-xs text-stone-600 space-y-2">
            <p className="font-bold text-stone-800">What happens next?</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Our adoption counselor reviews your living space and pet requirements (24-48 hrs).</li>
              <li>You will receive an email or call to schedule a meet & greet with {pet.name}.</li>
              <li>You can track this application in your <Link to="/dashboard" className="text-orange-600 font-bold underline">User Dashboard</Link>.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <Button variant="primary" size="md">
                Go to My Dashboard
              </Button>
            </Link>
            <Link to="/pets">
              <Button variant="outline" size="md">
                Browse More Pets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        to={`/pets/${pet.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {pet.name}'s Profile</span>
      </Link>

      {/* Pet Header Summary Card */}
      <div className="bg-white rounded-3xl p-5 border border-stone-100 shadow-soft flex items-center gap-5">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-center flex-shrink-0"
        />
        <div className="flex-1">
          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
            Adoption Application
          </span>
          <h2 className="text-2xl font-extrabold text-stone-900">
            Applying for {pet.name}
          </h2>
          <p className="text-xs text-stone-500">
            {pet.species} &bull; {pet.breed} &bull; {pet.gender} &bull; {pet.location}
          </p>
        </div>
      </div>

      {/* Main Application Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-100 shadow-soft">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">1</span>
              <span>Applicant & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 ${
                    errors.applicantName ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-200'
                  }`}
                />
                {errors.applicantName && <p className="text-rose-500 text-xs mt-1">{errors.applicantName}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-200'
                  }`}
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-200'
                  }`}
                />
                {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Residential Street Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, City, State, ZIP"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 ${
                    errors.address ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-200'
                  }`}
                />
                {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address}</p>}
              </div>

            </div>
          </div>

          {/* Section 2: Living Situation */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">2</span>
              <span>Living Situation & Household</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Housing Type
                </label>
                <select
                  name="livingSituation"
                  value={formData.livingSituation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-800 focus:outline-none focus:border-orange-500"
                >
                  <option value="House with fenced yard">Single Family Home (Fenced Yard)</option>
                  <option value="House without yard">Single Family Home (No Fence)</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Rural / Farm">Rural Acreage / Farm</option>
                </select>
              </div>

              <div className="space-y-3 pt-4 sm:pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasYard"
                    checked={formData.hasYard}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500 rounded border-stone-300 focus:ring-orange-400"
                  />
                  <span className="text-xs font-semibold text-stone-700">Property has a secured yard or outdoor area</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="landlordApproval"
                    checked={formData.landlordApproval}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500 rounded border-stone-300 focus:ring-orange-400"
                  />
                  <span className="text-xs font-semibold text-stone-700">Own home or have landlord permission for pets</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Pet Experience & Motivation */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-black flex items-center justify-center">3</span>
              <span>Experience & Reason for Adoption</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Previous Pet Ownership Experience <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="previousExperience"
                rows={3}
                value={formData.previousExperience}
                onChange={handleChange}
                placeholder="Tell us about pets you have owned previously, experience with veterinary care, training, or how you plan to care for a new pet..."
                className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 ${
                  errors.previousExperience ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-200'
                }`}
              />
              {errors.previousExperience && <p className="text-rose-500 text-xs mt-1">{errors.previousExperience}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Why do you want to adopt {pet.name}? <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="reasonForAdoption"
                rows={3}
                value={formData.reasonForAdoption}
                onChange={handleChange}
                placeholder="What drew you to this pet? How will this pet fit into your daily routine and family life?"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 ${
                  errors.reasonForAdoption ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-200 focus:border-orange-500 focus:ring-orange-200'
                }`}
              />
              {errors.reasonForAdoption && <p className="text-rose-500 text-xs mt-1">{errors.reasonForAdoption}</p>}
            </div>
          </div>

          {/* Section 4: Terms & Submission */}
          <div className="pt-4 border-t border-stone-100 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreementConfirmed"
                checked={formData.agreementConfirmed}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 text-orange-500 rounded border-stone-300 focus:ring-orange-400"
              />
              <span className="text-xs text-stone-600 leading-relaxed">
                I certify that all information provided in this adoption application is true, accurate, and complete. I understand that submitting this application does not guarantee adoption and is subject to shelter review. <span className="text-rose-500">*</span>
              </span>
            </label>
            {errors.agreementConfirmed && <p className="text-rose-500 text-xs">{errors.agreementConfirmed}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submitting}
              className="w-full text-base py-3.5 shadow-lg shadow-orange-500/25"
            >
              Submit Adoption Application
            </Button>
          </div>

        </form>

      </div>

    </div>
  );
}

