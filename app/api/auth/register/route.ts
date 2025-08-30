import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';
import { generateOTP, sendOTP } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, age, gender, height, weight } = body;

    console.log('🚀 Registration API called with data:', {
      name,
      email,
      phone,
      hasPassword: !!password,
      age,
      gender,
      height,
      weight
    });

    // Validate required fields
    if (!name || !email || !phone || !password) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('✅ All required fields present');

    // Generate and send OTP
    console.log('📱 Generating OTP...');
    const otp = generateOTP();
    console.log('🔐 OTP generated:', otp);
    
    console.log('📤 Sending OTP...');
    const otpResult = await sendOTP(phone, otp);
    console.log('📱 OTP send result:', otpResult);
    
    if (!otpResult.success) {
      console.log('⚠️ OTP sending failed, but continuing with registration');
    }

    // Store OTP temporarily (in production, use Redis or database)
    // For demo, we'll return success
    
    console.log('👤 Calling registerUser function...');
    // Register user
    const { user, token } = await registerUser({
      name,
      email,
      phone,
      password,
      age: age ? parseInt(age) : undefined,
      gender,
      height,
      weight
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        membership_type: user.membership_type
      },
      token,
      otp: '1234', // Demo OTP for testing
      message: 'Registration successful! Use OTP: 1234 for demo'
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Provide more helpful error message
    let errorMessage = 'Registration failed';
    if (error instanceof Error) {
      if (error.message.includes('User already exists')) {
        errorMessage = 'User already exists with this email';
      } else if (error.message.includes('DNS')) {
        errorMessage = 'Database connection issue - please try again';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}