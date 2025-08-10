import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthService } from './services/authService';
import { FirestoreService } from './services/firestoreService';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
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
import { CommuteEntry } from './types';

function App() {
  const { user: authUser, profile, loading: authLoading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'log' | 'leaderboard' | 'social' | 'impact' | 'calendar' | 'profile' | 'analytics' | 'referral'>('dashboard');
  const [commutes, setCommutes] = useState<CommuteEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Load user commutes when authenticated
  React.useEffect(() => {
    if (authUser && profile) {
      loadUserCommutes();
    }
  }, [authUser, profile]);

  const loadUserCommutes = async () => {
    if (!authUser) return;
    
    try {
      const userCommutes = await FirestoreService.getUserCommutes(authUser.uid);
      setCommutes(userCommutes);
    } catch (error) {
      console.error('Error loading commutes:', error);
    }
  };

  const addCommute = async (commute: Omit<CommuteEntry, 'id' | 'date'>) => {
    if (!authUser) return;

    try {
      const commuteId = await FirestoreService.addCommuteEntry(authUser.uid, commute);
      const newCommute: CommuteEntry = {
        ...commute,
        id: commuteId,
        date: new Date().toISOString()
      };
      setCommutes(prev => [newCommute, ...prev]);
    } catch (error) {
      console.error('Error adding commute:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleUpdateUser = (updatedUser: any) => {
    // The profile will be updated through the auth hook
    setShowProfile(false);
  };

  if (isLoading || authLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

  if (!authUser || !profile) {
    return <HomePage onLogin={() => {}} />;
  }

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header user={profile} onProfileClick={() => setShowProfile(false)} />
        <main className="pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <ProfilePage 
              user={profile} 
              onUpdateUser={handleUpdateUser}
              onBack={() => setShowProfile(false)}
            />
          </div>
        </main>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard commutes={commutes} user={profile} />;
      case 'log':
        return <CommuteLogger onAddCommute={addCommute} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'social':
        return <SocialFeed user={profile} />;
      case 'impact':
        return <CO2ImpactPage />;
      case 'calendar':
        return <CalendarView commutes={commutes} streak={profile.streak} />;
      case 'profile':
        return <UserProfile user={profile} onUpdateUser={handleUpdateUser} />;
      case 'analytics':
        return <AnalyticsPage commutes={commutes} />;
      case 'referral':
        return <ReferralPage user={profile} />;
      default:
        return <Dashboard commutes={commutes} user={profile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header user={profile} onProfileClick={() => setShowProfile(true)} />
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