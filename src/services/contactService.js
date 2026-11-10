// Contact Messages Service
// Writes to Firestore 'contactMessages' collection & localStorage fallback

import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

const LOCAL_CONTACT_KEY = 'pawcare_contact_messages';

function getLocalMessages() {
  const stored = localStorage.getItem(LOCAL_CONTACT_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveLocalMessages(msgs) {
  localStorage.setItem(LOCAL_CONTACT_KEY, JSON.stringify(msgs));
}

export const contactService = {
  async submitMessage({ name, email, subject, message }) {
    if (isFirebaseConfigured && db) {
      const messagesRef = collection(db, 'contactMessages');
      const payload = {
        name,
        email: email.toLowerCase(),
        subject: subject || 'General Inquiry',
        message,
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(messagesRef, payload);
      return { id: docRef.id, ...payload };
    }

    const local = getLocalMessages();
    const newMsg = {
      id: 'msg-' + Date.now(),
      name,
      email: email.toLowerCase(),
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    };
    local.unshift(newMsg);
    saveLocalMessages(local);
    return newMsg;
  },

  async getAllMessages() {
    if (isFirebaseConfigured && db) {
      try {
        const messagesRef = collection(db, 'contactMessages');
        const snapshot = await getDocs(messagesRef);
        return snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
      } catch (err) {
        console.warn('Firestore messages fetch failed:', err);
      }
    }
    return getLocalMessages();
  }
};

