'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  Plus, 
  BarChart3, 
  TrendingUp,
  Calendar
} from 'lucide-react';

interface HealthReading {
  id: string;
  type: string;
  value: number;
  date: string;
}

export function HealthCharts() {
  const [readings, setReadings] = useState<HealthReading[]>([
    { id: '1', type: 'Blood Sugar', value: 95, date: '2024-01-10' },
    { id: '2', type: 'Blood Sugar', value: 102, date: '2024-01-11' },
    { id: '3', type: 'Blood Sugar', value: 88, date: '2024-01-12' },
    { id: '4', type: 'Blood Sugar', value: 94, date: '2024-01-13' },
    { id: '5', type: 'Blood Sugar', value: 97, date: '2024-01-14' },
    { id: '6', type: 'Blood Pressure', value: 120, date: '2024-01-10' },
    { id: '7', type: 'Blood Pressure', value: 118, date: '2024-01-12' },
    { id: '8', type: 'Blood Pressure', value: 122, date: '2024-01-14' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReading, setNewReading] = useState({
    type: 'Blood Sugar',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddReading = () => {
    if (newReading.type && newReading.value && newReading.date) {
      const reading: HealthReading = {
        id: Date.now().toString(),
        type: newReading.type,
        value: parseFloat(newReading.value),
        date: newReading.date
      };
      setReadings([...readings, reading]);
      setNewReading({ type: 'Blood Sugar', value: '', date: new Date().toISOString().split('T')[0] });
      setIsAddModalOpen(false);
    }
  };

  const bloodSugarData = readings
    .filter(r => r.type === 'Blood Sugar')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(r => ({
      date: new Date(r.date).toLocaleDateString(),
      value: r.value
    }));

  const bloodPressureData = readings
    .filter(r => r.type === 'Blood Pressure')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(r => ({
      date: new Date(r.date).toLocaleDateString(),
      value: r.value
    }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Charts</h1>
          <p className="text-gray-600">Track your health metrics over time</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Reading
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Health Reading</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reading-type">Reading Type</Label>
                <select
                  id="reading-type"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newReading.type}
                  onChange={(e) => setNewReading({...newReading, type: e.target.value})}
                >
                  <option value="Blood Sugar">Blood Sugar (mg/dL)</option>
                  <option value="Blood Pressure">Blood Pressure (mmHg)</option>
                  <option value="Weight">Weight (kg)</option>
                  <option value="Heart Rate">Heart Rate (bpm)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reading-value">Value</Label>
                <Input
                  id="reading-value"
                  type="number"
                  placeholder="Enter reading value"
                  value={newReading.value}
                  onChange={(e) => setNewReading({...newReading, value: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reading-date">Date</Label>
                <Input
                  id="reading-date"
                  type="date"
                  value={newReading.date}
                  onChange={(e) => setNewReading({...newReading, date: e.target.value})}
                />
              </div>
              
              <Button onClick={handleAddReading} className="w-full">
                Add Reading
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Blood Sugar Chart</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodSugarData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-blue-600">
                              Blood Sugar: {payload[0].value} mg/dL
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Blood Pressure Chart</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-green-600">
                              Blood Pressure: {payload[0].value} mmHg
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Readings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Recent Readings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Value</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {readings
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 10)
                  .map((reading) => (
                    <tr key={reading.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">{reading.type}</td>
                      <td className="py-4 px-4">
                        {reading.value} {reading.type === 'Blood Sugar' ? 'mg/dL' : 
                                        reading.type === 'Blood Pressure' ? 'mmHg' :
                                        reading.type === 'Weight' ? 'kg' : 'bpm'}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(reading.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reading.type === 'Blood Sugar' && reading.value >= 70 && reading.value <= 100 ? 'bg-green-100 text-green-800' :
                          reading.type === 'Blood Pressure' && reading.value >= 90 && reading.value <= 120 ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reading.type === 'Blood Sugar' && reading.value >= 70 && reading.value <= 100 ? 'Normal' :
                           reading.type === 'Blood Pressure' && reading.value >= 90 && reading.value <= 120 ? 'Normal' :
                           'Monitor'}
                        </span>
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