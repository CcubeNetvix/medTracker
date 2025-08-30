'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, Mail, Smartphone, Clock, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationSettingsProps {
  user: any;
}

interface NotificationPreferences {
  smsEnabled: boolean;
  emailEnabled: boolean;
  reminderType: 'sms' | 'email' | 'both';
  reminderTime: number; // minutes before scheduled time
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  criticalAlerts: {
    enabled: boolean;
    includeVoiceCall: boolean;
  };
  familyNotifications: {
    enabled: boolean;
    contactPhone: string;
    contactEmail: string;
  };
}

export function NotificationSettings({ user }: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    smsEnabled: true,
    emailEnabled: true,
    reminderType: 'both',
    reminderTime: 15,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    criticalAlerts: {
      enabled: true,
      includeVoiceCall: false
    },
    familyNotifications: {
      enabled: false,
      contactPhone: '',
      contactEmail: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);

  // Load user preferences from localStorage or database
  useEffect(() => {
    const savedPreferences = localStorage.getItem(`notification_preferences_${user.id}`);
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error loading notification preferences:', error);
      }
    }
  }, [user.id]);

  // Save preferences to localStorage
  const savePreferences = () => {
    localStorage.setItem(`notification_preferences_${user.id}`, JSON.stringify(preferences));
    toast.success('Notification preferences saved successfully!');
  };

  // Test SMS notification
  const testSMS = async () => {
    if (!preferences.smsEnabled) {
      toast.error('SMS notifications are disabled');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'medicine-reminder',
          notificationData: {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone,
            medicineName: 'Test Medicine',
            dosage: '100mg',
            scheduledTime: new Date().toISOString(),
            reminderType: 'sms'
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Test SMS sent successfully!');
        setTestResults(prev => [...prev, { type: 'SMS', success: true, time: new Date().toLocaleTimeString() }]);
      } else {
        toast.error('Failed to send test SMS');
        setTestResults(prev => [...prev, { type: 'SMS', success: false, time: new Date().toLocaleTimeString() }]);
      }
    } catch (error) {
      toast.error('Error sending test SMS');
      setTestResults(prev => [...prev, { type: 'SMS', success: false, time: new Date().toLocaleTimeString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Test email notification
  const testEmail = async () => {
    if (!preferences.emailEnabled) {
      toast.error('Email notifications are disabled');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'medicine-reminder',
          notificationData: {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone,
            medicineName: 'Test Medicine',
            dosage: '100mg',
            scheduledTime: new Date().toISOString(),
            reminderType: 'email'
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Test email sent successfully!');
        setTestResults(prev => [...prev, { type: 'Email', success: true, time: new Date().toLocaleTimeString() }]);
      } else {
        toast.error('Failed to send test email');
        setTestResults(prev => [...prev, { type: 'Email', success: false, time: new Date().toLocaleTimeString() }]);
      }
    } catch (error) {
      toast.error('Error sending test email');
      setTestResults(prev => [...prev, { type: 'Email', success: false, time: new Date().toLocaleTimeString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Bell className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-gray-600">Configure how you receive medicine reminders and alerts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Basic Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-toggle">SMS Notifications</Label>
                <p className="text-sm text-gray-500">Receive reminders via text message</p>
              </div>
              <Switch
                id="sms-toggle"
                checked={preferences.smsEnabled}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, smsEnabled: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-toggle">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive reminders via email</p>
              </div>
              <Switch
                id="email-toggle"
                checked={preferences.emailEnabled}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, emailEnabled: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-type">Default Reminder Type</Label>
              <Select
                value={preferences.reminderType}
                onValueChange={(value: 'sms' | 'email' | 'both') =>
                  setPreferences(prev => ({ ...prev, reminderType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sms">SMS Only</SelectItem>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="both">Both SMS & Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-time">Reminder Time (minutes before)</Label>
              <Input
                id="reminder-time"
                type="number"
                min="5"
                max="60"
                value={preferences.reminderTime}
                onChange={(e) => 
                  setPreferences(prev => ({ ...prev, reminderTime: parseInt(e.target.value) }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Advanced Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="quiet-hours-toggle">Quiet Hours</Label>
                <p className="text-sm text-gray-500">Reduce notifications during sleep time</p>
              </div>
              <Switch
                id="quiet-hours-toggle"
                checked={preferences.quietHours.enabled}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ 
                    ...prev, 
                    quietHours: { ...prev.quietHours, enabled: checked }
                  }))
                }
              />
            </div>

            {preferences.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Input
                    id="quiet-start"
                    type="time"
                    value={preferences.quietHours.start}
                    onChange={(e) => 
                      setPreferences(prev => ({ 
                        ...prev, 
                        quietHours: { ...prev.quietHours, start: e.target.value }
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Input
                    id="quiet-end"
                    type="time"
                    value={preferences.quietHours.end}
                    onChange={(e) => 
                      setPreferences(prev => ({ 
                        ...prev, 
                        quietHours: { ...prev.quietHours, end: e.target.value }
                      }))
                    }
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="critical-alerts-toggle">Critical Alerts</Label>
                <p className="text-sm text-gray-500">Always notify for critical medicines</p>
              </div>
              <Switch
                id="critical-alerts-toggle"
                checked={preferences.criticalAlerts.enabled}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ 
                    ...prev, 
                    criticalAlerts: { ...prev.criticalAlerts, enabled: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="family-notifications-toggle">Family Notifications</Label>
                <p className="text-sm text-gray-500">Notify family members for missed doses</p>
              </div>
              <Switch
                id="family-notifications-toggle"
                checked={preferences.familyNotifications.enabled}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ 
                    ...prev, 
                    familyNotifications: { ...prev.familyNotifications, enabled: checked }
                  }))
                }
              />
            </div>

            {preferences.familyNotifications.enabled && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="family-phone">Family Contact Phone</Label>
                  <Input
                    id="family-phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={preferences.familyNotifications.contactPhone}
                    onChange={(e) => 
                      setPreferences(prev => ({ 
                        ...prev, 
                        familyNotifications: { 
                          ...prev.familyNotifications, 
                          contactPhone: e.target.value 
                        }
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family-email">Family Contact Email</Label>
                  <Input
                    id="family-email"
                    type="email"
                    placeholder="family@example.com"
                    value={preferences.familyNotifications.contactEmail}
                    onChange={(e) => 
                      setPreferences(prev => ({ 
                        ...prev, 
                        familyNotifications: { 
                          ...prev.familyNotifications, 
                          contactEmail: e.target.value 
                        }
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Test Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Test Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Test your notification settings to ensure they're working correctly.
          </p>
          
          <div className="flex space-x-3">
            <Button
              onClick={testSMS}
              disabled={!preferences.smsEnabled || isLoading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Smartphone className="h-4 w-4" />
              <span>Test SMS</span>
            </Button>
            
            <Button
              onClick={testEmail}
              disabled={!preferences.emailEnabled || isLoading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Test Email</span>
            </Button>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-2">
              <Label>Recent Test Results</Label>
              <div className="space-y-2">
                {testResults.slice(-5).map((result, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant={result.success ? "default" : "destructive"}>
                      {result.success ? "✓" : "✗"}
                    </Badge>
                    <span className="text-sm">
                      {result.type} test at {result.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={savePreferences} className="px-8">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
