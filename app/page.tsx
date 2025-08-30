'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LandingPage } from '@/components/LandingPage';
import { AuthFlow } from '@/components/AuthFlow';
import { UserDashboard } from '@/components/UserDashboard';
import { SetupGuide } from '@/components/SetupGuide';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'auth'>('landing');
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  // Check if Supabase is configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                               process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
                               process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
                               process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-actual-anon-key-here';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show setup guide if Supabase is not configured
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🏥 MedPal</h1>
            <p className="text-xl text-gray-600">Your Healthcare Management Platform</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowSetupGuide(true)}
              className="px-8 py-3"
            >
              🔧 Setup Database
            </Button>
            <Button 
              onClick={() => setShowSetupGuide(false)}
              className="px-8 py-3"
            >
              🚀 Continue Without Database
            </Button>
          </div>

          {showSetupGuide ? (
            <SetupGuide />
          ) : (
            <div className="text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-yellow-800 mb-2">⚠️ Database Not Configured</h2>
                <p className="text-yellow-700 mb-4">
                  Your MedPal application is currently running without a database connection. 
                  Some features like user authentication and data persistence will not work.
                </p>
                <Button onClick={() => setShowSetupGuide(true)}>
                  🔧 Configure Database Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (user) {
    return <UserDashboard user={user} onLogout={logout} />;
  }
  
  const handleGetStarted = () => {
    setCurrentView('auth');
  };


  return (
    <main className="min-h-screen">
      {currentView === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {currentView === 'auth' && (
        <AuthFlow 
          onBackToLanding={() => setCurrentView('landing')}
        />
      )}
    </main>
  );
}