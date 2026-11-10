import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { applicationService } from '../services/applicationService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { formatSimpleDate, getStatusStyle } from '../utils/helpers';

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: { pathname: '/dashboard' } } });
      return;
    }

    async function loadApplications() {
      if (!user) return;
      setLoading(true);
      try {
        const apps = await applicationService.getUserApplications(user.uid);
        setApplications(apps);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return <LoadingSpinner fullScreen message="Loading your dashboard..." />;
  }

  if (!user) return null;

  const getStatusIcon = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case 'pending':
      default:
        return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-10 text-white shadow-soft relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-2xl border border-white/30 text-white">
              {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-200">
                Adopter Account
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome back, {user.displayName || 'Adopter'}!
              </h1>
              <p className="text-xs sm:text-sm text-orange-100 mt-0.5">
                {user.email} &bull; Member since 2024
              </p>
            </div>
          </div>

          <Link to="/pets">
            <Button variant="outline" size="md" className="bg-white text-stone-900 border-none shadow-md hover:bg-orange-50">
              <PawPrint className="w-4 h-4 text-orange-500" />
              <span>Browse More Pets</span>
            </Button>
          </Link>
        </div>

        <PawPrint className="w-64 h-64 text-white/10 absolute -bottom-16 -right-10 pointer-events-none" />
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: User Profile Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-soft space-y-6">
            <h3 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" />
              <span>Personal Profile</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Full Name</p>
                <p className="font-semibold text-stone-800 mt-0.5">{user.displayName || 'Not specified'}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Email Address</p>
                <p className="font-semibold text-stone-800 mt-0.5">{user.email}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Phone</p>
                <p className="font-semibold text-stone-800 mt-0.5">{user.phone || '(No phone on record)'}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Account Role</p>
                <Badge variant={user.role === 'admin' ? 'orange' : 'emerald'} size="sm" className="mt-1">
                  {user.role}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-cream-50 rounded-2xl border border-stone-100 text-xs text-stone-500 space-y-1.5">
              <p className="font-bold text-stone-700">Need to update your contact info?</p>
              <p>Contact your local shelter coordinator during your application review call.</p>
            </div>
          </div>
        </div>

        {/* Right: Submitted Applications */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Adoption Applications ({applications.length})
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Track the real-time status of your pet adoption requests.
                </p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12 space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 mx-auto flex items-center justify-center">
                  <PawPrint className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-stone-800">No applications yet</h4>
                <p className="text-xs text-stone-500">
                  You haven't submitted any adoption applications yet. Browse our furry friends looking for a home!
                </p>
                <Link to="/pets">
                  <Button variant="primary" size="md">
                    Explore Adoptable Pets
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-stone-100 hover:border-orange-200 bg-cream-50/40 hover:bg-white transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {app.petImage && (
                        <img
                          src={app.petImage}
                          alt={app.petName}
                          className="w-16 h-16 rounded-xl object-cover object-center flex-shrink-0 border border-stone-200"
                        />
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-stone-900">
                            {app.petName}
                          </h4>
                          <span className="text-xs text-stone-500">
                            ({app.petBreed || 'Pet'})
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">
                          Submitted on {formatSimpleDate(app.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize">
                        {getStatusIcon(app.status)}
                        <span>{app.status || 'Pending'}</span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApp(app)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Details Modal */}
      <Modal
        isOpen={Boolean(selectedApp)}
        onClose={() => setSelectedApp(null)}
        title={selectedApp ? `Application for ${selectedApp.petName}` : ''}
      >
        {selectedApp && (
          <div className="space-y-6 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-4 bg-cream-50 rounded-2xl border border-stone-100">
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Application Status</p>
                <div className="flex items-center gap-1.5 font-bold text-sm mt-0.5 capitalize">
                  {getStatusIcon(selectedApp.status)}
                  <span>{selectedApp.status}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-stone-400">Submitted Date</p>
                <p className="font-semibold text-stone-700 mt-0.5">
                  {formatSimpleDate(selectedApp.createdAt)}
                </p>
              </div>
            </div>

            {selectedApp.adminNotes && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-xs">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  <span>Shelter Reviewer Note</span>
                </p>
                <p className="text-xs leading-relaxed">{selectedApp.adminNotes}</p>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-bold text-stone-900 border-b pb-1.5">Applicant & Residence</h4>
              <p><strong>Name:</strong> {selectedApp.applicantName}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Phone:</strong> {selectedApp.phone}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Living Situation:</strong> {selectedApp.livingSituation}</p>
              <p><strong>Fenced Yard:</strong> {selectedApp.hasYard ? 'Yes' : 'No'}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-stone-900 border-b pb-1.5">Care Background</h4>
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Past Pet Experience</p>
                <p className="text-stone-700 mt-0.5">{selectedApp.previousExperience}</p>
              </div>
              <div className="pt-2">
                <p className="text-[10px] uppercase font-bold text-stone-400">Reason for Adoption</p>
                <p className="text-stone-700 mt-0.5">{selectedApp.reasonForAdoption}</p>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
