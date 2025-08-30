'use client';

import { useState, useEffect } from 'react';
import { Medicine } from '@/lib/supabase';

export const useMedicines = (userId: string) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('medpal_token');
      const response = await fetch(`/api/medicines?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch medicines');
      }

      const data = await response.json();
      setMedicines(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addMedicine = async (medicineData: Omit<Medicine, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const token = localStorage.getItem('medpal_token');
      const response = await fetch('/api/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(medicineData)
      });

      if (!response.ok) {
        throw new Error('Failed to add medicine');
      }

      const newMedicine = await response.json();
      setMedicines(prev => [newMedicine, ...prev]);
      return newMedicine;
    } catch (err) {
      throw err;
    }
  };

  const updateMedicine = async (medicineId: string, updates: Partial<Medicine>) => {
    try {
      const token = localStorage.getItem('medpal_token');
      const response = await fetch(`/api/medicines/${medicineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Failed to update medicine');
      }

      const updatedMedicine = await response.json();
      setMedicines(prev => prev.map(med => 
        med.id === medicineId ? updatedMedicine : med
      ));
      return updatedMedicine;
    } catch (err) {
      throw err;
    }
  };

  const deleteMedicine = async (medicineId: string) => {
    try {
      const token = localStorage.getItem('medpal_token');
      const response = await fetch(`/api/medicines/${medicineId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete medicine');
      }

      setMedicines(prev => prev.filter(med => med.id !== medicineId));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMedicines();
    }
  }, [userId]);

  return {
    medicines,
    loading,
    error,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    refetch: fetchMedicines
  };
};