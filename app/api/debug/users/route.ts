import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug: Checking users in database...');
    console.log('🌐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('🔑 Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Environment variables not configured',
        message: 'Please create a .env.local file with your Supabase credentials',
        environment: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET',
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
        }
      }, { status: 400 });
    }
    
    // Check if we can connect to the database
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error('❌ Database error:', error);
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: error,
        environment: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
        }
      }, { status: 500 });
    }
    
    console.log('✅ Database connection successful');
    console.log('👥 Users found:', users?.length || 0);
    
    // Return user data (without sensitive information)
    const safeUsers = users?.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      hasPassword: !!user.password_hash,
      membership_type: user.membership_type,
      created_at: user.created_at,
      updated_at: user.updated_at
    })) || [];
    
    return NextResponse.json({
      success: true,
      message: `Found ${safeUsers.length} users in database`,
      users: safeUsers,
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
      }
    });
    
  } catch (error) {
    console.error('❌ Debug endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
      }
    }, { status: 500 });
  }
}
