// Utility helper functions for PawCare

export function formatAge(pet) {
  if (!pet) return 'Unknown age';
  const years = pet.ageYears !== undefined ? Number(pet.ageYears) : Math.floor((pet.ageMonths || 0) / 12);
  const months = pet.ageMonths !== undefined ? Number(pet.ageMonths) % 12 : 0;

  if (years === 0 && months === 0) return 'Under 1 month';
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} yr${years !== 1 ? 's' : ''} ${months} mo${months !== 1 ? 's' : ''}`;
}

export function formatSimpleDate(dateVal) {
  if (!dateVal) return 'Recently';
  if (typeof dateVal === 'object' && dateVal.toDate) {
    return dateVal.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return 'Recently';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getStatusStyle(status) {
  const s = (status || '').toLowerCase();
  switch (s) {
    case 'available':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'approved':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'rejected':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'adopted':
      return 'bg-stone-100 text-stone-600 border-stone-200';
    default:
      return 'bg-stone-50 text-stone-600 border-stone-200';
  }
}

export function getSpeciesEmoji(species) {
  const s = (species || '').toLowerCase();
  if (s === 'dog') return '🐕';
  if (s === 'cat') return '🐈';
  if (s === 'rabbit') return '🐇';
  if (s === 'bird') return '🦜';
  return '🐾';
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
}

/**
 * Format currency in Indian Rupees (INR - ₹)
 */
export function formatCurrency(amount) {
  if (!amount && amount !== 0) return '₹2,500';
  if (typeof amount === 'string') {
    if (amount.includes('₹') || amount.toLowerCase().includes('rs') || amount.toLowerCase().includes('inr')) {
      return amount;
    }
    if (amount.includes('$')) {
      const num = parseFloat(amount.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) {
        // Sensible INR conversion for adoption charges (e.g. $100 -> ₹2,500)
        return `₹${Math.round(num * 25).toLocaleString('en-IN')}`;
      }
    }
    const cleanNum = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (!isNaN(cleanNum)) {
      return `₹${Math.round(cleanNum).toLocaleString('en-IN')}`;
    }
    return amount;
  }
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

