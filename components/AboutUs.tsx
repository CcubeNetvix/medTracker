'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Shield, 
  Users, 
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

export function AboutUs() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            MedPal
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted healthcare companion for better health management and improved quality of life.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Heart className="h-6 w-6" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700">
              To empower individuals to take control of their health through innovative technology, 
              making healthcare management simple, accessible, and effective for everyone.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Shield className="h-6 w-6" />
              <span>Our Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              To create a world where managing your health is as easy as checking your phone, 
              ensuring no one misses their medication or important health appointments.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>What Makes MedPal Special</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold">Comprehensive Care</h3>
              <p className="text-sm text-gray-600">
                All your health needs in one place - medications, appointments, and health tracking.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold">Secure & Private</h3>
              <p className="text-sm text-gray-600">
                Your health data is encrypted and secure, with privacy as our top priority.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold">User-Friendly</h3>
              <p className="text-sm text-gray-600">
                Designed for everyone, from tech-savvy users to those new to digital health.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold">Proven Results</h3>
              <p className="text-sm text-gray-600">
                Helping thousands of users improve their medication adherence and health outcomes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Info */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle>Meet the Developer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 rounded-full">
              <Users className="h-16 w-16 text-white" />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Sai Vivek</h3>
                <p className="text-lg text-gray-600">Full Stack Developer</p>
                <p className="text-gray-600">National Institute of Technology, Mizoram</p>
              </div>
              
              <p className="text-gray-700">
                Passionate about creating technology solutions that make a real difference in people's lives. 
                MedPal was born from the vision of making healthcare management accessible and simple for everyone.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>saivivek2809@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>NIT Mizoram</span>
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start space-x-4">
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Built With Modern Technology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Frontend</h4>
              <p className="text-sm text-gray-600">Next.js, React, TypeScript</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Backend</h4>
              <p className="text-sm text-gray-600">Node.js, Express.js</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Database</h4>
              <p className="text-sm text-gray-600">MySQL, Supabase</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Services</h4>
              <p className="text-sm text-gray-600">Twilio, NodeMailer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have questions, suggestions, or need support? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="secondary">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="secondary">
              <Phone className="h-4 w-4 mr-2" />
              Call Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}