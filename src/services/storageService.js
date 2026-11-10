// Storage Service for Pet Photos
// Supports Firebase Storage with client-side preview fallback

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from '../firebase/config';

export const storageService = {
  // Upload pet image file
  async uploadPetImage(file, petId = 'new') {
    if (!file) throw new Error('No file provided');

    // Live Firebase Storage upload
    if (isFirebaseConfigured && storage) {
      const filename = `pets/${petId}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const storageRef = ref(storage, filename);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }

    // Client-side fallback: Convert to DataURL for instant local preview and testing
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
};

