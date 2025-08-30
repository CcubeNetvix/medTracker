'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  TrendingUp,
  Bell,
  Settings,
  Activity,
  Pill
} from 'lucide-react';
import { AddMedicationModal } from '@/components/AddMedicationModal';
import { MedicationCard } from '@/components/MedicationCard';
import { AdherenceChart } from '@/components/AdherenceChart';
import { RemindersList } from '@/components/RemindersList';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
  color: string;
}

interface Reminder {
  id: string;
  medicationId: string;
  medicationName: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
  date: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load sample data
    const sampleMedications: Medication[] = [
      {
        id: '1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        times: ['08:00'],
        startDate: '2024-01-01',
        notes: 'Take with water',
        color: '#3B82F6'
      },
      {
        id: '2',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        times: ['08:00', '20:00'],
        startDate: '2024-01-01',
        notes: 'Take with meals',
        color: '#10B981'
      },
      {
        id: '3',
        name: 'Vitamin D3',
        dosage: '1000 IU',
        frequency: 'Once daily',
        times: ['09:00'],
        startDate: '2024-01-01',
        color: '#F59E0B'
      }
    ];

    setMedications(sampleMedications);

    // Generate sample reminders for today
    const today = new Date().toISOString().split('T')[0];
    const sampleReminders: Reminder[] = [
      {
        id: '1',
        medicationId: '1',
        medicationName: 'Lisinopril 10mg',
        time: '08:00',
        status: 'taken',
        date: today
      },
      {
        id: '2',
        medicationId: '2',
        medicationName: 'Metformin 500mg',
        time: '08:00',
        status: 'taken',
        date: today
      },
      {
        id: '3',
        medicationId: '2',
        medicationName: 'Metformin 500mg',
        time: '20:00',
        status: 'pending',
        date: today
      },
      {
        id: '4',
        medicationId: '3',
        medicationName: 'Vitamin D3 1000 IU',
        time: '09:00',
        status: 'missed',
        date: today
      }
    ];

    setReminders(sampleReminders);
  }, []);

  const handleAddMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication = {
      ...medication,
      id: Date.now().toString()
    };
    setMedications([...medications, newMedication]);
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    setReminders(reminders.filter(reminder => reminder.medicationId !== id));
  };

  const handleReminderStatusChange = (reminderId: string, status: 'taken' | 'missed') => {
    setReminders(reminders.map(reminder =>
      reminder.id === reminderId ? { ...reminder, status } : reminder
    ));
  };

  const todayReminders = reminders.filter(r => r.date === new Date().toISOString().split('T')[0]);
  const takenToday = todayReminders.filter(r => r.status === 'taken').length;
  const totalToday = todayReminders.length;
  const adherencePercentage = totalToday > 0 ? Math.round((takenToday / totalToday) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MedTracker</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{adherencePercentage}%</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <Progress value={adherencePercentage} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Medications</p>
                  <p className="text-2xl font-bold text-gray-900">{medications.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Pill className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Doses Taken</p>
                  <p className="text-2xl font-bold text-gray-900">{takenToday}/{totalToday}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Reminder</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayReminders.find(r => r.status === 'pending')?.time || '--:--'}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Today's Schedule</span>
                  </CardTitle>
                  <CardDescription>
                    Your medication reminders for today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RemindersList
                    reminders={todayReminders}
                    onStatusChange={handleReminderStatusChange}
                  />
                </CardContent>
              </Card>

              {/* Adherence Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Weekly Adherence</span>
                  </CardTitle>
                  <CardDescription>
                    Your medication adherence over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdherenceChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Medications</h2>
                <p className="text-gray-600">Manage your medication schedules</p>
              </div>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medications.map((medication) => (
                <MedicationCard
                  key={medication.id}
                  medication={medication}
                  onDelete={handleDeleteMedication}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Reminders</h2>
              <p className="text-gray-600">View and manage all your medication reminders</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <RemindersList
                  reminders={reminders}
                  onStatusChange={handleReminderStatusChange}
                  showDate
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Adherence Reports</h2>
              <p className="text-gray-600">Track your medication adherence over time</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Adherence</CardTitle>
                  <CardDescription>Your medication adherence rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{adherencePercentage}%</div>
                    <p className="text-gray-600">This week</p>
                    <Progress value={adherencePercentage} className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Streak</CardTitle>
                  <CardDescription>Consecutive days with perfect adherence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">7</div>
                    <p className="text-gray-600">Days</p>
                    <div className="flex justify-center space-x-1 mt-4">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full bg-green-400"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Trends</CardTitle>
                <CardDescription>Detailed view of your adherence patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <AdherenceChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddMedicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMedication}
      />
    </div>
  );
}