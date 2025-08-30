'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shield, 
  Calendar, 
  BarChart3, 
  Stethoscope, 
  Pill, 
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MedPal
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Get Started
              </Button>
            </div>
            
            <div className="lg:hidden">
              <Button onClick={onGetStarted} size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  🏥 Personalized Healthcare Platform
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Personalized 
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {' '}Healthcare{' '}
                  </span>
                  for You
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Search for experienced doctors who are dedicated to providing you with the best medical care possible. 
                  Manage your prescriptions hassle-free and never miss an appointment again.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center flex-1">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Doctors</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">99%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Healthcare Professional" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Healthcare
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage your health effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 md:p-8">
                <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Manage Prescriptions</h3>
                <p className="text-sm md:text-base text-gray-600">
                  No more misplaced prescriptions! Our medical tracker securely stores your doctor's prescriptions 
                  in one convenient location, so you can easily access them whenever you need.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6 md:p-8">
                <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Appointment Reminders</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Never miss an appointment again! With our built-in calendar and appointment reminders, 
                  you'll always know when it's time to see your doctor.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6 md:p-8">
                <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Health Dashboard</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Your health data at your fingertips! Our user-friendly dashboard consolidates your medical records, 
                  test results, and other important information.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6 md:p-8">
                <div className="bg-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Find Doctors</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Find a doctor that meets your needs. Search by specialty, location, and availability 
                  to connect with the right healthcare professional.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-teal-50 to-teal-100">
              <CardContent className="p-6 md:p-8">
                <div className="bg-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Track your progress with charts and graphs. Monitor your health goals with easy-to-read 
                  visualizations and comprehensive health data analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100">
              <CardContent className="p-6 md:p-8">
                <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Family Care Network</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Connect family members and caregivers to receive updates on medication adherence, 
                  appointment attendance, and health status. Peace of mind for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Medical Dashboard" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Why Choose MedPal?
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                MedPal provides you with easy-to-read charts and graphs that allow you to track your progress 
                and monitor your health goals. With just a glance, you can see how your medication adherence, 
                doctor appointments, and medical history are affecting your overall health.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-sm md:text-base text-gray-700">Comprehensive health tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-sm md:text-base text-gray-700">Secure data storage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-sm md:text-base text-gray-700">24/7 support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-sm md:text-base text-gray-700">Easy-to-use interface</span>
                </div>
              </div>

              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 w-full sm:w-auto"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg md:text-xl text-gray-600">Have questions? We're here to help!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 md:p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Phone</h3>
              <p className="text-sm md:text-base text-gray-600">+91 98765 43210</p>
            </Card>

            <Card className="text-center p-6 md:p-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Email</h3>
              <p className="text-sm md:text-base text-gray-600">saivivek2809@gmail.com</p>
            </Card>

            <Card className="text-center p-6 md:p-8">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Location</h3>
              <p className="text-sm md:text-base text-gray-600">NIT Mizoram</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-bold">MedPal</span>
              </div>
              <p className="text-sm md:text-base text-gray-400 mt-4">
                Smart Healthcare Assistant for Everyone. Advanced healthcare management with SMS & voice reminders, emergency alerts, and family notifications. 
                Designed especially for seniors with large fonts, simple navigation, and 24/7 support.
              </p>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#features" className="text-sm md:text-base text-gray-400 hover:text-white transition-colors block">Features</a>
                <a href="#about" className="text-sm md:text-base text-gray-400 hover:text-white transition-colors block">About</a>
                <a href="#contact" className="text-sm md:text-base text-gray-400 hover:text-white transition-colors block">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-colors block">Help Center</a>
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-colors block">Privacy Policy</a>
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-colors block">Terms of Service</a>
              </div>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-xs md:text-sm text-gray-400">
              © 2024 MedPal. Made with ❤️ by Sai Vivek, NIT Mizoram. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}