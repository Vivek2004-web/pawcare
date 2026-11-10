import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  PawPrint,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Upload,
  Database,
  Filter,
  Eye,
  Search,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { petService } from '../services/petService';
import { applicationService } from '../services/applicationService';
import { storageService } from '../services/storageService';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatSimpleDate, getSpeciesEmoji, getStatusStyle, formatCurrency } from '../utils/helpers';

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('pets'); // 'pets' | 'applications' | 'settings'
  const [pets, setPets] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState('');

  // Pet Modal State (Create / Edit)
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [editingPetId, setEditingPetId] = useState(null);
  const [petForm, setPetForm] = useState({
    name: '',
    species: 'dog',
    breed: '',
    ageYears: 1,
    ageMonths: 0,
    gender: 'Male',
    size: 'Medium',
    color: '',
    location: 'Seattle Humane, WA',
    status: 'Available',
    image: '',
    description: '',
    personality: 'Friendly, Playful',
    healthStatus: 'Vaccinated and neutered',
    goodWithKids: true,
    goodWithPets: true,
    adoptionFee: '₹2,500',
    featured: false
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Application Review Modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [processingStatus, setProcessingStatus] = useState(false);

  // Load Admin Data
  const refreshData = async () => {
    setLoading(true);
    try {
      const [allPets, allApps] = await Promise.all([
        petService.getPets({}),
        applicationService.getAllApplications()
      ]);
      setPets(allPets);
      setApplications(allApps);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login', { state: { from: { pathname: '/admin' } } });
      } else if (!isAdmin) {
        navigate('/dashboard');
      } else {
        refreshData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleOpenAddPet = () => {
    setEditingPetId(null);
    setPetForm({
      name: '',
      species: 'dog',
      breed: '',
      ageYears: 1,
      ageMonths: 0,
      gender: 'Male',
      size: 'Medium',
      color: '',
      location: 'Seattle Humane, WA',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      description: '',
      personality: 'Friendly, Playful, Gentle',
      healthStatus: 'Vaccinated, microchipped, spayed/neutered',
      goodWithKids: true,
      goodWithPets: true,
      adoptionFee: '₹2,500',
      featured: false
    });
    setPetModalOpen(true);
  };

  const handleOpenEditPet = (pet) => {
    setEditingPetId(pet.id);
    setPetForm({
      name: pet.name || '',
      species: pet.species || 'dog',
      breed: pet.breed || '',
      ageYears: pet.ageYears !== undefined ? pet.ageYears : 1,
      ageMonths: pet.ageMonths !== undefined ? pet.ageMonths : 0,
      gender: pet.gender || 'Male',
      size: pet.size || 'Medium',
      color: pet.color || '',
      location: pet.location || '',
      status: pet.status || 'Available',
      image: pet.image || '',
      description: pet.description || '',
      personality: Array.isArray(pet.personality) ? pet.personality.join(', ') : (pet.personality || ''),
      healthStatus: pet.healthStatus || '',
      goodWithKids: pet.goodWithKids !== false,
      goodWithPets: pet.goodWithPets !== false,
      adoptionFee: pet.adoptionFee ? formatCurrency(pet.adoptionFee) : '₹2,500',
      featured: Boolean(pet.featured)
    });
    setPetModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await storageService.uploadPetImage(file, editingPetId || 'new');
      setPetForm((prev) => ({ ...prev, image: url }));
      setActionSuccess('Image uploaded successfully!');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSavePet = async (e) => {
    e.preventDefault();
    if (!petForm.name.trim()) return alert('Pet name is required');

    const personalityArray = typeof petForm.personality === 'string'
      ? petForm.personality.split(',').map((s) => s.trim()).filter(Boolean)
      : petForm.personality;

    const payload = {
      ...petForm,
      ageYears: Number(petForm.ageYears),
      ageMonths: Number(petForm.ageMonths),
      personality: personalityArray
    };

    try {
      if (editingPetId) {
        await petService.updatePet(editingPetId, payload);
        setActionSuccess(`Updated ${petForm.name} successfully!`);
      } else {
        await petService.createPet(payload);
        setActionSuccess(`Created listing for ${petForm.name}!`);
      }
      setPetModalOpen(false);
      await refreshData();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      alert('Failed to save pet: ' + err.message);
    }
  };

  const handleDeletePet = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from pet listings?`)) {
      try {
        await petService.deletePet(id);
        setActionSuccess(`Removed ${name} from listings.`);
        await refreshData();
        setTimeout(() => setActionSuccess(''), 4000);
      } catch (err) {
        alert('Failed to delete pet: ' + err.message);
      }
    }
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedApp) return;
    setProcessingStatus(true);
    try {
      await applicationService.updateApplicationStatus(selectedApp.id, status, reviewNotes);
      setActionSuccess(`Application marked as ${status}!`);
      setSelectedApp(null);
      setReviewNotes('');
      await refreshData();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setProcessingStatus(false);
    }
  };

  const handleSeedData = async () => {
    if (window.confirm('Populate the platform with initial sample adoptable pets?')) {
      try {
        await petService.seedInitialPets();
        setActionSuccess('Sample pet listings populated successfully!');
        await refreshData();
        setTimeout(() => setActionSuccess(''), 4000);
      } catch (err) {
        alert('Seeding error: ' + err.message);
      }
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner fullScreen message="Loading shelter administration console..." />;
  }

  // Calculate high-level stats
  const totalPets = pets.length;
  const availablePets = pets.filter((p) => (p.status || '').toLowerCase() === 'available').length;
  const pendingApps = applications.filter((a) => (a.status || '').toLowerCase() === 'pending').length;
  const approvedApps = applications.filter((a) => (a.status || '').toLowerCase() === 'approved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Shelter Administration Console</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            PawCare Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Manage listings, review adoption applications, and configure cloud data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleSeedData}>
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Seed Sample Pets</span>
          </Button>
          <Button variant="primary" size="md" onClick={handleOpenAddPet}>
            <Plus className="w-4 h-4" />
            <span>Add New Pet</span>
          </Button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-soft">
          <p className="text-[11px] uppercase font-bold text-stone-400">Total Pets</p>
          <h3 className="text-3xl font-black text-stone-900 mt-1">{totalPets}</h3>
          <p className="text-xs text-stone-500 mt-0.5">Across all shelters</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-soft">
          <p className="text-[11px] uppercase font-bold text-stone-400">Available Now</p>
          <h3 className="text-3xl font-black text-emerald-600 mt-1">{availablePets}</h3>
          <p className="text-xs text-stone-500 mt-0.5">Ready for adoption</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-soft">
          <p className="text-[11px] uppercase font-bold text-stone-400">Pending Review</p>
          <h3 className="text-3xl font-black text-amber-500 mt-1">{pendingApps}</h3>
          <p className="text-xs text-stone-500 mt-0.5">Applicant requests</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-soft">
          <p className="text-[11px] uppercase font-bold text-stone-400">Approved Families</p>
          <h3 className="text-3xl font-black text-orange-600 mt-1">{approvedApps}</h3>
          <p className="text-xs text-stone-500 mt-0.5">Adoptions matched</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('pets')}
          className={`pb-3 px-2 font-bold text-sm transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'pets'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <PawPrint className="w-4 h-4" />
          <span>Manage Pet Listings ({pets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 px-2 font-bold text-sm transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Adoption Applications ({applications.length})</span>
          {pendingApps > 0 && (
            <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
              {pendingApps} new
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: MANAGE PETS TABLE */}
      {activeTab === 'pets' && (
        <div className="bg-white rounded-3xl border border-stone-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-cream-50/80 border-b border-stone-100 text-[11px] uppercase font-bold text-stone-500 tracking-wider">
                  <th className="py-4 px-6">Pet</th>
                  <th className="py-4 px-4">Species & Breed</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4">Fee</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pets.map((p) => (
                  <tr key={p.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                        />
                        <div>
                          <p className="font-bold text-stone-900">{p.name}</p>
                          <p className="text-[11px] text-stone-400">{p.gender} &bull; {p.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-stone-700 capitalize">
                        {getSpeciesEmoji(p.species)} {p.species}
                      </span>
                      <p className="text-[11px] text-stone-400">{p.breed}</p>
                    </td>
                    <td className="py-3 px-4 text-stone-600 truncate max-w-xs">
                      {p.location || 'Local Shelter'}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      {formatCurrency(p.adoptionFee)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          p.status === 'Available' ? 'emerald' : p.status === 'Pending' ? 'amber' : 'stone'
                        }
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditPet(p)}
                          className="p-2 rounded-xl bg-cream-50 hover:bg-orange-100 text-stone-600 hover:text-orange-600 transition-colors"
                          title="Edit Pet"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePet(p.id, p.name)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ADOPTION APPLICATIONS TABLE */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl border border-stone-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-cream-50/80 border-b border-stone-100 text-[11px] uppercase font-bold text-stone-500 tracking-wider">
                  <th className="py-4 px-6">Applicant</th>
                  <th className="py-4 px-4">Pet Interested</th>
                  <th className="py-4 px-4">Home / Yard</th>
                  <th className="py-4 px-4">Submitted</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-stone-400">
                      No applications submitted yet.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-orange-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-stone-900">{app.applicantName}</p>
                        <p className="text-[11px] text-stone-400">{app.email} &bull; {app.phone}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-orange-600">{app.petName}</p>
                        <p className="text-[11px] text-stone-400">{app.petBreed}</p>
                      </td>
                      <td className="py-4 px-4 text-stone-600">
                        <p>{app.livingSituation}</p>
                        <p className="text-[11px] text-stone-400">Yard: {app.hasYard ? 'Yes' : 'No'}</p>
                      </td>
                      <td className="py-4 px-4 text-stone-500 text-xs">
                        {formatSimpleDate(app.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            app.status === 'Approved' ? 'emerald' : app.status === 'Rejected' ? 'rose' : 'amber'
                          }
                          size="sm"
                        >
                          {app.status || 'Pending'}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedApp(app);
                            setReviewNotes(app.adminNotes || '');
                          }}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1 text-orange-500" />
                          <span>Review</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PET */}
      <Modal
        isOpen={petModalOpen}
        onClose={() => setPetModalOpen(false)}
        title={editingPetId ? `Edit Pet: ${petForm.name}` : 'Add New Rescued Pet Listing'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSavePet} className="space-y-6 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Pet Name *</label>
              <input
                type="text"
                required
                value={petForm.name}
                onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                placeholder="e.g. Charlie"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Species *</label>
              <select
                value={petForm.species}
                onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
              >
                <option value="dog">Dog 🐕</option>
                <option value="cat">Cat 🐈</option>
                <option value="other">Other / Rabbit 🐇</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Breed *</label>
              <input
                type="text"
                required
                value={petForm.breed}
                onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                placeholder="e.g. Golden Retriever"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Gender</label>
              <select
                value={petForm.gender}
                onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-orange-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  value={petForm.ageYears}
                  onChange={(e) => setPetForm({ ...petForm, ageYears: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Age (Months)</label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={petForm.ageMonths}
                  onChange={(e) => setPetForm({ ...petForm, ageMonths: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Listing Status</label>
              <select
                value={petForm.status}
                onChange={(e) => setPetForm({ ...petForm, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Adopted">Adopted</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Shelter / Location</label>
              <input
                type="text"
                value={petForm.location}
                onChange={(e) => setPetForm({ ...petForm, location: e.target.value })}
                placeholder="e.g. Austin Pet Haven, TX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Adoption Fee (INR ₹)</label>
              <input
                type="text"
                value={petForm.adoptionFee}
                onChange={(e) => setPetForm({ ...petForm, adoptionFee: e.target.value })}
                placeholder="₹2,500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
              />
            </div>
          </div>

          {/* Photo URL or Upload */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-700 block">Pet Photo</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={petForm.image}
                onChange={(e) => setPetForm({ ...petForm, image: e.target.value })}
                placeholder="Image URL or upload file..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
              />
              <label className="cursor-pointer bg-cream-100 hover:bg-orange-100 text-stone-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-stone-200 inline-flex items-center gap-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5 text-orange-600" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {petForm.image && (
              <img
                src={petForm.image}
                alt="Preview"
                className="w-24 h-24 rounded-xl object-cover border border-stone-200 mt-2"
              />
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Personality Traits (Comma separated)</label>
            <input
              type="text"
              value={petForm.personality}
              onChange={(e) => setPetForm({ ...petForm, personality: e.target.value })}
              placeholder="e.g. Playful, Loves Cuddles, Energetic"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Description</label>
            <textarea
              rows={3}
              value={petForm.description}
              onChange={(e) => setPetForm({ ...petForm, description: e.target.value })}
              placeholder="Tell adopters about this pet's background, personality, and ideal home..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={petForm.goodWithKids}
                onChange={(e) => setPetForm({ ...petForm, goodWithKids: e.target.checked })}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span>Good with Kids</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={petForm.goodWithPets}
                onChange={(e) => setPetForm({ ...petForm, goodWithPets: e.target.checked })}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span>Good with Other Pets</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={petForm.featured}
                onChange={(e) => setPetForm({ ...petForm, featured: e.target.checked })}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <Button variant="outline" size="md" onClick={() => setPetModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingPetId ? 'Save Changes' : 'Publish Listing'}
            </Button>
          </div>

        </form>
      </Modal>

      {/* MODAL: APPLICATION REVIEW */}
      <Modal
        isOpen={Boolean(selectedApp)}
        onClose={() => setSelectedApp(null)}
        title={selectedApp ? `Review Application: ${selectedApp.petName}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedApp && (
          <div className="space-y-6 text-xs sm:text-sm">
            
            <div className="flex items-center justify-between p-4 bg-cream-50 rounded-2xl border border-stone-100">
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Target Pet</p>
                <p className="font-extrabold text-stone-900 text-base">{selectedApp.petName}</p>
              </div>
              <Badge
                variant={
                  selectedApp.status === 'Approved' ? 'emerald' : selectedApp.status === 'Rejected' ? 'rose' : 'amber'
                }
                size="md"
              >
                {selectedApp.status || 'Pending'}
              </Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-stone-900 border-b pb-1">Applicant Information</h4>
              <p><strong>Name:</strong> {selectedApp.applicantName}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Phone:</strong> {selectedApp.phone}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Housing:</strong> {selectedApp.livingSituation} (Yard: {selectedApp.hasYard ? 'Yes' : 'No'})</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-stone-900 border-b pb-1">Care & Background</h4>
              <p className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <strong>Experience:</strong> {selectedApp.previousExperience}
              </p>
              <p className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <strong>Reason:</strong> {selectedApp.reasonForAdoption}
              </p>
            </div>

            {/* Reviewer Notes Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                Shelter Coordinator Review Notes
              </label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add internal shelter feedback or message for the applicant..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  loading={processingStatus}
                  onClick={() => handleStatusUpdate('Rejected')}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  <span>Reject</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  loading={processingStatus}
                  onClick={() => handleStatusUpdate('Approved')}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  <span>Approve Application</span>
                </Button>
              </div>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}
