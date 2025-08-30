'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Pill, 
  Package, 
  FileText, 
  BarChart3, 
  Calendar, 
  ClipboardList, 
  Search, 
  Info, 
  LogOut,
  Heart,
  Users,   // ✅ Added this import
  Bell
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  membershipType: string;
}

interface SidebarProps {
  user: User;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export function Sidebar({ user, activeSection, onSectionChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'medicine-reminder', label: 'Medicine Reminder', icon: Pill },
    { id: 'medicine-inventory', label: 'Medicine Inventory', icon: Package },
    { id: 'medical-documents', label: 'Medical Documents', icon: FileText },
    { id: 'health-charts', label: 'Health Charts', icon: BarChart3 },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: ClipboardList },
    { id: 'doctor-search', label: 'Find Doctors', icon: Search },
    { id: 'family-dashboard', label: 'Family Care', icon: Users },  // ✅ Works now
    { id: 'notification-settings', label: 'Notifications', icon: Bell },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            MEDPAL
          </span>
        </div>
        
        {/* User Profile */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">{user.name}</h3>
              <p className="text-xs md:text-sm text-gray-600 truncate">{user.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
            <div>
              <span className="text-gray-500">Age:</span>
              <span className="ml-1 font-medium">{user.age}</span>
            </div>
            <div>
              <span className="text-gray-500">Gender:</span>
              <span className="ml-1 font-medium">{user.gender}</span>
            </div>
            <div>
              <span className="text-gray-500">Height:</span>
              <span className="ml-1 font-medium">{user.height}</span>
            </div>
            <div>
              <span className="text-gray-500">Weight:</span>
              <span className="ml-1 font-medium">{user.weight}</span>
            </div>
          </div>
          
          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 hover:from-yellow-500 hover:to-yellow-700 text-xs">
            {user.membershipType}
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeSection === item.id 
                  ? "bg-gradient-to-r from-blue-600 to-green-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.label.split(' ')[0]}</span>
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 text-sm md:text-base"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span className="hidden md:inline">Logout</span>
          <span className="md:hidden">Exit</span>
        </Button>
      </div>
    </div>
  );
}
