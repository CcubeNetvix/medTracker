'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Calendar,
  Pill,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

export function Reports() {
  const medicationAdherence = 85;
  const appointmentAttendance = 92;
  const healthGoalsProgress = 78;

  const monthlyData = [
    { month: 'Jan', adherence: 88, appointments: 2, healthScore: 85 },
    { month: 'Feb', adherence: 92, appointments: 1, healthScore: 87 },
    { month: 'Mar', adherence: 85, appointments: 3, healthScore: 82 },
    { month: 'Apr', adherence: 90, appointments: 2, healthScore: 89 },
  ];

  const recentActivities = [
    { id: '1', type: 'medication', action: 'Took Aspirin 100mg', time: '2 hours ago', status: 'completed' },
    { id: '2', type: 'appointment', action: 'Visited Dr. Johnson', time: '1 day ago', status: 'completed' },
    { id: '3', type: 'health', action: 'Recorded Blood Sugar: 95 mg/dL', time: '3 hours ago', status: 'completed' },
    { id: '4', type: 'medication', action: 'Missed Metformin dose', time: '1 day ago', status: 'missed' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="h-4 w-4" />;
      case 'appointment':
        return <Calendar className="h-4 w-4" />;
      case 'health':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'missed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Health Reports</h1>
          <p className="text-sm md:text-base text-gray-600">Track your health progress and generate reports</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-xs md:text-sm">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">CSV</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-blue-600" />
              <span className="text-sm md:text-base">Medication Adherence</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{medicationAdherence}%</div>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <Progress value={medicationAdherence} className="h-2" />
              <div className="flex justify-between text-xs md:text-sm text-gray-600">
                <span>Target: 90%</span>
                <span className={medicationAdherence >= 90 ? 'text-green-600' : 'text-orange-600'}>
                  {medicationAdherence >= 90 ? 'On Track' : 'Needs Improvement'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-sm md:text-base">Appointment Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">{appointmentAttendance}%</div>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <Progress value={appointmentAttendance} className="h-2" />
              <div className="flex justify-between text-xs md:text-sm text-gray-600">
                <span>Target: 95%</span>
                <span className={appointmentAttendance >= 95 ? 'text-green-600' : 'text-orange-600'}>
                  {appointmentAttendance >= 95 ? 'Excellent' : 'Good'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-sm md:text-base">Health Goals Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600">{healthGoalsProgress}%</div>
                <p className="text-sm text-gray-600">Overall progress</p>
              </div>
              <Progress value={healthGoalsProgress} className="h-2" />
              <div className="flex justify-between text-xs md:text-sm text-gray-600">
                <span>Target: 80%</span>
                <span className={healthGoalsProgress >= 80 ? 'text-green-600' : 'text-orange-600'}>
                  {healthGoalsProgress >= 80 ? 'On Track' : 'Almost There'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm">Month</th>
                  <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm">Medication Adherence</th>
                  <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm">Appointments</th>
                  <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm">Health Score</th>
                  <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm">Trend</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={data.month} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-2 md:px-4 font-medium text-xs md:text-sm">{data.month} 2024</td>
                    <td className="py-4 px-2 md:px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs md:text-sm">{data.adherence}%</span>
                        <Progress value={data.adherence} className="w-16 md:w-20 h-2" />
                      </div>
                    </td>
                    <td className="py-4 px-2 md:px-4 text-xs md:text-sm">{data.appointments} visits</td>
                    <td className="py-4 px-2 md:px-4">
                      <Badge className={data.healthScore >= 85 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {data.healthScore}
                      </Badge>
                    </td>
                    <td className="py-4 px-2 md:px-4">
                      {index > 0 && (
                        <div className="flex items-center space-x-1">
                          {data.healthScore > monthlyData[index - 1].healthScore ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                          )}
                          <span className={`text-xs md:text-sm ${data.healthScore > monthlyData[index - 1].healthScore ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.abs(data.healthScore - monthlyData[index - 1].healthScore)}%
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-wrap gap-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
                {getStatusIcon(activity.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm md:text-base font-semibold text-gray-900">Achievements This Month</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Maintained 85%+ medication adherence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Attended all scheduled appointments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Recorded health metrics regularly</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm md:text-base font-semibold text-gray-900">Areas for Improvement</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Missed 3 medication doses this month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Set more consistent reminder times</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Track blood pressure more frequently</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}