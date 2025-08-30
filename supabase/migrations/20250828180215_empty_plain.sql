/*
  # Create MedPal Database Schema

  1. New Tables
    - `users` - User profiles and authentication
    - `medicines` - User medications with scheduling info
    - `medicine_reminders` - Individual reminder instances
    - `medicine_inventory` - Medicine stock tracking
    - `health_readings` - Health metrics (blood sugar, BP, etc.)
    - `appointments` - Medical appointments
    - `medical_documents` - Document storage metadata

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  password_hash text NOT NULL,
  age integer,
  gender text,
  height text,
  weight text,
  membership_type text DEFAULT 'Gold Member',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  times text[] NOT NULL,
  start_date date NOT NULL,
  end_date date,
  notes text,
  color text DEFAULT '#3B82F6',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own medicines"
  ON medicines
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Medicine reminders table
CREATE TABLE IF NOT EXISTS medicine_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id uuid REFERENCES medicines(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  scheduled_time timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'taken', 'missed')),
  taken_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medicine_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own reminders"
  ON medicine_reminders
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Medicine inventory table
CREATE TABLE IF NOT EXISTS medicine_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  medicine_name text NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0,
  expiry_date date NOT NULL,
  low_stock_threshold integer DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medicine_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own inventory"
  ON medicine_inventory
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Health readings table
CREATE TABLE IF NOT EXISTS health_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reading_type text NOT NULL,
  value numeric NOT NULL,
  unit text NOT NULL,
  recorded_date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE health_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own health readings"
  ON health_readings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  specialty text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  location text NOT NULL,
  notes text,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Medical documents table
CREATE TABLE IF NOT EXISTS medical_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  document_type text NOT NULL,
  file_url text,
  file_size text,
  upload_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE medical_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own documents"
  ON medical_documents
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_medicines_user_id ON medicines(user_id);
CREATE INDEX IF NOT EXISTS idx_medicine_reminders_user_id ON medicine_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_medicine_reminders_scheduled_time ON medicine_reminders(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_health_readings_user_id ON health_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_documents_user_id ON medical_documents(user_id);