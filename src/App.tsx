import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import CommuteLogger from './components/CommuteLogger';
import Leaderboard from './components/Leaderboard';
import SocialFeed from './components/SocialFeed';
import CO2ImpactPage from './components/CO2ImpactPage';
import CalendarView from './components/CalendarView';
import UserProfile from './components/UserProfile';
import AnalyticsPage from './components/AnalyticsPage';
import ReferralPage from './components/ReferralPage';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { CommuteEntry, UserProfile as UserProfileType } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'log' | 'leaderboard' | 'social' | 'impact' | 'calendar' | 'profile' | 'analytics' | 'referral'>('dashboard');
  const [commutes, setCommutes] = useState<CommuteEntry[]>([]);
  const [user, setUser] = useState<UserProfileType>({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    department: 'Computer Science',
    college: 'University of Technology',
    totalCO2Saved: 0,
    streak: 0,
    badges: [],
    bio: '',
    phone: '',
    joinDate: new Date().toISOString(),
    followers: [],
    following: [],
    profileImage: ''
  });

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userData: UserProfileType) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const addCommute = (commute: Omit<CommuteEntry, 'id' | 'date'>) => {
    const newCommute: CommuteEntry = {
      ...commute,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setCommutes(prev => [newCommute, ...prev]);
  };

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

  if (!isLoggedIn) {
    return <HomePage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard commutes={commutes} user={user} />;
      case 'log':
        return <CommuteLogger onAddCommute={addCommute} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'social':
        return <SocialFeed user={user} />;
      case 'impact':
        return <CO2ImpactPage />;
      case 'calendar':
        return <CalendarView commutes={commutes} streak={user.streak} />;
      case 'profile':
        return <UserProfile user={user} onUpdateUser={setUser} />;
      case 'analytics':
        return <AnalyticsPage commutes={commutes} />;
      case 'referral':
        return <ReferralPage user={user} />;
      default:
        return <Dashboard commutes={commutes} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header user={user} />
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <ChatBot />
    </div>
  );
}

export default App;