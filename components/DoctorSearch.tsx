'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Clock,
  Filter,
  User,
  Calendar
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  availability: string;
  image?: string;
  experience: string;
  fees: string;
}

export function DoctorSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.8,
      reviews: 124,
      location: 'City Medical Center',
      distance: '2.3 km',
      phone: '+91 98765 43210',
      availability: 'Available Today',
      experience: '15 years',
      fees: '₹800'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      rating: 4.6,
      reviews: 89,
      location: 'Downtown Clinic',
      distance: '1.8 km',
      phone: '+91 98765 43211',
      availability: 'Available Tomorrow',
      experience: '12 years',
      fees: '₹600'
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialty: 'Dermatology',
      rating: 4.9,
      reviews: 156,
      location: 'Skin Care Clinic',
      distance: '3.1 km',
      phone: '+91 98765 43212',
      availability: 'Available Today',
      experience: '18 years',
      fees: '₹1000'
    },
    {
      id: '4',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Orthopedics',
      rating: 4.7,
      reviews: 98,
      location: 'Bone & Joint Hospital',
      distance: '4.2 km',
      phone: '+91 98765 43213',
      availability: 'Available in 2 days',
      experience: '20 years',
      fees: '₹900'
    },
    {
      id: '5',
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      rating: 4.8,
      reviews: 142,
      location: 'Children\'s Hospital',
      distance: '2.7 km',
      phone: '+91 98765 43214',
      availability: 'Available Today',
      experience: '14 years',
      fees: '₹700'
    }
  ];

  const specialties = [
    'All Specialties',
    'Cardiology',
    'General Medicine',
    'Dermatology',
    'Orthopedics',
    'Pediatrics',
    'Neurology',
    'Gynecology'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === 'All Specialties' || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
        <p className="text-gray-600">Search for experienced doctors near you</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Doctors</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Search by name or specialty"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <select
                id="specialty"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="location"
                  placeholder="Enter location"
                  className="pl-10"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Found {filteredDoctors.length} doctors
        </p>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
                  <User className="h-8 w-8 text-white" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-gray-600">({doctor.reviews} reviews)</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium">{doctor.location}</p>
                        <p className="text-gray-600">{doctor.distance} away</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium">{doctor.availability}</p>
                        <p className="text-gray-600">{doctor.experience} experience</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-green-100 text-green-800">
                        Consultation: {doctor.fees}
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or location</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}