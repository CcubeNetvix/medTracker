import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: AuthUser): string => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      name: user.name,
      phone: user.phone
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): AuthUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
  age?: number;
  gender?: string;
  height?: string;
  weight?: string;
}) => {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password);

  // Create user
  const newUser = await createUser({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password_hash: hashedPassword,
    age: userData.age,
    gender: userData.gender,
    height: userData.height,
    weight: userData.weight,
    membership_type: 'Gold Member'
  } as any);

  // Generate token
  const token = generateToken({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone
  });

  return { user: newUser, token };
};

export const loginUser = async (email: string, password: string) => {
  console.log('🔍 Login attempt for email:', email);
  
  // Get user by email
  const user = await getUserByEmail(email);
  console.log('👤 User found:', user ? 'Yes' : 'No');
  
  if (!user) {
    console.log('❌ User not found in database');
    throw new Error('Invalid email or password');
  }

  console.log('🔐 Checking password...');
  console.log('📧 User email:', user.email);
  console.log('📱 User phone:', user.phone);
  console.log('🔑 Has password_hash:', !!user.password_hash);
  
  // Verify password
  const isValidPassword = await comparePassword(password, user.password_hash);
  console.log('✅ Password valid:', isValidPassword);
  
  if (!isValidPassword) {
    console.log('❌ Password verification failed');
    throw new Error('Invalid email or password');
  }

  console.log('🎉 Login successful!');
  
  // Generate token
  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  return { user, token };
};