import React, { useState } from 'react';
import { Leaf, Users, TrendingUp, Award, QrCode, Mail, Lock, Phone, MapPin } from 'lucide-react';

interface HomePageProps {
  onLogin: (user: any) => void;
}

function HomePage({ onLogin }: HomePageProps) {
  const [loginMode, setLoginMode] = useState<'password' | 'qr'>('password');
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: '1',
      name: 'Alex Johnson',
      email: email || 'alex.johnson@university.edu',
      department: 'Computer Science',
      college: college || 'University of Technology',
      totalCO2Saved: 0,
      streak: 0,
      badges: [],
      bio: '',
      phone: '',
      joinDate: new Date().toISOString(),
      followers: [],
      following: [],
      profileImage: ''
    };
    onLogin(user);
  };

  const features = [
    {
      icon: Leaf,
      title: 'Track Your Impact',
      description: 'Monitor your CO2 savings and environmental contribution'
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with eco-conscious commuters in your area'
    },
    {
      icon: TrendingUp,
      title: 'Compete & Achieve',
      description: 'Climb leaderboards and unlock achievements'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Get points and badges for sustainable commuting'
    }
  ];

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your green journey</p>
          </div>

          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setLoginMode('password')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                loginMode === 'password'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </button>
            <button
              onClick={() => setLoginMode('qr')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                loginMode === 'qr'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <QrCode className="w-4 h-4 inline mr-2" />
              QR Code
            </button>
          </div>

          {loginMode === 'password' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@university.edu"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {isNewUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College/University</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your institution name"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                {isNewUser ? 'Join Community' : 'Sign In'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">Scan QR code with your mobile device</p>
              <button
                onClick={handleLogin}
                className="text-green-600 font-medium hover:text-green-700"
              >
                Use demo login instead
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-green-600 font-medium hover:text-green-700"
            >
              {isNewUser ? 'Already have an account?' : 'First time user?'}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">Need help?</p>
              <div className="flex justify-center gap-4">
                <a href="mailto:support@greencommute.app" className="flex items-center gap-1 text-green-600 hover:text-green-700">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-1 text-green-600 hover:text-green-700">
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Green Commute Tracker
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your daily commute into a positive environmental impact. 
              Track, compete, and make a difference with every green mile.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
            >
              Start Your Green Journey
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Green Commute?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of eco-conscious commuters making a real difference
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Community Impact</h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Together, we're making a measurable difference for our planet
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2.5M kg</div>
              <div className="text-green-100">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Universities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-3">Get help with your account</p>
              <a href="mailto:support@greencommute.app" className="text-green-600 font-medium">
                support@greencommute.app
              </a>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50">
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-3">Call us for urgent issues</p>
              <a href="tel:+1234567890" className="text-green-600 font-medium">
                +1 (234) 567-8900
              </a>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Office</h3>
              <p className="text-gray-600 text-sm mb-3">Visit our headquarters</p>
              <p className="text-green-600 font-medium">
                123 Green St, Eco City
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;