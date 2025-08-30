'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Phone,
  MessageSquare,
  Calendar,
  Pill,
  TrendingUp
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  lastActive: string;
  medicationAdherence: number;
  upcomingAppointments: number;
  emergencyAlerts: number;
}

export function FamilyDashboard() {
  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'John Doe',
      relationship: 'Father',
      lastActive: '2 hours ago',
      medicationAdherence: 85,
      upcomingAppointments: 2,
      emergencyAlerts: 0
    },
    {
      id: '2',
      name: 'Mary Smith',
      relationship: 'Mother',
      lastActive: '30 minutes ago',
      medicationAdherence: 95,
      upcomingAppointments: 1,
      emergencyAlerts: 1
    }
  ]);

  const recentAlerts = [
    {
      id: '1',
      type: 'missed_medication',
      member: 'John Doe',
      message: 'Missed Aspirin dose at 8:00 AM',
      time: '2 hours ago',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'emergency',
      member: 'Mary Smith',
      message: 'Emergency button pressed - False alarm',
      time: '1 day ago',
      severity: 'high'
    },
    {
      id: '3',
      type: 'appointment',
      member: 'John Doe',
      message: 'Appointment with Dr. Johnson tomorrow',
      time: '3 hours ago',
      severity: 'low'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'missed_medication':
        return <Pill className="h-5 w-5 text-orange-600" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-orange-50 border-orange-200';
      case 'low':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Family Care Dashboard</h1>
          <p className="text-gray-600">Monitor your family members' health and medication adherence</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button className="bg-green-600 hover:bg-green-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call Family
          </Button>
        </div>
      </div>

      {/* Family Members Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-gray-600">{member.relationship}</p>
                  </div>
                </div>
                
                {member.emergencyAlerts > 0 && (
                  <Badge variant="destructive" className="animate-pulse">
                    {member.emergencyAlerts} Alert{member.emergencyAlerts > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{member.medicationAdherence}%</div>
                  <p className="text-xs text-gray-600">Medication Adherence</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{member.upcomingAppointments}</div>
                  <p className="text-xs text-gray-600">Upcoming Appointments</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{member.emergencyAlerts}</div>
                  <p className="text-xs text-gray-600">Emergency Alerts</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last active: {member.lastActive}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600">Online</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Recent Alerts & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <p className="font-medium text-gray-900">{alert.member}</p>
                      <p className="text-gray-700">{alert.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {alert.severity === 'high' && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Send Encouragement</h3>
            <p className="text-green-700 text-sm mb-4">Send a motivational message to family members</p>
            <Button className="bg-green-600 hover:bg-green-700">
              Send Message
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Schedule Check-in</h3>
            <p className="text-blue-700 text-sm mb-4">Set up regular check-in calls</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Schedule Call
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-800 mb-2">View Reports</h3>
            <p className="text-purple-700 text-sm mb-4">Detailed health and adherence reports</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}