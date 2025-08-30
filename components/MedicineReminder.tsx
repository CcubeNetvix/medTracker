'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2,
  Pill,
  MessageSquare,
  Phone,
  AlertTriangle
} from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  frequency: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
}

export function MedicineReminder() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: '1', name: 'Aspirin 100mg', frequency: 'Once daily', time: '08:00', status: 'taken' },
    { id: '2', name: 'Metformin 500mg', frequency: 'Twice daily', time: '08:00', status: 'taken' },
    { id: '3', name: 'Metformin 500mg', frequency: 'Twice daily', time: '20:00', status: 'pending' },
    { id: '4', name: 'Vitamin D3', frequency: 'Once daily', time: '09:00', status: 'missed' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    frequency: '',
    time: ''
  });

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.frequency && newMedicine.time) {
      const medicine: Medicine = {
        id: Date.now().toString(),
        name: newMedicine.name,
        frequency: newMedicine.frequency,
        time: newMedicine.time,
        status: 'pending'
      };
      setMedicines([...medicines, medicine]);
      setNewMedicine({ name: '', frequency: '', time: '' });
      setIsAddModalOpen(false);
    }
  };

  const handleStatusChange = (id: string, status: 'taken' | 'missed') => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, status } : med
    ));
  };

  const handleDelete = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'missed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'taken':
        return <Badge className="bg-green-100 text-green-800">Taken</Badge>;
      case 'missed':
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medicine Reminder</h1>
          <p className="text-gray-600">Manage your daily medication schedule</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicine-name">Medicine Name</Label>
                <Input
                  id="medicine-name"
                  placeholder="e.g., Aspirin 100mg"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={newMedicine.frequency} onValueChange={(value) => setNewMedicine({...newMedicine, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                    <SelectItem value="Four times daily">Four times daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMedicine.time}
                  onChange={(e) => setNewMedicine({...newMedicine, time: e.target.value})}
                />
              </div>
              
              <Button onClick={handleAddMedicine} className="w-full">
                Add Medicine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5" />
            <span>Today's Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Frequency</th>
                  <th className="text-left py-3 px-4">Time</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(medicine.status)}
                        <span className="font-medium">{medicine.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{medicine.frequency}</td>
                    <td className="py-4 px-4 text-gray-600">{medicine.time}</td>
                    <td className="py-4 px-4">{getStatusBadge(medicine.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-green-600" title="SMS Reminder" />
                        <Phone className="h-4 w-4 text-blue-600" title="Voice Call" />
                        {medicine.status === 'missed' && (
                          <AlertTriangle className="h-4 w-4 text-red-600" title="Family Notified" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {medicine.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(medicine.id, 'taken')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(medicine.id, 'missed')}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(medicine.id)}
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