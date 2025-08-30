'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Heart } from 'lucide-react';

interface AuthFlowProps {
  onBackToLanding: () => void;
}

export function AuthFlow({ onBackToLanding }: AuthFlowProps) {
  const { register, login } = useAuth();
  const [step, setStep] = useState<'signup' | 'otp' | 'login'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await register(formData);
      setIsLoading(false);
      setStep('otp');
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      alert(errorMessage);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setIsLoading(false);
    if (formData.otp === '1234') {
      // OTP verified, user is already registered
      alert('Account verified successfully!');
    } else {
      alert('Invalid OTP. Please use 1234 for demo.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBackToLanding}
            className="mr-2 md:mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MedPal
            </span>
          </div>
        </div>

        {step === 'signup' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl md:text-2xl">Create Your Account</CardTitle>
              <CardDescription>
                Join MedPal to start managing your health better
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4 p-4 md:p-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 text-sm md:text-base"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 text-sm md:text-base"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10 text-sm md:text-base"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10 text-sm md:text-base"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-sm md:text-base py-2 md:py-3" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up & Send OTP'}
                </Button>

                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-sm md:text-base"
                    onClick={() => setStep('login')}
                  >
                    Already have an account? Sign In
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        )}

        {step === 'otp' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl md:text-2xl">Verify Your Phone</CardTitle>
              <CardDescription>
                We've sent a verification code to {formData.phone}
                <br />
                <span className="text-xs text-gray-500">(Use 1234 for demo)</span>
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleOTPVerification}>
              <CardContent className="space-y-4 p-4 md:p-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="text-center text-xl md:text-2xl tracking-widest"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-sm md:text-base py-2 md:py-3" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>

                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-sm md:text-base"
                    onClick={() => setStep('signup')}
                  >
                    Back to Sign Up
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        )}

        {step === 'login' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl md:text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your MedPal account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 p-4 md:p-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 text-sm md:text-base"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 text-sm md:text-base"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-sm md:text-base py-2 md:py-3" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-sm md:text-base"
                    onClick={() => setStep('signup')}
                  >
                    Don't have an account? Sign Up
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}