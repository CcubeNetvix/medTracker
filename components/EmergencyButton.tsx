'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Phone, 
  AlertTriangle, 
  MapPin, 
  Clock,
  Heart,
  Users
} from 'lucide-react';

interface EmergencyButtonProps {
  user: any;
}

export function EmergencyButton({ user }: EmergencyButtonProps) {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [emergencyType, setEmergencyType] = useState<string | null>(null);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    { name: 'Family Contact', number: '+1234567890', type: 'family' },
    { name: 'Doctor', number: '+1234567891', type: 'medical' },
    { name: 'MedPal Support', number: '1-800-MEDPAL', type: 'support' }
  ];

  const handleEmergencyPress = (type: string) => {
    setEmergencyType(type);
    setIsEmergencyActive(true);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger emergency call
          triggerEmergencyCall(type);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerEmergencyCall = (type: string) => {
    // This would trigger the actual emergency call
    console.log(`Emergency call triggered: ${type}`);
    
    // Send notifications to family
    const emergencyMessage = `🚨 EMERGENCY ALERT: ${user.name} has triggered an emergency alert. Please check on them immediately. Location: [GPS coordinates would be here]`;
    
    // Reset state
    setIsEmergencyActive(false);
    setCountdown(10);
    setEmergencyType(null);
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(10);
    setEmergencyType(null);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-red-800">Emergency Assistance</h3>
            <p className="text-red-700">Press for immediate help. Family and emergency services will be notified.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleEmergencyPress('medical')}
                className="bg-red-600 hover:bg-red-700 text-white h-16 text-lg font-bold"
              >
                <Heart className="h-6 w-6 mr-2" />
                Medical Emergency
              </Button>
              
              <Button
                onClick={() => handleEmergencyPress('general')}
                className="bg-orange-600 hover:bg-orange-700 text-white h-16 text-lg font-bold"
              >
                <Phone className="h-6 w-6 mr-2" />
                Need Help
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>GPS location will be shared</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Family contacts will be notified</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Countdown Dialog */}
      <Dialog open={isEmergencyActive} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-red-800 text-2xl">
              🚨 Emergency Alert Active
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6 p-6">
            <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <div className="text-4xl font-bold text-red-600">{countdown}</div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">Calling emergency services in {countdown} seconds</p>
              <p className="text-gray-600">Family members are being notified</p>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Location sharing enabled</span>
            </div>
            
            <Button
              onClick={cancelEmergency}
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              Cancel Emergency Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}