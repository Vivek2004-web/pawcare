// Adoption Application Service
// Communicates with Firestore 'adoptionApplications' collection & localStorage fallback

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

const LOCAL_APPLICATIONS_KEY = 'pawcare_applications_data';

function getLocalApplications() {
  const stored = localStorage.getItem(LOCAL_APPLICATIONS_KEY);
  if (!stored) {
    // Provide 1 starter application for demonstration
    const starter = [
      {
        id: 'app-demo-1',
        petId: 'pet-1',
        petName: 'Cooper',
        petBreed: 'Golden Retriever',
        petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
        userId: 'user-demo-1',
        applicantName: 'Alex Morgan',
        email: 'adopter@pawcare.com',
        phone: '(555) 782-9912',
        address: '442 Blossom Hill Rd, Seattle, WA',
        livingSituation: 'House with fenced yard',
        hasYard: true,
        previousExperience: 'Had a Labrador for 10 years growing up. Familiar with active dog training.',
        reasonForAdoption: 'We work hybrid and have a huge yard. Looking for an active companion for daily hikes.',
        status: 'Pending',
        adminNotes: 'Application looks strong. Shelter review pending.',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(LOCAL_APPLICATIONS_KEY, JSON.stringify(starter));
    return starter;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveLocalApplications(apps) {
  localStorage.setItem(LOCAL_APPLICATIONS_KEY, JSON.stringify(apps));
}

export const applicationService = {
  // Submit new application
  async submitApplication(appData) {
    if (isFirebaseConfigured && db) {
      const appsRef = collection(db, 'adoptionApplications');
      const payload = {
        ...appData,
        status: 'Pending',
        adminNotes: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      const docRef = await addDoc(appsRef, payload);
      return { id: docRef.id, ...payload };
    }

    const local = getLocalApplications();
    const newApp = {
      ...appData,
      id: 'app-' + Date.now(),
      status: 'Pending',
      adminNotes: '',
      createdAt: new Date().toISOString()
    };
    local.unshift(newApp);
    saveLocalApplications(local);
    return newApp;
  },

  // Get user's own applications
  async getUserApplications(userId) {
    if (isFirebaseConfigured && db) {
      try {
        const appsRef = collection(db, 'adoptionApplications');
        const q = query(appsRef, where('userId', '==', userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
      } catch (err) {
        console.warn('Firestore user apps query failed:', err);
      }
    }

    const local = getLocalApplications();
    return local.filter((a) => a.userId === userId);
  },

  // Get ALL applications (Admin only)
  async getAllApplications() {
    if (isFirebaseConfigured && db) {
      try {
        const appsRef = collection(db, 'adoptionApplications');
        const snapshot = await getDocs(appsRef);
        return snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
      } catch (err) {
        console.warn('Firestore all apps query failed:', err);
      }
    }

    return getLocalApplications();
  },

  // Update application status (Approve / Reject) (Admin only)
  async updateApplicationStatus(id, status, adminNotes = '') {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'adoptionApplications', id);
      await updateDoc(docRef, {
        status,
        adminNotes,
        updatedAt: serverTimestamp()
      });
      return { id, status, adminNotes };
    }

    const local = getLocalApplications();
    const index = local.findIndex((a) => String(a.id) === String(id));
    if (index !== -1) {
      local[index].status = status;
      if (adminNotes) local[index].adminNotes = adminNotes;
      saveLocalApplications(local);
      return local[index];
    }
    throw new Error('Application not found');
  }
};

