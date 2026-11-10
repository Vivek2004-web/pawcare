// Pet Management Service
// Communicates with Firestore 'pets' collection and localStorage fallback

import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { INITIAL_PETS } from '../utils/mockData';

const LOCAL_PETS_KEY = 'pawcare_pets_data';

function getLocalPets() {
  const stored = localStorage.getItem(LOCAL_PETS_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_PETS_KEY, JSON.stringify(INITIAL_PETS));
    return [...INITIAL_PETS];
  }
  try {
    const parsed = JSON.parse(stored);
    return parsed.length ? parsed : [...INITIAL_PETS];
  } catch {
    return [...INITIAL_PETS];
  }
}

function saveLocalPets(pets) {
  localStorage.setItem(LOCAL_PETS_KEY, JSON.stringify(pets));
}

export const petService = {
  // Fetch all pets with optional filters
  async getPets(filters = {}) {
    if (isFirebaseConfigured && db) {
      try {
        const petsRef = collection(db, 'pets');
        let q = query(petsRef);

        const snapshot = await getDocs(q);
        let pets = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        // If Firestore is empty, auto-return initial pets
        if (pets.length === 0) {
          pets = getLocalPets();
        }

        return this.applyClientFilters(pets, filters);
      } catch (err) {
        console.warn('Firestore fetch failed, using local pets:', err);
        return this.applyClientFilters(getLocalPets(), filters);
      }
    }

    return this.applyClientFilters(getLocalPets(), filters);
  },

  // Apply search and filter criteria in memory
  applyClientFilters(pets, filters = {}) {
    let result = [...pets];

    // Search query (name, breed, location)
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.breed?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.color?.toLowerCase().includes(q)
      );
    }

    // Species filter
    if (filters.species && filters.species !== 'all') {
      result = result.filter(
        (p) => (p.species || '').toLowerCase() === filters.species.toLowerCase()
      );
    }

    // Gender filter
    if (filters.gender && filters.gender !== 'all') {
      result = result.filter(
        (p) => (p.gender || '').toLowerCase() === filters.gender.toLowerCase()
      );
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      result = result.filter(
        (p) => (p.status || '').toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Age filter
    if (filters.ageCategory && filters.ageCategory !== 'all') {
      result = result.filter((p) => {
        const totalMonths = (Number(p.ageYears || 0) * 12) + Number(p.ageMonths || 0);
        switch (filters.ageCategory) {
          case 'baby': // 0 - 12 mos
            return totalMonths <= 12;
          case 'young': // 1 - 3 yrs
            return totalMonths > 12 && totalMonths <= 36;
          case 'adult': // 3 - 7 yrs
            return totalMonths > 36 && totalMonths <= 84;
          case 'senior': // 7+ yrs
            return totalMonths > 84;
          default:
            return true;
        }
      });
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name_asc':
          result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          break;
        case 'name_desc':
          result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
          break;
        case 'age_asc':
          result.sort(
            (a, b) =>
              (Number(a.ageYears || 0) * 12 + Number(a.ageMonths || 0)) -
              (Number(b.ageYears || 0) * 12 + Number(b.ageMonths || 0))
          );
          break;
        case 'age_desc':
          result.sort(
            (a, b) =>
              (Number(b.ageYears || 0) * 12 + Number(b.ageMonths || 0)) -
              (Number(a.ageYears || 0) * 12 + Number(a.ageMonths || 0))
          );
          break;
        case 'newest':
        default:
          result.sort((a, b) => (b.intakeDate || '').localeCompare(a.intakeDate || ''));
          break;
      }
    }

    return result;
  },

  // Get pet by ID
  async getPetById(id) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'pets', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        }
      } catch (err) {
        console.warn('Firestore getPetById failed:', err);
      }
    }

    const local = getLocalPets();
    return local.find((p) => String(p.id) === String(id)) || null;
  },

  // Create pet (Admin only)
  async createPet(petData) {
    if (isFirebaseConfigured && db) {
      const petsRef = collection(db, 'pets');
      const cleanData = {
        ...petData,
        status: petData.status || 'Available',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      const docRef = await addDoc(petsRef, cleanData);
      return { id: docRef.id, ...cleanData };
    }

    const local = getLocalPets();
    const newPet = {
      ...petData,
      id: 'pet-' + Date.now(),
      status: petData.status || 'Available',
      intakeDate: new Date().toISOString().split('T')[0]
    };
    local.unshift(newPet);
    saveLocalPets(local);
    return newPet;
  },

  // Update pet (Admin only)
  async updatePet(id, updateData) {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'pets', id);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id, ...updateData };
    }

    const local = getLocalPets();
    const index = local.findIndex((p) => String(p.id) === String(id));
    if (index !== -1) {
      local[index] = { ...local[index], ...updateData };
      saveLocalPets(local);
      return local[index];
    }
    throw new Error('Pet not found');
  },

  // Delete pet (Admin only)
  async deletePet(id) {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'pets', id);
      await deleteDoc(docRef);
      return true;
    }

    const local = getLocalPets();
    const filtered = local.filter((p) => String(p.id) !== String(id));
    saveLocalPets(filtered);
    return true;
  },

  // Seed sample pets into Firestore or reset local
  async seedInitialPets() {
    if (isFirebaseConfigured && db) {
      const batch = writeBatch(db);
      for (const pet of INITIAL_PETS) {
        const docRef = doc(collection(db, 'pets'));
        const { id, ...data } = pet;
        batch.set(docRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      await batch.commit();
      return true;
    }

    saveLocalPets(INITIAL_PETS);
    return true;
  }
};

