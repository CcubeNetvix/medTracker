import { supabase } from './supabase';
import type { User, Medicine, MedicineReminder, MedicineInventory, HealthReading, Appointment, MedicalDocument } from './supabase';

// User Operations
export const createUser = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
  console.log('📝 Creating user in database...');
  console.log('👤 User data:', {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    hasPassword: !!userData.password_hash,
    age: userData.age,
    gender: userData.gender
  });
  
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Supabase error creating user:', error);
      console.error('❌ Error details:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      
      // Return mock user data when Supabase is not available
      console.log('⚠️ Using mock data due to database error');
      return {
        id: 'mock_' + Date.now(),
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    console.log('✅ User created successfully in database:', {
      id: data.id,
      email: data.email,
      name: data.name
    });
    
    return data;
  } catch (error) {
    console.error('❌ Database connection error creating user:', error);
    console.error('❌ Error type:', typeof error);
    console.error('❌ Error message:', error instanceof Error ? error.message : 'Unknown error');
    
    // Return mock user data when database is not available
    console.log('⚠️ Using mock data due to connection error');
    return {
      id: 'mock_' + Date.now(),
      ...userData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};

export const getUserByEmail = async (email: string) => {
  console.log('🔍 Database: Looking for user with email:', email);
  console.log('🌐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('🔑 Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  
  // Check if Supabase is properly configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Supabase not configured - cannot connect to database');
    console.error('❌ Please create .env.local file with your Supabase credentials');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    console.log('📊 Database response - data:', data ? 'Found' : 'Not found');
    console.log('📊 Database response - error:', error);
    
    if (error && error.code !== 'PGRST116') {
      console.error('❌ Supabase error, user not found:', error);
      return null;
    }
    
    if (data) {
      console.log('✅ User found in database:', {
        id: data.id,
        email: data.email,
        name: data.name,
        hasPassword: !!data.password_hash
      });
    }
    
    return data;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return null;
  }
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Medicine Operations
export const createMedicine = async (medicineData: Omit<Medicine, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('medicines')
    .insert([medicineData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserMedicines = async (userId: string) => {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateMedicine = async (medicineId: string, updates: Partial<Medicine>) => {
  const { data, error } = await supabase
    .from('medicines')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', medicineId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteMedicine = async (medicineId: string) => {
  const { data, error } = await supabase
    .from('medicines')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', medicineId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Medicine Reminder Operations
export const createMedicineReminder = async (reminderData: Omit<MedicineReminder, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('medicine_reminders')
    .insert([reminderData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserReminders = async (userId: string, date?: string) => {
  let query = supabase
    .from('medicine_reminders')
    .select(`
      *,
      medicines (
        name,
        dosage
      )
    `)
    .eq('user_id', userId);
  
  if (date) {
    query = query.gte('scheduled_time', `${date}T00:00:00`)
                 .lt('scheduled_time', `${date}T23:59:59`);
  }
  
  const { data, error } = await query.order('scheduled_time', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const updateReminderStatus = async (reminderId: string, status: 'taken' | 'missed', takenAt?: string) => {
  const updates: any = { 
    status, 
    updated_at: new Date().toISOString() 
  };
  
  if (takenAt) {
    updates.taken_at = takenAt;
  }
  
  const { data, error } = await supabase
    .from('medicine_reminders')
    .update(updates)
    .eq('id', reminderId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Medicine Inventory Operations
export const createInventoryItem = async (inventoryData: Omit<MedicineInventory, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('medicine_inventory')
    .insert([inventoryData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserInventory = async (userId: string) => {
  const { data, error } = await supabase
    .from('medicine_inventory')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateInventoryItem = async (inventoryId: string, updates: Partial<MedicineInventory>) => {
  const { data, error } = await supabase
    .from('medicine_inventory')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', inventoryId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteInventoryItem = async (inventoryId: string) => {
  const { data, error } = await supabase
    .from('medicine_inventory')
    .delete()
    .eq('id', inventoryId);
  
  if (error) throw error;
  return data;
};

// Health Reading Operations
export const createHealthReading = async (readingData: Omit<HealthReading, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('health_readings')
    .insert([readingData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserHealthReadings = async (userId: string, readingType?: string) => {
  let query = supabase
    .from('health_readings')
    .select('*')
    .eq('user_id', userId);
  
  if (readingType) {
    query = query.eq('reading_type', readingType);
  }
  
  const { data, error } = await query.order('recorded_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Appointment Operations
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointmentData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserAppointments = async (userId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('appointment_date', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const updateAppointment = async (appointmentId: string, updates: Partial<Appointment>) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', appointmentId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteAppointment = async (appointmentId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', appointmentId);
  
  if (error) throw error;
  return data;
};

// Medical Document Operations
export const createMedicalDocument = async (documentData: Omit<MedicalDocument, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('medical_documents')
    .insert([documentData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserDocuments = async (userId: string) => {
  const { data, error } = await supabase
    .from('medical_documents')
    .select('*')
    .eq('user_id', userId)
    .order('upload_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const deleteMedicalDocument = async (documentId: string) => {
  const { data, error } = await supabase
    .from('medical_documents')
    .delete()
    .eq('id', documentId);
  
  if (error) throw error;
  return data;
};