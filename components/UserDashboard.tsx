'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMedicines } from '@/hooks/useMedicines';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHome } from '@/components/DashboardHome';
import { MedicineReminder } from '@/components/MedicineReminder';
import { MedicineInventory } from '@/components/MedicineInventory';
import { MedicalDocuments } from '@/components/MedicalDocuments';
import { HealthCharts } from '@/components/HealthCharts';
import { Appointments } from '@/components/Appointments';
import { Reports } from '@/components/Reports';
import { DoctorSearch } from '@/components/DoctorSearch';
import { AboutUs } from '@/components/AboutUs';
import { FamilyDashboard } from '@/components/FamilyDashboard';
import { NotificationSettings } from '@/components/NotificationSettings';
import { Heart, LogOut, Home, Pill, Calendar, ClipboardList, Info, Users, Bell } from 'lucide-react';

import { User } from '@/lib/supabase';

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

export function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState('home');
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useMedicines(user.id);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <DashboardHome user={user} />;
      case 'medicine-reminder':
        return <MedicineReminder medicines={medicines} onAdd={addMedicine} onUpdate={updateMedicine} onDelete={deleteMedicine} />;
      case 'medicine-inventory':
        return <MedicineInventory />;
      case 'medical-documents':
        return <MedicalDocuments />;
      case 'health-charts':
        return <HealthCharts />;
      case 'appointments':
        return <Appointments />;
      case 'reports':
        return <Reports />;
      case 'doctor-search':
        return <DoctorSearch />;
      case 'family-dashboard':
        return <FamilyDashboard />;
      case 'about':
        return <AboutUs />;
      case 'notification-settings':
        return <NotificationSettings user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MEDPAL
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block">
        <Sidebar 
          user={user}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={onLogout}
        />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-1 p-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'medicine-reminder', label: 'Meds', icon: Pill },
            { id: 'appointments', label: 'Appts', icon: Calendar },
            { id: 'reports', label: 'Reports', icon: ClipboardList },
            { id: 'about', label: 'About', icon: Info },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                className={`flex-shrink-0 ${
                  activeSection === item.id 
                    ? "bg-gradient-to-r from-blue-600 to-green-600 text-white" 
                    : "text-gray-700"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="h-4 w-4 mr-1" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {renderContent()}
      </main>
    </div>
  );
}