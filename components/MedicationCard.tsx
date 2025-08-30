'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Trash2, Edit, Calendar } from 'lucide-react';

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

interface MedicationCardProps {
  medication: Medication;
  onDelete: (id: string) => void;
}

export function MedicationCard({ medication, onDelete }: MedicationCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4" style={{ borderLeftColor: medication.color }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {medication.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{medication.dosage}</p>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(medication.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{medication.frequency}</span>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Reminder Times</p>
          <div className="flex flex-wrap gap-2">
            {medication.times.map((time, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {time}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Started {new Date(medication.startDate).toLocaleDateString()}
          </span>
        </div>

        {medication.notes && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">{medication.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}