import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { petService } from '../services/petService';

const PetContext = createContext(null);

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    species: 'all',
    gender: 'all',
    status: 'all',
    ageCategory: 'all',
    sortBy: 'newest'
  });

  const fetchPets = useCallback(async (customFilters) => {
    setLoading(true);
    setError(null);
    try {
      const activeFilters = customFilters !== undefined ? customFilters : filters;
      const data = await petService.getPets(activeFilters);
      setPets(data);
    } catch (err) {
      console.error('Failed to load pets:', err);
      setError('Unable to load pets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const addPet = async (petData) => {
    const created = await petService.createPet(petData);
    await fetchPets();
    return created;
  };

  const editPet = async (id, petData) => {
    const updated = await petService.updatePet(id, petData);
    await fetchPets();
    return updated;
  };

  const removePet = async (id) => {
    await petService.deletePet(id);
    await fetchPets();
    return true;
  };

  const resetFilters = () => {
    const defaultFilters = {
      search: '',
      species: 'all',
      gender: 'all',
      status: 'all',
      ageCategory: 'all',
      sortBy: 'newest'
    };
    setFilters(defaultFilters);
    fetchPets(defaultFilters);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        loading,
        error,
        filters,
        setFilters,
        fetchPets,
        addPet,
        editPet,
        removePet,
        resetFilters
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
}

