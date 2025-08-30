import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project-id.supabase.co' || 
    supabaseAnonKey === 'your-actual-anon-key-here') {
  console.error('❌ Supabase credentials not configured!');
  console.error('❌ Please create a .env.local file with your Supabase credentials');
  console.error('❌ Get them from: https://supabase.com/dashboard');
}

// Create client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// Database Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password_hash?: string;
  age?: number;
  gender?: string;
  height?: string;
  weight?: string;
  membership_type?: string;
  created_at: string;
  updated_at: string;
}

export interface Medicine {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  start_date: string;
  end_date?: string;
  notes?: string;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MedicineReminder {
  id: string;
  medicine_id: string;
  user_id: string;
  scheduled_time: string;
  status: 'pending' | 'taken' | 'missed';
  taken_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MedicineInventory {
  id: string;
  user_id: string;
  medicine_name: string;
  stock_quantity: number;
  expiry_date: string;
  low_stock_threshold: number;
  created_at: string;
  updated_at: string;
}

export interface HealthReading {
  id: string;
  user_id: string;
  reading_type: string;
  value: number;
  unit: string;
  recorded_date: string;
  notes?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_name: string;
  specialty: string;
  appointment_date: string;
  appointment_time: string;
  location: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface MedicalDocument {
  id: string;
  user_id: string;
  document_name: string;
  document_type: string;
  file_url?: string;
  file_size?: string;
  upload_date: string;
  created_at: string;
}