'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Edit, 
  Trash2,
  Phone
} from 'lucide-react';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:30',
      location: 'City Medical Center',
      notes: 'Regular checkup',
      status: 'upcoming'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2024-01-22',
      time: '14:00',
      location: 'Downtown Clinic',
      status: 'upcoming'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Davis',
      specialty: 'Dermatology',
      date: '2024-01-08',
      time: '09:15',
      location: 'Skin Care Clinic',
      notes: 'Follow-up for skin condition',
      status: 'completed'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  });

  const handleAddAppointment = () => {
    if (newAppointment.doctorName && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        doctorName: newAppointment.doctorName,
        specialty: newAppointment.specialty,
        date: newAppointment.date,
        time: newAppointment.time,
        location: newAppointment.location,
        notes: newAppointment.notes,
        status: 'upcoming'
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({
        doctorName: '',
        specialty: '',
        date: '',
        time: '',
        location: '',
        notes: ''
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your medical appointments</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-name">Doctor Name</Label>
                <Input
                  id="doctor-name"
                  placeholder="e.g., Dr. John Smith"
                  value={newAppointment.doctorName}
                  onChange={(e) => setNewAppointment({...newAppointment, doctorName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  placeholder="e.g., Cardiology"
                  value={newAppointment.specialty}
                  onChange={(e) => setNewAppointment({...newAppointment, specialty: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., City Medical Center"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  rows={3}
                />
              </div>
              
              <Button onClick={handleAddAppointment} className="w-full">
                Book Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedAppointments.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(apt => 
                    new Date(apt.date).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Upcoming Appointments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming appointments</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 text-white p-2 rounded-lg text-center min-w-[60px]">
                      <div className="text-lg font-bold">{new Date(appointment.date).getDate()}</div>
                      <div className="text-xs">{new Date(appointment.date).toLocaleDateString('en', { month: 'short' }).toUpperCase()}</div>
                    </div>
                    <div>
                      <p className="font-medium">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <div className="flex items-center space-x-4 text-sm text-blue-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(appointment.status)}
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(appointment.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>All Appointments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Doctor</th>
                  <th className="text-left py-3 px-4">Specialty</th>
                  <th className="text-left py-3 px-4">Date & Time</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">{appointment.doctorName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{appointment.specialty}</td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{appointment.time}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{appointment.location}</td>
                      <td className="py-4 px-4">{getStatusBadge(appointment.status)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(appointment.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}