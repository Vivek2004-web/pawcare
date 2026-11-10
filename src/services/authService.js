// Authentication Service
// Bridges Firebase Authentication with Firestore Users collection and provides Demo fallback

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../firebase/config';

const DEMO_USERS_KEY = 'pawcare_demo_users';
const DEMO_SESSION_KEY = 'pawcare_demo_current_user';

// Built-in starter demo accounts for instant testing
const DEFAULT_DEMO_ACCOUNTS = [
  {
    uid: 'admin-demo-1',
    name: 'Sarah Jenkins (Admin)',
    email: 'admin@pawcare.com',
    role: 'admin',
    phone: '(555) 019-2834',
    createdAt: new Date().toISOString()
  },
  {
    uid: 'user-demo-1',
    name: 'Alex Morgan (Adopter)',
    email: 'adopter@pawcare.com',
    role: 'adopter',
    phone: '(555) 782-9912',
    createdAt: new Date().toISOString()
  }
];

function getDemoUsers() {
  const raw = localStorage.getItem(DEMO_USERS_KEY);
  if (!raw) {
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(DEFAULT_DEMO_ACCOUNTS));
    return DEFAULT_DEMO_ACCOUNTS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DEMO_ACCOUNTS;
  }
}

function saveDemoUsers(users) {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
}

export const authService = {
  // Listen to Auth State
  subscribeToAuth(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            // Fetch Firestore profile for role
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            const profileData = userDoc.exists() ? userDoc.data() : {};
            callback({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || profileData.name || 'User',
              role: profileData.role || (firebaseUser.email?.includes('admin') ? 'admin' : 'adopter'),
              phone: profileData.phone || '',
              photoURL: firebaseUser.photoURL || null,
              isDemo: false
            });
          } catch (err) {
            console.warn('Could not fetch Firestore user profile:', err);
            callback({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'User',
              role: firebaseUser.email?.includes('admin') ? 'admin' : 'adopter',
              isDemo: false
            });
          }
        } else {
          callback(null);
        }
      });
    }

    // Local Demo Auth Simulation
    const checkSession = () => {
      const stored = localStorage.getItem(DEMO_SESSION_KEY);
      if (stored) {
        try {
          callback(JSON.parse(stored));
          return;
        } catch {
          // ignore
        }
      }
      callback(null);
    };

    checkSession();
    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  },

  // User Registration
  async register({ name, email, password, role = 'adopter', phone = '' }) {
    if (isFirebaseConfigured && auth && db) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Save user record in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email: email.toLowerCase(),
        role: role.toLowerCase() === 'admin' ? 'admin' : 'adopter',
        phone,
        createdAt: serverTimestamp()
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: name,
        role: role.toLowerCase() === 'admin' ? 'admin' : 'adopter',
        phone,
        isDemo: false
      };
    }

    // Demo Mode
    const users = getDemoUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      uid: 'user-' + Date.now(),
      name,
      email: email.toLowerCase(),
      role: role.toLowerCase() === 'admin' ? 'admin' : 'adopter',
      phone,
      createdAt: new Date().toISOString(),
      isDemo: true
    };

    users.push(newUser);
    saveDemoUsers(users);
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new Event('storage'));
    return newUser;
  },

  // User Login
  async login({ email, password }) {
    if (isFirebaseConfigured && auth && db) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let role = 'adopter';
      let name = user.displayName || 'User';
      let phone = '';

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          role = data.role || role;
          name = data.name || name;
          phone = data.phone || '';
        }
      } catch (e) {
        console.warn('Error reading user role from Firestore:', e);
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: name,
        role,
        phone,
        isDemo: false
      };
    }

    // Demo Mode Login
    const users = getDemoUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      // Auto-allow admin or adopter demo credentials
      if (email.toLowerCase() === 'admin@pawcare.com') {
        const adminUser = {
          uid: 'admin-demo-1',
          name: 'Sarah Jenkins (Admin)',
          email: 'admin@pawcare.com',
          role: 'admin',
          phone: '(555) 019-2834',
          isDemo: true
        };
        localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(adminUser));
        window.dispatchEvent(new Event('storage'));
        return adminUser;
      }
      throw new Error('Invalid email or password. Use admin@pawcare.com or adopter@pawcare.com to test.');
    }

    const sessionUser = { ...found, isDemo: true };
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(sessionUser));
    window.dispatchEvent(new Event('storage'));
    return sessionUser;
  },

  // User Logout
  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(DEMO_SESSION_KEY);
    window.dispatchEvent(new Event('storage'));
  }
};

