'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
  color: string;
}

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (medication: Medication) => void;
}

export function AddMedicationModal({ isOpen, onClose, onAdd }: AddMedicationModalProps) {
  const [formData, setFormData] = useState<Medication>({
    name: '',
    dosage: '',
    frequency: '',
    times: [''],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: '',
    color: '#3B82F6'
  });

  const colors = [
    { value: '#3B82F6', label: 'Blue' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Orange' },
    { value: '#EF4444', label: 'Red' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#06B6D4', label: 'Cyan' }
  ];

  const frequencies = [
    { value: 'Once daily', times: 1 },
    { value: 'Twice daily', times: 2 },
    { value: 'Three times daily', times: 3 },
    { value: 'Four times daily', times: 4 },
    { value: 'Every other day', times: 1 },
    { value: 'Weekly', times: 1 },
    { value: 'As needed', times: 1 }
  ];

  const handleFrequencyChange = (frequency: string) => {
    const freqData = frequencies.find(f => f.value === frequency);
    if (freqData) {
      const newTimes = Array.from({ length: freqData.times }, (_, i) => 
        i === 0 ? '08:00' : `${8 + i * 4}:00`.padStart(5, '0')
      );
      setFormData({ ...formData, frequency, times: newTimes });
    }
  };

  const handleTimeChange = (index: number, time: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = time;
    setFormData({ ...formData, times: newTimes });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.dosage && formData.frequency && formData.times.every(t => t)) {
      onAdd(formData);
      setFormData({
        name: '',
        dosage: '',
        frequency: '',
        times: [''],
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        notes: '',
        color: '#3B82F6'
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Medication</DialogTitle>
          <DialogDescription>
            Enter the details for your new medication schedule
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name</Label>
              <Input
                id="name"
                placeholder="e.g., Aspirin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g., 100mg"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select value={formData.frequency} onValueChange={handleFrequencyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((freq) => (
                  <SelectItem key={freq.value} value={freq.value}>
                    {freq.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.frequency && (
            <div className="space-y-2">
              <Label>Reminder Times</Label>
              <div className="space-y-2">
                {formData.times.map((time, index) => (
                  <Input
                    key={index}
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    required
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Select value={formData.color} onValueChange={(color) => setFormData({ ...formData, color })}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="e.g., Take with food"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}