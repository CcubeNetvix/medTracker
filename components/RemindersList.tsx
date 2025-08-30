'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface Reminder {
  id: string;
  medicationId: string;
  medicationName: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
  date: string;
}

interface RemindersListProps {
  reminders: Reminder[];
  onStatusChange: (reminderId: string, status: 'taken' | 'missed') => void;
  showDate?: boolean;
}

export function RemindersList({ reminders, onStatusChange, showDate = false }: RemindersListProps) {
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
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Taken</Badge>;
      case 'missed':
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (reminders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No reminders for today</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {getStatusIcon(reminder.status)}
            <div>
              <p className="font-medium text-gray-900">{reminder.medicationName}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>{reminder.time}</span>
                {showDate && (
                  <>
                    <span>•</span>
                    <span>{new Date(reminder.date).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {getStatusBadge(reminder.status)}
            {reminder.status === 'pending' && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => onStatusChange(reminder.id, 'taken')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Take
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(reminder.id, 'missed')}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Miss
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}