'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Pill, 
  Calendar, 
  TrendingUp, 
  Clock,
  Lightbulb,
  Activity,
  Heart
} from 'lucide-react';
import { EmergencyButton } from '@/components/EmergencyButton';

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

interface DashboardHomeProps {
  user: User;
}

export function DashboardHome({ user }: DashboardHomeProps) {
  const tipOfTheDay = "Fish is a good source of protein and contains many vitamins and minerals. Aim to eat at least 2 portions of fish a week, including at least 1 portion of oily fish.";

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 md:p-8 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-sm md:text-base text-blue-100">Here's your health overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Today's Progress</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">85%</p>
              </div>
              <div className="bg-green-100 p-2 md:p-3 rounded-full">
                <TrendingUp className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
            <Progress value={85} className="mt-4" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Active Medicines</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                <Pill className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Next Appointment</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">2 Days</p>
              </div>
              <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                <Calendar className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Health Score</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">92</p>
              </div>
              <div className="bg-orange-100 p-2 md:p-3 rounded-full">
                <Activity className="h-4 w-4 md:h-6 md:w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tip of the Day */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-800">
            <Lightbulb className="h-5 w-5" />
            <span className="text-sm md:text-base">💡 Daily Health Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base text-yellow-700 leading-relaxed">{tipOfTheDay}</p>
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
            <p className="text-xs text-yellow-800">
              💬 <strong>Need help?</strong> Call our 24/7 support line: <strong>1-800-MEDPAL</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Button */}
      <EmergencyButton user={user} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Medicine Reminder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-blue-600" />
              <span className="text-sm md:text-base">Medicine Reminder</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-wrap gap-2">
                <div>
                  <p className="text-sm md:text-base font-medium">Aspirin 100mg</p>
                  <p className="text-sm text-gray-600">Once daily</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">08:00</span>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-wrap gap-2">
                <div>
                  <p className="text-sm md:text-base font-medium">Metformin 500mg</p>
                  <p className="text-sm text-gray-600">Twice daily</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">20:00</span>
                  <Badge className="bg-green-100 text-green-800">Taken</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medicine Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-sm md:text-base">Medicine Inventory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-wrap gap-2">
                <div>
                  <p className="text-sm md:text-base font-medium">Aspirin</p>
                  <p className="text-sm text-gray-600">Stock: 25 tablets</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Expires</p>
                  <p className="text-sm font-medium">Dec 2024</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 flex-wrap gap-2">
                <div>
                  <p className="text-sm md:text-base font-medium">Metformin</p>
                  <p className="text-sm text-red-600">Stock: 3 tablets</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Expires</p>
                  <p className="text-sm font-medium">Jan 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 flex-wrap gap-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="bg-blue-600 text-white p-2 rounded-lg text-center min-w-[50px] md:min-w-[60px]">
                  <div className="text-base md:text-lg font-bold">15</div>
                  <div className="text-xs">JAN</div>
                </div>
                <div>
                  <p className="text-sm md:text-base font-medium">Dr. Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Cardiology Consultation</p>
                  <p className="text-sm text-blue-600">10:30 AM</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 flex-wrap gap-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="bg-green-600 text-white p-2 rounded-lg text-center min-w-[50px] md:min-w-[60px]">
                  <div className="text-base md:text-lg font-bold">22</div>
                  <div className="text-xs">JAN</div>
                </div>
                <div>
                  <p className="text-sm md:text-base font-medium">Dr. Michael Chen</p>
                  <p className="text-sm text-gray-600">General Checkup</p>
                  <p className="text-sm text-green-600">2:00 PM</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Scheduled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}